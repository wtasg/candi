import 'package:flutter/material.dart';
import 'package:candi_colors/candi.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';

class GalleryScreen extends StatelessWidget {
  const GalleryScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Component Gallery')),
      body: ListView(
        padding: const EdgeInsets.all(24),
        children: [
          _buildSectionHeader(context, 'Buttons'),
          const SizedBox(height: 16),
          Wrap(
            spacing: 12,
            runSpacing: 12,
            children: [
              ElevatedButton(
                onPressed: () {},
                child: const Text('Primary Button'),
              ),
              OutlinedButton(
                onPressed: () {},
                child: const Text('Secondary Button'),
              ),
              TextButton(onPressed: () {}, child: const Text('Text Button')),
              ElevatedButton.icon(
                onPressed: () {},
                icon: Icon(PhosphorIcons.check()),
                label: const Text('Action Button'),
              ),
            ],
          ),
          const SizedBox(height: 32),
          _buildSectionHeader(context, 'Cards & Surfaces'),
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
                        Text(
                          'Standard Card',
                          style: Theme.of(context).textTheme.titleMedium,
                        ),
                        const SizedBox(height: 8),
                        Text(
                          'Uses the surface color from Candi palette.',
                          style: Theme.of(context).textTheme.bodyMedium,
                        ),
                      ],
                    ),
                  ),
                ),
              ),
              const SizedBox(width: 16),
              Expanded(
                child: Container(
                  padding: const EdgeInsets.all(16),
                  decoration: BoxDecoration(
                    color: Theme.of(context).colorScheme.primaryContainer,
                    borderRadius: BorderRadius.circular(12),
                  ),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Accent Box',
                        style: Theme.of(context).textTheme.titleMedium,
                      ),
                      const SizedBox(height: 8),
                      Text(
                        'Uses accentSubtle color.',
                        style: Theme.of(context).textTheme.bodyMedium,
                      ),
                    ],
                  ),
                ),
              ),
            ],
          ),
          const SizedBox(height: 32),
          _buildSectionHeader(context, 'Form Elements'),
          const SizedBox(height: 16),
          const TextField(
            decoration: InputDecoration(
              labelText: 'Name',
              hintText: 'Enter your name',
              prefixIcon: Icon(Icons.person),
            ),
          ),
          const SizedBox(height: 16),
          const TextField(
            decoration: InputDecoration(
              labelText: 'Email',
              hintText: 'Enter your email',
              prefixIcon: Icon(Icons.email),
              errorText: 'Sample error message',
            ),
          ),
          const SizedBox(height: 32),
          _buildSectionHeader(context, 'Status Indicators'),
          const SizedBox(height: 16),
          _buildStatusRow(
            context,
            'Success',
            Icons.check_circle,
            CandiColors.light.success,
          ),
          const SizedBox(height: 8),
          _buildStatusRow(
            context,
            'Warning',
            Icons.warning,
            CandiColors.light.warning,
          ),
          const SizedBox(height: 8),
          _buildStatusRow(
            context,
            'Error',
            Icons.error,
            CandiColors.light.error,
          ),
          const SizedBox(height: 8),
          _buildStatusRow(context, 'Info', Icons.info, CandiColors.light.info),
        ],
      ),
    );
  }

  Widget _buildSectionHeader(BuildContext context, String title) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          title,
          style: Theme.of(context).textTheme.headlineSmall?.copyWith(
            fontWeight: FontWeight.bold,
            color: Theme.of(context).colorScheme.onSurface,
          ),
        ),
        const Divider(),
      ],
    );
  }

  Widget _buildStatusRow(
    BuildContext context,
    String label,
    IconData icon,
    Color color,
  ) {
    final isDark = Theme.of(context).brightness == Brightness.dark;
    // Note: In a real app, we'd use themed colors. Here we use CandiColors directly just for demo.
    // However, we should probably use the palette from the current theme.
    final palette = isDark ? CandiColors.dark : CandiColors.light;

    Color statusColor;
    if (label == 'Success')
      statusColor = palette.success;
    else if (label == 'Warning')
      statusColor = palette.warning;
    else if (label == 'Error')
      statusColor = palette.error;
    else
      statusColor = palette.info;

    return Row(
      children: [
        Icon(icon, color: statusColor),
        const SizedBox(width: 12),
        Text(label),
        const Spacer(),
        Chip(
          backgroundColor: statusColor.withValues(alpha: 0.1),
          side: BorderSide(color: statusColor),
          label: Text(
            'Active',
            style: TextStyle(color: statusColor, fontSize: 12),
          ),
        ),
      ],
    );
  }
}
