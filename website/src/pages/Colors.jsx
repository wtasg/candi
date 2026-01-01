import { useState } from 'react'
import palette from '@wtasnorg/candi/colors'
import { oklchToHex, oklchToRgb } from '../utils/colorUtils'

export default function Colors() {
  const [mode, setMode] = useState('light');
  const [selectedColor, setSelectedColor] = useState(null);

  const colors = palette[mode];

  const categories = [
    {
      title: 'Semantic Anchors',
      description: 'The core hand-tuned colors that drive the system. All other semantic colors are derived from these.',
      keys: ['accent', 'secondary', 'success', 'warning', 'error', 'info']
    },
    {
      title: 'Derived Variants',
      description: 'Programmatically generated variants (Subtle, Soft, Strong, Outline) enforcing strict offsets and gamut correction.',
      keys: [
        'accentSubtle', 'accentSoft', 'accentStrong', 'accentOutline', 'onAccent',
        'secondarySubtle', 'secondarySoft', 'secondaryStrong', 'secondaryOutline', 'onSecondary',
        'warningSubtle', 'warningSoft', 'warningStrong', 'warningOutline', 'onWarning'
      ]
    },
    {
      title: 'Structural Neutrals',
      description: 'Hand-tuned neutral tones for backgrounds, surfaces, and text.',
      keys: ['bg', 'surface', 'elevated', 'text', 'textSubtle', 'textMuted', 'border', 'borderStrong', 'divider']
    },
    {
      title: 'Extended Syntax',
      description: 'Rich colors designed for code highlighting and semantic representation.',
      keys: ['syntaxKeyword', 'syntaxType', 'syntaxVar', 'syntaxConst', 'syntaxFunc', 'syntaxString']
    },
    {
      title: 'UI Feedback',
      description: 'Dynamic colors for interactive states and feedback.',
      keys: ['hover', 'active']
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Color Palette</h1>
        <p className="text-xl text-candi-subtle mb-6">
          Interactive explorer showcasing all Candi color tokens via OKLCH, hex, and RGB.
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => setMode('light')}
            className={`px-6 py-3 rounded-soft font-medium transition-colors ${mode === 'light'
              ? 'bg-candi-accent text-white'
              : 'bg-candi-surface text-candi-text hover:bg-candi-border'
              }`}
          >
            Light Mode
          </button>
          <button
            onClick={() => setMode('dark')}
            className={`px-6 py-3 rounded-soft font-medium transition-colors ${mode === 'dark'
              ? 'bg-candi-accent text-white'
              : 'bg-candi-surface text-candi-text hover:bg-candi-border'
              }`}
          >
            Dark Mode
          </button>
        </div>
      </div>

      {categories.map((cat) => (
        <section key={cat.title} className="mb-16">
          <div className="mb-8 border-l-4 border-candi-accent pl-6">
            <h2 className="text-2xl font-bold mb-2">{cat.title}</h2>
            <p className="text-candi-subtle">{cat.description}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cat.keys.map((key) => {
              const value = colors[key];
              if (!value) return null;

              const hex = oklchToHex(value.l, value.c, value.h);
              const rgb = oklchToRgb(value.l, value.c, value.h);

              return (
                <div
                  key={key}
                  onClick={() => setSelectedColor({ key, ...value, hex, rgb })}
                  className="bg-candi-surface border border-candi-border rounded-softer overflow-hidden cursor-pointer hover:shadow-hygge-md transition-shadow"
                >
                  <div
                    className="h-32 w-full"
                    style={{ backgroundColor: value.oklch }}
                  />
                  <div className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{value.name}</h3>
                    <p className="text-sm text-candi-subtle mb-4 h-10 line-clamp-2">{value.usage}</p>

                    <div className="space-y-2 text-sm font-mono">
                      <div className="flex justify-between">
                        <span className="text-candi-muted font-sans text-xs uppercase tracking-wider">OKLCH</span>
                        <span className="text-candi-text">{value.oklch}</span>
                      </div>
                      <div className="flex justify-between border-t border-candi-border/30 pt-1">
                        <span className="text-candi-muted font-sans text-xs uppercase tracking-wider">HEX</span>
                        <span className="text-candi-text">{hex}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      {/* Selected Color Detail Modal */}
      {selectedColor && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-6 z-50"
          onClick={() => setSelectedColor(null)}
        >
          <div
            className="bg-candi-elevated border border-candi-border rounded-softer max-w-2xl w-full p-8 shadow-hygge-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold">{selectedColor.name}</h2>
              <button
                onClick={() => setSelectedColor(null)}
                className="text-candi-muted hover:text-candi-text"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div
              className="h-48 w-full rounded-soft mb-6"
              style={{ backgroundColor: selectedColor.oklch }}
            />

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold mb-3">Color Values</h3>
                <div className="space-y-2">
                  <div className="bg-candi-surface p-3 rounded-soft">
                    <div className="text-xs text-candi-muted mb-1">OKLCH</div>
                    <code className="text-sm">{selectedColor.oklch}</code>
                  </div>
                  <div className="bg-candi-surface p-3 rounded-soft">
                    <div className="text-xs text-candi-muted mb-1">HEX</div>
                    <code className="text-sm">{selectedColor.hex}</code>
                  </div>
                  <div className="bg-candi-surface p-3 rounded-soft">
                    <div className="text-xs text-candi-muted mb-1">RGB</div>
                    <code className="text-sm">
                      rgb({selectedColor.rgb.r}, {selectedColor.rgb.g}, {selectedColor.rgb.b})
                    </code>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">OKLCH Components</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-candi-muted">Lightness</span>
                      <span className="font-mono">{selectedColor.l}%</span>
                    </div>
                    <div className="h-2 bg-candi-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-candi-accent"
                        style={{ width: `${selectedColor.l}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-candi-muted">Chroma</span>
                      <span className="font-mono">{selectedColor.c}</span>
                    </div>
                    <div className="h-2 bg-candi-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-candi-secondary"
                        style={{ width: `${(selectedColor.c / 0.4) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-candi-muted">Hue</span>
                      <span className="font-mono">{selectedColor.h}°</span>
                    </div>
                    <div className="relative h-2 bg-gradient-to-r from-red-500 via-green-500 to-blue-500 rounded-full">
                      <div
                        className="absolute w-1 h-2 bg-white border border-black rounded-sm"
                        style={{ left: `${(selectedColor.h / 360) * 100}%`, transform: 'translateX(-50%)' }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-candi-border pt-6">
              <h3 className="font-semibold mb-2">Usage</h3>
              <p className="text-candi-subtle mb-4">{selectedColor.usage}</p>

              <h3 className="font-semibold mb-2">Code Examples</h3>
              <div className="space-y-2">
                <div className="bg-candi-surface p-3 rounded-soft">
                  <div className="text-xs text-candi-muted mb-1">CSS Variable</div>
                  <code className="text-sm">var(--candi-{selectedColor.key.replace(/([A-Z])/g, '-$1').toLowerCase()})</code>
                </div>
                <div className="bg-candi-surface p-3 rounded-soft">
                  <div className="text-xs text-candi-muted mb-1">Tailwind Class</div>
                  <code className="text-sm">bg-candi-{selectedColor.key.replace(/([A-Z])/g, '-$1').toLowerCase()}</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OKLCH Explanation */}
      <div className="bg-candi-surface border border-candi-border rounded-softer p-8 mt-12">
        <h2 className="text-2xl font-bold mb-4">Why OKLCH?</h2>
        <div className="space-y-4 text-candi-subtle">
          <p>
            OKLCH is a perceptually uniform color space that ensures consistent brightness and contrast
            across all hues. Unlike RGB or HSL, colors with the same lightness value in OKLCH appear
            equally bright to the human eye.
          </p>
          <div className="grid md:grid-cols-3 gap-4 mt-6">
            <div className="bg-candi-elevated p-4 rounded-soft">
              <h3 className="font-semibold mb-2">Lightness (L)</h3>
              <p className="text-sm">Perceived brightness from 0% (black) to 100% (white)</p>
            </div>
            <div className="bg-candi-elevated p-4 rounded-soft">
              <h3 className="font-semibold mb-2">Chroma (C)</h3>
              <p className="text-sm">Color intensity or saturation, typically 0 to 0.4</p>
            </div>
            <div className="bg-candi-elevated p-4 rounded-soft">
              <h3 className="font-semibold mb-2">Hue (H)</h3>
              <p className="text-sm">Color type as an angle from 0° to 360°</p>
            </div>
          </div>
        </div>
      </div>
      {/* Naming Contract */}
      <div className="bg-candi-surface border border-candi-border rounded-softer p-8 mt-12">
        <h2 className="text-2xl font-bold mb-4">Naming Contract</h2>
        <div className="space-y-4 text-candi-subtle">
          <p>
            Candi enforces a strict naming convention to distinguish between internal logic and external usage:
          </p>
          <div className="grid md:grid-cols-2 gap-6 mt-4">
            <div className="bg-candi-elevated p-4 rounded-soft">
              <h3 className="font-semibold mb-2">Internal (JS/JSON)</h3>
              <code className="text-candi-accent font-mono">camelCase</code>
              <p className="text-sm mt-2">Used in generated JS/JSON files.</p>
              <div className="mt-2 text-xs font-mono text-candi-muted">
                warningSubtle, onAccent
              </div>
            </div>
            <div className="bg-candi-elevated p-4 rounded-soft">
              <h3 className="font-semibold mb-2">External (CSS)</h3>
              <code className="text-candi-secondary font-mono">kebab-case</code>
              <p className="text-sm mt-2">Used in CSS variables and classes.</p>
              <div className="mt-2 text-xs font-mono text-candi-muted">
                --candi-warning-subtle, .text-candi-on-accent
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
