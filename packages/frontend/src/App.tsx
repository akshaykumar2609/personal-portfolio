import { useEffect, useRef } from 'react';
import { Projects } from './components/Projects';
import { ThemeToggle } from './components/ThemeToggle';
import { BackgroundShader } from './components/BackgroundShader';

// Your WhatsApp number in international format, digits only (no + or spaces).
// Example: India +91 98765 43210 -> '919876543210'. Replace with your real number.
const WHATSAPP_NUMBER = '919876543210';
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi Akshay, I came from your portfolio!')}`;

export default function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      container.style.setProperty('--mouse-x', `${x}px`);
      container.style.setProperty('--mouse-y', `${y}px`);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={containerRef} className="portfolio-wrapper">
      {/* 3D Shader Gradient Background */}
      <BackgroundShader />

      {/* Theme switch — fixed top-right via CSS */}
      <ThemeToggle />

      {/* Background radial glow effects */}
      <div className="glow glow-1" aria-hidden="true"></div>
      <div className="glow glow-2" aria-hidden="true"></div>

      <main className="container">

        <header className="hero animate-fade-in">
          <h1 className="name">Akshay Kumar Vakumulla</h1>
          <p className="tagline">Software Engineer · Specializing in Enterprise Applications &amp; Intelligent Systems</p>
          <p className="muted bio">
            I'm a software engineer passionate about building scalable, latency-optimized applications and integrating deep learning and intelligent systems to solve real-world problems. Currently working at Accenture, leading projects from conception to delivery.
          </p>

          {/* Contact info bar */}
          <div className="contact-bar">
            <a href="mailto:vakumullaakshaykumar@gmail.com" className="contact-item" title="Email me">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
              vakumullaakshaykumar@gmail.com
            </a>
            <a href="https://www.google.com/maps/place/Hyderabad,+Telangana,+India" target="_blank" rel="noreferrer" className="contact-item" title="View location on Google Maps">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
              Hyderabad, India
            </a>
            <a href="https://github.com/akshaykumar2609" target="_blank" rel="noreferrer" className="contact-item" title="GitHub Profile">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /></svg>
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/akshay-kumar-vakumulla-a18666274/" target="_blank" rel="noreferrer" className="contact-item" title="LinkedIn Profile">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
              LinkedIn
            </a>
          </div>
        </header>

        {/* Professional Experience timeline */}
        <section className="section">
          <h2>Professional Experience</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-badge"></div>
              <div className="timeline-content card">
                <div className="timeline-header">
                  <h3>Accenture</h3>
                  <span className="timeline-date">Sep 2024 – Present</span>
                </div>
                <div className="timeline-subheader">
                  <span className="role highlight">Packaged App Development Analyst</span>
                  <span className="role-date">May 2026 – Present</span>
                </div>
                <div className="timeline-subheader">
                  <span className="role">Packaged App Development Associate</span>
                  <span className="role-date">Sep 2024 – May 2026</span>
                </div>
                <ul className="bullets">
                  <li>Develop, test, and maintain robust enterprise applications utilizing Python and ReactJs, reducing system latency by 15% and ensuring optimal cross-platform scalability for end-users.</li>
                  <li>Leverage in-depth domain knowledge of the US Health Payer System to align technical implementations with complex healthcare regulations, reducing compliance-related issues during deployment by 20%.</li>
                  <li>Collaborate with cross-functional agile teams to design data-driven solutions utilizing innovation-led methodologies, leading to a rapid promotion to Analyst within 20 months due to 100% on-time project delivery.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Card Grid */}
        <section className="section">
          <h2>Skills &amp; Expertise</h2>
          <div className="skills-grid">
            <div className="card skill-card">
              <h3>Languages</h3>
              <div className="tags">
                {['Python', 'Java', 'C', 'C++', 'JavaScript', 'SQL'].map(s => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </div>
            <div className="card skill-card">
              <h3>Frameworks &amp; Tech</h3>
              <div className="tags">
                {['ReactJs', 'Flask', 'HTML', 'CSS', 'Servlets'].map(s => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </div>
            <div className="card skill-card">
              <h3>Databases &amp; Cloud</h3>
              <div className="tags">
                {['MySQL', 'AWS (Cloud Foundations)', 'Google Drive API'].map(s => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </div>
            <div className="card skill-card">
              <h3>Core Competencies</h3>
              <div className="tags">
                {['US Health Payer System', 'Data Structures & Algorithms (DSA)', 'Problem Solving', 'Agile Methodologies'].map(s => (
                  <span key={s} className="tag">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Projects component */}
        <section className="section">
          <h2>Featured Projects</h2>
          <Projects />
        </section>

        {/* Two column grid for Education and Certifications */}
        <div className="two-column-grid">
          <section className="section">
            <h2>Education</h2>
            <div className="card education-card">
              <div className="edu-item">
                <div className="edu-header">
                  <h3>Lakireddy Bali Reddy College of Engineering</h3>
                  <span className="date">2021 – 2024</span>
                </div>
                <p className="degree">B.Tech in Computer Science and Engineering</p>
                <p className="score">CGPA: <strong className="highlight">8.13</strong></p>
              </div>
              <div className="edu-item">
                <div className="edu-header">
                  <h3>Sri Sarada Junior College</h3>
                  <span className="date">2018 – 2020</span>
                </div>
                <p className="degree">Intermediate Education in MPC</p>
                <p className="score">CGPA: <strong className="highlight">9.25</strong></p>
              </div>
            </div>
          </section>

          <section className="section">
            <h2>Certifications &amp; Leadership</h2>
            <div className="card cert-card">
              <h3>Certifications</h3>
              <ul className="bullets cert-list">
                <li><strong>AWS Academy</strong> Cloud Foundations</li>
                <li><strong>HackerRank</strong> SQL, Python, JavaScript</li>
                <li><strong>NPTEL</strong> C++ Certificate</li>
                <li><strong>IBM Skill Build</strong> Cyber Security</li>
                <li><strong>MTA</strong> Java Certification</li>
              </ul>
              <h3 style={{ marginTop: '1.5rem' }}>Leadership</h3>
              <ul className="bullets cert-list">
                <li><strong>Student Coordinator</strong> for Machine Learning Club (LBRCE)</li>
                <li><strong>Main Student Coordinator</strong> for CSE Lakshya-2K22 Fest</li>
              </ul>
            </div>
          </section>
        </div>

        <footer className="footer">
          <p className="muted">© {new Date().getFullYear()} Akshay Kumar Vakumulla. Built with React, Hono, Supabase &amp; Sentry.</p>
        </footer>

        {/* Floating WhatsApp chat button — fixed bottom-right via CSS */}
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="whatsapp-fab"
          aria-label="Chat with me on WhatsApp"
          title="Chat with me on WhatsApp"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
            <path d="M16.04 4C9.93 4 5 8.93 5 15.04c0 2.13.6 4.16 1.74 5.91L5 27l6.16-1.62a10.9 10.9 0 0 0 4.88 1.16h.01c6.11 0 11.04-4.93 11.04-11.04C27.09 8.93 22.16 4 16.04 4zm0 20.16h-.01a9.06 9.06 0 0 1-4.62-1.27l-.33-.2-3.65.96.97-3.56-.24-.34a9.03 9.03 0 0 1-1.39-4.81c0-5 4.07-9.07 9.07-9.07 2.42 0 4.7.94 6.42 2.66a9.03 9.03 0 0 1 2.66 6.42c0 5-4.07 9.05-9.05 9.05zm5.02-6.78c-.27-.14-1.6-.79-1.85-.88-.25-.09-.43-.14-.61.14-.18.27-.7.88-.86 1.06-.16.18-.32.2-.59.07-.27-.14-1.15-.43-2.19-1.37-.81-.73-1.36-1.64-1.52-1.91-.16-.27-.02-.42.12-.55.13-.13.27-.34.41-.5.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.35-.01-.54-.01a1.03 1.03 0 0 0-.74.35c-.25.27-.97.95-.97 2.32 0 1.37.99 2.69 1.13 2.88.14.18 1.94 2.96 4.7 4.15.66.28 1.17.45 1.57.58.66.21 1.26.18 1.74.11.53-.08 1.6-.65 1.83-1.28.23-.63.23-1.17.16-1.28-.07-.11-.25-.18-.52-.32z" />
          </svg>
        </a>
      </main>
    </div>
  );
}

