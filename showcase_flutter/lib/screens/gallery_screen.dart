import 'package:flutter/material.dart';
import 'package:candi_colors/candi.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';
import '../widgets/section_header.dart';
import '../widgets/color_swatch_card.dart';

class GalleryScreen extends StatefulWidget {
  final bool isDarkMode;
  final VoidCallback onThemeToggle;

  const GalleryScreen({
    super.key,
    required this.isDarkMode,
    required this.onThemeToggle,
  });

  @override
  State<GalleryScreen> createState() => _GalleryScreenState();
}

class _GalleryScreenState extends State<GalleryScreen> {
  bool _checkboxValue = false;
  bool _switchValue = false;
  double _sliderValue = 0.5;
  int _radioValue = 0;

  CandiPalette get palette =>
      widget.isDarkMode ? CandiColors.dark : CandiColors.light;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Candi Showcase'),
        actions: [
          IconButton(
            icon: Icon(
              widget.isDarkMode
                  ? PhosphorIcons.sun(PhosphorIconsStyle.bold)
                  : PhosphorIcons.moon(PhosphorIconsStyle.bold),
            ),
            onPressed: widget.onThemeToggle,
            tooltip: widget.isDarkMode
                ? 'Switch to light mode'
                : 'Switch to dark mode',
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          _buildColorPaletteSection(),
          const SizedBox(height: 32),
          _buildButtonsSection(),
          const SizedBox(height: 32),
          _buildTypographySection(),
          const SizedBox(height: 32),
          _buildFormInputsSection(),
          const SizedBox(height: 32),
          _buildCardsSection(),
          const SizedBox(height: 32),
          _buildStatusSection(),
          const SizedBox(height: 32),
          _buildProgressSection(),
          const SizedBox(height: 32),
          _buildChipsSection(),
          const SizedBox(height: 64),
        ],
      ),
    );
  }

  Widget _buildColorPaletteSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SectionHeader(title: 'Color Palette'),
        const SizedBox(height: 16),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          children: [
            ColorSwatchCard(color: palette.bg, name: 'Background'),
            ColorSwatchCard(color: palette.surface, name: 'Surface'),
            ColorSwatchCard(color: palette.elevated, name: 'Elevated'),
            ColorSwatchCard(color: palette.text, name: 'Text'),
            ColorSwatchCard(color: palette.textSubtle, name: 'Text Subtle'),
            ColorSwatchCard(color: palette.textMuted, name: 'Text Muted'),
            ColorSwatchCard(color: palette.accent, name: 'Accent'),
            ColorSwatchCard(color: palette.accentSubtle, name: 'Accent Subtle'),
            ColorSwatchCard(color: palette.secondary, name: 'Secondary'),
            ColorSwatchCard(color: palette.success, name: 'Success'),
            ColorSwatchCard(color: palette.warning, name: 'Warning'),
            ColorSwatchCard(color: palette.error, name: 'Error'),
            ColorSwatchCard(color: palette.info, name: 'Info'),
            ColorSwatchCard(color: palette.border, name: 'Border'),
            ColorSwatchCard(color: palette.divider, name: 'Divider'),
          ],
        ),
        const SizedBox(height: 24),
        const SectionHeader(title: 'Primitive Colors'),
        const SizedBox(height: 16),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          children: [
            ColorSwatchCard(color: palette.red, name: 'Red'),
            ColorSwatchCard(color: palette.blue, name: 'Blue'),
            ColorSwatchCard(color: palette.green, name: 'Green'),
            ColorSwatchCard(color: palette.yellow, name: 'Yellow'),
            ColorSwatchCard(color: palette.magenta, name: 'Magenta'),
            ColorSwatchCard(color: palette.cyan, name: 'Cyan'),
            ColorSwatchCard(color: palette.teal, name: 'Teal'),
            ColorSwatchCard(color: palette.pink, name: 'Pink'),
            ColorSwatchCard(color: palette.gold, name: 'Gold'),
            ColorSwatchCard(color: palette.silver, name: 'Silver'),
          ],
        ),
      ],
    );
  }

  Widget _buildButtonsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SectionHeader(title: 'Buttons'),
        const SizedBox(height: 16),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          children: [
            ElevatedButton(onPressed: () {}, child: const Text('Primary')),
            ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: palette.secondary,
                foregroundColor: palette.onSecondary,
              ),
              child: const Text('Secondary'),
            ),
            ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: palette.success,
                foregroundColor: palette.onSuccess,
              ),
              child: const Text('Success'),
            ),
            ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: palette.warning,
                foregroundColor: palette.onWarning,
              ),
              child: const Text('Warning'),
            ),
            ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: palette.error,
                foregroundColor: palette.onError,
              ),
              child: const Text('Error'),
            ),
            ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                backgroundColor: palette.info,
                foregroundColor: palette.onInfo,
              ),
              child: const Text('Info'),
            ),
          ],
        ),
        const SizedBox(height: 16),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          children: [
            OutlinedButton(onPressed: () {}, child: const Text('Outlined')),
            TextButton(onPressed: () {}, child: const Text('Text Button')),
            IconButton(
              onPressed: () {},
              icon: Icon(PhosphorIcons.heart(PhosphorIconsStyle.fill)),
              tooltip: 'Favorite',
            ),
            ElevatedButton.icon(
              onPressed: () {},
              icon: Icon(PhosphorIcons.plus(PhosphorIconsStyle.bold)),
              label: const Text('Add Item'),
            ),
          ],
        ),
        const SizedBox(height: 16),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          children: [
            const ElevatedButton(onPressed: null, child: Text('Disabled')),
            FilledButton.tonal(onPressed: () {}, child: const Text('Tonal')),
          ],
        ),
      ],
    );
  }

  Widget _buildTypographySection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SectionHeader(title: 'Typography'),
        const SizedBox(height: 16),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  'Display Large',
                  style: Theme.of(context).textTheme.displayLarge,
                ),
                const SizedBox(height: 8),
                Text(
                  'Headline Medium',
                  style: Theme.of(context).textTheme.headlineMedium,
                ),
                const SizedBox(height: 8),
                Text(
                  'Title Large',
                  style: Theme.of(context).textTheme.titleLarge,
                ),
                const SizedBox(height: 8),
                Text(
                  'Body Large - Primary text color for main content.',
                  style: Theme.of(context).textTheme.bodyLarge,
                ),
                const SizedBox(height: 8),
                Text(
                  'Body Medium - Standard text for paragraphs and descriptions.',
                  style: Theme.of(context).textTheme.bodyMedium,
                ),
                const SizedBox(height: 8),
                Text(
                  'Body Small - Subtle text for secondary information.',
                  style: Theme.of(context).textTheme.bodySmall,
                ),
                const SizedBox(height: 8),
                Text(
                  'Label Medium - Used for labels and captions.',
                  style: Theme.of(context).textTheme.labelMedium,
                ),
                const SizedBox(height: 8),
                Text(
                  'Label Small - Muted text for tertiary content.',
                  style: Theme.of(context).textTheme.labelSmall,
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildFormInputsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SectionHeader(title: 'Form Inputs'),
        const SizedBox(height: 16),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const TextField(
                  decoration: InputDecoration(
                    labelText: 'Text Field',
                    hintText: 'Enter some text...',
                  ),
                ),
                const SizedBox(height: 16),
                TextField(
                  decoration: InputDecoration(
                    labelText: 'With Icon',
                    hintText: 'Search...',
                    prefixIcon: Icon(
                      PhosphorIcons.magnifyingGlass(PhosphorIconsStyle.regular),
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                TextField(
                  decoration: InputDecoration(
                    labelText: 'Error State',
                    errorText: 'This field is required',
                    prefixIcon: Icon(
                      PhosphorIcons.warningCircle(PhosphorIconsStyle.regular),
                      color: palette.error,
                    ),
                  ),
                ),
                const SizedBox(height: 24),
                Row(
                  children: [
                    Checkbox(
                      value: _checkboxValue,
                      onChanged: (value) =>
                          setState(() => _checkboxValue = value ?? false),
                    ),
                    const Text('Checkbox option'),
                  ],
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Switch(
                      value: _switchValue,
                      onChanged: (value) =>
                          setState(() => _switchValue = value),
                    ),
                    const SizedBox(width: 8),
                    const Text('Toggle switch'),
                  ],
                ),
                const SizedBox(height: 16),
                Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Radio Options'),
                    RadioGroup<int>(
                      groupValue: _radioValue,
                      onChanged: (value) =>
                          setState(() => _radioValue = value ?? 0),
                      child: Row(
                        children: [
                          Radio<int>(value: 0),
                          const Text('Option A'),
                          const SizedBox(width: 16),
                          Radio<int>(value: 1),
                          const Text('Option B'),
                        ],
                      ),
                    ),
                  ],
                ),
                const SizedBox(height: 16),
                Slider(
                  value: _sliderValue,
                  onChanged: (value) => setState(() => _sliderValue = value),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildCardsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SectionHeader(title: 'Cards'),
        const SizedBox(height: 16),
        Row(
          children: [
            Expanded(
              child: Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Icon(
                        PhosphorIcons.lightning(PhosphorIconsStyle.fill),
                        color: palette.accent,
                        size: 32,
                      ),
                      const SizedBox(height: 12),
                      Text(
                        'Card with Icon',
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'This card demonstrates the surface color with accent icon.',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                    ],
                  ),
                ),
              ),
            ),
            const SizedBox(width: 16),
            Expanded(
              child: Card(
                elevation: 4,
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Elevated Card',
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Higher elevation with shadow for emphasis.',
                        style: Theme.of(context).textTheme.bodySmall,
                      ),
                      const SizedBox(height: 12),
                      ElevatedButton(
                        onPressed: () {},
                        child: const Text('Action'),
                      ),
                    ],
                  ),
                ),
              ),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildStatusSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SectionHeader(title: 'Status & Alerts'),
        const SizedBox(height: 16),
        _buildAlertCard(
          icon: PhosphorIcons.checkCircle(PhosphorIconsStyle.fill),
          title: 'Success',
          message: 'Your changes have been saved successfully!',
          color: palette.success,
          bgColor: palette.successSubtle,
        ),
        const SizedBox(height: 12),
        _buildAlertCard(
          icon: PhosphorIcons.warning(PhosphorIconsStyle.fill),
          title: 'Warning',
          message: 'Please review your input before proceeding.',
          color: palette.warning,
          bgColor: palette.warningSubtle,
        ),
        const SizedBox(height: 12),
        _buildAlertCard(
          icon: PhosphorIcons.xCircle(PhosphorIconsStyle.fill),
          title: 'Error',
          message: 'An error occurred while processing your request.',
          color: palette.error,
          bgColor: palette.errorSubtle,
        ),
        const SizedBox(height: 12),
        _buildAlertCard(
          icon: PhosphorIcons.info(PhosphorIconsStyle.fill),
          title: 'Info',
          message: 'This is an informational message for your reference.',
          color: palette.info,
          bgColor: palette.infoSubtle,
        ),
      ],
    );
  }

  Widget _buildAlertCard({
    required IconData icon,
    required String title,
    required String message,
    required Color color,
    required Color bgColor,
  }) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: bgColor,
        borderRadius: BorderRadius.circular(12),
        border: Border.all(color: color.withValues(alpha: 0.3)),
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Icon(icon, color: color, size: 24),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  title,
                  style: Theme.of(context).textTheme.titleSmall?.copyWith(
                    color: color,
                    fontWeight: FontWeight.bold,
                  ),
                ),
                const SizedBox(height: 4),
                Text(message, style: Theme.of(context).textTheme.bodyMedium),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProgressSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SectionHeader(title: 'Progress Indicators'),
        const SizedBox(height: 16),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text('Linear Progress'),
                const SizedBox(height: 8),
                LinearProgressIndicator(
                  value: 0.7,
                  backgroundColor: palette.border,
                ),
                const SizedBox(height: 16),
                const Text('Indeterminate'),
                const SizedBox(height: 8),
                LinearProgressIndicator(backgroundColor: palette.border),
                const SizedBox(height: 24),
                Row(
                  mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                  children: [
                    Column(
                      children: [
                        const CircularProgressIndicator(),
                        const SizedBox(height: 8),
                        Text(
                          'Spinner',
                          style: Theme.of(context).textTheme.bodySmall,
                        ),
                      ],
                    ),
                    Column(
                      children: [
                        CircularProgressIndicator(
                          value: 0.65,
                          backgroundColor: palette.border,
                        ),
                        const SizedBox(height: 8),
                        Text(
                          '65%',
                          style: Theme.of(context).textTheme.bodySmall,
                        ),
                      ],
                    ),
                    Column(
                      children: [
                        SizedBox(
                          width: 24,
                          height: 24,
                          child: CircularProgressIndicator(
                            strokeWidth: 3,
                            color: palette.secondary,
                          ),
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Small',
                          style: Theme.of(context).textTheme.bodySmall,
                        ),
                      ],
                    ),
                  ],
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildChipsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        const SectionHeader(title: 'Chips & Badges'),
        const SizedBox(height: 16),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            Chip(
              label: const Text('Default'),
              avatar: Icon(
                PhosphorIcons.tag(PhosphorIconsStyle.fill),
                size: 18,
              ),
            ),
            Chip(
              label: const Text('Accent'),
              backgroundColor: palette.accentSubtle,
              side: BorderSide(color: palette.accent.withValues(alpha: 0.3)),
            ),
            Chip(
              label: const Text('Secondary'),
              backgroundColor: palette.secondarySubtle,
              side: BorderSide(color: palette.secondary.withValues(alpha: 0.3)),
            ),
            Chip(
              label: const Text('Success'),
              backgroundColor: palette.successSubtle,
              side: BorderSide(color: palette.success.withValues(alpha: 0.3)),
            ),
            Chip(
              label: const Text('Warning'),
              backgroundColor: palette.warningSubtle,
              side: BorderSide(color: palette.warning.withValues(alpha: 0.3)),
            ),
            Chip(
              label: const Text('Error'),
              backgroundColor: palette.errorSubtle,
              side: BorderSide(color: palette.error.withValues(alpha: 0.3)),
            ),
            Chip(
              label: const Text('Info'),
              backgroundColor: palette.infoSubtle,
              side: BorderSide(color: palette.info.withValues(alpha: 0.3)),
            ),
          ],
        ),
        const SizedBox(height: 16),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          children: [
            ActionChip(label: const Text('Action'), onPressed: () {}),
            FilterChip(
              label: const Text('Filter'),
              selected: true,
              onSelected: (_) {},
            ),
            InputChip(label: const Text('Deletable'), onDeleted: () {}),
            ChoiceChip(
              label: const Text('Choice'),
              selected: false,
              onSelected: (_) {},
            ),
          ],
        ),
      ],
    );
  }
}
