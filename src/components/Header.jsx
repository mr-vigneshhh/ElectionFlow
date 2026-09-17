import { useState, useCallback, useRef, useEffect } from 'react';

/**
 * Header component with navigation and dark/light mode toggle.
 * Supports mobile hamburger menu and keyboard navigation.
 */
export default function Header({ activeSection, onNavigate, isDark, onToggleTheme }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  const sections = [
    { id: 'journey', label: 'Election Journey' },
    { id: 'vote', label: 'How to Vote' },
    { id: 'quiz', label: 'Quiz' },
    { id: 'resources', label: 'Resources' },
  ];

  const handleNavClick = useCallback((sectionId) => {
    onNavigate(sectionId);
    setMenuOpen(false);
  }, [onNavigate]);

  // Close menu on Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && menuOpen) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <header className="header" role="banner">
      <div className="header-inner">
        <a
          href="#journey"
          className="header-brand"
          onClick={(e) => { e.preventDefault(); handleNavClick('journey'); }}
          aria-label="ElectionFlow — home"
        >
          <div className="header-logo" aria-hidden="true">✓</div>
          <span className="header-title">ElectionFlow</span>
          <span className="header-tagline">Understand the election. Follow the journey.</span>
        </a>

        {/* Right side: theme toggle + hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
          {/* Theme Toggle */}
          <button
            className="theme-toggle"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-pressed={isDark}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <span className="theme-toggle-icon" aria-hidden="true">
              {isDark ? '☀️' : '🌙'}
            </span>
            <span className="theme-toggle-label">
              {isDark ? 'Light' : 'Dark'}
            </span>
          </button>

          {/* Mobile hamburger */}
          <button
            className="mobile-nav-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="main-nav"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        <nav
          id="main-nav"
          ref={navRef}
          className={`nav ${menuOpen ? 'open' : ''}`}
          role="navigation"
          aria-label="Main navigation"
        >
          {sections.map((section) => (
            <button
              key={section.id}
              className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => handleNavClick(section.id)}
              aria-current={activeSection === section.id ? 'page' : undefined}
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
