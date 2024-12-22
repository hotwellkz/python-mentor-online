import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { getPrompt } from "./prompts/index.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { lessonId, customPrompt } = await req.json();
    console.log('Generating lesson for:', lessonId);
    
    // Use custom prompt if provided, otherwise get default prompt
    const prompt = customPrompt || await getPrompt(lessonId);
    
    if (!prompt) {
      throw new Error('Failed to get prompt for lesson');
    }

    // Try OpenAI first
    try {
      console.log('Attempting to use OpenAI...');
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${openAIApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You are an experienced teacher creating detailed, engaging lessons.'
            },
            { role: 'user', content: prompt }
          ],
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        console.error('OpenAI error:', data.error);
        throw new Error(data.error.message);
      }

      return new Response(
        JSON.stringify({ text: data.choices[0].message.content }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    } catch (error) {
      console.error('OpenAI error, falling back to Anthropic:', error);
      
      // Fallback to Anthropic if OpenAI fails
      console.log('Attempting to use Anthropic...');
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
        }),
      });

      const data = await response.json();
      
      if (data.error) {
        console.error('Anthropic error:', data.error);
        throw new Error(data.error.message);
      }

      return new Response(
        JSON.stringify({ text: data.content[0].text }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }
  } catch (error) {
    console.error('Error in generate-lesson function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});