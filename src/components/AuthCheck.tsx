import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AuthCheck = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isEmailVerified, setIsEmailVerified] = useState<boolean | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setIsAuthenticated(!!user);
    setIsEmailVerified(user?.email_confirmed_at !== null);
    setUserEmail(user?.email || null);
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
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h1 className="text-3xl font-bold">Доступ к уроку</h1>
          <p className="text-lg text-gray-600">
            Для доступа к урокам необходимо войти в систему или зарегистрироваться
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg">
                Войти в систему
              </Button>
            </Link>
          </div>
        </div>
      </div>
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
          <Button 
            onClick={resendVerificationEmail}
            variant="outline"
            className="mx-auto"
          >
            Отправить письмо повторно
          </Button>
        </div>
      </div>
    );
  }

  return null;
};