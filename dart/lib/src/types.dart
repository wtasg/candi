/// Shared interfaces and types for Candi Color Utilities.

class RgbaColor {
  final int r;
  final int g;
  final int b;
  final double a;

  const RgbaColor({
    required this.r,
    required this.g,
    required this.b,
    this.a = 1.0,
  });
}

class OklchParsed {
  final int r;
  final int g;
  final int b;
  final double a;
  final double l;
  final double c;
  final double h;
  final double opacity;

  const OklchParsed({
    required this.r,
    required this.g,
    required this.b,
    required this.a,
    required this.l,
    required this.c,
    required this.h,
    required this.opacity,
  });
}

class DerivationRule {
  final double dl;
  final double dc;

  const DerivationRule({required this.dl, required this.dc});
}

class ColorToken {
  final String name;
  final String usage;
  final String? oklch;
  final String? value;

  const ColorToken({
    required this.name,
    required this.usage,
    this.oklch,
    this.value,
  });

  Map<String, dynamic> toJson() {
    final map = <String, dynamic>{
      'name': name,
      'usage': usage,
    };
    if (oklch != null) map['oklch'] = oklch;
    if (value != null) map['value'] = value;
    return map;
  }
}
