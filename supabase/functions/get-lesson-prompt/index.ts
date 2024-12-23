import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { productManagementBlocks } from './productManagementData.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  console.log('Function called with method:', req.method);
  
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
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
    }

    // If we have a saved prompt, return it
    if (savedPrompt) {
      console.log('Found saved prompt');
      return new Response(
        JSON.stringify({ prompt: savedPrompt.prompt }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      );
    }

    // If no saved prompt, generate default one
    let defaultPrompt = "";
    if (lessonId.startsWith('ba-')) {
      const [, blockIndex, lessonIndex] = lessonId.split("-").map(Number);
      defaultPrompt = `Расскажи подробно как будто ты преподаватель и преподаеш Курс Бизнес Аналитик урок ${blockIndex}-${lessonIndex}`;
    } else if (lessonId.startsWith('devops-')) {
      const [, moduleIndex, topicIndex] = lessonId.split("-").map(Number);
      defaultPrompt = `Расскажи подробно как будто ты преподаватель и преподаеш курс DevOps-инженер PRO, урок ${moduleIndex}-${topicIndex}`;
    } else if (lessonId.startsWith('ds-')) {
      const [, blockIndex, lessonIndex] = lessonId.split("-").map(Number);
      defaultPrompt = `Расскажи подробно как будто ты преподаватель и преподаеш курс Data Science урок ${blockIndex}-${lessonIndex}`;
    } else if (lessonId.startsWith('pm-')) {
      const [, blockIndex, lessonIndex] = lessonId.split("-").map(Number);
      const block = productManagementBlocks[blockIndex - 1];
      const lesson = block?.lessons[lessonIndex - 1];
      
      if (lesson) {
        const topics = lesson.topics.join(", ");
        defaultPrompt = `Расскажи подробно с примерами, как будто ты преподаватель и преподаеш курс под названием "Продукт-менеджмент" урок на тему: "${lesson.title}", подтемы: "${topics}"`;
      } else {
        defaultPrompt = `Расскажи подробно с примерами, как будто ты преподаватель и преподаеш курс под названием "Продукт-менеджмент" урок ${blockIndex}-${lessonIndex}`;
      }
    } else {
      const [blockIndex, lessonIndex] = lessonId.split("-").map(Number);
      defaultPrompt = `Расскажи подробно как будто ты преподаватель и преподаеш Курс Python урок ${blockIndex}-${lessonIndex}`;
    }

    console.log('Generated default prompt');
    return new Response(
      JSON.stringify({ prompt: defaultPrompt }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error in get-lesson-prompt:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
});