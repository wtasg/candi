import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:candi_colors/candi.dart';
import 'package:showcase_flutter/providers/theme_provider.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';

class PlaygroundScreen extends StatelessWidget {
  const PlaygroundScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);

    return Scaffold(
      appBar: AppBar(title: const Text('Design Playground')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildSectionHeader(context, 'Theme Mode'),
            const SizedBox(height: 16),
            SegmentedButton<ThemeModeOption>(
              segments: [
                ButtonSegment(
                  value: ThemeModeOption.light,
                  label: const Text('Light'),
                  icon: Icon(PhosphorIcons.sun()),
                ),
                ButtonSegment(
                  value: ThemeModeOption.dark,
                  label: const Text('Dark'),
                  icon: Icon(PhosphorIcons.moon()),
                ),
                ButtonSegment(
                  value: ThemeModeOption.system,
                  label: const Text('System'),
                  icon: Icon(PhosphorIcons.desktop()),
                ),
              ],
              selected: {themeProvider.themeMode},
              onSelectionChanged: (newSelection) {
                themeProvider.setThemeMode(newSelection.first);
              },
            ),
            const SizedBox(height: 32),
            _buildSectionHeader(context, 'Accessibility: Contrast Checker'),
            const SizedBox(height: 16),
            _buildContrastGrid(context),
            const SizedBox(height: 32),
            _buildSectionHeader(context, 'Nordic Philosophy'),
            const SizedBox(height: 16),
            _buildPhilosophyCard(
              context,
              'Hygge (Warmth)',
              'Creating a warm, cozy atmosphere and enjoying the good things in life. Reflected in our warm white backgrounds and soft accents.',
              PhosphorIcons.coffee(),
            ),
            const SizedBox(height: 12),
            _buildPhilosophyCard(
              context,
              'Lagom (Balance)',
              'Not too little, not too much. Just right. Reflected in our balanced contrast ratios and intentional use of color.',
              PhosphorIcons.scales(),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSectionHeader(BuildContext context, String title) {
    return Text(
      title,
      style: Theme.of(
        context,
      ).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
    );
  }

  Widget _buildContrastGrid(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final palette = isDark ? CandiColors.dark : CandiColors.light;

    return GridView.count(
      crossAxisCount: MediaQuery.of(context).size.width > 900 ? 3 : 1,
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      mainAxisSpacing: 16,
      crossAxisSpacing: 16,
      childAspectRatio: 2.5,
      children: [
        _buildContrastCard(context, 'Text on BG', palette.text, palette.bg),
        _buildContrastCard(
          context,
          'Text on Surface',
          palette.text,
          palette.surface,
        ),
        _buildContrastCard(
          context,
          'On Primary',
          palette.onPrimary,
          palette.primary,
        ),
        _buildContrastCard(
          context,
          'On Success',
          palette.onSuccess,
          palette.success,
        ),
        _buildContrastCard(
          context,
          'On Warning',
          palette.onWarning,
          palette.warning,
        ),
        _buildContrastCard(context, 'On Error', palette.onError, palette.error),
      ],
    );
  }

  Widget _buildContrastCard(
    BuildContext context,
    String label,
    Color foreground,
    Color background,
  ) {
    // Using simple luminance difference for visualization
    final l1 = foreground.computeLuminance();
    final l2 = background.computeLuminance();
    final contrast = (l1 + 0.05) / (l2 + 0.05);
    final ratio = contrast > 1 ? contrast : 1 / contrast;
    final isPass = ratio >= 4.5;

    return Card(
      clipBehavior: Clip.antiAlias,
      child: Container(
        color: background,
        padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              label,
              style: TextStyle(
                color: foreground,
                fontWeight: FontWeight.bold,
                fontSize: 14,
              ),
            ),
            const SizedBox(height: 4),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(
                  isPass ? Icons.check_circle : Icons.error,
                  color: foreground,
                  size: 16,
                ),
                const SizedBox(width: 4),
                Text(
                  'Ratio: ${ratio.toStringAsFixed(2)}:1',
                  style: TextStyle(color: foreground, fontSize: 12),
                ),
              ],
            ),
            Text(
              isPass ? 'WCAG AA Pass' : 'WCAG AA Fail',
              style: TextStyle(
                color: foreground.withValues(alpha: 0.8),
                fontSize: 10,
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildPhilosophyCard(
    BuildContext context,
    String title,
    String description,
    IconData icon,
  ) {
    return Card(
      elevation: 0,
      shape: RoundedRectangleBorder(
        side: BorderSide(color: Theme.of(context).dividerColor),
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Icon(icon, size: 32, color: Theme.of(context).colorScheme.primary),
            const SizedBox(width: 16),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    title,
                    style: Theme.of(context).textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    description,
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
