import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useLessonGeneration = () => {
  const { toast } = useToast();

  const generateLesson = async (lessonId: string) => {
    try {
      console.log('Starting lesson generation for:', lessonId);
      
      // Step 1: Get the prompt
      console.log('Fetching prompt...');
      const { data: promptData, error: promptError } = await supabase
        .from('lesson_prompts')
        .select('prompt')
        .eq('lesson_id', lessonId)
        .maybeSingle();

      if (promptError) {
        console.error('Error getting prompt from database:', promptError);
        throw new Error(`Failed to get lesson prompt: ${promptError.message}`);
      }

      // If no saved prompt found, get default prompt
      let prompt;
      if (promptData?.prompt) {
        prompt = promptData.prompt;
        console.log('Using saved prompt:', prompt);
      } else {
        console.log('No saved prompt found, getting default prompt...');
        const response = await supabase.functions.invoke('get-lesson-prompt', {
          body: { lessonId }
        });

        if (response.error) {
          console.error('Error getting default prompt:', response.error);
          throw new Error(`Failed to get default prompt: ${response.error.message}`);
        }

        prompt = response.data?.prompt;
        if (!prompt) {
          console.error('No prompt received:', response.data);
          throw new Error('No prompt received from server');
        }
        console.log('Using default prompt:', prompt);
      }

      // Step 2: Generate lesson content
      console.log('Generating lesson content...');
      
      // First try with direct database call to OpenAI
      try {
        const { data: openAiResponse, error: openAiError } = await supabase.functions.invoke(
          'generate-lesson',
          {
            body: { prompt },
            headers: {
              'Content-Type': 'application/json',
              'Cache-Control': 'no-cache'
            }
          }
        );

        if (!openAiError && openAiResponse?.text) {
          console.log('Successfully generated lesson content using OpenAI');
          return openAiResponse.text;
        }
      } catch (openAiError) {
        console.log('OpenAI generation failed, trying Claude...', openAiError);
      }

      // Fallback to Claude
      const claudeResponse = await supabase.functions.invoke(
        'generate-lesson-from-prompt',
        {
          body: { 
            lessonId,
            prompt 
          },
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache'
          }
        }
      );

      if (claudeResponse.error) {
        console.error('Error generating lesson with Claude:', claudeResponse.error);
        throw new Error(`Failed to generate lesson: ${claudeResponse.error.message}`);
      }

      if (!claudeResponse.data?.text) {
        console.error('No lesson text received:', claudeResponse.data);
        throw new Error('No lesson content received from server');
      }

      console.log('Successfully generated lesson content using Claude');
      return claudeResponse.data.text;

    } catch (error: any) {
      console.error('Error in generateLesson:', error);
      
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