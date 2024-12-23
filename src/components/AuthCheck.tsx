import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Mail } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AuthModal } from "./auth/AuthModal";

export const AuthCheck = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAuthenticated(!!user);
    setIsEmailVerified(user?.email_confirmed_at !== null);
    setUserEmail(user?.email || null);
    
    if (!user) {
      setShowAuthModal(true);
    }
  };

  const resendVerificationEmail = async () => {
    if (!userEmail) return;

    try {
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: userEmail,
      });

      if (error) throw error;

      toast({
        title: "Письмо отправлено",
        description: "Проверьте вашу почту для подтверждения email",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <AuthModal 
          isOpen={showAuthModal} 
          onClose={() => setShowAuthModal(false)} 
        />
      </>
    );
  }

  if (!isEmailVerified) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <Mail className="mx-auto h-12 w-12 text-primary" />
          <h1 className="text-3xl font-bold">Подтвердите email</h1>
          <p className="text-lg text-gray-600">
            Для доступа к урокам необходимо подтвердить ваш email адрес. 
            Проверьте вашу почту и перейдите по ссылке в письме.
          </p>
          <button 
            onClick={resendVerificationEmail}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
          >
            Отправить письмо повторно
          </button>
        </div>
      </div>
    );
  }

  return null;
};