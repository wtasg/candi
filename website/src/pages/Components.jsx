import { useState } from 'react'
import CandiButton from '../components/Button'

export default function Components() {
  const [showCode, setShowCode] = useState({});

  const toggleCode = (component) => {
    setShowCode(prev => ({ ...prev, [component]: !prev[component] }));
  };

  const ButtonSection = () => {
    const colors = ['primary', 'secondary', 'success', 'info', 'warning', 'error'];
    const rows = [
      { label: 'Normal (Medium)', props: { size: 'medium' } },
      { label: 'Small', props: { size: 'small' } },
      { label: 'Large', props: { size: 'large' } },
      { label: 'Full Width', props: { fullWidth: true } },
      { label: 'Disabled', props: { disabled: true } },
    ];

    return (
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        <div className="bg-candi-surface border border-candi-border rounded-softer p-8 overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr>
                <th className="p-4 text-sm font-semibold text-candi-subtle">State / Size</th>
                {colors.map(color => (
                  <th key={color} className="p-4 text-sm font-semibold text-candi-subtle capitalize text-center">
                    {color}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label} className="border-t border-candi-border">
                  <td className="p-4 font-medium text-candi-text whitespace-nowrap">{row.label}</td>
                  {colors.map(color => (
                    <td key={`${row.label}-${color}`} className="p-4 text-center">
                      <CandiButton variant={color} {...row.props}>
                        Button
                      </CandiButton>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8">
            <button
              onClick={() => toggleCode('button')}
              className="text-sm text-candi-accent hover:underline mb-2"
            >
              {showCode.button ? 'Hide Code' : 'Show Code'}
            </button>

            {showCode.button && (
              <pre className="text-sm bg-candi-elevated p-4 rounded-soft overflow-x-auto">
                <code>{`{/* Sizes */}
<Button variant="primary" size="small">Small</Button>
<Button variant="primary" size="medium">Medium</Button>
<Button variant="primary" size="large">Large</Button>

{/* States */}
<Button variant="primary" fullWidth>Full Width</Button>
<Button variant="primary" disabled>Disabled</Button>`}</code>
              </pre>
            )}
          </div>
        </div>
      </div>
    );
  };

  const Card = () => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Cards</h2>
      <div className="bg-candi-surface border border-candi-border rounded-softer p-8">
        <div className="grid md:grid-cols-3 gap-6 mb-4">
          <div className="bg-candi-elevated border border-candi-border rounded-softer p-6 shadow-hygge">
            <div className="w-12 h-12 rounded-soft bg-candi-accent-subtle flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-candi-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Fast Performance</h3>
            <p className="text-candi-subtle text-sm">Lightning quick load times and smooth interactions.</p>
          </div>

          <div className="bg-candi-elevated border border-candi-border rounded-softer p-6 shadow-hygge">
            <div className="w-12 h-12 rounded-soft bg-candi-secondary-subtle flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-candi-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure by Default</h3>
            <p className="text-candi-subtle text-sm">Built with security best practices in mind.</p>
          </div>

          <div className="bg-candi-elevated border border-candi-border rounded-softer p-6 shadow-hygge">
            <div className="w-12 h-12 rounded-soft flex items-center justify-center mb-4" style={{ backgroundColor: 'oklch(85% 0.04 145)' }}>
              <svg className="w-6 h-6 text-candi-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-2">Accessible</h3>
            <p className="text-candi-subtle text-sm">WCAG compliant with excellent contrast ratios.</p>
          </div>
        </div>

        <button
          onClick={() => toggleCode('card')}
          className="text-sm text-candi-accent hover:underline"
        >
          {showCode.card ? 'Hide Code' : 'Show Code'}
        </button>

        {showCode.card && (
          <pre className="mt-4 text-sm">
            <code>{`<div className="bg-candi-elevated border border-candi-border rounded-softer p-6 shadow-hygge">
  <div className="w-12 h-12 rounded-soft bg-candi-accent-subtle flex items-center justify-center mb-4">
    {/* Icon */}
  </div>
  <h3 className="text-lg font-semibold mb-2">Card Title</h3>
  <p className="text-candi-subtle text-sm">Card description goes here.</p>
</div>`}</code>
          </pre>
        )}
      </div>
    </div>
  );

  const Input = () => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Form Inputs</h2>
      <div className="bg-candi-surface border border-candi-border rounded-softer p-8">
        <div className="max-w-md space-y-6 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Text Input</label>
            <input
              type="text"
              placeholder="Enter text..."
              className="w-full px-4 py-3 bg-candi-elevated border border-candi-border rounded-soft focus:outline-none focus:ring-2 focus:ring-candi-accent transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email Input</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-candi-elevated border border-candi-border rounded-soft focus:outline-none focus:ring-2 focus:ring-candi-accent transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Textarea</label>
            <textarea
              rows="4"
              placeholder="Enter your message..."
              className="w-full px-4 py-3 bg-candi-elevated border border-candi-border rounded-soft focus:outline-none focus:ring-2 focus:ring-candi-accent transition-colors resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Select</label>
            <select className="w-full px-4 py-3 bg-candi-elevated border border-candi-border rounded-soft focus:outline-none focus:ring-2 focus:ring-candi-accent transition-colors">
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="checkbox"
              className="w-4 h-4 rounded border-candi-border text-candi-accent focus:ring-candi-accent"
            />
            <label htmlFor="checkbox" className="text-sm">I agree to the terms and conditions</label>
          </div>
        </div>

        <button
          onClick={() => toggleCode('input')}
          className="text-sm text-candi-accent hover:underline"
        >
          {showCode.input ? 'Hide Code' : 'Show Code'}
        </button>

        {showCode.input && (
          <pre className="mt-4 text-sm">
            <code>{`<input
  type="text"
  placeholder="Enter text..."
  className="w-full px-4 py-3 bg-candi-elevated border border-candi-border rounded-soft focus:outline-none focus:ring-2 focus:ring-candi-accent transition-colors"
/>

<textarea
  rows="4"
  placeholder="Enter your message..."
  className="w-full px-4 py-3 bg-candi-elevated border border-candi-border rounded-soft focus:outline-none focus:ring-2 focus:ring-candi-accent transition-colors resize-none"
/>`}</code>
          </pre>
        )}
      </div>
    </div>
  );

  const Badge = () => (
    <div className="mb-12">
      <h2 className="text-2xl font-bold mb-4">Badges</h2>
      <div className="bg-candi-surface border border-candi-border rounded-softer p-8">
        <div className="flex flex-wrap gap-3 mb-4">
          <span className="px-3 py-1 bg-candi-accent-subtle text-candi-accent text-sm font-medium rounded-full">
            Accent
          </span>
          <span className="px-3 py-1 bg-candi-secondary-subtle text-candi-secondary text-sm font-medium rounded-full">
            Secondary
          </span>
          <span className="px-3 py-1 text-candi-success text-sm font-medium rounded-full" style={{ backgroundColor: 'oklch(85% 0.04 145)' }}>
            Success
          </span>
          <span className="px-3 py-1 text-candi-warning text-sm font-medium rounded-full" style={{ backgroundColor: 'oklch(95% 0.04 70)' }}>
            Warning
          </span>
          <span className="px-3 py-1 text-candi-error text-sm font-medium rounded-full" style={{ backgroundColor: 'oklch(95% 0.04 25)' }}>
            Error
          </span>
        </div>

        <button
          onClick={() => toggleCode('badge')}
          className="text-sm text-candi-accent hover:underline"
        >
          {showCode.badge ? 'Hide Code' : 'Show Code'}
        </button>

        {showCode.badge && (
          <pre className="mt-4 text-sm">
            <code>{`<span className="px-3 py-1 bg-candi-accent-subtle text-candi-accent text-sm font-medium rounded-full">
  Accent
</span>`}</code>
          </pre>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Component Playground</h1>
        <p className="text-xl text-candi-subtle">
          Interactive showcase of all UI components with live previews and code samples.
        </p>
      </div>

      <ButtonSection />
      <Card />
      <Input />
      <Badge />

      {/* Alert Component */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-4">Alerts</h2>
        <div className="bg-candi-surface border border-candi-border rounded-softer p-8">
          <div className="space-y-4">
            <div className="p-4 bg-candi-info-subtle border border-candi-info rounded-soft">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-candi-info flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-candi-info mb-1">Information</h4>
                  <p className="text-sm text-candi-text">This is an informational alert message.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-candi-success-subtle border border-candi-success rounded-soft">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-candi-success flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-candi-success mb-1">Success</h4>
                  <p className="text-sm text-candi-text">Your changes have been saved successfully.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-candi-warning-subtle border border-candi-warning rounded-soft">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-candi-warning flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-candi-warning mb-1">Warning</h4>
                  <p className="text-sm text-candi-text">Please review your input before proceeding.</p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-candi-error-subtle border border-candi-error rounded-soft">
              <div className="flex gap-3">
                <svg className="w-5 h-5 text-candi-error flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="font-semibold text-candi-error mb-1">Error</h4>
                  <p className="text-sm text-candi-text">An error occurred while processing your request.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
