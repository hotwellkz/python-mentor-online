import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const playPremiumVoice = async (text: string, setIsPremiumPlaying: (value: boolean) => void) => {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Пожалуйста, войдите в систему",
      });
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("tokens")
      .eq("id", user.id)
      .single();

    if (!profile || profile.tokens < 45) {
      toast({
        variant: "destructive",
        title: "Недостаточно токенов",
        description: "Для премиум озвучки необходимо 45 токенов",
      });
      return;
    }

    setIsPremiumPlaying(true);
    const response = await supabase.functions.invoke('text-to-speech', {
      body: { text },
    });

    if (response.error) throw new Error(response.error.message);

    const audioUrl = response.data.audioUrl;
    const audio = new Audio(audioUrl);
    
    audio.play();

    await supabase
      .from("profiles")
      .update({ tokens: profile.tokens - 45 })
      .eq("id", user.id);

  } catch (error: any) {
    toast({
      variant: "destructive",
      title: "Ошибка",
      description: error.message,
    });
  } finally {
    setIsPremiumPlaying(false);
  }
};