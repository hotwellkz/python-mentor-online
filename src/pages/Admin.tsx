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

  const authenticate = async () => {
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
        });
        return;
      }

      if (adminData) {
        setIsAuthenticated(true);
        fetchUsers();
      } else {
        toast({
          variant: "destructive",
          title: "Ошибка",
          description: "Неверный пароль",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    }
  };

  const fetchUsers = async () => {
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
      });
      
      fetchUsers();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
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
      });
      
      fetchUsers();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Панель администратора</h1>
          <Input
            type="password"
            placeholder="Введите пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                authenticate();
              }
            }}
          />
          <Button onClick={authenticate} className="w-full">
            Войти
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Управление пользователями</h1>
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow">
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
                    className="w-24 bg-white dark:bg-gray-900"
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