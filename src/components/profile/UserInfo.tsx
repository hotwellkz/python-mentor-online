import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UserInfoProps {
  userEmail: string | null;
  onLogout: () => Promise<void>;
}

export const UserInfo = ({ userEmail, onLogout }: UserInfoProps) => {
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Пароли не совпадают",
      });
      return;
    }

    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Пароль должен содержать минимум 6 символов",
      });
      return;
    }

    try {
      setChangingPassword(true);
      const { error } = await supabase.auth.updateUser({
        password: password
      });

      if (error) throw error;

      toast({
        title: "Успешно",
        description: "Пароль успешно изменен",
      });
      setPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      console.error('Password change error:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Не удалось изменить пароль",
      });
    } finally {
      setChangingPassword(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Информация профиля</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Email: {userEmail}
        </p>
      </div>

      <form onSubmit={handlePasswordChange} className="space-y-4">
        <h3 className="text-lg font-medium">Изменить пароль</h3>
        <div>
          <Label htmlFor="password">Новый пароль</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Минимум 6 символов"
            className="mt-1"
          />
        </div>
        <div>
          <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
          <Input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Повторите пароль"
            className="mt-1"
          />
        </div>
        <Button type="submit" disabled={changingPassword}>
          {changingPassword ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Сохранение...
            </>
          ) : (
            "Изменить пароль"
          )}
        </Button>
      </form>

      <Button
        variant="outline"
        onClick={onLogout}
        className="w-full"
      >
        Выйти из аккаунта
      </Button>
    </div>
  );
};