import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim(),
        });
        
        if (error) {
          if (error.message === "Invalid login credentials") {
            throw new Error("Неверный email или пароль");
          }
          throw error;
        }
        
        navigate("/program");
      } else {
        if (password.length < 6) {
          throw new Error("Пароль должен содержать минимум 6 символов");
        }

        const { error } = await supabase.auth.signUp({
          email: email.trim(),
          password: password.trim(),
        });

        if (error) {
          if (error.message.includes("already registered")) {
            throw new Error("Этот email уже зарегистрирован");
          }
          throw error;
        }

        setShowGiftModal(true);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Произошла ошибка при авторизации",
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
          Python с ИИ-учителем
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