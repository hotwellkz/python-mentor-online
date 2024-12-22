import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import { Breadcrumbs } from "./Breadcrumbs";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { NavLinks } from "./navigation/NavLinks";
import { UserMenu } from "./navigation/UserMenu";
import { MobileMenu } from "./navigation/MobileMenu";

export const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const getUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        
        if (error) {
          if (error.message.includes('session_not_found') || error.status === 403) {
            await supabase.auth.signOut();
            setUserEmail(null);
            if (pathname.startsWith('/lesson/')) {
              navigate('/auth', { state: { from: pathname } });
            }
            return;
          }
          throw error;
        }
        
        setUserEmail(user?.email || null);
      } catch (error: any) {
        console.error('Auth error:', error);
        setUserEmail(null);
      }
    };

    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        setUserEmail(session?.user?.email || null);
      } else if (event === 'SIGNED_OUT') {
        setUserEmail(null);
        navigate('/');
      } else if (event === 'TOKEN_REFRESHED') {
        setUserEmail(session?.user?.email || null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [pathname, navigate, toast]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/");
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Произошла ошибка при выходе из системы",
      });
    }
  };

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
              <UserMenu userEmail={userEmail} onLogout={handleLogout} />
            </div>

            {/* Mobile Navigation */}
            <MobileMenu userEmail={userEmail} onLogout={handleLogout} />
          </div>
        </div>
      </header>
      <Breadcrumbs />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};