import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useLessonGeneration = () => {
  const { toast } = useToast();

  const generateLesson = async (lessonId: string) => {
    try {
      console.log('Starting lesson generation for:', lessonId);
      
      // Step 1: Get the prompt
      console.log('Fetching prompt...');
      const promptResponse = await supabase.functions.invoke('get-lesson-prompt', {
        body: { lessonId }
      });

      if (promptResponse.error) {
        console.error('Error getting prompt:', promptResponse.error);
        throw new Error(`Failed to get lesson prompt: ${promptResponse.error.message}`);
      }

      if (!promptResponse.data?.prompt) {
        console.error('No prompt received:', promptResponse.data);
        throw new Error('No prompt received from server');
      }

      const prompt = promptResponse.data.prompt;
      console.log('Successfully received prompt:', prompt);

      // Step 2: Generate lesson content
      console.log('Generating lesson content...');
      const response = await supabase.functions.invoke('generate-lesson-from-prompt', {
        body: { 
          lessonId, 
          prompt 
        }
      });

      if (response.error) {
        console.error('Error generating lesson:', response.error);
        throw new Error(`Failed to generate lesson: ${response.error.message}`);
      }

      if (!response.data?.text) {
        console.error('No lesson text received:', response.data);
        throw new Error('No lesson content received from server');
      }

      console.log('Successfully generated lesson content');
      return response.data.text;

    } catch (error: any) {
      console.error('Error in generateLesson:', error);
      
      // Show a more user-friendly error message
      toast({
        variant: "destructive",
        title: "Ошибка при генерации урока",
        description: "Пожалуйста, попробуйте еще раз через несколько секунд",
      });
      
      throw error;
    }
  };

  return {
    generateLesson,
  };
};