// This is a basic Flutter widget test.
//
// To perform an interaction with a widget in your test, use the WidgetTester
// utility in the flutter_test package. For example, you can send tap and scroll
// gestures. You can also use WidgetTester to find child widgets in the widget
// tree, read text, and verify that the values of widget properties are correct.

import 'package:flutter_test/flutter_test.dart';

import 'package:showcase_flutter/main.dart';

void main() {
  testWidgets('Candi Showcase smoke test', (WidgetTester tester) async {
    // Build our app and trigger a frame.
    await tester.pumpWidget(const CandiShowcaseApp());

    // Verify that the title is present.
    expect(find.text('Candi Showcase'), findsOneWidget);

    // Verify that some sections and labels are present.
    expect(find.text('Color Palette'), findsOneWidget);
    expect(find.text('Background'), findsOneWidget);
  });
}
