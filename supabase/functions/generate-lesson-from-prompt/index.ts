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

    const { lessonId, prompt } = await req.json();
    console.log('Generating lesson for:', lessonId);
    console.log('Using prompt:', prompt);

    if (!lessonId || !prompt) {
      throw new Error('lessonId and prompt are required');
    }

    try {
      // Try Claude first
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

      // Fallback to OpenAI
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