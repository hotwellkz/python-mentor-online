import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');

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

    // Get saved prompt from database
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
      // Generate default prompt for product management lessons
      if (lessonId.startsWith('pm-')) {
        const [, moduleIndex, lessonIndex] = lessonId.split('-').map(Number);
        
        // Get module data from database
        const { data: moduleData, error: moduleError } = await supabaseClient
          .from('lesson_prompts')
          .select('prompt')
          .eq('lesson_id', `pm-module-${moduleIndex}`)
          .maybeSingle();

        if (moduleError) {
          console.error('Error fetching module data:', moduleError);
          throw moduleError;
        }

        if (!moduleData) {
          console.log('Generating default product management prompt');
          prompt = `Расскажи подробно с примерами, как будто ты преподаватель и преподаешь курс под названием "Продукт-менеджмент" урок ${moduleIndex}-${lessonIndex}`;
        } else {
          prompt = moduleData.prompt;
        }
      } else {
        throw new Error('No prompt found for this lesson');
      }
    }

    console.log('Using prompt:', prompt);

    try {
      console.log('Attempting to use OpenAI...');
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an experienced teacher creating detailed, engaging lessons.'
            },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 2500,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('OpenAI response received successfully');
      
      return new Response(
        JSON.stringify({ text: data.choices[0].message.content }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );

    } catch (openAIError) {
      console.error('OpenAI error, falling back to Anthropic:', openAIError);
      
      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': anthropicApiKey,
          'anthropic-version': '2023-06-01',
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          model: 'claude-3-opus-20240229',
          max_tokens: 4096,
          messages: [{
            role: 'user',
            content: prompt
          }],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`Anthropic API error: ${response.status}`);
      }

      const data = await response.json();
      console.log('Anthropic response received successfully');
      
      return new Response(
        JSON.stringify({ text: data.content[0].text }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error('Error in generate-lesson-from-prompt:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        details: error.stack 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});