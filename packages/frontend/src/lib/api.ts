// Base URL of the Cloudflare Worker API.
// Set VITE_API_BASE to your deployed Worker URL (e.g. https://portfolio-api.your-sub.workers.dev).
// Leave empty in dev to use Vite's /api proxy to localhost:8787.
export const API_BASE = (import.meta.env.VITE_API_BASE as string) || '';

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
