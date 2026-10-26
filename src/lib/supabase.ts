import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://pmlzghkadenzhfbkadkv.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'sb_publishable_3jEl4SFL8wBHzLx7e3BNOQ_Rc6ifCfH';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || DEFAULT_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || DEFAULT_SUPABASE_ANON_KEY;

/**
 * Checks if Supabase credentials are configured in environment variables.
 */
export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.trim() !== '' &&
    supabaseAnonKey.trim() !== '' &&
    supabaseUrl.includes('supabase.co') &&
    !supabaseUrl.includes('YOUR_SUPABASE')
  );
};

/**
 * Supabase client instance (or null if not yet configured)
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    })
  : null;
