import { useState } from "react";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { UsersTable } from "@/components/admin/UsersTable";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <AdminLogin onAuthenticated={() => setIsAuthenticated(true)} />;
  }

  return <UsersTable />;
};

export default Admin;