import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useSpeech = () => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPremiumPlaying, setIsPremiumPlaying] = useState(false);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (window.speechSynthesis) {
      setSynthesis(window.speechSynthesis);
    }
  }, []);

  const playText = async (text: string, isPremium = false) => {
    if (isPremium) {
      await playPremiumVoice(text);
    } else {
      playBrowserVoice(text);
    }
  };

  const playBrowserVoice = (text: string) => {
    if (!synthesis) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Синтез речи недоступен в вашем браузере",
      });
      return;
    }

    // Stop any currently playing speech
    synthesis.cancel();
    
    if (isPlaying) {
      setIsPlaying(false);
      setUtterance(null);
      return;
    }

    const newUtterance = new SpeechSynthesisUtterance(text);
    newUtterance.lang = "ru-RU";
    newUtterance.rate = 0.9;
    
    newUtterance.onend = () => {
      setIsPlaying(false);
      setUtterance(null);
    };

    newUtterance.onerror = (event) => {
      console.error('Speech synthesis error:', event);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Произошла ошибка при озвучивании текста",
      });
      setIsPlaying(false);
      setUtterance(null);
    };

    setUtterance(newUtterance);
    setIsPlaying(true);
    synthesis.speak(newUtterance);
  };

  const playPremiumVoice = async (text: string) => {
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

  return {
    isPlaying,
    isPremiumPlaying,
    synthesis,
    setSynthesis,
    playText,
  };
};