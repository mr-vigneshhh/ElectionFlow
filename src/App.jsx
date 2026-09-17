import { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import ElectionJourney from './components/ElectionJourney';
import HowToVote from './components/HowToVote';
import Quiz from './components/Quiz';
import OfficialResources from './components/OfficialResources';

/**
 * Footer component with disclaimer.
 */
function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <p className="footer-text">
          ElectionFlow — Understand the election. Follow the journey.
        </p>
        <p className="footer-disclaimer">
          This is an educational platform for civic awareness. It is not affiliated with the
          Election Commission of India or any political party. Information presented here describes
          the general election process and may not reflect specific election schedules. For official
          and up-to-date information, please visit{' '}
          <a href="https://eci.gov.in/" target="_blank" rel="noopener noreferrer">
            eci.gov.in
          </a>.
        </p>
      </div>
    </footer>
  );
}

/**
 * App — root application component.
 * Manages theme (dark/light) and section-based navigation.
 */
export default function App() {
  const [activeSection, setActiveSection] = useState('journey');

  // Initialise theme from localStorage, falling back to system preference
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('electionflow-theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Apply / remove the .dark class on <html> whenever isDark changes
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('electionflow-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  const handleToggleTheme = useCallback(() => {
    setIsDark((prev) => !prev);
  }, []);

  const handleNavigate = useCallback((sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    if (sectionId === 'journey') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="app-container">
      {/* Skip Link for Accessibility */}
      <a href="#journey" className="skip-link">
        Skip to main content
      </a>

      <Header
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isDark={isDark}
        onToggleTheme={handleToggleTheme}
      />

      <main className="main-content" role="main">
        <section id="journey" aria-label="Election Journey">
          <ElectionJourney />
        </section>

        <HowToVote />

        <Quiz />

        <OfficialResources />
      </main>

      <Footer />
    </div>
  );
}
