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
    'lung-carcinoma-screening',
    'Enhancing Lung Carcinoma Screening: 2D-Unet Model',
    'Developed a robust web application to facilitate advanced medical imaging analysis. Processed 11 GB of CT-scan image datasets, applying a 2D U-Net deep learning model to accurately predict and detect cancer regions. Generated dynamic video outputs combining nearly 200 image layers to highlight cancerous regions, alongside automated CSV reports detailing location, position, radius, and dimensions.',
    array['Python', 'Flask', 'HTML', 'JavaScript', 'CSS', 'Google Drive API', 'U-Net', 'Deep Learning'],
    null,
    'https://github.com/vakumullaakshaykumar/lung-carcinoma-screening',
    0
  ),
  (
    'feedback-edu',
    'FeedbackEDU: Interactive Student-Faculty System',
    'Built a full-stack web application to digitize and streamline academic feedback processes for over 1,000 active users. Designed a normalized relational database comprising 8 interrelated tables to securely manage distinct access roles for students, faculty, and administrators, ensuring 99.9% data integrity.',
    array['Java', 'Servlets', 'MySQL', 'HTML', 'JavaScript', 'CSS'],
    null,
    'https://github.com/vakumullaakshaykumar/feedback-edu',
    1
  )
on conflict (slug) do nothing;
