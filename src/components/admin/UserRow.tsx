import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TableCell, TableRow } from "@/components/ui/table";
import { UserWithTokens } from "@/types/admin";

interface UserRowProps {
  user: UserWithTokens;
  onUpdateTokens: (userId: string, newTokens: number) => void;
  onDeleteUser: (userId: string) => void;
}

export const UserRow = ({ user, onUpdateTokens, onDeleteUser }: UserRowProps) => {
  return (
    <TableRow key={user.id}>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <Input
          type="number"
          value={user.tokens}
          onChange={(e) => onUpdateTokens(user.id, parseInt(e.target.value))}
          className="w-24 bg-background text-foreground border-input"
        />
      </TableCell>
      <TableCell>
        <Button
          variant="destructive"
          onClick={() => onDeleteUser(user.id)}
        >
          Удалить
        </Button>
      </TableCell>
    </TableRow>
  );
};