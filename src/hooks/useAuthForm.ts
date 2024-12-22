import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { validateEmail } from "@/utils/validation";

export const useAuthForm = (setShowGiftModal: (show: boolean) => void) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    try {
      if (!validateEmail(trimmedEmail)) {
        throw new Error("Пожалуйста, введите корректный email адрес");
      }

      if (trimmedPassword.length < 6) {
        throw new Error("Пароль должен содержать минимум 6 символов");
      }

      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password: trimmedPassword,
        });
        
        if (error) {
          console.error("Login error details:", error);
          if (error.message === "Invalid login credentials") {
            throw new Error("Пользователь не найден или неверный пароль. Проверьте введенные данные или зарегистрируйтесь");
          }
          throw error;
        }

        if (!data?.user) {
          throw new Error("Не удалось получить данные пользователя");
        }

        const from = location.state?.from?.pathname || "/";
        navigate(from, { replace: true });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email: trimmedEmail,
          password: trimmedPassword,
        });

        if (error) {
          console.error("Signup error details:", error);
          if (error.message.includes("already registered")) {
            throw new Error("Этот email уже зарегистрирован. Попробуйте войти в систему");
          }
          if (error.message.includes("rate limit exceeded") || error.message.includes("over_email_send_rate_limit")) {
            throw new Error("Превышен лимит отправки писем. Пожалуйста, подождите несколько минут и попробуйте снова, или используйте другой email адрес");
          }
          throw error;
        }

        if (data?.user) {
          toast({
            title: "Регистрация успешна",
            description: "Пожалуйста, проверьте вашу почту и подтвердите email для доступа к урокам",
          });
          setShowGiftModal(true);
          const from = location.state?.from?.pathname || "/";
          navigate(from, { replace: true });
        } else {
          throw new Error("Не удалось создать пользователя");
        }
      }
    } catch (error: any) {
      console.error("Auth error:", error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Произошла ошибка при авторизации. Пожалуйста, попробуйте позже",
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    isLogin,
    setIsLogin,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    loading,
    handleSubmit,
  };
};