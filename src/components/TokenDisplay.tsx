import { useEffect, useState } from "react";
import { Coins } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const TokenDisplay = () => {
  const [tokens, setTokens] = useState<number | null>(null);

  useEffect(() => {
    const fetchTokens = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('tokens')
          .eq('id', user.id)
          .single();
        if (data) {
          setTokens(data.tokens);
        }
      }
    };

    fetchTokens();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        fetchTokens();
      } else if (event === 'SIGNED_OUT') {
        setTokens(null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, []);

  if (tokens === null) return null;

  return (
    <div className="flex items-center gap-2 text-white">
      <Coins className="h-5 w-5" />
      <span>{tokens} токенов</span>
    </div>
  );
};