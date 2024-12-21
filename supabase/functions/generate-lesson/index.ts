import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const cleanMarkdown = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
    .replace(/\*(.*?)\*/g, '$1') // Italic
    .replace(/\[(.*?)\]\(.*?\)/g, '$1') // Links
    .replace(/#{1,6}\s/g, '') // Headers
    .replace(/`(.*?)`/g, '$1') // Code
    .replace(/<[^>]*>/g, '') // HTML tags
    .replace(/\n\s*[-*+]\s/g, '\n') // Lists
    .replace(/\n\s*\d+\.\s/g, '\n') // Numbered lists
    .replace(/\n{2,}/g, '\n') // Multiple newlines
    .trim();
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
          content: 'Вы - опытный преподаватель Python. Ваша задача - подробно и понятно отвечать на вопросы ученика, используя примеры кода где это уместно. Отвечайте четко и по существу.'
        },
        { role: 'user', content: prompt }
      ];
    } else {
      messages = [
        {
          role: 'system',
          content: 'Вы - опытный преподаватель Python. Ваша задача - подробно объяснить тему урока, используя примеры и понятные объяснения. Форматируйте текст, используя HTML-теги для лучшей читаемости.'
        },
        {
          role: 'user',
          content: 'Расскажи подробно как будто ты преподаватель и преподаешь Курс Python урок на тему: "Переменные и типы данных: Типы данных: int, float, str, bool., Создание и вывод переменных." Используй много примеров кода.'
        }
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
        model: 'gpt-4o',
        messages: messages,
      }),
    });

    if (!response.ok) {
      console.error('OpenAI API error:', response.status, response.statusText);
      throw new Error('Error calling OpenAI API');
    }

    const data = await response.json();
    console.log('OpenAI response received');
    
    const generatedText = data.choices[0].message.content;
    const cleanedText = cleanMarkdown(generatedText);

    return new Response(JSON.stringify({ 
      text: cleanedText 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in generate-lesson function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});