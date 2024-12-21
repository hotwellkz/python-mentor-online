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

    return () => {
      if (synthesis && utterance) {
        synthesis.cancel();
      }
    };
  }, []);

  const cleanMarkdown = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
      .replace(/\*(.*?)\*/g, '$1') // Italic
      .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
      .replace(/#{1,6}\s/g, '') // Headers
      .replace(/`(.*?)`/g, '$1') // Code
      .replace(/\n\s*[-*+]\s/g, '\n') // Lists
      .replace(/\n\s*\d+\.\s/g, '\n') // Numbered lists
      .replace(/\n{2,}/g, '\n') // Multiple newlines
      .trim();
  };

  const playText = async (text: string, isPremium = false) => {
    const cleanText = cleanMarkdown(text);
    if (isPremium) {
      await playPremiumVoice(cleanText);
    } else {
      playBrowserVoice(cleanText);
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

    if (isPlaying) {
      synthesis.cancel();
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