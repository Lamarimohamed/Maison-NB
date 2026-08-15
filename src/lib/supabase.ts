import { createClient } from '@supabase/supabase-js';

// Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseKey);
