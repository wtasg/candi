import { useState } from 'react'
import {
  Accordion,
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumb,
  Button,
  ButtonGroup,
  ButtonWithOptions,
  Card,
  Checkbox,
  Divider,
  Dropdown,
  Input,
  Modal,
  Progress,
  Select,
  Skeleton,
  SkeletonCard,
  SkeletonList,
  Spinner,
  Switch,
  Tabs,
  Textarea,
  Tooltip,
} from '../components'

export default function ComponentShowcase() {
  const [modalOpen, setModalOpen] = useState(false)
  const [checkboxChecked, setCheckboxChecked] = useState(false)
  const [switchChecked, setSwitchChecked] = useState(false)
  const [selectValue, setSelectValue] = useState('')
  const [inputValue, setInputValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')

  const breadcrumbItems = [
    { label: 'Home', path: '/' },
    { label: 'Components', path: '/components' },
    { label: 'Showcase' },
  ]

  const accordionItems = [
    {
      id: 'item1',
      title: 'What is Candi?',
      content: 'Candi is a Nordic-inspired design system built with OKLCH color space for perceptual uniformity.',
    },
    {
      id: 'item2',
      title: 'How do I install it?',
      content: 'You can install Candi using npm: npm install @wtasnorg/candi',
    },
    {
      id: 'item3',
      title: 'What platforms are supported?',
      content: 'Candi supports Tailwind CSS, Flutter, VSCode, Vim, KDE, GNOME, Obsidian, and more.',
    },
  ]

  const tabsData = [
    {
      id: 'preview',
      label: 'Preview',
      content: <div className="p-4 bg-candi-surface rounded-soft">This is the preview tab content</div>,
    },
    {
      id: 'code',
      label: 'Code',
      content: <pre className="p-4 bg-candi-surface rounded-soft text-sm">{'<Button variant="primary">Click me</Button>'}</pre>,
    },
    {
      id: 'api',
      label: 'API',
      content: <div className="p-4 bg-candi-surface rounded-soft">API documentation goes here</div>,
    },
  ]

  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8">Component Showcase</h1>

      <Breadcrumb items={breadcrumbItems} className="mb-8" />

      {/* Buttons Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        <Card>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="success">Success</Button>
            <Button variant="error">Error</Button>
            <Button variant="warning">Warning</Button>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            <Button size="small">Small</Button>
            <Button size="medium">Medium</Button>
            <Button size="large">Large</Button>
          </div>
          <div className="mt-4">
            <Button fullWidth>Full Width Button</Button>
          </div>
          <div className="mt-4">
            <Button disabled>Disabled Button</Button>
          </div>
        </Card>
      </section>

      {/* Button Group Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Button Groups</h2>
        <Card>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">Horizontal (No Spacing)</h3>
              <ButtonGroup>
                <Button variant="outline">Left</Button>
                <Button variant="outline">Center</Button>
                <Button variant="outline">Right</Button>
              </ButtonGroup>
            </div>
            <Divider />
            <div>
              <h3 className="text-sm font-semibold mb-3">Horizontal with Spacing</h3>
              <ButtonGroup spacing="small">
                <Button>One</Button>
                <Button>Two</Button>
                <Button>Three</Button>
              </ButtonGroup>
            </div>
            <Divider />
            <div>
              <h3 className="text-sm font-semibold mb-3">Vertical</h3>
              <ButtonGroup orientation="vertical">
                <Button variant="outline">Top</Button>
                <Button variant="outline">Middle</Button>
                <Button variant="outline">Bottom</Button>
              </ButtonGroup>
            </div>
            <Divider />
            <div>
              <h3 className="text-sm font-semibold mb-3">Icon Buttons</h3>
              <ButtonGroup>
                <Button variant="outline">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </Button>
                <Button variant="outline">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </Button>
                <Button variant="outline">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </Button>
              </ButtonGroup>
            </div>
          </div>
        </Card>
      </section>

      {/* Button with Options Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Button with Options</h2>
        <Card>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">Basic Button with Options</h3>
              <ButtonWithOptions
                options={[
                  {
                    type: 'button',
                    label: 'Edit',
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    ),
                    onClick: () => alert('Edit clicked'),
                  },
                  {
                    type: 'button',
                    label: 'Duplicate',
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    ),
                    onClick: () => alert('Duplicate clicked'),
                  },
                  { divider: true },
                  {
                    type: 'button',
                    label: 'Delete',
                    icon: (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    ),
                    danger: true,
                    onClick: () => alert('Delete clicked'),
                  },
                ]}
              >
                Actions
              </ButtonWithOptions>
            </div>
            <Divider />
            <div>
              <h3 className="text-sm font-semibold mb-3">With Search</h3>
              <ButtonWithOptions
                variant="secondary"
                showSearch
                searchPlaceholder="Search actions..."
                options={[
                  { type: 'button', label: 'Profile Settings', shortcut: '⌘P' },
                  { type: 'button', label: 'Account Settings', shortcut: '⌘A' },
                  { type: 'button', label: 'Billing', badge: 'New' },
                  { type: 'button', label: 'Team', shortcut: '⌘T' },
                  { divider: true },
                  { type: 'button', label: 'Preferences', shortcut: '⌘,' },
                  { type: 'button', label: 'Keyboard Shortcuts', shortcut: '⌘K' },
                  { divider: true },
                  { type: 'button', label: 'Sign Out', danger: true },
                ]}
              >
                Settings
              </ButtonWithOptions>
            </div>
            <Divider />
            <div>
              <h3 className="text-sm font-semibold mb-3">With Custom Content</h3>
              <ButtonWithOptions
                variant="outline"
                options={[
                  {
                    type: 'custom',
                    content: (
                      <div className="py-2">
                        <p className="text-sm font-semibold mb-2">Quick Actions</p>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 text-xs bg-candi-accent text-white rounded-soft">
                            Create
                          </button>
                          <button className="px-3 py-1 text-xs bg-candi-secondary text-white rounded-soft">
                            Import
                          </button>
                          <button className="px-3 py-1 text-xs bg-candi-surface border border-candi-border rounded-soft">
                            Export
                          </button>
                        </div>
                      </div>
                    ),
                  },
                  { divider: true },
                  { type: 'button', label: 'View All', onClick: () => alert('View all') },
                ]}
              >
                More Options
              </ButtonWithOptions>
            </div>
          </div>
        </Card>
      </section>

      {/* Badges Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Badges</h2>
        <Card>
          <div className="flex flex-wrap gap-3">
            <Badge>Default</Badge>
            <Badge variant="accent">Accent</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="info">Info</Badge>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            <Badge size="small">Small</Badge>
            <Badge size="medium">Medium</Badge>
            <Badge size="large">Large</Badge>
          </div>
        </Card>
      </section>

      {/* Alerts Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Alerts</h2>
        <div className="space-y-4">
          <Alert variant="info" title="Information" dismissible>
            This is an informational alert with a dismiss button.
          </Alert>
          <Alert variant="success" title="Success">
            Your changes have been saved successfully!
          </Alert>
          <Alert variant="warning" title="Warning">
            Please review your input before proceeding.
          </Alert>
          <Alert variant="error" title="Error">
            An error occurred while processing your request.
          </Alert>
        </div>
      </section>

      {/* Cards Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Cards</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card
            title="Card with Title"
            icon={
              <svg className="w-6 h-6 text-candi-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            }
          >
            This card has a title and an icon.
          </Card>
          <Card variant="surface">
            <p>This is a surface variant card.</p>
          </Card>
          <Card
            variant="elevated"
            footer={
              <Button variant="primary" size="small" fullWidth>
                Action
              </Button>
            }
          >
            This card has a footer with an action button.
          </Card>
        </div>
      </section>

      {/* Form Elements Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Form Elements</h2>
        <Card>
          <div className="space-y-6">
            <Input
              label="Text Input"
              placeholder="Enter text..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              fullWidth
            />
            <Input
              label="Email Input"
              type="email"
              placeholder="email@example.com"
              helperText="We'll never share your email"
              fullWidth
            />
            <Input
              label="Error State"
              error="This field is required"
              fullWidth
            />
            <Select
              label="Select Option"
              options={selectOptions}
              value={selectValue}
              onChange={(e) => setSelectValue(e.target.value)}
              placeholder="Choose an option"
              fullWidth
            />
            <Checkbox
              label="I agree to the terms and conditions"
              checked={checkboxChecked}
              onChange={(e) => setCheckboxChecked(e.target.checked)}
            />
          </div>
        </Card>
      </section>

      {/* Modal Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Modal</h2>
        <Card>
          <Button onClick={() => setModalOpen(true)}>Open Modal</Button>
          <Modal
            isOpen={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Example Modal"
            footer={
              <div className="flex gap-3 justify-end">
                <Button variant="outline" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={() => setModalOpen(false)}>
                  Confirm
                </Button>
              </div>
            }
          >
            <p>This is the modal content. You can put any content here.</p>
          </Modal>
        </Card>
      </section>

      {/* Progress Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Progress Bars</h2>
        <Card>
          <div className="space-y-6">
            <Progress value={25} label="Upload Progress" showLabel />
            <Progress value={50} color="secondary" showLabel />
            <Progress value={75} color="success" showLabel />
            <Progress value={100} color="accent" showLabel />
          </div>
        </Card>
      </section>

      {/* Spinner Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Spinners</h2>
        <Card>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <Spinner size="small" />
              <p className="text-sm text-candi-subtle mt-2">Small</p>
            </div>
            <div className="text-center">
              <Spinner size="medium" />
              <p className="text-sm text-candi-subtle mt-2">Medium</p>
            </div>
            <div className="text-center">
              <Spinner size="large" />
              <p className="text-sm text-candi-subtle mt-2">Large</p>
            </div>
            <div className="text-center">
              <Spinner color="secondary" />
              <p className="text-sm text-candi-subtle mt-2">Secondary</p>
            </div>
          </div>
        </Card>
      </section>

      {/* Tabs Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Tabs</h2>
        <Card padding="none">
          <Tabs tabs={tabsData} />
        </Card>
      </section>

      {/* Tooltip Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Tooltips</h2>
        <Card>
          <div className="flex flex-wrap gap-4">
            <Tooltip content="This is a top tooltip" position="top">
              <Button>Hover me (top)</Button>
            </Tooltip>
            <Tooltip content="This is a bottom tooltip" position="bottom">
              <Button>Hover me (bottom)</Button>
            </Tooltip>
            <Tooltip content="This is a left tooltip" position="left">
              <Button>Hover me (left)</Button>
            </Tooltip>
            <Tooltip content="This is a right tooltip" position="right">
              <Button>Hover me (right)</Button>
            </Tooltip>
          </div>
        </Card>
      </section>

      {/* Accordion Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Accordion</h2>
        <Accordion items={accordionItems} defaultOpen={['item1']} />
      </section>

      {/* Skeleton Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Skeleton Loaders</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Card Skeleton</h3>
            <SkeletonCard />
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">List Skeleton</h3>
            <SkeletonList count={3} />
          </div>
        </div>
      </section>

      {/* Avatar Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Avatars</h2>
        <Card>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold mb-3">Sizes</h3>
              <div className="flex items-center gap-4">
                <Avatar size="small" fallback="JD" />
                <Avatar size="medium" fallback="JD" />
                <Avatar size="large" fallback="JD" />
                <Avatar size="xlarge" fallback="JD" />
              </div>
            </div>
            <Divider />
            <div>
              <h3 className="text-sm font-semibold mb-3">Status Indicators</h3>
              <div className="flex items-center gap-4">
                <Avatar fallback="JD" status="online" />
                <Avatar fallback="JD" status="offline" />
                <Avatar fallback="JD" status="busy" />
                <Avatar fallback="JD" status="away" />
              </div>
            </div>
            <Divider />
            <div>
              <h3 className="text-sm font-semibold mb-3">Avatar Group</h3>
              <AvatarGroup
                avatars={[
                  { fallback: 'JD' },
                  { fallback: 'AS' },
                  { fallback: 'KM' },
                  { fallback: 'LB' },
                  { fallback: 'RP' },
                ]}
                max={3}
              />
            </div>
          </div>
        </Card>
      </section>

      {/* Dropdown Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Dropdown</h2>
        <Card>
          <div className="flex gap-4">
            <Dropdown
              trigger={<Button>Open Menu</Button>}
              items={[
                {
                  label: 'Edit',
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  ),
                  onClick: () => alert('Edit clicked'),
                },
                {
                  label: 'Duplicate',
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  ),
                  onClick: () => alert('Duplicate clicked'),
                },
                { divider: true },
                {
                  label: 'Delete',
                  icon: (
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  ),
                  onClick: () => alert('Delete clicked'),
                  danger: true,
                },
              ]}
            />
            <Dropdown
              trigger={<Button variant="outline">Right Aligned</Button>}
              align="right"
              items={[
                { label: 'Profile', shortcut: '⌘P' },
                { label: 'Settings', shortcut: '⌘,' },
                { divider: true },
                { label: 'Logout' },
              ]}
            />
          </div>
        </Card>
      </section>

      {/* Switch Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Switches</h2>
        <Card>
          <div className="space-y-4">
            <Switch
              label="Enable notifications"
              checked={switchChecked}
              onChange={(e) => setSwitchChecked(e.target.checked)}
            />
            <Switch label="Small switch" size="small" />
            <Switch label="Large switch" size="large" />
            <Switch label="Disabled switch" disabled />
          </div>
        </Card>
      </section>

      {/* Textarea Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Textarea</h2>
        <Card>
          <div className="space-y-6">
            <Textarea
              label="Message"
              placeholder="Enter your message..."
              value={textareaValue}
              onChange={(e) => setTextareaValue(e.target.value)}
              rows={4}
              fullWidth
            />
            <Textarea
              label="Description"
              helperText="Provide a detailed description"
              resize="none"
              fullWidth
            />
          </div>
        </Card>
      </section>

      {/* Divider Section */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-4">Dividers</h2>
        <Card>
          <div>Horizontal Divider</div>
          <Divider />
          <div>With label</div>
          <Divider label="OR" />
          <div>Different spacing</div>
          <Divider spacing="large" />
          <div className="flex items-center gap-4">
            <div>Vertical</div>
            <Divider orientation="vertical" />
            <div>Divider</div>
          </div>
        </Card>
      </section>    </div>
  )
}
