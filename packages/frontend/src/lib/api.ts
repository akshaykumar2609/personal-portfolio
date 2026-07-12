// Base URL of the Cloudflare Worker API.
// REQUIRED in production: set VITE_API_BASE in Vercel to your Worker URL
// (e.g. https://portfolio-api.your-sub.workers.dev). Leaving it empty makes
// the app fetch a RELATIVE /api/... path, which Vercel's SPA rewrite answers
// with index.html -> the JSON parse fails silently. Fail loud instead.
const API_BASE = (import.meta.env.VITE_API_BASE as string | undefined)?.trim();

if (!API_BASE) {
  throw new Error(
    'VITE_API_BASE is not set. Set it in Vercel env vars to your Cloudflare Worker URL (https://*.workers.dev) and redeploy.',
  );
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  tech: string[];
  url?: string;
  repo?: string;
  image_url?: string;
  display_order: number;
  published: boolean;
}

export async function fetchProjects(): Promise<Project[]> {
  const res = await fetch(`${API_BASE}/api/projects`);
  if (!res.ok) throw new Error(`Failed to load projects (${res.status})`);
  const json = (await res.json()) as { projects: Project[] };
  return json.projects;
}
