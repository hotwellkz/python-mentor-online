import { useState } from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Settings = () => {
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Пароль успешно изменен",
      });
      setNewPassword("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResendEmail = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user?.email) throw new Error("Email не найден");

      console.log("Отправка письма для подтверждения на:", user.email);

      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: user.email,
      });

      if (error) {
        console.error("Ошибка при отправке письма:", error);
        throw error;
      }

      console.log("Письмо успешно отправлено");

      toast({
        title: "Письмо отправлено",
        description: "Проверьте папку 'Входящие' и 'Спам'. Письмо должно прийти в течение нескольких минут.",
      });
    } catch (error: any) {
      console.error("Ошибка в handleResendEmail:", error);
      toast({
        variant: "destructive",
        title: "Ошибка при отправке письма",
        description: error.message || "Попробуйте позже или обратитесь в поддержку",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Настройки | Python с ИИ-учителем</title>
      </Helmet>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-center">Настройки аккаунта</h1>
            <p className="text-muted-foreground text-center mt-2">
              Управление паролем и подтверждением email
            </p>
          </div>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="new-password" className="block text-sm font-medium">
                Новый пароль
              </label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Введите новый пароль"
                minLength={6}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Загрузка..." : "Изменить пароль"}
            </Button>
          </form>

          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Подтверждение email</h2>
            <p className="text-sm text-muted-foreground">
              Если вы не получили письмо для подтверждения email, нажмите кнопку ниже.
              Проверьте папку "Спам" после отправки.
            </p>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleResendEmail}
              disabled={loading}
            >
              {loading ? "Отправка..." : "Отправить письмо повторно"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;