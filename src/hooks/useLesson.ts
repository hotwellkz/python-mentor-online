import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const useLesson = (lessonId: string | undefined) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [generatedText, setGeneratedText] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPremiumPlaying, setIsPremiumPlaying] = useState(false);
  const [showTest, setShowTest] = useState(false);
  const [synthesis, setSynthesis] = useState<SpeechSynthesis | null>(null);
  const [utterance, setUtterance] = useState<SpeechSynthesisUtterance | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [userPrompt, setUserPrompt] = useState("");

  useEffect(() => {
    setSynthesis(window.speechSynthesis);
    checkAuth();
    loadLessonProgress();
  }, [lessonId]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const loadLessonProgress = async () => {
    if (!lessonId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: progress } = await supabase
        .from('lesson_progress')
        .select('*')
        .eq('lesson_id', lessonId)
        .eq('user_id', user.id)
        .maybeSingle();

      if (progress?.generated_text) {
        setGeneratedText(progress.generated_text);
      }
    } catch (error) {
      console.error('Error loading lesson progress:', error);
    }
  };

  const saveLessonProgress = async (text: string) => {
    if (!lessonId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('lesson_progress')
        .upsert({
          user_id: user.id,
          lesson_id: lessonId,
          generated_text: text,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,lesson_id'
        });

      if (error) throw error;
    } catch (error) {
      console.error('Error saving lesson progress:', error);
    }
  };

  const startLesson = async () => {
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

      if (!profile || profile.tokens < 5) {
        toast({
          variant: "destructive",
          title: "Недостаточно токенов",
          description: "Для начала урока необходимо 5 токенов",
        });
        return;
      }

      setLoading(true);
      const response = await supabase.functions.invoke('generate-lesson', {
        body: { lessonId },
      });

      if (response.error) throw new Error(response.error.message);
      const generatedText = response.data.text;
      setGeneratedText(generatedText);
      await saveLessonProgress(generatedText);

      await supabase
        .from("profiles")
        .update({ tokens: profile.tokens - 5 })
        .eq("id", user.id);

    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const finishLesson = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Delete lesson progress
      await supabase
        .from('lesson_progress')
        .delete()
        .eq('lesson_id', lessonId)
        .eq('user_id', user.id);

      // Mark lesson as completed
      await supabase
        .from('completed_lessons')
        .insert([
          { user_id: user.id, lesson_id: lessonId }
        ]);

      navigate("/program");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
    }
  };

  return {
    loading,
    generatedText,
    isPlaying,
    isPremiumPlaying,
    showTest,
    setShowTest,
    isAuthenticated,
    userPrompt,
    setUserPrompt,
    startLesson,
    finishLesson,
  };
};