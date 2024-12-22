import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useLessonGeneration = () => {
  const { toast } = useToast();

  const generateLesson = async (lessonId: string) => {
    try {
      console.log('Calling generate-lesson-from-prompt with lessonId:', lessonId);
      
      const response = await supabase.functions.invoke('generate-lesson-from-prompt', {
        body: { lessonId }
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