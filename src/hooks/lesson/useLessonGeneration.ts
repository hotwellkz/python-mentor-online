import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useLessonGeneration = () => {
  const { toast } = useToast();

  const generateLesson = async (lessonId: string) => {
    try {
      console.log('Calling generate-lesson with lessonId:', lessonId);
      
      // First try to get custom prompt from lesson_prompts table
      const { data: savedPrompt } = await supabase
        .from('lesson_prompts')
        .select('prompt')
        .eq('lesson_id', lessonId)
        .maybeSingle();

      // Use saved prompt if exists, otherwise use default prompt
      const promptToUse = savedPrompt?.prompt;
      
      const response = await supabase.functions.invoke('generate-lesson', {
        body: { 
          lessonId,
          customPrompt: promptToUse // Pass the custom prompt if it exists
        },
      });

      if (response.error) {
        console.error('Error from generate-lesson:', response.error);
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