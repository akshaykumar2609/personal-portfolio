import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { sentry } from '@sentry/hono/cloudflare';
import { supabaseMiddleware } from './supabase';
import type { AppEnv } from './types';

const app = new Hono<AppEnv>();

// --- Sentry: must be registered as early as possible ---
app.use(
  '*',
  sentry(app, (env) => ({
    dsn: env.SENTRY_DSN,
    environment: env.ENVIRONMENT ?? 'development',
    tracesSampleRate: 1.0,
  })),
);

// --- CORS: allow the Vercel frontend (and localhost in dev) ---
app.use(
  '*',
  cors({
    origin: (origin, c) => {
      const allowed = [c.env.FRONTEND_URL, 'http://localhost:5173'];
      return origin && allowed.includes(origin) ? origin : c.env.FRONTEND_URL;
    },
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization'],
  }),
);

// --- Attach Supabase client to every request ---
app.use('*', supabaseMiddleware);

// --- Health check (useful for uptime monitors) ---
app.get('/health', (c) => c.json({ status: 'ok', time: new Date().toISOString() }));

// --- Public API: list published projects from Supabase ---
app.get('/api/projects', async (c) => {
  const supabase = c.get('supabase');
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('published', true)
    .order('display_order', { ascending: true });

  if (error) {
    return c.json({ error: error.message }, 500);
  }
  return c.json({ projects: data });
});

// --- Public API: single project by slug ---
app.get('/api/projects/:slug', async (c) => {
  const slug = c.req.param('slug');
  const supabase = c.get('supabase');
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) {
    return c.json({ error: error.message }, error.code === 'PGRST116' ? 404 : 500);
  }
  return c.json({ project: data });
});

// --- Catch-all 404 ---
app.notFound((c) => c.json({ error: 'Not found' }, 404));

export default app;
