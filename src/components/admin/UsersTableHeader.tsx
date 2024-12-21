import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

export const UsersTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableHead>Email</TableHead>
        <TableHead>Токены</TableHead>
        <TableHead>Действия</TableHead>
      </TableRow>
    </TableHeader>
  );
};