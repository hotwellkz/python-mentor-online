import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Footer } from "./Footer";
import { Breadcrumbs } from "./Breadcrumbs";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { TokenDisplay } from "./TokenDisplay";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Menu, Settings, User } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUserEmail(user?.email || null);
    };
    
    getUser();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        setUserEmail(session?.user?.email || null);
      } else if (event === 'SIGNED_OUT') {
        setUserEmail(null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [pathname]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    } else {
      if (pathname.startsWith('/lesson/')) {
        navigate("/program");
      }
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
              Python с ИИ-учителем
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              <Link 
                to="/pricing"
                className="text-white hover:text-primary transition-colors"
              >
                Тарифы
              </Link>
              <Link
                to="/admin"
                className="text-white hover:text-primary transition-colors"
              >
                <Settings className="h-5 w-5" />
              </Link>
              <TokenDisplay />
              {userEmail ? (
                <div className="flex items-center gap-2">
                  <Link 
                    to="/profile"
                    className="flex items-center gap-2 text-white hover:text-primary transition-colors"
                  >
                    <User className="h-5 w-5" />
                    {userEmail}
                  </Link>
                  <Button
                    variant="ghost"
                    className="text-white hover:text-primary"
                    onClick={handleLogout}
                  >
                    Выйти
                  </Button>
                </div>
              ) : (
                <Link to="/auth">
                  <Button>Войти</Button>
                </Link>
              )}
            </div>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-4">
                  <Link 
                    to="/pricing"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    Тарифы
                  </Link>
                  <Link
                    to="/admin"
                    className="text-foreground hover:text-primary transition-colors"
                  >
                    Администратор
                  </Link>
                  {userEmail && (
                    <Link
                      to="/profile"
                      className="text-foreground hover:text-primary transition-colors flex items-center gap-2"
                    >
                      <User className="h-5 w-5" />
                      Профиль
                    </Link>
                  )}
                  <TokenDisplay />
                  {userEmail ? (
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={handleLogout}
                    >
                      Выйти
                    </Button>
                  ) : (
                    <Link to="/auth" className="w-full">
                      <Button className="w-full">Войти</Button>
                    </Link>
                  )}
                </div>
              </SheetContent>
            </Sheet>
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