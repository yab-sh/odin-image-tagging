import './AboutPage.css';

export default function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-content">
        <h1>About Me</h1>
        
        <section className="about-section">
          <h2>Who I Am</h2>
          <p>
            Hi! I'm Yasin, a passionate developer working through The Odin Project curriculum. 
            This "Find'em!" game is my take on a Where's Waldo-style photo tagging game, 
            built as part of my journey to become a full-stack developer.
          </p>
        </section>

        <section className="about-section">
          <h2>What I Do</h2>
          <p>
            I'm learning web development with a focus on modern JavaScript, TypeScript, 
            and the React ecosystem. I enjoy building interactive web applications and 
            solving interesting problems. When I'm not coding, you can find me writing or learning a random skill.
          </p>
        </section>

        <section className="about-section">
          <h2>Tech Stack</h2>
          <p>This app was built using:</p>
          <ul className="tech-list">
            <li>
              <span className="tech-category">Frontend:</span>
              React, TypeScript, Vite, React Router
            </li>
            <li>
              <span className="tech-category">Backend:</span>
              Node.js, Express, PostgreSQL, Prisma
            </li>
            <li>
              <span className="tech-category">Styling:</span>
              CSS with custom properties/variables
            </li>
            <li>
              <span className="tech-category">Authentication:</span>
              bcrypt for password hashing
            </li>
          </ul>
        </section>

        <section className="about-section">
          <h2>Connect With Me</h2>
          <div className="social-links">
            <a 
              href="https://github.com/yab-sh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link github"
            >
              GitHub
            </a>
            <a 
              href="https://linkedin.com/in/yasin-sh" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link linkedin"
            >
              LinkedIn
            </a>
          </div>
        </section>

        <footer className="about-footer">
          <p>Thanks for playing!</p>
        </footer>
      </div>
    </div>
  );
}