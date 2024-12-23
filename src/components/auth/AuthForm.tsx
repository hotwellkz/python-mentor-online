import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthForm } from "@/hooks/useAuthForm";

interface AuthFormProps {
  isLogin: boolean;
  setIsLogin: (isLogin: boolean) => void;
  setShowGiftModal: (show: boolean) => void;
  onSuccess?: () => void;
  onBack?: () => void;
}

export const AuthForm = ({
  isLogin,
  setIsLogin: parentSetIsLogin,
  setShowGiftModal,
  onSuccess,
  onBack
}: AuthFormProps) => {
  const {
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
      <div className="text-center relative">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
          aria-label="Назад"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">
          {isLogin ? "Вход в аккаунт" : "Создание аккаунта"}
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
              placeholder="your@email.com"
            />
          </div>

          <div className="relative">
            <Label htmlFor="password">Пароль</Label>
            <div className="relative mt-1">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete={isLogin ? "current-password" : "new-password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-400" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-400" />
                )}
              </button>
            </div>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? (
            "Загрузка..."
          ) : isLogin ? (
            "Войти"
          ) : (
            "Зарегистрироваться"
          )}
        </Button>

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
      </form>
    </div>
  );
};