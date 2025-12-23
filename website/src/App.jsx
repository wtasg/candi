import { useState, useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Colors from './pages/Colors'
import Components from './pages/Components'
import Guides from './pages/Guides'
import Philosophy from './pages/Philosophy'
import Accessibility from './pages/Accessibility'

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('candi-theme');
    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return saved === 'dark' || (!saved && systemDark);
  });

  const location = useLocation();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('candi-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(!darkMode);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/colors', label: 'Colors' },
    { path: '/components', label: 'Components' },
    { path: '/guides', label: 'Guides' },
    { path: '/philosophy', label: 'Philosophy' },
    { path: '/accessibility', label: 'Accessibility' },
  ];

  return (
    <div className="min-h-screen bg-candi-bg">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-candi-elevated border-b border-candi-border backdrop-blur-sm bg-opacity-90">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-candi-accent to-candi-secondary"></div>
              <span className="text-xl font-semibold tracking-tight">Candi</span>
            </Link>
            
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-soft text-sm font-medium transition-colors ${
                    location.pathname === link.path
                      ? 'bg-candi-surface text-candi-text'
                      : 'text-candi-subtle hover:bg-candi-surface hover:text-candi-text'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-soft hover:bg-candi-surface transition-colors"
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden flex flex-wrap gap-1 mt-4">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-1.5 rounded-soft text-sm font-medium transition-colors ${
                  location.pathname === link.path
                    ? 'bg-candi-surface text-candi-text'
                    : 'text-candi-subtle hover:bg-candi-surface hover:text-candi-text'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/colors" element={<Colors />} />
          <Route path="/components" element={<Components />} />
          <Route path="/guides" element={<Guides />} />
          <Route path="/philosophy" element={<Philosophy />} />
          <Route path="/accessibility" element={<Accessibility />} />
        </Routes>
      </main>

      {/* Footer */}
      <footer className="border-t border-candi-border mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-semibold mb-3">Candi Design System</h3>
              <p className="text-candi-subtle text-sm">
                Nordic design principles with OKLCH color space
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="https://github.com/wtasg/candi" className="text-candi-subtle hover:text-candi-accent">GitHub</a></li>
                <li><a href="https://www.npmjs.com/package/@wtasnorg/candi" className="text-candi-subtle hover:text-candi-accent">npm</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Philosophy</h3>
              <p className="text-candi-subtle text-sm">
                Inspired by Hygge (warmth) and Lagom (balance)
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-candi-border text-center text-candi-muted text-sm">
            <p>MIT License © 2024 wtasg</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
