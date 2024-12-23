import { Link, Outlet, useLocation } from "react-router-dom";
import { Footer } from "./Footer";
import { Breadcrumbs } from "./Breadcrumbs";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { NavLinks } from "./navigation/NavLinks";
import { UserMenu } from "./navigation/UserMenu";
import { MobileMenu } from "./navigation/MobileMenu";
import { AuthModal } from "./auth/AuthModal";

export const Layout = () => {
  const { pathname } = useLocation();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const initializeAuth = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          if (sessionError.message.includes('session_not_found') || sessionError.status === 403) {
            await supabase.auth.signOut();
            setUserEmail(null);
            return;
          }
          throw sessionError;
        }

        setUserEmail(session?.user?.email || null);
        setIsInitialized(true);
      } catch (error: any) {
        console.error('Auth initialization error:', error);
        setUserEmail(null);
        setIsInitialized(true);
      }
    };

    initializeAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        setUserEmail(session?.user?.email || null);
      } else if (event === 'SIGNED_OUT') {
        setUserEmail(null);
      } else if (event === 'TOKEN_REFRESHED') {
        setUserEmail(session?.user?.email || null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [pathname]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUserEmail(null);
      window.location.href = '/';
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Произошла ошибка при выходе из системы",
      });
    }
  };

  if (!isInitialized) {
    return null;
  }

  // Список страниц, доступных без авторизации
  const publicPages = [
    '/',
    '/program',
    '/python-course',
    '/data-science',
    '/data-science-program',
    '/devops',
    '/devops-program',
    '/business-analyst',
    '/business-analyst-program',
    '/product-management',
    '/product-management-program',
    '/auth',
    '/privacy',
    '/terms',
    '/pricing',
    '/faq'
  ];

  // Проверяем, является ли текущая страница публичной
  const isPublicPage = publicPages.includes(pathname);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-gray-900 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Link
              to="/"
              className="text-2xl font-bold hover:text-primary transition-colors"
            >
              Курсы с ИИ-учителем
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <NavLinks />
              <UserMenu 
                userEmail={userEmail} 
                onLogout={handleLogout}
                onLoginClick={() => setShowAuthModal(true)}
              />
            </div>

            {/* Mobile Navigation */}
            <MobileMenu 
              userEmail={userEmail} 
              onLogout={handleLogout}
              onLoginClick={() => setShowAuthModal(true)}
            />
          </div>
        </div>
      </header>
      <Breadcrumbs />
      <main className="flex-grow">
        {isPublicPage || userEmail ? (
          <Outlet />
        ) : (
          <AuthModal 
            isOpen={true}
            onClose={() => setShowAuthModal(false)}
          />
        )}
      </main>
      <Footer />
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};