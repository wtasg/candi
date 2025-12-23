export default function Philosophy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4">Design Philosophy</h1>
        <p className="text-xl text-candi-subtle">
          Candi is inspired by Nordic design principles that emphasize warmth, balance, and intentionality.
        </p>
      </div>

      {/* Hygge */}
      <div className="mb-16">
        <div className="bg-candi-surface border border-candi-border rounded-softer p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-softer bg-candi-accent-subtle flex items-center justify-center text-3xl">
              🕯️
            </div>
            <h2 className="text-3xl font-bold">Hygge</h2>
          </div>

          <p className="text-lg text-candi-subtle mb-6">
            Hygge (pronounced "hoo-gah") is a Danish concept that embodies coziness, comfort, and warmth. 
            It's about creating a welcoming atmosphere that makes people feel at ease.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Warmth in Design</h3>
              <p className="text-candi-subtle leading-relaxed">
                Candi uses warm color temperatures throughout the palette. Instead of stark whites and cold grays, 
                we employ soft creams and warm neutrals that feel inviting. The OKLCH color space allows us to 
                precisely control color temperature while maintaining visual harmony.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-candi-elevated p-6 rounded-soft border border-candi-border">
                <h4 className="font-semibold mb-2 text-candi-accent">Warm Whites</h4>
                <div className="h-16 rounded-soft mb-3" style={{backgroundColor: 'oklch(98% 0.008 85)'}}></div>
                <p className="text-sm text-candi-subtle">
                  Background colors with subtle warmth (hue ~85°) instead of pure white
                </p>
              </div>
              <div className="bg-candi-elevated p-6 rounded-soft border border-candi-border">
                <h4 className="font-semibold mb-2 text-candi-secondary">Soft Shadows</h4>
                <div className="h-16 rounded-soft mb-3 shadow-hygge-md bg-candi-surface"></div>
                <p className="text-sm text-candi-subtle">
                  Gentle shadows that add depth without harshness
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Comfortable Spacing</h3>
              <p className="text-candi-subtle leading-relaxed">
                Components in Candi have generous padding and breathing room. This creates a relaxed, 
                uncluttered experience that doesn't overwhelm users. The spacing scale is carefully calibrated 
                to provide visual comfort across different screen sizes.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lagom */}
      <div className="mb-16">
        <div className="bg-candi-surface border border-candi-border rounded-softer p-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-softer bg-candi-secondary-subtle flex items-center justify-center text-3xl">
              ⚖️
            </div>
            <h2 className="text-3xl font-bold">Lagom</h2>
          </div>

          <p className="text-lg text-candi-subtle mb-6">
            Lagom is a Swedish philosophy meaning "just the right amount" — not too much, not too little. 
            It's about finding balance and avoiding extremes in all aspects of design.
          </p>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3">Balanced Color Saturation</h3>
              <p className="text-candi-subtle leading-relaxed mb-4">
                Candi's colors are intentionally muted. Accent colors have moderate chroma values 
                (typically 0.06-0.12 in OKLCH), providing enough visual interest without being 
                overwhelming or garish.
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="h-16 rounded-soft mb-2" style={{backgroundColor: 'oklch(52% 0.06 230)'}}></div>
                  <p className="text-xs text-candi-subtle">Steel Blue<br/>C: 0.06</p>
                </div>
                <div>
                  <div className="h-16 rounded-soft mb-2" style={{backgroundColor: 'oklch(58% 0.12 55)'}}></div>
                  <p className="text-xs text-candi-subtle">Terracotta<br/>C: 0.12</p>
                </div>
                <div>
                  <div className="h-16 rounded-soft mb-2" style={{backgroundColor: 'oklch(52% 0.08 145)'}}></div>
                  <p className="text-xs text-candi-subtle">Sage<br/>C: 0.08</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Appropriate Contrast</h3>
              <p className="text-candi-subtle leading-relaxed">
                Text contrast is optimized for readability without being harsh. We aim for WCAG AA compliance 
                as a baseline, with many combinations exceeding AAA standards. The perceptual uniformity of 
                OKLCH helps ensure consistent readability across all color pairs.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-3">Minimal but Sufficient</h3>
              <p className="text-candi-subtle leading-relaxed">
                The design system includes only essential tokens and components. Each element serves a clear 
                purpose. There's no visual clutter or unnecessary decoration — every design decision is 
                intentional and serves the user's needs.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* OKLCH Connection */}
      <div className="bg-candi-elevated border border-candi-border rounded-softer p-10">
        <h2 className="text-2xl font-bold mb-4">Why OKLCH Enables These Principles</h2>
        
        <div className="space-y-6 text-candi-subtle">
          <div>
            <h3 className="text-lg font-semibold text-candi-text mb-2">Perceptual Uniformity</h3>
            <p className="leading-relaxed">
              OKLCH ensures that colors with the same lightness value appear equally bright to the human eye, 
              regardless of hue. This makes it easier to create balanced, harmonious palettes that embody Lagom.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-candi-text mb-2">Precise Control</h3>
            <p className="leading-relaxed">
              The separation of lightness, chroma, and hue allows designers to independently adjust warmth 
              (hue), vibrancy (chroma), and brightness (lightness). This precision helps maintain the 
              cozy warmth of Hygge across the entire palette.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-candi-text mb-2">Consistent Behavior</h3>
            <p className="leading-relaxed">
              OKLCH colors behave predictably when adjusted. Increasing lightness by 10% makes every color 
              perceptually 10% lighter, not more or less depending on the hue. This consistency is essential 
              for maintaining balance — the essence of Lagom.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-candi-text mb-2">Future-Proof</h3>
            <p className="leading-relaxed">
              OKLCH represents a wider color gamut than sRGB, making the design system ready for wide-gamut 
              displays. As technology evolves, Candi's colors will continue to look beautiful and balanced 
              on new devices.
            </p>
          </div>
        </div>
      </div>

      {/* Principles Summary */}
      <div className="mt-16 grid md:grid-cols-2 gap-8">
        <div className="bg-candi-accent-subtle p-8 rounded-softer border border-candi-accent">
          <h3 className="text-xl font-bold mb-4 text-candi-accent">Key Principles</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-candi-accent mt-1">✓</span>
              <span className="text-candi-text">Warmth over coldness</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-candi-accent mt-1">✓</span>
              <span className="text-candi-text">Balance over extremes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-candi-accent mt-1">✓</span>
              <span className="text-candi-text">Comfort over efficiency</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-candi-accent mt-1">✓</span>
              <span className="text-candi-text">Intentionality over decoration</span>
            </li>
          </ul>
        </div>

        <div className="bg-candi-secondary-subtle p-8 rounded-softer border border-candi-secondary">
          <h3 className="text-xl font-bold mb-4 text-candi-secondary">In Practice</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-candi-secondary mt-1">→</span>
              <span className="text-candi-text">Use warm neutrals (hue ~85°)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-candi-secondary mt-1">→</span>
              <span className="text-candi-text">Keep chroma moderate (0.06-0.12)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-candi-secondary mt-1">→</span>
              <span className="text-candi-text">Ensure WCAG AA compliance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-candi-secondary mt-1">→</span>
              <span className="text-candi-text">Generous spacing and padding</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
