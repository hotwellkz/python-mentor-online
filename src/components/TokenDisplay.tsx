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
    <div className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
      <Coins className="h-5 w-5 text-primary animate-pulse" />
      <span className="font-medium text-sm">
        {tokens} токенов
      </span>
    </div>
  );
};