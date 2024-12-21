import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useSpeech = () => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPremiumPlaying, setIsPremiumPlaying] = useState(false);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);

  const playText = (text: string, isPremium = false) => {
    if (isPremium) {
      playPremiumVoice(text);
    } else {
      playBrowserVoice(text);
    }
  };

  const playBrowserVoice = (text: string) => {
    if (synthesis && !isPlaying) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = "ru-RU";
      utterance.rate = 0.9;
      setUtterance(utterance);
      setIsPlaying(true);
      synthesis.speak(utterance);

      utterance.onend = () => {
        setIsPlaying(false);
        setUtterance(null);
      };
    }
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
      const response = await fetch("/functions/v1/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) throw new Error("Ошибка при генерации аудио");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      const downloadLink = document.createElement('a');
      downloadLink.href = audioUrl;
      downloadLink.download = 'lesson-audio.mp3';
      downloadLink.click();

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