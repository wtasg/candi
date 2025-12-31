import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:provider/provider.dart';
import 'package:showcase_flutter/main.dart';
import 'package:showcase_flutter/providers/theme_provider.dart';

void main() {
  testWidgets('Showcase app renders gallery screen', (
    WidgetTester tester,
  ) async {
    await tester.pumpWidget(
      ChangeNotifierProvider(
        create: (_) => ThemeProvider(),
        child: const CandiShowcaseApp(),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Component Gallery'), findsOneWidget);
    expect(find.text('Gallery'), findsWidgets);
  });

  testWidgets('Navigation works between screens', (WidgetTester tester) async {
    await tester.pumpWidget(
      ChangeNotifierProvider(
        create: (_) => ThemeProvider(),
        child: const CandiShowcaseApp(),
      ),
    );
    await tester.pumpAndSettle();

    expect(find.text('Component Gallery'), findsOneWidget);

    await tester.tap(find.text('Playground'));
    await tester.pumpAndSettle();

    expect(find.text('Design Playground'), findsOneWidget);
  });
}
