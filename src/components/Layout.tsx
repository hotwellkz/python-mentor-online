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

const MAX_AUTH_RETRIES = 3;
const AUTH_RETRY_DELAY = 1000;

export const Layout = () => {
  const { pathname } = useLocation();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const initializeAuth = async (retryCount = 0) => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          if (sessionError.message.includes('Failed to fetch')) {
            if (retryCount < MAX_AUTH_RETRIES) {
              console.log(`Retry attempt ${retryCount + 1} for auth initialization`);
              await new Promise(resolve => setTimeout(resolve, AUTH_RETRY_DELAY));
              return initializeAuth(retryCount + 1);
            }
            console.error('Network error during auth initialization:', sessionError);
            setUserEmail(null);
            setIsInitialized(true);
            return;
          }

          if (sessionError.message.includes('session_not_found') || sessionError.status === 403) {
            await supabase.auth.signOut();
            setUserEmail(null);
            setIsInitialized(true);
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
        <Outlet />
      </main>
      <Footer />
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
};