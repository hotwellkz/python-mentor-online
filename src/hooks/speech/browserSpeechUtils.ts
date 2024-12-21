import { toast } from "@/hooks/use-toast";
import { getMaleVoice } from "./voiceUtils";

export const createUtterance = (
  text: string,
  setIsPlaying: (value: boolean) => void,
  setIsPaused: (value: boolean) => void,
  setUtterance: (utterance: SpeechSynthesisUtterance | null) => void
) => {
  const newUtterance = new SpeechSynthesisUtterance(text);
  const selectedVoice = getMaleVoice();
  
  if (selectedVoice) {
    newUtterance.voice = selectedVoice;
  }
  
  newUtterance.lang = "ru-RU";
  newUtterance.rate = 0.9;
  newUtterance.pitch = 0.9;
  
  newUtterance.onend = () => {
    setIsPlaying(false);
    setIsPaused(false);
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
    setIsPaused(false);
    setUtterance(null);
  };

  return newUtterance;
};

export const speakUtterance = (
  newUtterance: SpeechSynthesisUtterance,
  synthesis: SpeechSynthesis,
  setUtterance: (utterance: SpeechSynthesisUtterance | null) => void,
  setIsPlaying: (value: boolean) => void,
  setIsPaused: (value: boolean) => void
) => {
  setUtterance(newUtterance);
  setIsPlaying(true);
  setIsPaused(false);
  synthesis.speak(newUtterance);
};