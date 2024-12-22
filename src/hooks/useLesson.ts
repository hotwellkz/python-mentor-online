import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useLessonState } from "./lesson/useLessonState";
import { useLessonProgress } from "./lesson/useLessonProgress";
import { useLessonGeneration } from "./lesson/useLessonGeneration";

export const useLesson = (lessonId: string | undefined) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    loading, setLoading,
    generatedText, setGeneratedText,
    isPlaying, isPremiumPlaying,
    showTest, setShowTest,
    isAuthenticated, setIsAuthenticated,
    userPrompt, setUserPrompt,
  } = useLessonState();

  const { loadLessonProgress, saveLessonProgress } = useLessonProgress(lessonId);
  const { generateLesson } = useLessonGeneration();

  useEffect(() => {
    checkAuth();
    loadInitialProgress();
  }, [lessonId]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  const loadInitialProgress = async () => {
    const savedText = await loadLessonProgress();
    if (savedText) {
      setGeneratedText(savedText);
    }
  };

  const startLesson = async () => {
    if (!lessonId) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "ID урока не указан",
      });
      return;
    }

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
      const generatedText = await generateLesson(lessonId);
      setGeneratedText(generatedText);
      await saveLessonProgress(generatedText);

      await supabase
        .from("profiles")
        .update({ tokens: profile.tokens - 5 })
        .eq("id", user.id);

    } catch (error: any) {
      console.error('Error in startLesson:', error);
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
      if (!user || !lessonId) return;

      // Delete lesson progress
      await supabase
        .from('lesson_progress')
        .delete()
        .eq('lesson_id', lessonId)
        .eq('user_id', user.id);

      // Determine which table to use based on lesson type
      const progressTable = lessonId?.startsWith('devops-') 
        ? 'devops_progress' as const
        : lessonId?.startsWith('ba-') 
          ? 'business_analyst_progress' as const
          : 'completed_lessons' as const;

      // Проверяем, существует ли уже запись о завершении урока
      const { data: existingProgress } = await supabase
        .from(progressTable)
        .select('id')
        .eq('user_id', user.id)
        .eq('lesson_id', lessonId)
        .single();

      // Если записи нет, создаем новую
      if (!existingProgress) {
        await supabase
          .from(progressTable)
          .insert([
            { user_id: user.id, lesson_id: lessonId }
          ]);
      }

      // Navigate to appropriate program page
      if (lessonId?.startsWith('devops-')) {
        navigate("/devops-program");
      } else if (lessonId?.startsWith('ba-')) {
        navigate("/business-analyst-program");
      } else {
        navigate("/program");
      }

      toast({
        title: "Урок завершен",
        description: "Поздравляем! Вы успешно завершили урок.",
      });
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