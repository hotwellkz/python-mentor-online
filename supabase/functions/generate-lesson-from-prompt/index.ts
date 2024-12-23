import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { Configuration, OpenAIApi } from 'https://esm.sh/openai@3.2.1';
import { Anthropic } from 'https://esm.sh/@anthropic-ai/sdk@0.4.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { lessonId } = await req.json();
    console.log('Getting prompt for lesson:', lessonId);

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Try to get saved prompt from database
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
      // Try Claude first
      const anthropic = new Anthropic({
        apiKey: Deno.env.get('ANTHROPIC_API_KEY'),
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

      // Fallback to OpenAI
      const configuration = new Configuration({
        apiKey: Deno.env.get('OPENAI_API_KEY'),
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
      JSON.stringify({ error: error.message, details: error.toString() }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
});