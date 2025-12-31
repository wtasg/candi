import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:candi_colors/candi.dart';
import 'package:showcase_flutter/providers/theme_provider.dart';
import 'package:showcase_flutter/screens/gallery_screen.dart';
import 'package:showcase_flutter/screens/playground_screen.dart';
import 'package:phosphor_flutter/phosphor_flutter.dart';

void main() {
  runApp(
    ChangeNotifierProvider(
      create: (_) => ThemeProvider(),
      child: const CandiShowcaseApp(),
    ),
  );
}

class CandiShowcaseApp extends StatelessWidget {
  const CandiShowcaseApp({super.key});

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);

    return MaterialApp(
      title: 'Candi Flutter Showcase',
      debugShowCheckedModeBanner: false,
      theme: CandiColors.light.toThemeData(),
      darkTheme: CandiColors.dark.toThemeData(),
      themeMode: themeProvider.materialThemeMode,
      home: const MainScreen(),
    );
  }
}

class MainScreen extends StatefulWidget {
  const MainScreen({super.key});

  @override
  State<MainScreen> createState() => _MainScreenState();
}

class _MainScreenState extends State<MainScreen> {
  int _selectedIndex = 0;

  final List<Widget> _screens = [
    const GalleryScreen(),
    const PlaygroundScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    final isMobile = MediaQuery.of(context).size.width < 600;

    return Scaffold(
      body: Row(
        children: [
          if (!isMobile)
            NavigationRail(
              selectedIndex: _selectedIndex,
              onDestinationSelected: (index) {
                setState(() {
                  _selectedIndex = index;
                });
              },
              labelType: NavigationRailLabelType.all,
              destinations: [
                NavigationRailDestination(
                  icon: Icon(PhosphorIcons.gridFour()),
                  selectedIcon: Icon(
                    PhosphorIcons.gridFour(PhosphorIconsStyle.fill),
                  ),
                  label: const Text('Gallery'),
                ),
                NavigationRailDestination(
                  icon: Icon(PhosphorIcons.flask()),
                  selectedIcon: Icon(
                    PhosphorIcons.flask(PhosphorIconsStyle.fill),
                  ),
                  label: const Text('Playground'),
                ),
              ],
            ),
          if (!isMobile) const VerticalDivider(thickness: 1, width: 1),
          Expanded(child: _screens[_selectedIndex]),
        ],
      ),
      bottomNavigationBar: isMobile
          ? NavigationBar(
              selectedIndex: _selectedIndex,
              onDestinationSelected: (index) {
                setState(() {
                  _selectedIndex = index;
                });
              },
              destinations: [
                NavigationDestination(
                  icon: Icon(PhosphorIcons.gridFour()),
                  selectedIcon: Icon(
                    PhosphorIcons.gridFour(PhosphorIconsStyle.fill),
                  ),
                  label: 'Gallery',
                ),
                NavigationDestination(
                  icon: Icon(PhosphorIcons.flask()),
                  selectedIcon: Icon(
                    PhosphorIcons.flask(PhosphorIconsStyle.fill),
                  ),
                  label: 'Playground',
                ),
              ],
            )
          : null,
    );
  }
}
