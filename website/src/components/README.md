# Candi Components

A comprehensive collection of reusable React components for the Candi Design System.

## Available Components

### Layout & Container

- **Card** - Versatile container component with variants (elevated, surface, flat)
- **Accordion** - Collapsible content sections with single or multiple expansion

### Navigation

- **Breadcrumb** - Navigation breadcrumbs with customizable separators
- **Tabs** - Tabbed interface for organizing content

### Buttons & Actions

- **Button** - Multi-variant button (primary, secondary, outline, ghost, success, error, warning)
- **Tooltip** - Hover tooltips with position control (top, bottom, left, right)

### Forms & Inputs

- **Input** - Text input with label, validation, and helper text
- **Select** - Dropdown select with options
- **Checkbox** - Checkbox input with label

### Feedback & Status

- **Alert** - Notification alerts (info, success, warning, error) with dismissible option
- **Badge** - Status badges and labels with multiple variants
- **Progress** - Progress bars with different colors and sizes
- **Spinner** - Loading spinners in various sizes
- **Skeleton** - Loading placeholders (text, title, circle, rectangle, card, list)

### Overlay

- **Modal** - Dialog modals with header, content, and footer support

## Usage

Import components individually or all at once:

```jsx
// Individual imports
import Button from './components/Button'
import Card from './components/Card'

// Bulk import
import { Button, Card, Alert, Modal } from './components'
```

### Examples

#### Button

```jsx
<Button variant="primary" size="medium" onClick={handleClick}>
  Click Me
</Button>

<Button variant="outline" fullWidth disabled>
  Disabled Button
</Button>
```

#### Card

```jsx
<Card
  title="Card Title"
  icon={<IconComponent />}
  footer={<Button>Action</Button>}
  variant="elevated"
>
  Card content goes here
</Card>
```

#### Input

```jsx
<Input
  label="Email"
  type="email"
  placeholder="email@example.com"
  helperText="We'll never share your email"
  fullWidth
/>

<Input
  label="Username"
  error="This field is required"
  required
/>
```

#### Modal

```jsx
<Modal
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  title="Confirm Action"
  size="medium"
  footer={
    <>
      <Button variant="outline" onClick={onCancel}>Cancel</Button>
      <Button variant="primary" onClick={onConfirm}>Confirm</Button>
    </>
  }
>
  Are you sure you want to proceed?
</Modal>
```

#### Alert

```jsx
<Alert variant="success" title="Success" dismissible onDismiss={handleDismiss}>
  Your changes have been saved!
</Alert>

<Alert variant="error" title="Error">
  Something went wrong. Please try again.
</Alert>
```

#### Tabs

```jsx
<Tabs
  tabs={[
    { id: 'tab1', label: 'Tab 1', content: <div>Content 1</div> },
    { id: 'tab2', label: 'Tab 2', content: <div>Content 2</div> },
  ]}
  defaultTab="tab1"
  onChange={(tabId) => console.log('Tab changed:', tabId)}
/>
```

#### Accordion

```jsx
<Accordion
  items={[
    { id: '1', title: 'Section 1', content: <p>Content 1</p> },
    { id: '2', title: 'Section 2', content: <p>Content 2</p> },
  ]}
  allowMultiple={false}
  defaultOpen={['1']}
/>
```

#### Progress

```jsx
<Progress value={75} max={100} color="accent" showLabel label="Upload Progress" />
```

#### Skeleton

```jsx
// Basic skeleton
<Skeleton variant="text" width="200px" />
<Skeleton variant="circle" width="48px" height="48px" />

// Composite skeletons
<SkeletonCard />
<SkeletonList count={5} />
```

## Props Reference

All components support:

- Standard HTML attributes via `...props`
- `className` prop for custom styling
- Appropriate ARIA attributes for accessibility

### Common Patterns

#### Size Props

- `small`, `medium`, `large`

#### Variant Props

- Buttons: `primary`, `secondary`, `outline`, `ghost`, `success`, `error`, `warning`
- Badges: `default`, `accent`, `secondary`, `success`, `error`, `warning`, `info`
- Alerts: `info`, `success`, `warning`, `error`
- Cards: `elevated`, `surface`, `flat`

#### Full Width

Many form components support `fullWidth` prop to fill container width.

#### Disabled State

Form elements and buttons support `disabled` prop.

## Design Tokens

Components use Candi design tokens for colors and spacing:

- `candi-accent` - Primary accent color
- `candi-secondary` - Secondary color
- `candi-bg` - Background color
- `candi-surface` - Surface color
- `candi-elevated` - Elevated surface
- `candi-text` - Primary text
- `candi-subtle` - Subtle text
- `candi-border` - Border color
- `rounded-soft` - Soft border radius
- `rounded-softer` - Softer border radius
- `shadow-hygge` - Hygge-inspired shadow

## Accessibility

All components follow accessibility best practices:

- Proper ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- Semantic HTML structure

## Live Demo

Visit `/showcase` route to see all components in action with interactive examples.
