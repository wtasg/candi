import { useState } from 'react'
import palette from '@wtasnorg/candi/colors'
import { checkAccessibility } from '../utils/colorUtils'

export default function Accessibility() {
  const [mode, setMode] = useState('light');
  const [fgColor, setFgColor] = useState('text');
  const [bgColor, setBgColor] = useState('bg');

  const colors = palette[mode];
  const fg = colors[fgColor];
  const bg = colors[bgColor];
  const result = checkAccessibility(fg, bg);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Accessibility Checker</h1>
        <p className="text-xl text-candi-subtle">
          Verify color contrast ratios and WCAG compliance for any token combination.
        </p>
      </div>

      {/* Color Selector */}
      <div className="bg-candi-surface border border-candi-border rounded-softer p-8 mb-8">
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium mb-2">Color Mode</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="w-full px-4 py-3 bg-candi-elevated border border-candi-border rounded-soft focus:outline-none focus:ring-2 focus:ring-candi-accent"
            >
              <option value="light">Light Mode</option>
              <option value="dark">Dark Mode</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Foreground (Text)</label>
            <select
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              className="w-full px-4 py-3 bg-candi-elevated border border-candi-border rounded-soft focus:outline-none focus:ring-2 focus:ring-candi-accent"
            >
              {Object.entries(colors).map(([key, value]) => (
                <option key={key} value={key}>{value.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Background</label>
            <select
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              className="w-full px-4 py-3 bg-candi-elevated border border-candi-border rounded-soft focus:outline-none focus:ring-2 focus:ring-candi-accent"
            >
              {Object.entries(colors).map(([key, value]) => (
                <option key={key} value={key}>{value.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Preview */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-4">Preview</h3>
          <div
            className="p-12 rounded-softer border-2 border-candi-border"
            style={{ backgroundColor: bg.oklch, color: fg.oklch }}
          >
            <h2 className="text-3xl font-bold mb-4">Sample Heading</h2>
            <p className="text-lg mb-4">
              This is a preview of how your selected color combination looks with regular body text.
              The contrast ratio is calculated according to WCAG 2.1 standards.
            </p>
            <p className="text-sm">
              Small text (under 18pt or 14pt bold) requires a minimum contrast ratio of 4.5:1 for AA compliance
              and 7:1 for AAA compliance.
            </p>
          </div>
        </div>

        {/* Results */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-candi-elevated p-6 rounded-softer border border-candi-border">
            <h3 className="text-lg font-semibold mb-4">Contrast Ratio</h3>
            <div className="text-5xl font-bold mb-2" style={{
              color: result.passes ? 'var(--candi-success)' : 'var(--candi-error)'
            }}>
              {result.ratio}:1
            </div>
            <p className="text-candi-subtle">
              {result.passes ? 'Meets WCAG standards' : 'Does not meet WCAG standards'}
            </p>
          </div>

          <div className="bg-candi-elevated p-6 rounded-softer border border-candi-border">
            <h3 className="text-lg font-semibold mb-4">WCAG Compliance</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span>Normal Text (AA)</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${result.passes
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-400'
                  }`}>
                  {result.passes ? 'Pass' : 'Fail'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Large Text (AA)</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${result.passesLarge
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-400'
                  }`}>
                  {result.passesLarge ? 'Pass' : 'Fail'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Overall Level</span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${result.level === 'AAA'
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:bg-opacity-30 dark:text-green-400'
                  : result.level.includes('AA')
                    ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:bg-opacity-30 dark:text-yellow-400'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:bg-opacity-30 dark:text-red-400'
                  }`}>
                  {result.level}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* WCAG Guidelines */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="bg-candi-surface border border-candi-border rounded-softer p-8">
          <h2 className="text-2xl font-bold mb-4">WCAG 2.1 Standards</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2 text-candi-accent">Level AA (Minimum)</h3>
              <ul className="space-y-2 text-candi-subtle text-sm">
                <li>• Normal text: 4.5:1 contrast ratio</li>
                <li>• Large text (18pt+): 3:1 contrast ratio</li>
                <li>• Required for most websites and applications</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-candi-secondary">Level AAA (Enhanced)</h3>
              <ul className="space-y-2 text-candi-subtle text-sm">
                <li>• Normal text: 7:1 contrast ratio</li>
                <li>• Large text (18pt+): 4.5:1 contrast ratio</li>
                <li>• Recommended for maximum accessibility</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-candi-surface border border-candi-border rounded-softer p-8">
          <h2 className="text-2xl font-bold mb-4">Text Size Guidelines</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Normal Text</h3>
              <p className="text-candi-subtle text-sm mb-2">
                Text smaller than 18pt (or 14pt bold) requires higher contrast ratios.
              </p>
              <div className="flex items-baseline gap-2">
                <span style={{ color: fg.oklch, backgroundColor: bg.oklch }} className="px-3 py-1 rounded border">
                  16px Regular
                </span>
                <span style={{ color: fg.oklch, backgroundColor: bg.oklch }} className="px-3 py-1 rounded border font-bold">
                  14px Bold
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Large Text</h3>
              <p className="text-candi-subtle text-sm mb-2">
                Text 18pt or larger (or 14pt bold or larger) can use lower contrast ratios.
              </p>
              <div className="flex items-baseline gap-2">
                <span style={{ color: fg.oklch, backgroundColor: bg.oklch }} className="px-3 py-1 rounded border text-xl">
                  18px Regular
                </span>
                <span style={{ color: fg.oklch, backgroundColor: bg.oklch }} className="px-3 py-1 rounded border text-lg font-bold">
                  14px Bold
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Combinations */}
      <div className="bg-candi-surface border border-candi-border rounded-softer p-8">
        <h2 className="text-2xl font-bold mb-6">Recommended Color Combinations</h2>
        <p className="text-candi-subtle mb-6">
          These color pairs from the Candi palette meet WCAG AA standards or higher:
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(mode === 'light' ? [
            { fg: 'text', bg: 'bg', label: 'Text on Background' },
            { fg: 'text', bg: 'surface', label: 'Text on Surface' },
            { fg: 'text', bg: 'elevated', label: 'Text on Elevated' },
            { fg: 'textSubtle', bg: 'bg', label: 'Subtle on Background' },
            { fg: 'accent', bg: 'bg', label: 'Accent on Background' },
            { fg: 'secondary', bg: 'bg', label: 'Secondary on Background' },
          ] : [
            { fg: 'text', bg: 'bg', label: 'Text on Background' },
            { fg: 'text', bg: 'surface', label: 'Text on Surface' },
            { fg: 'text', bg: 'elevated', label: 'Text on Elevated' },
            { fg: 'textSubtle', bg: 'bg', label: 'Subtle on Background' },
            { fg: 'accent', bg: 'bg', label: 'Accent on Background' },
            { fg: 'secondary', bg: 'bg', label: 'Secondary on Background' },
          ]).map((combo, i) => {
            const fgClr = colors[combo.fg];
            const bgClr = colors[combo.bg];
            const comboResult = checkAccessibility(fgClr, bgClr);

            return (
              <div
                key={i}
                className="p-6 rounded-soft border border-candi-border cursor-pointer hover:shadow-hygge transition-shadow"
                style={{ backgroundColor: bgClr.oklch, color: fgClr.oklch }}
                onClick={() => {
                  setFgColor(combo.fg);
                  setBgColor(combo.bg);
                }}
              >
                <div className="font-semibold mb-2">{combo.label}</div>
                <div className="text-sm opacity-80">
                  Contrast: {comboResult.ratio}:1
                </div>
                <div className="text-xs opacity-70 mt-1">
                  {comboResult.level}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Accessibility Tips */}
      <div className="mt-8 bg-candi-accent-subtle border border-candi-accent rounded-softer p-8">
        <h2 className="text-2xl font-bold mb-4 text-candi-accent">Accessibility Best Practices</h2>
        <ul className="space-y-3 text-candi-text">
          <li className="flex items-start gap-3">
            <span className="text-candi-accent text-xl">✓</span>
            <span>Always test color combinations before deploying to production</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-candi-accent text-xl">✓</span>
            <span>Use text colors on appropriate backgrounds (e.g., text on bg, not on accent)</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-candi-accent text-xl">✓</span>
            <span>Don't rely on color alone to convey information; use icons, labels, or patterns</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-candi-accent text-xl">✓</span>
            <span>Test your designs with actual screen readers and keyboard navigation</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-candi-accent text-xl">✓</span>
            <span>Consider users with color vision deficiencies by ensuring sufficient contrast</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
