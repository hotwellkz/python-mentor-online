import { useState, useEffect, useRef } from "react";
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
  const [currentText, setCurrentText] = useState<string>("");
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (window.speechSynthesis) {
      setSynthesis(window.speechSynthesis);
    }

    return () => {
      if (synthesis) {
        synthesis.cancel();
      }
    };
  }, []);

  const playText = async (text: string, isPremium = false) => {
    const cleanText = cleanMarkdown(text);
    if (isPremium) {
      await playPremiumVoice(cleanText, setIsPremiumPlaying);
    } else {
      setCurrentText(cleanText);
      playBrowserVoice(cleanText);
    }
  };

  const stopPlayback = () => {
    if (synthesis) {
      synthesis.cancel();
      setIsPlaying(false);
      setIsPaused(false);
      setUtterance(null);
      currentUtteranceRef.current = null;
      setCurrentText("");
    }
  };

  const togglePlayback = () => {
    if (!synthesis) return;

    if (isPlaying && !isPaused) {
      synthesis.pause();
      setIsPaused(true);
    } else if (isPaused && currentUtteranceRef.current) {
      synthesis.resume();
      setIsPaused(false);
    } else if (currentText) {
      if (currentUtteranceRef.current) {
        synthesis.cancel();
      }
      playBrowserVoice(currentText);
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

    if (synthesis.getVoices().length === 0) {
      synthesis.addEventListener('voiceschanged', () => {
        const newUtterance = createUtterance(text, setIsPlaying, setIsPaused, setUtterance);
        currentUtteranceRef.current = newUtterance;
        speakUtterance(newUtterance, synthesis, setUtterance, setIsPlaying, setIsPaused);
      }, { once: true });
    } else {
      const newUtterance = createUtterance(text, setIsPlaying, setIsPaused, setUtterance);
      currentUtteranceRef.current = newUtterance;
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