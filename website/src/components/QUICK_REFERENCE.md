# Candi Component Library - Quick Reference

## Component Overview

### 🎨 Display Components

#### Card

Container for grouping related content

- Variants: `elevated`, `surface`, `flat`
- Padding: `none`, `small`, `normal`, `large`
- Optional: title, icon, footer

#### Badge

Small status indicators and labels

- Variants: `default`, `accent`, `secondary`, `success`, `error`, `warning`, `info`
- Sizes: `small`, `medium`, `large`

#### Avatar

User profile pictures with status

- Sizes: `small`, `medium`, `large`, `xlarge`
- Status: `online`, `offline`, `busy`, `away`
- Includes `AvatarGroup` for multiple avatars

#### Divider

Visual separator between content

- Orientation: `horizontal`, `vertical`
- Spacing: `none`, `small`, `medium`, `large`
- Optional label

#### CodeBlock

Display code with syntax highlighting

- Copy button
- Line numbers (optional)
- Title and language indicator

---

### 🎯 Action Components

#### Button

Interactive buttons with multiple styles

- Variants: `primary`, `secondary`, `outline`, `ghost`, `success`, `error`, `warning`
- Sizes: `small`, `medium`, `large`
- States: `disabled`, `fullWidth`

#### Dropdown

Context menus and action lists

- Align: `left`, `right`, `center`
- Icons and shortcuts support
- Dividers between items
- Danger actions (red text)

---

### 📝 Form Components

#### Input

Single-line text input

- Types: `text`, `email`, `password`, etc.
- States: error, helper text, disabled
- Required field indicator

#### Textarea

Multi-line text input

- Configurable rows
- Resize: `none`, `vertical`, `horizontal`, `both`
- Error and helper text support

#### Select

Dropdown selection

- Custom options with labels and values
- Placeholder support
- Error and helper text

#### Checkbox

Binary choice input

- Label support
- Error state
- Disabled state

#### Switch

Toggle switch component

- Sizes: `small`, `medium`, `large`
- Label support
- On/off states

---

### 💬 Feedback Components

#### Alert

Important messages and notifications

- Variants: `info`, `success`, `warning`, `error`
- Optional title
- Dismissible with callback

#### Modal

Dialog overlays for focused content

- Sizes: `small`, `medium`, `large`, `full`
- Optional header and footer
- Escape key to close
- Backdrop click to close

#### Progress

Visual progress indicator

- Colors: `accent`, `secondary`, `success`, `warning`, `error`
- Sizes: `small`, `medium`, `large`
- Optional label and percentage

#### Spinner

Loading indicator

- Sizes: `small`, `medium`, `large`
- Colors: `accent`, `secondary`, `white`, `current`

#### Skeleton

Loading placeholders

- Variants: `text`, `title`, `circle`, `rectangle`
- Prebuilt: `SkeletonCard`, `SkeletonList`

#### Tooltip

Contextual help on hover

- Position: `top`, `bottom`, `left`, `right`
- Configurable delay

---

### 🧭 Navigation Components

#### Breadcrumb

Hierarchical navigation trail

- Custom separator
- Links to parent pages
- Current page highlighted

#### Tabs

Organize content in tabs

- Icons support (optional)
- Disabled tabs
- onChange callback

---

### 📦 Layout Components

#### Accordion

Collapsible content sections

- Single or multiple expansion
- Default open items
- Smooth animations

---

## Usage Patterns

### Import Components

```jsx
// Single component
import Button from './components/Button'

// Multiple components
import { Button, Card, Alert, Input } from './components'
```

### Common Patterns

#### Form with Validation

```jsx
<Card>
  <Input
    label="Email"
    type="email"
    error={errors.email}
    required
    fullWidth
  />
  <Button variant="primary" fullWidth>
    Submit
  </Button>
</Card>
```

#### Alert with Dismiss

```jsx
<Alert
  variant="success"
  title="Success!"
  dismissible
  onDismiss={() => console.log('dismissed')}
>
  Your changes have been saved.
</Alert>
```

#### Modal Dialog

```jsx
<Modal
  isOpen={open}
  onClose={() => setOpen(false)}
  title="Confirm Action"
  footer={
    <>
      <Button variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button variant="primary" onClick={onConfirm}>
        Confirm
      </Button>
    </>
  }
>
  Are you sure?
</Modal>
```

#### Dropdown Menu

```jsx
<Dropdown
  trigger={<Button>Actions</Button>}
  items={[
    { label: 'Edit', icon: <EditIcon />, onClick: onEdit },
    { label: 'Delete', danger: true, onClick: onDelete },
  ]}
/>
```

---

## Design Tokens Reference

### Colors

- **Primary**: `candi-accent`, `candi-secondary`
- **Backgrounds**: `candi-bg`, `candi-surface`, `candi-elevated`
- **Text**: `candi-text`, `candi-subtle`, `candi-muted`
- **Semantic**: `candi-success`, `candi-error`, `candi-warning`, `candi-info`
- **Borders**: `candi-border`, `candi-border-strong`

### Spacing

- **Rounded**: `rounded-soft`, `rounded-softer`
- **Shadow**: `shadow-hygge`

### States

- All interactive components support `:hover`, `:focus`, `:disabled`
- Focus rings use `candi-accent` with opacity

---

## Accessibility Features

✅ **Semantic HTML** - Proper element usage
✅ **ARIA Labels** - Screen reader support
✅ **Keyboard Navigation** - Tab, Enter, Escape
✅ **Focus Management** - Visible focus indicators
✅ **Color Contrast** - WCAG AA compliant
✅ **Form Labels** - Associated with inputs
✅ **Status Messages** - Live regions for alerts

---

## Component Combinations

### User Profile Card

```jsx
<Card>
  <div className="flex items-center gap-4">
    <Avatar size="large" fallback="JD" status="online" />
    <div>
      <h3 className="font-semibold">John Doe</h3>
      <Badge variant="accent">Premium</Badge>
    </div>
  </div>
</Card>
```

### Settings Form

```jsx
<Card title="Settings">
  <div className="space-y-6">
    <Switch label="Email notifications" />
    <Switch label="Push notifications" />
    <Divider />
    <Button variant="primary" fullWidth>
      Save Changes
    </Button>
  </div>
</Card>
```

### Loading State

```jsx
{loading ? (
  <SkeletonCard />
) : (
  <Card>{content}</Card>
)}
```

---

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

---

## Resources

- 📚 Full Documentation: `/showcase`
- 📦 Component Source: `src/components/`
- 🎨 Design Tokens: Candi CSS variables
- 🔧 Customization: Use `className` prop with Tailwind utilities

---

**Total Components: 22**
**Total Lines of Code: ~3,500**
**Bundle Size Impact: Minimal (tree-shakeable exports)**
