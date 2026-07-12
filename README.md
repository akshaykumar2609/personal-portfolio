# Personal Portfolio

A $0-until-production personal portfolio built with:

| Layer       | Tech                                            |
|-------------|-------------------------------------------------|
| Frontend    | React + Vite, deployed to **Vercel**            |
| Backend API | **Hono** running on **Cloudflare Workers**      |
| Database    | **Supabase** (Postgres + Auth + Storage)        |
| Errors      | **Sentry** (`@sentry/react` + `@sentry/hono`)   |

Monorepo using npm **workspaces**:

```
packages/frontend   -> React app (Vercel)
packages/backend    -> Hono API (Cloudflare Workers)
supabase/           -> SQL schema + seed for the database
```

## Quick start (local, $0)

1. **Install** (from repo root):
   ```bash
   npm install
   ```
2. **Create Supabase project** (free tier): https://supabase.com
   - Copy the SQL in `supabase/schema.sql` into the SQL editor and run it.
   - Grab `Project URL` + `anon key` + `service_role key` from Settings → API.
3. **Configure env**:
   ```bash
   cp .env.example .env
   # fill in the values above
   ```
4. **Run locally**:
   ```bash
   npm run dev:web    # React on http://localhost:5173
   npm run dev:api    # Hono/Worker on http://localhost:8787 (wrangler)
   ```

## Deploy (still free)

- **Frontend → Vercel**: import the repo, set Root Directory = `packages/frontend`,
  add the `VITE_*` env vars, deploy.
- **Backend → Cloudflare**: `npm run deploy:api` (runs `wrangler deploy`).
  Set secrets with `npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY` and
  `npx wrangler secret put SENTRY_DSN`.
- **Database → Supabase**: already created; just keep the schema in `supabase/`.
- **Sentry**: create two projects (React + Cloudflare) and drop the DSNs into env/Secrets.

All four services have a working free tier that covers a personal portfolio.
See `SETUP.md` for the step-by-step walkthrough.

## Scripts

| Command           | What it does                          |
|-------------------|---------------------------------------|
| `npm run dev:web` | Start the React dev server            |
| `npm run dev:api` | Start the Worker locally via wrangler |
| `npm run build:web` | Build the frontend for Vercel      |
| `npm run build:api` | Type-check / build the Worker      |
