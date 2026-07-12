# Setup & Deploy Walkthrough (all free tiers)

This covers getting the portfolio running locally and deploying it for **$0**
until you exceed the generous free limits of each service.

## 1. Supabase (database)

1. Sign up at https://supabase.com (free tier).
2. Create a new project.
3. Go to **SQL Editor** → paste the contents of `supabase/schema.sql` → **Run**.
   This creates the `projects` table and seeds two example rows.
4. Go to **Project Settings → API** and copy:
   - `Project URL`
   - `anon public` key
   - `service_role` key (keep secret — server only)

## 2. Configure environment

From the repo root:

```bash
cp .env.example .env
```

Fill in the Supabase values + Sentry DSNs (create Sentry projects first — step 4).

For the **backend** local dev, also do:

```bash
cd packages/backend
cp .dev.vars.example .dev.vars
# fill in SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, SENTRY_DSN, FRONTEND_URL
```

## 3. Install & run locally

```bash
npm install                 # installs both workspaces
npm run dev:api             # Worker on http://localhost:8787 (wrangler)
npm run dev:web             # React on http://localhost:5173 (Vite)
```

Open http://localhost:5173 — the frontend proxies `/api/*` to the Worker, so
projects load from Supabase.

## 4. Sentry (error tracking)

1. Sign up at https://sentry.io (free "Developer" tier).
2. Create **two projects**:
   - Framework: **React** → gives `VITE_SENTRY_DSN` (frontend).
   - Platform: **Cloudflare** → gives `SENTRY_DSN` (backend Worker).
3. Paste both DSNs into `.env` / `.dev.vars`. Confirmed setup:
   - Frontend: `@sentry/react` initialized in `packages/frontend/src/sentry.ts`.
   - Backend: `@sentry/hono/cloudflare` middleware in `packages/backend/src/index.ts`.

## 5. Deploy

### Frontend → Vercel (free)
- Import the GitHub repo at https://vercel.com.
- Framework preset: **Vite**. Root Directory: `packages/frontend`.
- Add Environment Variables (matching `.env`): `VITE_SUPABASE_URL`,
  `VITE_SUPABASE_ANON_KEY`, `VITE_SENTRY_DSN`, and optionally `VITE_API_BASE`.
- Deploy. Vercel auto-detects `vercel.json`.

### Backend → Cloudflare Workers (free)
```bash
cd packages/backend
npx wrangler login
# set secrets (these override .dev.vars in production)
npx wrangler secret put SUPABASE_SERVICE_ROLE_KEY
npx wrangler secret put SENTRY_DSN
npm run deploy
```
- Your Worker gets a `*.workers.dev` URL. Put it in the frontend's `VITE_API_BASE`
  (and in the Worker's `FRONTEND_URL` var for CORS).

### Database → Supabase
Already live from step 1. No extra deploy needed.

## Cost notes (all within free tiers for a personal site)
- **Vercel**: free Hobby — 100 GB bandwidth/mo, auto HTTPS.
- **Cloudflare Workers**: 100k requests/day free.
- **Supabase**: 500 MB DB, 50k monthly auth users free.
- **Sentry**: 5k errors/mo free.
You only pay if you drastically exceed these — unlikely for a portfolio.
