import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.2.1';
import { Anthropic } from 'https://esm.sh/@anthropic-ai/sdk@0.4.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Max-Age': '86400',
};

serve(async (req) => {
  try {
    // Обработка CORS preflight запросов
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders });
    }

    if (req.method !== 'POST') {
      throw new Error(`HTTP метод ${req.method} не разрешен`);
    }

    console.log('Получен запрос:', {
      method: req.method,
      headers: Object.fromEntries(req.headers.entries()),
    });

    const { lessonId, prompt } = await req.json();
    console.log('Генерация урока для:', lessonId);
    console.log('Используется промпт:', prompt);

    if (!lessonId || !prompt) {
      throw new Error('lessonId и prompt обязательны');
    }

    try {
      // Сначала пробуем Claude
      const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
      if (!anthropicApiKey) {
        throw new Error('Отсутствует Anthropic API ключ');
      }

      const anthropic = new Anthropic({
        apiKey: anthropicApiKey,
      });

      console.log('Пробуем Claude...');
      const completion = await anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }).catch(error => {
        console.error('Ошибка при вызове Claude API:', error);
        throw error;
      });

      console.log('Получен ответ от Claude');
      return new Response(
        JSON.stringify({ text: completion.content[0].text }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      );
    } catch (error) {
      console.error('Ошибка Claude:', error);
      console.log('Переключаемся на OpenAI...');

      // Fallback на OpenAI
      const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
      if (!openaiApiKey) {
        throw new Error('Отсутствует OpenAI API ключ');
      }

      const configuration = new Configuration({
        apiKey: openaiApiKey,
      });
      const openai = new OpenAIApi(configuration);

      const completion = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      }).catch(error => {
        console.error('Ошибка при вызове OpenAI API:', error);
        throw error;
      });

      console.log('Получен ответ от OpenAI');
      return new Response(
        JSON.stringify({ text: completion.data.choices[0].message?.content }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      );
    }
  } catch (error) {
    console.error('Ошибка в generate-lesson-from-prompt:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message, 
        details: error.toString(),
        stack: error.stack 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: error.status || 500,
      },
    );
  }
});