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
    repo: 'https://github.com/vakumullaakshaykumar/lung-carcinoma-screening',
    display_order: 0,
    published: true
  },
  {
    id: 'fallback-2',
    slug: 'feedback-edu',
    title: 'FeedbackEDU: Interactive Student-Faculty System',
    description: 'Built a full-stack web application using HTML, JavaScript, Servlets, and MySQL to digitize and streamline academic feedback processes for over 1,000 active users. Designed a normalized relational database comprising 8 interrelated tables to securely manage distinct access roles for students, faculty, and administrators, ensuring 99.9% data integrity.',
    tech: ['Java', 'Servlets', 'MySQL', 'HTML', 'JavaScript', 'CSS'],
    repo: 'https://github.com/vakumullaakshaykumar/feedback-edu',
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
            {p.url && <a href={p.url} target="_blank" rel="noreferrer">Live</a>}
            {p.repo && <a href={p.repo} target="_blank" rel="noreferrer">Code</a>}
          </div>
        </li>
      ))}
    </ul>
  );
}
