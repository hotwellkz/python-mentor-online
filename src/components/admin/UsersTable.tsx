import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody } from "@/components/ui/table";
import { AdminCheck } from "./AdminCheck";
import { UserRow } from "./UserRow";
import { UsersTableHeader } from "./UsersTableHeader";
import { UserWithTokens } from "@/types/admin";

export const UsersTable = () => {
  const [users, setUsers] = useState<UserWithTokens[]>([]);
  const { toast } = useToast();

  const fetchUsers = async () => {
    try {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*');

      if (profilesError) throw profilesError;

      if (profiles) {
        const usersList = profiles.map(profile => ({
          id: profile.id,
          email: 'Email скрыт',
          tokens: profile.tokens,
        }));
        
        setUsers(usersList);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <AdminCheck 
        onAuthorized={fetchUsers}
        onError={(error) => {
          toast({
            variant: "destructive",
            title: "Ошибка",
            description: error.message,
            className: "bg-destructive text-destructive-foreground border-none",
          });
        }}
      />
      <h1 className="text-2xl font-bold mb-6 text-foreground">Управление пользователями</h1>
      <div className="overflow-x-auto bg-card rounded-lg shadow border border-border">
        <Table>
          <UsersTableHeader />
          <TableBody>
            {users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onUpdateTokens={updateTokens}
                onDeleteUser={deleteUser}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};