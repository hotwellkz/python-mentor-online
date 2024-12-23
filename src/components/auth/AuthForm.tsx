import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dispatch, SetStateAction } from "react";
import { useAuthForm } from "@/hooks/useAuthForm";

interface AuthFormProps {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  setShowGiftModal: Dispatch<SetStateAction<boolean>>;
  onSuccess?: () => void;
}

export const AuthForm = ({
  isLogin: initialIsLogin,
  setIsLogin: parentSetIsLogin,
  setShowGiftModal,
  onSuccess
}: AuthFormProps) => {
  const {
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
  } = useAuthForm(setShowGiftModal, onSuccess);

  return (
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
          onClick={() => {
            setIsLogin(!isLogin);
            parentSetIsLogin(!isLogin);
          }}
          className="text-sm text-primary hover:underline"
        >
          {isLogin
            ? "Нет аккаунта? Зарегистрируйтесь"
            : "Уже есть аккаунт? Войдите"}
        </button>
      </div>
    </div>
  );
};