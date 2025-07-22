import { createClient } from '@supabase/supabase-js';


const URL = process.env.EXPO_PUBLIC_SUPABASE_URL || '';
const KEY = process.env.EXPO_PUBLIC_SUPABASE_KEY || '';

export const supabase = createClient(URL, KEY);
