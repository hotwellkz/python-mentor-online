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
      }).catch(error => {
        console.error('Error in get-lesson-prompt:', error);
        throw new Error(`Ошибка при получении промпта: ${error.message}`);
      });

      if (promptResponse.error) {
        console.error('Error getting prompt:', promptResponse.error);
        throw new Error(promptResponse.error.message);
      }

      const prompt = promptResponse.data.prompt;
      console.log('Using prompt:', prompt);

      // Затем генерируем урок с полученным промптом
      const response = await supabase.functions.invoke('generate-lesson-from-prompt', {
        body: { 
          lessonId, 
          prompt 
        },
        headers: {
          'Content-Type': 'application/json'
        }
      }).catch(error => {
        console.error('Error in generate-lesson-from-prompt:', error);
        throw new Error(`Ошибка при генерации урока: ${error.message}`);
      });

      if (response.error) {
        console.error('Error from generate-lesson-from-prompt:', response.error);
        throw new Error(response.error.message);
      }

      if (!response.data?.text) {
        throw new Error('Не получен текст урока от API');
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