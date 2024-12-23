import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useLessonGeneration = () => {
  const { toast } = useToast();

  const generateLesson = async (lessonId: string) => {
    try {
      console.log('Getting prompt for lesson:', lessonId);
      
      // Сначала получаем промпт
      const promptResponse = await supabase.functions.invoke('get-lesson-prompt', {
        body: { lessonId }
      });

      if (promptResponse.error) {
        console.error('Error getting prompt:', promptResponse.error);
        throw new Error(promptResponse.error.message);
      }

      const prompt = promptResponse.data.prompt;
      console.log('Using prompt:', prompt);

      // Затем генерируем урок с полученным промптом
      const response = await supabase.functions.invoke('generate-lesson-from-prompt', {
        body: { lessonId, prompt }
      });

      if (response.error) {
        console.error('Error from generate-lesson-from-prompt:', response.error);
        throw new Error(response.error.message);
      }

      return response.data.text;
    } catch (error: any) {
      console.error('Error in generateLesson:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message,
      });
      throw error;
    }
  };

  return {
    generateLesson,
  };
};