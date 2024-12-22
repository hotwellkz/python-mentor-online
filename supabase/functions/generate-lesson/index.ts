import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getPythonLessonPrompt } from "./prompts/python.ts";
import { getDevOpsLessonPrompt } from "./prompts/devops.ts";
import { getBusinessAnalystLessonPrompt } from "./prompts/business-analyst.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('Function called with method:', req.method);
  
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      throw new Error('OpenAI API key not configured');
    }

    const { lessonId, prompt } = await req.json();
    console.log('Processing request for:', { lessonId, hasPrompt: !!prompt });

    let messages = [];
    let lessonPrompt;

    try {
      if (lessonId.startsWith('ba-')) {
        lessonPrompt = getBusinessAnalystLessonPrompt(lessonId);
      } else if (lessonId.startsWith('devops-')) {
        lessonPrompt = getDevOpsLessonPrompt(lessonId);
      } else {
        lessonPrompt = getPythonLessonPrompt(lessonId);
      }

      if (!lessonPrompt) {
        console.error('No prompt generated for lesson:', lessonId);
        throw new Error(`Не удалось сгенерировать промпт для урока ${lessonId}`);
      }

      console.log('Successfully generated prompt for lesson:', lessonId);
      
      messages = [
        {
          role: 'system',
          content: 'Вы - опытный преподаватель. Ваша задача - подробно объяснить тему урока, используя примеры и понятные объяснения. Используйте маркдаун для форматирования текста.'
        },
        { role: 'user', content: lessonPrompt }
      ];
    } catch (error) {
      console.error('Error generating lesson prompt:', error);
      return new Response(JSON.stringify({ 
        error: `Урок ${lessonId} не найден или произошла ошибка при генерации промпта. Пожалуйста, проверьте правильность ID урока.` 
      }), {
        status: 404,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Making request to OpenAI API...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: messages,
        max_tokens: 2500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', response.status, response.statusText, errorData);
      
      return new Response(JSON.stringify({ 
        error: `Ошибка при генерации урока: ${errorData.error?.message || 'Неизвестная ошибка'}` 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const data = await response.json();
    console.log('OpenAI response received');
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Некорректный ответ от OpenAI API');
    }

    const generatedText = data.choices[0].message.content;

    return new Response(JSON.stringify({ 
      text: generatedText 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-lesson function:', error);
    return new Response(JSON.stringify({ 
      error: `Произошла ошибка при генерации урока: ${error.message}` 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});