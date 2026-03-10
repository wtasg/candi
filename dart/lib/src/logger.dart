/// Logger implementing the silent success pattern.
import 'dart:io';

class Logger {
  final bool _isVerbose;
  final List<String> _buffer = [];

  Logger([bool? verbose])
      : _isVerbose = verbose ??
            Platform.environment['VERBOSE'] == 'true' ||
                Platform.executableArguments.contains('--verbose') ||
                Platform.executableArguments.contains('-v');

  bool get isVerbose => _isVerbose;

  void log(Object? message) {
    if (_isVerbose) {
      print(message);
    } else {
      _buffer.add(message?.toString() ?? 'null');
    }
  }

  void warn(Object? message) {
    if (_isVerbose) {
      print('\x1B[33m$message\x1B[0m');
    } else {
      _buffer.add('\x1B[33m$message\x1B[0m');
    }
  }

  void error(Object? message) {
    print('\x1B[31m$message\x1B[0m');
  }

  void dump() {
    if (!_isVerbose && _buffer.isNotEmpty) {
      for (final msg in _buffer) {
        print(msg);
      }
      _buffer.clear();
    }
  }
}

final logger = Logger();
