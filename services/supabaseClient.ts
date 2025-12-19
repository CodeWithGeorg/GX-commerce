import { createClient } from '@supabase/supabase-js';

// Load environment variables from .env file (ensure you have dotenv installed and configured if needed)
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);