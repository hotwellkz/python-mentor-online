import { useState } from "react";

export const useLessonState = () => {
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPremiumPlaying, setIsPremiumPlaying] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userPrompt, setUserPrompt] = useState("");

  return {
    loading,
    setLoading,
    generatedText,
    setGeneratedText,
    isPlaying,
    setIsPlaying,
    isPremiumPlaying,
    setIsPremiumPlaying,
    showTest,
    setShowTest,
    isAuthenticated,
    setIsAuthenticated,
    userPrompt,
    setUserPrompt,
  };
};