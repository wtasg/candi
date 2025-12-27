# Website Components Update

## Summary

Successfully added a comprehensive component library to the Candi website with 20+ reusable React components.

## New Components Created

### Core Components (15)

1. **Accordion** - Collapsible content sections
2. **Alert** - Notification messages with variants (info, success, warning, error)
3. **Avatar** - User profile pictures with status indicators
4. **AvatarGroup** - Multiple avatars display
5. **Badge** - Status badges and labels
6. **Breadcrumb** - Navigation breadcrumbs
7. **Button** - Multi-variant buttons
8. **Card** - Content containers
9. **Checkbox** - Checkbox inputs
10. **Divider** - Visual separators (horizontal/vertical)
11. **Dropdown** - Menu dropdowns with icons
12. **Input** - Text inputs with validation
13. **Modal** - Dialog overlays
14. **Progress** - Progress bars
15. **Select** - Dropdown selections

### Additional Components (5)

1. **Skeleton** - Loading placeholders (+ SkeletonCard, SkeletonList)
2. **Spinner** - Loading spinners
3. **Switch** - Toggle switches
4. **Tabs** - Tabbed interface
5. **Textarea** - Multi-line text input
6. **Tooltip** - Hover tooltips

## New Files Structure

```
website/src/
├── components/
│   ├── Accordion.jsx
│   ├── Alert.jsx
│   ├── Avatar.jsx
│   ├── Badge.jsx
│   ├── Breadcrumb.jsx
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Checkbox.jsx
│   ├── Divider.jsx
│   ├── Dropdown.jsx
│   ├── Input.jsx
│   ├── Modal.jsx
│   ├── Progress.jsx
│   ├── README.md
│   ├── Select.jsx
│   ├── Skeleton.jsx
│   ├── Spinner.jsx
│   ├── Switch.jsx
│   ├── Tabs.jsx
│   ├── Textarea.jsx
│   ├── Tooltip.jsx
│   └── index.js (barrel export)
└── pages/
    └── ComponentShowcase.jsx (new demo page)
```

## Features

### Component Features

- **Variants**: Multiple visual styles per component (primary, secondary, success, error, etc.)
- **Sizes**: Small, medium, large options for most components
- **States**: Disabled, error, loading states
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Responsive**: Mobile-friendly designs
- **Theming**: Uses Candi design tokens (colors, spacing, shadows)

### PropTypes Validation

- All components include PropTypes for type checking
- Comprehensive prop documentation in component files

### Barrel Export

- Central `index.js` for easy imports
- Import multiple components from one location

## Usage Examples

```jsx
// Single import
import Button from './components/Button'

// Multiple imports
import { Button, Card, Alert } from './components'

// Usage
<Button variant="primary" size="medium">
  Click Me
</Button>
```

## New Route

Added `/showcase` route displaying all components with interactive examples:

- Live component demos
- Different variants and configurations
- Form state management examples
- Interactive elements (modals, dropdowns, etc.)

## Updated Files

1. **src/App.jsx** - Added ComponentShowcase route and navigation
2. **src/components/index.js** - Barrel export for all components
3. **src/pages/ComponentShowcase.jsx** - Comprehensive demo page

## Design Tokens Used

Components leverage Candi's design system:

- `candi-accent`, `candi-secondary` - Brand colors
- `candi-bg`, `candi-surface`, `candi-elevated` - Background layers
- `candi-text`, `candi-subtle`, `candi-muted` - Text hierarchy
- `candi-border`, `candi-border-strong` - Borders
- `candi-success`, `candi-error`, `candi-warning`, `candi-info` - Semantic colors
- `rounded-soft`, `rounded-softer` - Border radius
- `shadow-hygge` - Nordic-inspired shadows

## Accessibility Features

- Semantic HTML elements
- ARIA attributes (roles, labels, expanded states)
- Keyboard navigation (Escape to close, Tab navigation)
- Focus management and visible focus styles
- Screen reader text for icon-only elements
- Proper form labels and validation messages

## Next Steps

To use these components:

1. Navigate to `/showcase` to see all components in action
2. Import components as needed in your pages
3. Customize using className prop or extend with Tailwind utilities
4. Refer to components/README.md for detailed documentation

## Testing

To test the new components:

```bash
cd website
npm run dev
```

Navigate to `http://localhost:5173/showcase` to see the component showcase.
