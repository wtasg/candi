import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-candi-accent-subtle text-candi-accent text-sm font-medium mb-8">
          <span>✨</span>
          <span>Hygge & Lagom</span>
        </div>
        
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 max-w-4xl mx-auto">
          Nordic Design System with OKLCH Colors
        </h1>
        
        <p className="text-xl text-candi-subtle max-w-2xl mx-auto mb-12">
          A comprehensive design system inspired by Scandinavian principles of warmth and balance. 
          Built with OKLCH color space for perceptual uniformity across all platforms.
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link 
            to="/colors" 
            className="px-8 py-4 bg-candi-accent text-white rounded-soft font-medium hover:opacity-90 transition-opacity shadow-hygge"
          >
            Explore Colors
          </Link>
          <Link 
            to="/components" 
            className="px-8 py-4 bg-candi-secondary text-white rounded-soft font-medium hover:opacity-90 transition-opacity shadow-hygge"
          >
            View Components
          </Link>
          <a 
            href="https://github.com/wtasg/candi"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 border-2 border-candi-border-strong text-candi-text rounded-soft font-medium hover:bg-candi-surface transition-colors"
          >
            GitHub
          </a>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Why Candi?</h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-candi-surface border border-candi-border rounded-softer p-8 shadow-hygge">
            <div className="w-12 h-12 rounded-soft bg-candi-accent-subtle flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-candi-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">OKLCH Color Space</h3>
            <p className="text-candi-subtle leading-relaxed">
              Perceptually uniform colors ensure consistent contrast and brightness across all devices and platforms.
            </p>
          </div>

          <div className="bg-candi-surface border border-candi-border rounded-softer p-8 shadow-hygge">
            <div className="w-12 h-12 rounded-soft bg-candi-secondary-subtle flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-candi-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Multi-Platform</h3>
            <p className="text-candi-subtle leading-relaxed">
              Unified theming across Web (Tailwind), Flutter, VS Code, and Vim with automatic synchronization.
            </p>
          </div>

          <div className="bg-candi-surface border border-candi-border rounded-softer p-8 shadow-hygge">
            <div className="w-12 h-12 rounded-soft flex items-center justify-center mb-6" style={{backgroundColor: 'oklch(85% 0.04 145)'}}>
              <svg className="w-6 h-6 text-candi-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-3">Accessibility First</h3>
            <p className="text-candi-subtle leading-relaxed">
              WCAG compliant color combinations with built-in contrast checkers to ensure readability for all users.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="bg-candi-elevated border border-candi-border rounded-softer p-12 shadow-hygge-md">
          <h2 className="text-3xl font-bold mb-6">Quick Start</h2>
          
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-candi-accent">Web (Tailwind CSS)</h3>
              <pre className="text-sm">
                <code>{`npm install @wtasnorg/candi

// tailwind.config.js
const { theme, plugin } = require('@wtasnorg/candi');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: { extend: theme },
  plugins: [plugin],
};`}</code>
              </pre>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3 text-candi-secondary">Flutter</h3>
              <pre className="text-sm">
                <code>{`dependencies:
  candi: ^0.0.1

import 'package:candi/candi.dart';

MaterialApp(
  theme: ThemeData(
    colorScheme: CandiColors.light,
  ),
  darkTheme: ThemeData(
    colorScheme: CandiColors.dark,
  ),
)`}</code>
              </pre>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Link to="/guides" className="text-candi-accent hover:underline font-medium">
              View All Guides →
            </Link>
          </div>
        </div>
      </section>

      {/* Platform Support */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold mb-12 text-center">Platform Support</h2>
        
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { name: 'Web', icon: '🌐', desc: 'Tailwind CSS Plugin' },
            { name: 'Flutter', icon: '📱', desc: 'Type-safe Colors' },
            { name: 'VS Code', icon: '💻', desc: 'Light & Dark Themes' },
            { name: 'Vim', icon: '⌨️', desc: 'Colorschemes' },
          ].map(platform => (
            <div key={platform.name} className="text-center p-6 bg-candi-surface rounded-soft border border-candi-border">
              <div className="text-4xl mb-3">{platform.icon}</div>
              <h3 className="font-semibold mb-1">{platform.name}</h3>
              <p className="text-sm text-candi-subtle">{platform.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
