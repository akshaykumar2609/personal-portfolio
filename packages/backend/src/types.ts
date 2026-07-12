export interface Bindings {
  SUPABASE_URL: string;
  SUPABASE_SERVICE_ROLE_KEY: string;
  SENTRY_DSN: string;
  ENVIRONMENT: string;
  FRONTEND_URL: string;
}

export interface Variables {
  supabase: import('@supabase/supabase-js').SupabaseClient;
}

export type AppEnv = {
  Bindings: Bindings;
  Variables: Variables;
};
