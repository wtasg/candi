import 'package:flutter/material.dart';
import 'package:candi_colors/candi.dart';
import 'screens/gallery_screen.dart';

void main() {
  runApp(const CandiShowcaseApp());
}

class CandiShowcaseApp extends StatefulWidget {
  const CandiShowcaseApp({super.key});

  @override
  State<CandiShowcaseApp> createState() => _CandiShowcaseAppState();
}

class _CandiShowcaseAppState extends State<CandiShowcaseApp> {
  ThemeMode _themeMode = ThemeMode.light;

  void _toggleTheme() {
    setState(() {
      _themeMode = _themeMode == ThemeMode.light
          ? ThemeMode.dark
          : ThemeMode.light;
    });
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Candi Showcase',
      debugShowCheckedModeBanner: false,
      theme: CandiColors.light.toThemeData(),
      darkTheme: CandiColors.dark.toThemeData(),
      themeMode: _themeMode,
      home: GalleryScreen(
        isDarkMode: _themeMode == ThemeMode.dark,
        onThemeToggle: _toggleTheme,
      ),
    );
  }
}
