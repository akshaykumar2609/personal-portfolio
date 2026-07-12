import { useEffect, useState } from 'react';
import * as Sentry from '@sentry/react';
import { fetchProjects, type Project } from '../lib/api';

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchProjects()
      .then((data) => {
        if (!cancelled) setProjects(data);
      })
      .catch((err) => {
        Sentry.captureException(err);
        if (!cancelled) setError('Could not load projects. Please try again later.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <p className="muted">Loading projects…</p>;
  if (error) return <p className="error">{error}</p>;
  if (projects.length === 0) return <p className="muted">No projects published yet.</p>;

  return (
    <ul className="projects">
      {projects.map((p) => (
        <li key={p.id} className="card">
          {p.image_url && <img src={p.image_url} alt={p.title} loading="lazy" />}
          <h3>{p.title}</h3>
          <p>{p.description}</p>
          <div className="tags">
            {p.tech.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
          <div className="links">
            {p.url && <a href={p.url} target="_blank" rel="noreferrer">Live</a>}
            {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">Code</a>}
          </div>
        </li>
      ))}
    </ul>
  );
}
