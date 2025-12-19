
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.1';

// Replace these with your actual Supabase URL and Anon Key from your dashboard
const supabaseUrl = 'https://your-project-id.supabase.co';
const supabaseAnonKey = 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
