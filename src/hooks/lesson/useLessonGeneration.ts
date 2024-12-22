import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useLessonGeneration = () => {
  const { toast } = useToast();

  const generateLesson = async (lessonId: string) => {
    try {
      console.log('Calling generate-lesson with lessonId:', lessonId);
      
      const response = await supabase.functions.invoke('generate-lesson', {
        body: { lessonId },
      });

      if (response.error) {
        console.error('Error from generate-lesson:', response.error);
        // Try again with a direct prompt if lessonId approach fails
        const fallbackResponse = await supabase.functions.invoke('generate-lesson', {
          body: { 
            prompt: `Расскажи подробно про урок ${lessonId}, используя практические примеры и понятные объяснения.` 
          },
        });

        if (fallbackResponse.error) throw new Error(fallbackResponse.error.message);
        return fallbackResponse.data.text;
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