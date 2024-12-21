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
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/\[(.*?)\]\(.*?\)/g, '$1')
      .replace(/#{1,6}\s/g, '')
      .replace(/`(.*?)`/g, '$1')
      .replace(/<[^>]*>/g, '')
      .replace(/\n\s*[-*+]\s/g, '\n')
      .replace(/\n\s*\d+\.\s/g, '\n')
      .replace(/\n{2,}/g, '\n')
      .trim();
  };

  const getMaleVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    // Try to find a Russian male voice
    const russianMaleVoice = voices.find(voice => 
      voice.lang.startsWith('ru') && voice.name.toLowerCase().includes('male')
    );
    // If no Russian male voice found, try to find any Russian voice
    const russianVoice = voices.find(voice => voice.lang.startsWith('ru'));
    // If no Russian voice found, try to find any male voice
    const maleVoice = voices.find(voice => 
      voice.name.toLowerCase().includes('male')
    );
    // Return the first available option or undefined
    return russianMaleVoice || russianVoice || maleVoice || voices[0];
  };

  const playText = async (text: string, isPremium = false) => {
    const cleanText = cleanMarkdown(text);
    if (isPremium) {
      await playPremiumVoice(cleanText);
    } else {
      playBrowserVoice(cleanText);
    }
  };

  const stopPlayback = () => {
    if (synthesis) {
      synthesis.cancel();
      setIsPlaying(false);
      setUtterance(null);
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

    // Wait for voices to be loaded
    if (synthesis.getVoices().length === 0) {
      synthesis.addEventListener('voiceschanged', () => {
        const newUtterance = createUtterance(text);
        speakUtterance(newUtterance);
      }, { once: true });
    } else {
      const newUtterance = createUtterance(text);
      speakUtterance(newUtterance);
    }
  };

  const createUtterance = (text: string) => {
    const newUtterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = getMaleVoice();
    
    if (selectedVoice) {
      newUtterance.voice = selectedVoice;
    }
    
    newUtterance.lang = "ru-RU";
    newUtterance.rate = 0.9;
    newUtterance.pitch = 0.9; // Slightly lower pitch for more masculine sound
    
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

    return newUtterance;
  };

  const speakUtterance = (newUtterance: SpeechSynthesisUtterance) => {
    setUtterance(newUtterance);
    setIsPlaying(true);
    synthesis?.speak(newUtterance);
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
    stopPlayback,
  };
};