import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { WelcomeGiftModal } from "@/components/WelcomeGiftModal";
import { AuthForm } from "@/components/auth/AuthForm";
import { useAuthForm } from "@/hooks/useAuthForm";

export const Auth = () => {
  const [showGiftModal, setShowGiftModal] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const authForm = useAuthForm(setShowGiftModal);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      }
    };
    checkAuth();
  }, [navigate, location]);

  return (
    <>
      <Helmet>
        <title>{authForm.isLogin ? "Вход" : "Регистрация"} | Python с ИИ-учителем</title>
      </Helmet>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Link
          to="/"
          className="mb-8 text-2xl font-bold hover:text-primary transition-colors"
        >
          Главная страница
        </Link>
        <AuthForm {...authForm} />
      </div>
      <WelcomeGiftModal open={showGiftModal} onOpenChange={setShowGiftModal} />
    </>
  );
};

export default Auth;