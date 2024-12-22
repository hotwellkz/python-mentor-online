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
    const { lessonId, prompt } = await req.json();
    console.log('Updating prompt for lesson:', lessonId);
    console.log('New prompt:', prompt);

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Upsert the prompt
    const { error: dbError } = await supabaseClient
      .from('lesson_prompts')
      .upsert(
        { 
          lesson_id: lessonId, 
          prompt: prompt,
          updated_at: new Date().toISOString()
        },
        { onConflict: 'lesson_id' }
      );

    if (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }

    console.log('Prompt updated successfully');
    return new Response(
      JSON.stringify({ success: true }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    console.error('Error in update-lesson-prompt:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    );
  }
});