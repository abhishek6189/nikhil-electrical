import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;

// ✅ fallback logic (this is the KEY FIX)
const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

console.log("SUPABASE URL:", import.meta.env.VITE_SUPABASE_URL);
console.log("SUPABASE KEY:", import.meta.env.VITE_SUPABASE_ANON_KEY);


if (!SUPABASE_URL || !SUPABASE_KEY) {
  throw new Error('Supabase environment variables are missing');
}

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);
