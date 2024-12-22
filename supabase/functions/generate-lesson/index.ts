import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getPythonLessonPrompt } from "./prompts/python.ts";
import { getDevOpsLessonPrompt } from "./prompts/devops.ts";
import { getBusinessAnalystLessonPrompt } from "./prompts/business-analyst.ts";
import { cleanText } from "./textFormatter.ts";

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
    const { lessonId, prompt } = await req.json();
    console.log('Generating lesson for:', lessonId, 'with prompt:', prompt);

    if (!openAIApiKey) {
      console.error('OpenAI API key not found');
      throw new Error('OpenAI API key not configured');
    }

    let messages = [];
    if (prompt) {
      messages = [
        {
          role: 'system',
          content: 'Вы - опытный преподаватель Python и DevOps. Ваша задача - подробно и понятно отвечать на вопросы ученика, используя примеры кода и команд где это уместно. Отвечайте четко и по существу. Используйте маркдаун для форматирования текста: заголовки через #, жирный текст через **, курсив через *, блоки кода через ```, списки через - или 1., 2. и т.д.'
        },
        { role: 'user', content: prompt }
      ];
    } else if (lessonId?.startsWith('ba-')) {
      const baPrompt = getBusinessAnalystLessonPrompt(lessonId);
      messages = [
        {
          role: 'system',
          content: 'Вы - опытный преподаватель бизнес-анализа. Ваша задача - подробно объяснить тему урока, используя примеры и понятные объяснения. Используйте маркдаун для форматирования текста.'
        },
        { role: 'user', content: baPrompt }
      ];
    } else if (lessonId?.startsWith('devops-')) {
      const devOpsPrompt = getDevOpsLessonPrompt(lessonId);
      messages = [
        {
          role: 'system',
          content: 'Вы - опытный преподаватель DevOps. Ваша задача - подробно объяснить тему урока, используя примеры и понятные объяснения. Используйте маркдаун для форматирования текста.'
        },
        { role: 'user', content: devOpsPrompt }
      ];
    } else {
      // Python lesson
      const pythonPrompt = getPythonLessonPrompt(lessonId);
      messages = [
        {
          role: 'system',
          content: 'Вы - опытный преподаватель Python. Ваша задача - подробно объяснить тему урока, используя примеры и понятные объяснения. Используйте маркдаун для форматирования текста.'
        },
        { role: 'user', content: pythonPrompt }
      ];
    }

    console.log('Making request to OpenAI API...');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
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
    const cleanedText = cleanText(generatedText);

    return new Response(JSON.stringify({ 
      text: cleanedText 
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