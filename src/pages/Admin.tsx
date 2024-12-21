import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface User {
  id: string;
  email: string;
  tokens: number;
}

const Admin = () => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

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
        .eq('password', password)
        .maybeSingle();

      if (error) {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: error.message,
          className: "bg-destructive text-destructive-foreground border-none",
        });
        return;
      }

      if (adminData) {
        setIsAuthenticated(true);
        fetchUsers();
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

  const fetchUsers = async () => {
    try {
      const { data: { users: authUsers } } = await supabase.auth.admin.listUsers();
      const { data: profiles } = await supabase.from('profiles').select('*');

      if (authUsers && profiles) {
        const combinedUsers = authUsers.map(authUser => ({
          id: authUser.id,
          email: authUser.email || '',
          tokens: profiles.find(p => p.id === authUser.id)?.tokens || 0,
        }));
        setUsers(combinedUsers);
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
        className: "bg-destructive text-destructive-foreground border-none",
      });
    }
  };

  const updateTokens = async (userId: string, newTokens: number) => {
    try {
      await supabase
        .from('profiles')
        .update({ tokens: newTokens })
        .eq('id', userId);
      
      toast({
        title: "Успешно",
        description: "Количество токенов обновлено",
        className: "bg-background text-foreground border border-border",
      });
      
      fetchUsers();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
        className: "bg-destructive text-destructive-foreground border-none",
      });
    }
  };

  const deleteUser = async (userId: string) => {
    try {
      await supabase.auth.admin.deleteUser(userId);
      await supabase.from('profiles').delete().eq('id', userId);
      
      toast({
        title: "Успешно",
        description: "Пользователь удален",
        className: "bg-background text-foreground border border-border",
      });
      
      fetchUsers();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
        className: "bg-destructive text-destructive-foreground border-none",
      });
    }
  };

  if (!isAuthenticated) {
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
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-foreground">Управление пользователями</h1>
      <div className="overflow-x-auto bg-card rounded-lg shadow border border-border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Токены</TableHead>
              <TableHead>Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={user.tokens}
                    onChange={(e) => updateTokens(user.id, parseInt(e.target.value))}
                    className="w-24 bg-background text-foreground border-input"
                  />
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    onClick={() => deleteUser(user.id)}
                  >
                    Удалить
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Admin;