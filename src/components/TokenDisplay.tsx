import { useEffect, useState } from "react";
import { Coins } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const TokenDisplay = () => {
  const [tokens, setTokens] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTokens = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('tokens')
          .eq('id', user.id)
          .maybeSingle();
        
        if (error) {
          console.error('Error fetching tokens:', error);
          toast({
            variant: "destructive",
            title: "Ошибка",
            description: "Не удалось загрузить токены",
          });
          return;
        }

        if (data) {
          setTokens(data.tokens);
        } else {
          // Handle case when profile doesn't exist
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([{ id: user.id, tokens: 100 }]);
          
          if (insertError) {
            console.error('Error creating profile:', insertError);
            toast({
              variant: "destructive",
              title: "Ошибка",
              description: "Не удалось создать профиль",
            });
            return;
          }
          
          setTokens(100);
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