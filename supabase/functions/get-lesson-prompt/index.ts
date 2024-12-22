import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

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

    // Здесь будет логика получения промпта из соответствующего файла
    // В зависимости от типа урока (Python, DevOps, BA)
    let prompt = "";
    
    if (lessonId.startsWith('ba-')) {
      const [, blockIndex, lessonIndex] = lessonId.split("-").map(Number);
      prompt = `Расскажи подробно как будто ты преподаватель и преподаеш Курс Бизнес Аналитик урок ${blockIndex}-${lessonIndex}`;
    } else if (lessonId.startsWith('devops-')) {
      const [, moduleIndex, topicIndex] = lessonId.split("-").map(Number);
      prompt = `Расскажи подробно как будто ты преподаватель и преподаеш курс DevOps-инженер PRO, урок ${moduleIndex}-${topicIndex}`;
    } else {
      const [blockIndex, lessonIndex] = lessonId.split("-").map(Number);
      prompt = `Расскажи подробно как будто ты преподаватель и преподаеш Курс Python урок ${blockIndex}-${lessonIndex}`;
    }

    console.log('Generated prompt:', prompt);

    return new Response(
      JSON.stringify({ prompt }),
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