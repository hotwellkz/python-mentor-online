import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface AdminCheckProps {
  onAuthorized: () => void;
  onError: (error: Error) => void;
}

export const AdminCheck = ({ onAuthorized, onError }: AdminCheckProps) => {
  useEffect(() => {
    checkAdminAccess();
  }, []);

  const checkAdminAccess = async () => {
    try {
      const { data: adminData, error: adminError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('password', '1888')
        .limit(1)
        .maybeSingle();

      if (adminError) throw adminError;
      if (!adminData) throw new Error('Не авторизован как администратор');

      onAuthorized();
    } catch (error: any) {
      onError(error);
    }
  };

  return null;
};