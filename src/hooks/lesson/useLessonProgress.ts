import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useLessonProgress = (lessonId: string | undefined) => {
  const { toast } = useToast();

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

      return progress?.generated_text;
    } catch (error) {
      console.error('Error loading lesson progress:', error);
      return null;
    }
  };

  const saveLessonProgress = async (text: string) => {
    if (!lessonId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('lesson_progress')
        .upsert(
          {
            user_id: user.id,
            lesson_id: lessonId,
            generated_text: text,
            updated_at: new Date().toISOString()
          },
          {
            onConflict: 'user_id,lesson_id'
          }
        );

      if (error) throw error;
    } catch (error) {
      console.error('Error saving lesson progress:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось сохранить прогресс урока",
      });
    }
  };

  return {
    loadLessonProgress,
    saveLessonProgress,
  };
};