import 'package:flutter/material.dart';
import 'package:candi_colors/candi_colors.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({super.key});

  @override
  State<MyApp> createState() => _MyAppState();
}

class _MyAppState extends State<MyApp> {
  bool isDarkMode = false;

  @override
  Widget build(BuildContext context) {
    final palette = isDarkMode ? CandiColors.dark : CandiColors.light;

    return MaterialApp(
      title: 'Candi Colors Example',
      theme: ThemeData(
        useMaterial3: true,
        brightness: isDarkMode ? Brightness.dark : Brightness.light,
        scaffoldBackgroundColor: palette.bg,
        colorScheme: ColorScheme(
          brightness: isDarkMode ? Brightness.dark : Brightness.light,
          primary: palette.accent,
          onPrimary: palette.onAccent,
          secondary: palette.secondary,
          onSecondary: palette.onSecondary,
          error: palette.error,
          onError: palette.onError,
          surface: palette.surface,
          onSurface: palette.text,
        ),
      ),
      home: Scaffold(
        appBar: AppBar(
          title: const Text('Candi Colors Example'),
          backgroundColor: palette.surface,
          foregroundColor: palette.text,
          actions: [
            IconButton(
              icon: Icon(isDarkMode ? Icons.light_mode : Icons.dark_mode),
              onPressed: () {
                setState(() {
                  isDarkMode = !isDarkMode;
                });
              },
            ),
          ],
        ),
        body: SingleChildScrollView(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'Candi Design System',
                style: TextStyle(
                  fontSize: 32,
                  fontWeight: FontWeight.bold,
                  color: palette.text,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'A Nordic-inspired color palette with Hygge warmth and Lagom balance',
                style: TextStyle(
                  fontSize: 16,
                  color: palette.textSubtle,
                ),
              ),
              const SizedBox(height: 32),

              // Background Colors
              _buildSection(
                'Background Colors',
                palette,
                [
                  _ColorCard('bg', palette.bg),
                  _ColorCard('surface', palette.surface),
                  _ColorCard('elevated', palette.elevated),
                ],
              ),

              // Text Colors
              _buildSection(
                'Text Colors',
                palette,
                [
                  _ColorCard('text', palette.text),
                  _ColorCard('textSubtle', palette.textSubtle),
                  _ColorCard('textMuted', palette.textMuted),
                ],
              ),

              // Border Colors
              _buildSection(
                'Border Colors',
                palette,
                [
                  _ColorCard('border', palette.border),
                  _ColorCard('borderStrong', palette.borderStrong),
                  _ColorCard('divider', palette.divider),
                ],
              ),

              // Accent Colors
              _buildSection(
                'Accent Colors',
                palette,
                [
                  _ColorCard('accent', palette.accent),
                  _ColorCard('accentSubtle', palette.accentSubtle),
                  _ColorCard('onAccent', palette.onAccent),
                ],
              ),

              // Secondary Colors
              _buildSection(
                'Secondary Colors',
                palette,
                [
                  _ColorCard('secondary', palette.secondary),
                  _ColorCard('secondarySubtle', palette.secondarySubtle),
                  _ColorCard('onSecondary', palette.onSecondary),
                ],
              ),

              // Status Colors
              _buildSection(
                'Status Colors',
                palette,
                [
                  _ColorCard('success', palette.success),
                  _ColorCard('warning', palette.warning),
                  _ColorCard('error', palette.error),
                  _ColorCard('info', palette.info),
                ],
              ),

              // Interactive Colors
              _buildSection(
                'Interactive Colors',
                palette,
                [
                  _ColorCard('link', palette.link),
                  _ColorCard('disabled', palette.disabled),
                  _ColorCard('hover', palette.hover),
                  _ColorCard('active', palette.active),
                ],
              ),

              // Utility Colors
              _buildSection(
                'Utility Colors',
                palette,
                [
                  _ColorCard('overlay', palette.overlay),
                  _ColorCard('scrim', palette.scrim),
                  _ColorCard('shadowColor', palette.shadowColor),
                  _ColorCard('focusRing', palette.focusRing),
                ],
              ),

              // Inverse Colors
              _buildSection(
                'Inverse Colors',
                palette,
                [
                  _ColorCard('inverseSurface', palette.inverseSurface),
                  _ColorCard('inverseText', palette.inverseText),
                ],
              ),

              const SizedBox(height: 32),

              // Example Buttons
              Text(
                'Example Components',
                style: TextStyle(
                  fontSize: 24,
                  fontWeight: FontWeight.bold,
                  color: palette.text,
                ),
              ),
              const SizedBox(height: 16),
              Wrap(
                spacing: 8,
                runSpacing: 8,
                children: [
                  ElevatedButton(
                    onPressed: () {},
                    style: ElevatedButton.styleFrom(
                      backgroundColor: palette.accent,
                      foregroundColor: palette.onAccent,
                    ),
                    child: const Text('Primary Button'),
                  ),
                  ElevatedButton(
                    onPressed: () {},
                    style: ElevatedButton.styleFrom(
                      backgroundColor: palette.secondary,
                      foregroundColor: palette.onSecondary,
                    ),
                    child: const Text('Secondary Button'),
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
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildSection(
      String title, CandiPalette palette, List<_ColorCard> colors) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: palette.text,
          ),
        ),
        const SizedBox(height: 16),
        Wrap(
          spacing: 12,
          runSpacing: 12,
          children: colors,
        ),
        const SizedBox(height: 32),
      ],
    );
  }
}

class _ColorCard extends StatelessWidget {
  final String name;
  final CandiColor color;

  const _ColorCard(this.name, this.color);

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    final textColor = isDark ? CandiColors.dark.text : CandiColors.light.text;

    return Container(
      width: 140,
      decoration: BoxDecoration(
        border: Border.all(
          color: isDark ? CandiColors.dark.border : CandiColors.light.border,
        ),
        borderRadius: BorderRadius.circular(8),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Container(
            height: 80,
            decoration: BoxDecoration(
              color: color,
              borderRadius:
                  const BorderRadius.vertical(top: Radius.circular(7)),
            ),
          ),
          Padding(
            padding: const EdgeInsets.all(8),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  name,
                  style: TextStyle(
                    fontWeight: FontWeight.bold,
                    fontSize: 12,
                    color: textColor,
                  ),
                ),
                const SizedBox(height: 4),
                Text(
                  'L: ${(color.lightness * 100).toStringAsFixed(0)}%',
                  style: TextStyle(
                      fontSize: 10, color: textColor.withOpacity(0.7)),
                ),
                Text(
                  'C: ${color.chroma.toStringAsFixed(3)}',
                  style: TextStyle(
                      fontSize: 10, color: textColor.withOpacity(0.7)),
                ),
                Text(
                  'H: ${color.hue.toStringAsFixed(0)}°',
                  style: TextStyle(
                      fontSize: 10, color: textColor.withOpacity(0.7)),
                ),
              ],
            ),
          ),
        ],
      ),
    );
  }
}
