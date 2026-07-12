import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import type { AppEnv, Bindings } from './types';

/**
 * Builds a Supabase client using the SERVICE ROLE key (server-side only).
 * Never expose the service role key to the browser.
 */
export function createSupabaseClient(env: Bindings): SupabaseClient {
  return createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}

/**
 * Hono middleware that attaches a Supabase client to the context.
 * Use `c.get('supabase')` inside routes.
 */
export const supabaseMiddleware = async (c: import('hono').Context<AppEnv>, next: () => Promise<void>) => {
  const client = createSupabaseClient(c.env);
  c.set('supabase', client);
  await next();
};
