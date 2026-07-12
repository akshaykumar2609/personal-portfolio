-- ============================================================
-- Personal Portfolio — Supabase schema
-- Run this in Supabase: SQL Editor -> paste -> Run.
-- Free tier covers this easily.
-- ============================================================

create table if not exists public.projects (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique not null,
  title         text not null,
  description   text not null default '',
  tech          text[] not null default '{}',
  url           text,
  repo          text,
  image_url     text,
  display_order int   not null default 0,
  published     boolean not null default true,
  created_at    timestamptz not null default now()
);

-- Public read access (the Worker uses the service role key, which bypasses RLS,
-- but enabling RLS + a public select policy lets the browser talk to Supabase
-- directly too, if you ever want a client-only fallback).
alter table public.projects enable row level security;

create policy "Public can read published projects"
  on public.projects for select
  using (published = true);

-- Optional index for ordered listing
create index if not exists projects_display_order_idx
  on public.projects (display_order);

-- ============================================================
-- Seed data (edit to your own projects)
-- ============================================================
insert into public.projects (slug, title, description, tech, url, repo, display_order)
values
  (
    'portfolio',
    'This Portfolio',
    'A personal portfolio built with React, Hono, Supabase and Sentry.',
    array['React', 'Hono', 'Supabase', 'Sentry', 'Cloudflare'],
    'https://your-portfolio.vercel.app',
    'https://github.com/yourname/portfolio',
    0
  ),
  (
    'example-app',
    'Example Project',
    'A short description of something you built.',
    array['TypeScript', 'Vite'],
    null,
    'https://github.com/yourname/example-app',
    1
  )
on conflict (slug) do nothing;
