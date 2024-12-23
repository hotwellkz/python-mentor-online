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
  console.log('Function invoked with request:', {
    method: req.method,
    url: req.url,
    headers: Object.fromEntries(req.headers.entries()),
  });

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS request');
    return new Response('ok', { 
      headers: corsHeaders 
    });
  }

  try {
    if (req.method !== 'POST') {
      throw new Error(`HTTP method ${req.method} not allowed`);
    }

    const { lessonId, prompt } = await req.json();
    
    if (!lessonId || !prompt) {
      throw new Error('lessonId and prompt are required');
    }

    console.log('Generating lesson for:', lessonId);
    console.log('Using prompt:', prompt);

    try {
      // Try Claude first
      const anthropicApiKey = Deno.env.get('ANTHROPIC_API_KEY');
      if (!anthropicApiKey) {
        throw new Error('Missing Anthropic API key');
      }

      const anthropic = new Anthropic({
        apiKey: anthropicApiKey,
      });

      console.log('Attempting to use Claude...');
      const completion = await anthropic.messages.create({
        model: 'claude-3-opus-20240229',
        max_tokens: 4000,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      });

      console.log('Successfully received response from Claude');
      return new Response(
        JSON.stringify({ text: completion.content[0].text }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 200,
        },
      );
    } catch (claudeError) {
      console.error('Claude error:', claudeError);
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
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7,
      });

      console.log('Successfully received response from OpenAI');
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
        status: error.status || 500,
      },
    );
  }
});