import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ehqtjtlozqafopvhdbbe.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVocXRqdGxvenFhZm9wdmhkYmJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQ3NzkyNzQsImV4cCI6MjA1MDM1NTI3NH0.8Fo0MvuKTSz_NbcB0zRfs6tJGjyNmVr9S5kIAY8ULbE";

export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);