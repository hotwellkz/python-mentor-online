import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { WelcomeGiftModal } from "@/components/WelcomeGiftModal";

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

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

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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

  return (
    <>
      <Helmet>
        <title>{isLogin ? "Вход" : "Регистрация"} | Python с ИИ-учителем</title>
      </Helmet>
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <Link
          to="/"
          className="mb-8 text-2xl font-bold hover:text-primary transition-colors"
        >
          Главная страница
        </Link>
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold">
              {isLogin ? "Вход в аккаунт" : "Создание аккаунта"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isLogin
                ? "Войдите, чтобы продолжить обучение"
                : "Зарегистрируйтесь и получите 100 токенов"}
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="example@mail.com"
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder={isLogin ? "Введите пароль" : "Минимум 6 символов"}
                  className="w-full pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading
                ? "Загрузка..."
                : isLogin
                ? "Войти"
                : "Зарегистрироваться"}
            </Button>
          </form>
          <div className="text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-sm text-primary hover:underline"
            >
              {isLogin
                ? "Нет аккаунта? Зарегистрируйтесь"
                : "Уже есть аккаунт? Войдите"}
            </button>
          </div>
        </div>
      </div>
      <WelcomeGiftModal open={showGiftModal} onOpenChange={setShowGiftModal} />
    </>
  );
};

export default Profile;