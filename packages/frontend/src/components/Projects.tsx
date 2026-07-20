import { useEffect, useState } from 'react';
import * as Sentry from '@sentry/react';
import { fetchProjects, type Project } from '../lib/api';

const FALLBACK_PROJECTS: Project[] = [
  {
    id: 'fallback-1',
    slug: 'lung-carcinoma-screening',
    title: 'Enhancing Lung Carcinoma Screening: 2D-Unet Model',
    description: 'Developed a robust web application to facilitate advanced medical imaging analysis. Processed 11 GB of CT-scan image datasets, applying a 2D U-Net deep learning model to accurately predict and detect cancer regions, improving diagnostic efficiency. Generated dynamic video outputs combining nearly 200 image layers to highlight cancerous regions, alongside automated CSV reports detailing location, position, radius, and dimensions.',
    tech: ['Python', 'Flask', 'HTML', 'JavaScript', 'CSS', 'Google Drive API', 'U-Net', 'Deep Learning'],
    repo: 'https://github.com/akshaykumar2609/lung-carcinoma-screening',
    display_order: 0,
    published: true
  },
  {
    id: 'fallback-2',
    slug: 'feedback-edu',
    title: 'FeedbackEDU: Interactive Student-Faculty System',
    description: 'Built a full-stack web application using HTML, JavaScript, Servlets, and MySQL to digitize and streamline academic feedback processes for over 1,000 active users. Designed a normalized relational database comprising 8 interrelated tables to securely manage distinct access roles for students, faculty, and administrators, ensuring 99.9% data integrity.',
    tech: ['Java', 'Servlets', 'MySQL', 'HTML', 'JavaScript', 'CSS'],
    repo: 'https://github.com/akshaykumar2609/feedback-edu',
    display_order: 1,
    published: true
  }
];

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    fetchProjects()
      .then((data) => {
        if (!cancelled) {
          if (data && data.length > 0) {
            setProjects(data);
          } else {
            setProjects(FALLBACK_PROJECTS);
          }
        }
      })
      .catch((err) => {
        Sentry.captureException(err);
        console.warn('API fetch failed, falling back to static projects list:', err);
        if (!cancelled) {
          setProjects(FALLBACK_PROJECTS);
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) return <p className="muted">Loading projects…</p>;

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
            {p.url && (
              <a href={p.url} target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="link-icon"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><path d="M15 3h6v6" /><path d="M10 14 21 3" /></svg>
                Live
              </a>
            )}
            {/* p.repo link commented out per requirements
            {p.repo && (
              <a href={p.repo} target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="link-icon"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /></svg>
                Code
              </a>
            )} */}
          </div>
        </li>
      ))}
    </ul>
  );
}
