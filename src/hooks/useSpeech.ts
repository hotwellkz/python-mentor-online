import { useState, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { cleanMarkdown } from "./speech/voiceUtils";
import { playPremiumVoice } from "./speech/supabaseUtils";
import { createUtterance, speakUtterance } from "./speech/browserSpeechUtils";

export const useSpeech = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPremiumPlaying, setIsPremiumPlaying] = useState(false);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [isPaused, setIsPaused] = useState(false);

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

  const playText = async (text: string, isPremium = false) => {
    const cleanText = cleanMarkdown(text);
    if (isPremium) {
      await playPremiumVoice(cleanText, setIsPremiumPlaying);
    } else {
      playBrowserVoice(cleanText);
    }
  };

  const stopPlayback = () => {
    if (synthesis) {
      synthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      setUtterance(null);
    }
  };

  const togglePlayback = () => {
    if (!synthesis) return;

    if (isPlaying && !isPaused) {
      synthesis.pause();
      setIsPaused(true);
    } else if (isPaused) {
      synthesis.resume();
      setIsPaused(false);
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

    if (isPlaying && !isPaused) {
      synthesis.pause();
      setIsPaused(true);
      return;
    }

    if (isPaused) {
      synthesis.resume();
      setIsPaused(false);
      return;
    }

    if (synthesis.getVoices().length === 0) {
      synthesis.addEventListener('voiceschanged', () => {
        const newUtterance = createUtterance(text, setIsPlaying, setIsPaused, setUtterance);
        speakUtterance(newUtterance, synthesis, setUtterance, setIsPlaying, setIsPaused);
      }, { once: true });
    } else {
      const newUtterance = createUtterance(text, setIsPlaying, setIsPaused, setUtterance);
      speakUtterance(newUtterance, synthesis, setUtterance, setIsPlaying, setIsPaused);
    }
  };

  return {
    isPlaying,
    isPremiumPlaying,
    isPaused,
    synthesis,
    setSynthesis,
    playText,
    stopPlayback,
    togglePlayback,
  };
};