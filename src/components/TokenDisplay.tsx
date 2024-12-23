import { useEffect, useState } from "react";
import { Coins } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const TokenDisplay = () => {
  const [tokens, setTokens] = useState<number | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          setTokens(null);
          return;
        }

        const { data, error } = await supabase
          .from('profiles')
          .select('tokens')
          .eq('id', user.id)
          .maybeSingle();
        
        if (error) {
          if (error.message.includes('Failed to fetch')) {
            // Handle network error silently
            console.error('Network error while fetching tokens:', error);
            return;
          }
          
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
          try {
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([{ id: user.id, tokens: 100 }]);
            
            if (insertError) {
              throw insertError;
            }
            
            setTokens(100);
          } catch (insertError) {
            console.error('Error creating profile:', insertError);
            toast({
              variant: "destructive",
              title: "Ошибка",
              description: "Не удалось создать профиль",
            });
          }
        }
      } catch (error: any) {
        console.error('Unexpected error:', error);
        // Don't show toast for network errors
        if (!error.message?.includes('Failed to fetch')) {
          toast({
            variant: "destructive",
            title: "Ошибка",
            description: error.message || "Произошла неожиданная ошибка",
          });
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