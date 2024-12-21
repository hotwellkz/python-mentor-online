import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AdminLoginProps {
  onAuthenticated: () => void;
}

export const AdminLogin = ({ onAuthenticated }: AdminLoginProps) => {
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const authenticate = async () => {
    if (!password) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Введите пароль",
        className: "bg-destructive text-destructive-foreground border-none",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data: adminData, error } = await supabase
        .from('admin_users')
        .select()
        .eq('password', '1888')
        .maybeSingle();

      if (error) throw error;

      if (adminData) {
        onAuthenticated();
        toast({
          title: "Успешно",
          description: "Вы вошли в панель администратора",
          className: "bg-background text-foreground border border-border",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Неверный пароль",
          className: "bg-destructive text-destructive-foreground border-none",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
        className: "bg-destructive text-destructive-foreground border-none",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto space-y-4 bg-card p-6 rounded-lg shadow-lg border border-border">
        <h1 className="text-2xl font-bold text-card-foreground">Панель администратора</h1>
        <Input
          type="password"
          placeholder="Введите пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-background text-foreground border-input"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              authenticate();
            }
          }}
        />
        <Button 
          onClick={authenticate} 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? "Вход..." : "Войти"}
        </Button>
      </div>
    </div>
  );
};