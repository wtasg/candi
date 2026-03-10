/// Naming convention utilities.
String toKebab(String str) {
  return str.replaceAllMapped(RegExp(r'([a-z0-9])([A-Z])'), (Match m) {
    return '${m.group(1)}-${m.group(2)}';
  }).toLowerCase();
}

String replaceBetween(
  String content,
  String startMarker,
  String endMarker,
  String replacement,
) {
  final startIndex = content.indexOf(startMarker);
  final endIndex = content.indexOf(endMarker);

  if (startIndex == -1 || endIndex == -1) {
    throw ArgumentError('Markers not found in content');
  }

  final start = startIndex + startMarker.length;
  return content.substring(0, start) +
      '\n' +
      replacement +
      '\n' +
      content.substring(endIndex);
}
