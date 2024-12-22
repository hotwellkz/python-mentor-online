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

    const { lessonId } = await req.json();
    if (!lessonId) {
      throw new Error('Не указан ID урока');
    }
    
    console.log('Processing request for lesson:', lessonId);

    let prompt: string;
    try {
      if (lessonId.startsWith('ba-')) {
        prompt = getBusinessAnalystLessonPrompt(lessonId);
      } else if (lessonId.startsWith('devops-')) {
        prompt = getDevOpsLessonPrompt(lessonId);
      } else {
        prompt = getPythonLessonPrompt(lessonId);
      }
    } catch (error) {
      console.error('Error getting lesson prompt:', error);
      throw new Error(`Урок ${lessonId} не найден`);
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
        messages: [
          {
            role: 'system',
            content: 'Вы - опытный преподаватель. Ваша задача - подробно объяснить тему урока, используя примеры и понятные объяснения. Используйте маркдаун для форматирования текста.'
          },
          { role: 'user', content: prompt }
        ],
        max_tokens: 2500,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API error:', response.status, response.statusText, errorData);
      throw new Error(`Ошибка при генерации урока: ${errorData.error?.message || 'Неизвестная ошибка'}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');
    
    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Некорректный ответ от OpenAI API');
    }

    return new Response(JSON.stringify({ 
      text: data.choices[0].message.content 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-lesson function:', error);
    return new Response(JSON.stringify({ 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});