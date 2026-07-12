import { Projects } from './components/Projects';

export default function App() {
  return (
    <main className="container">
      <header className="hero">
        <h1>Your Name</h1>
        <p className="tagline">Software Engineer · Building things on the web</p>
        <p className="muted">
          Replace this with your bio. Edit <code>src/App.tsx</code>.
        </p>
      </header>

      <section>
        <h2>Projects</h2>
        <Projects />
      </section>

      <footer className="footer">
        <p className="muted">© {new Date().getFullYear()} You. Built with React, Hono, Supabase &amp; Sentry.</p>
      </footer>
    </main>
  );
}
