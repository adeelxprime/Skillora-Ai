import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://mflzsvfochxecvnfdrzi.supabase.co';
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1mbHpzdmZvY2h4ZWN2bmZkcnppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI2ODk5ODAsImV4cCI6MjEwODI2NTk4MH0.qnLEe7galTPERDh3EzMwIXQ-y_rJltQJVk39wammhlM';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Fetch prompts from Supabase
export async function fetchPromptsFromSupabase() {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.warn('Supabase prompts fetch error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase prompts connection failed:', err);
    return null;
  }
}

// Upsert prompt to Supabase
export async function upsertPromptToSupabase(prompt) {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase
      .from('prompts')
      .upsert([prompt], { onConflict: 'id' });

    if (error) {
      console.warn('Supabase upsert error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase upsert failed:', err);
    return false;
  }
}

// Delete prompt from Supabase
export async function deletePromptFromSupabase(id) {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase
      .from('prompts')
      .delete()
      .eq('id', id);

    if (error) {
      console.warn('Supabase delete error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase delete failed:', err);
    return false;
  }
}

// Fetch pricing plans from Supabase
export async function fetchPricingFromSupabase() {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from('pricing_plans')
      .select('*');

    if (error) {
      console.warn('Supabase pricing fetch error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase pricing connection failed:', err);
    return null;
  }
}

// Upsert pricing plans to Supabase
export async function upsertPricingToSupabase(plans) {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase
      .from('pricing_plans')
      .upsert(plans, { onConflict: 'id' });

    if (error) {
      console.warn('Supabase pricing upsert error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase pricing upsert failed:', err);
    return false;
  }
}

// Fetch site config from Supabase
export async function fetchSiteConfigFromSupabase() {
  if (!isSupabaseConfigured || !supabase) return null;
  try {
    const { data, error } = await supabase
      .from('site_config')
      .select('*')
      .eq('id', 'default')
      .maybeSingle();

    if (error) {
      console.warn('Supabase config fetch error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('Supabase config connection failed:', err);
    return null;
  }
}

// Upsert site config to Supabase
export async function upsertSiteConfigToSupabase(config) {
  if (!isSupabaseConfigured || !supabase) return false;
  try {
    const { error } = await supabase
      .from('site_config')
      .upsert([{ ...config, id: 'default' }], { onConflict: 'id' });

    if (error) {
      console.warn('Supabase config upsert error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('Supabase config upsert failed:', err);
    return false;
  }
}
