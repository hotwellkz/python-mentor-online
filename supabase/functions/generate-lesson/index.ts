import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const blocks = [
  {
    title: "Введение в программирование и установка Python",
    lessons: [
      {
        title: "Знакомство с Python",
        prompt: `Расскажи подробно о языке Python:
          - Почему Python считается лучшим для начинающих
          - Какие компании используют Python
          - Сколько времени нужно на освоение базового Python
          - Средняя зарплата Python-разработчика в России
          - Какие направления разработки доступны
          Используй конкретные примеры и статистику.`
      },
      // ... остальные уроки блока 1
    ]
  },
  // ... остальные блоки
];

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
    console.log('Processing request for lesson:', lessonId);

    // Parse lesson ID (format: "1-1" means block 1, lesson 1)
    const [blockIndex, lessonIndex] = lessonId.split("-").map(Number);
    
    // Get the lesson prompt
    const block = blocks[blockIndex - 1];
    const lesson = block?.lessons[lessonIndex - 1];

    if (!block || !lesson) {
      console.error('Lesson not found:', lessonId);
      throw new Error(`Урок ${lessonId} не найден`);
    }

    console.log('Found lesson:', lesson.title);
    
    const messages = [
      {
        role: 'system',
        content: 'Вы - опытный преподаватель. Ваша задача - подробно объяснить тему урока, используя примеры и понятные объяснения. Используйте маркдаун для форматирования текста.'
      },
      { role: 'user', content: lesson.prompt }
    ];

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
      throw new Error(`Ошибка при генерации урока: ${errorData.error?.message || 'Неизвестная ошибка'}`);
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