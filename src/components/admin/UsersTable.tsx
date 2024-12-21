import { useState, useEffect } from "react";
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
import { User } from "@supabase/supabase-js";

interface UserWithTokens {
  id: string;
  email: string;
  tokens: number;
}

export const UsersTable = () => {
  const [users, setUsers] = useState<UserWithTokens[]>([]);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      // First check if we're authenticated as admin
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('password', '1888')
        .limit(1)
        .maybeSingle();

      if (adminError) throw adminError;
      if (!adminData) throw new Error('Не авторизован как администратор');

      // Fetch profiles to get tokens
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) throw profilesError;

      if (profiles) {
        // Get user data using admin API
        const { data: { users: authUsers }, error: authError } = await supabase.auth.admin.listUsers();

        if (authError) throw authError;

        if (authUsers) {
          // Combine profile and auth user data
          const usersList = profiles.map(profile => {
            const authUser = authUsers.find(u => u.id === profile.id);
            return {
              id: profile.id,
              email: authUser?.email || 'Email не найден',
              tokens: profile.tokens,
            };
          });
          
          setUsers(usersList);
        }
      }
    } catch (error: any) {
      console.error('Error fetching users:', error);
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
      const { error } = await supabase
        .from('profiles')
        .update({ tokens: newTokens })
        .eq('id', userId);
      
      if (error) throw error;
      
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
      const { error: profileError } = await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);
      
      if (profileError) throw profileError;
      
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

  useEffect(() => {
    fetchUsers();
  }, []);

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