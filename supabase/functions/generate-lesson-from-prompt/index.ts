import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
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
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders });
    }

    if (req.method !== 'POST') {
      throw new Error(`HTTP method ${req.method} is not allowed`);
    }

    console.log('Request received:', {
      method: req.method,
      headers: Object.fromEntries(req.headers.entries()),
    });

    const { lessonId } = await req.json();
    console.log('Getting prompt for lesson:', lessonId);

    if (!lessonId) {
      throw new Error('lessonId is required');
    }

    // Initialize Supabase client with error handling
    const supabaseUrl = Deno.env.get('SUPABASE_URL');
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    if (!supabaseUrl || !supabaseKey) {
      throw new Error('Missing Supabase configuration');
    }

    const supabaseClient = createClient(supabaseUrl, supabaseKey);

    // Try to get saved prompt from database with better error handling
    const { data: savedPrompt, error: dbError } = await supabaseClient
      .from('lesson_prompts')
      .select('prompt')
      .eq('lesson_id', lessonId)
      .maybeSingle();

    if (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }

    let prompt;
    if (savedPrompt?.prompt) {
      console.log('Using saved prompt from database');
      prompt = savedPrompt.prompt;
    } else {
      console.log('No saved prompt found, generating default prompt');
      if (lessonId.startsWith('pm-')) {
        const [, moduleIndex, lessonIndex] = lessonId.split('-').map(Number);
        prompt = `Расскажи подробно с примерами, как будто ты преподаватель и преподаешь курс под названием "Продукт-менеджмент" урок ${moduleIndex}-${lessonIndex}`;
      } else if (lessonId.startsWith('ba-')) {
        const [, blockIndex, lessonIndex] = lessonId.split('-').map(Number);
        prompt = `Расскажи подробно как будто ты преподаватель и преподаешь Курс Бизнес Аналитик урок ${blockIndex}-${lessonIndex}`;
      } else if (lessonId.startsWith('ds-')) {
        const [, blockIndex, lessonIndex] = lessonId.split('-').map(Number);
        prompt = `Расскажи подробно как будто ты преподаватель и преподаешь курс Data Science урок ${blockIndex}-${lessonIndex}`;
      } else {
        const [blockIndex, lessonIndex] = lessonId.split('-').map(Number);
        prompt = `Расскажи подробно как будто ты преподаватель и преподаешь Курс Python урок ${blockIndex}-${lessonIndex}`;
      }
    }

    console.log('Using prompt:', prompt);

    try {
      // Try Claude first with better error handling
      const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
      if (!anthropicApiKey) {
        throw new Error('Missing Anthropic API key');
      }

      const anthropic = new Anthropic({
        apiKey: anthropicApiKey,
      });

      console.log('Trying Claude...');
      const completion = await anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }],
      });

      console.log('Claude response received');
      return new Response(
        JSON.stringify({ text: completion.content[0].text }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      );
    } catch (error) {
      console.error('Claude error:', error);
      console.log('Falling back to OpenAI...');

      // Fallback to OpenAI with better error handling
      const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
      if (!openaiApiKey) {
        throw new Error('Missing OpenAI API key');
      }

      const configuration = new Configuration({
        apiKey: openaiApiKey,
      });
      const openai = new OpenAIApi(configuration);

      const completion = await openai.createChatCompletion({
        model: 'gpt-4',
        messages: [{ role: 'user', content: prompt }],
      });

      console.log('OpenAI response received');
      return new Response(
        JSON.stringify({ text: completion.data.choices[0].message?.content }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      );
    }
  } catch (error) {
    console.error('Error in generate-lesson-from-prompt:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message, 
        details: error.toString(),
        stack: error.stack 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
});