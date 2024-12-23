import { useEffect, useState } from "react";
import { Coins } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const TokenDisplay = () => {
  const [tokens, setTokens] = useState<number | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        console.log('Fetching user data...');
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          console.log('No user found, clearing tokens');
          setTokens(null);
          return;
        }

        console.log('Fetching profile data...');
        const { data, error } = await supabase
          .from('profiles')
          .select('tokens')
          .eq('id', user.id)
          .maybeSingle();
        
        if (error) {
          console.error('Error fetching tokens:', error);
          
          // Network errors with retry mechanism
          if (error.message.includes('Failed to fetch') && retryCount < 3) {
            console.log(`Retrying... Attempt ${retryCount + 1}`);
            setRetryCount(prev => prev + 1);
            setTimeout(fetchTokens, 1000 * Math.pow(2, retryCount)); // Exponential backoff
            return;
          }
          
          // Only show toast for non-network errors
          if (!error.message.includes('Failed to fetch')) {
            toast({
              variant: "destructive",
              title: "Ошибка",
              description: "Не удалось загрузить токены",
            });
          }
          return;
        }

        if (data) {
          console.log('Profile data received:', data);
          setTokens(data.tokens);
          setRetryCount(0); // Reset retry count on success
        } else {
          console.log('No profile found, creating new profile');
          try {
            const { error: insertError } = await supabase
              .from('profiles')
              .insert([{ 
                id: user.id, 
                tokens: 100,
                updated_at: new Date().toISOString()
              }]);
            
            if (insertError) throw insertError;
            
            setTokens(100);
            setRetryCount(0); // Reset retry count on success
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
        setRetryCount(0); // Reset retry count on new session
        fetchTokens();
      } else if (event === 'SIGNED_OUT') {
        setTokens(null);
      }
    });

    return () => {
      authListener?.subscription.unsubscribe();
    };
  }, [retryCount]);

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