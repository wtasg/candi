/**
 * Candi Script Logger
 *
 * Implements "Silent Success, Roaring Failures" pattern.
 * Buffers logs and only outputs them if an error occurs or VERBOSE=true.
 */

export interface Logger {
    log(...args: unknown[]): void;
    error(...args: unknown[]): void;
    warn(...args: unknown[]): void;
    dump(): void;
    readonly isVerbose: boolean;
}

const isVerbose =
    process.env['VERBOSE'] === 'true' ||
    process.argv.includes('--verbose') ||
    process.argv.includes('-v');

const buffer: string[] = [];

export const logger: Logger = {
    log: (...args: unknown[]) => {
        if (isVerbose) {
            console.log(...args);
        } else {
            buffer.push(args.map(String).join(' '));
        }
    },
    error: (...args: unknown[]) => {
        // Errors are always "roaring"
        console.error(...args);
    },
    warn: (...args: unknown[]) => {
        if (isVerbose) {
            console.warn(...args);
        } else {
            buffer.push(`[WARN] ${args.map(String).join(' ')}`);
        }
    },
    dump: () => {
        if (!isVerbose && buffer.length > 0) {
            console.log('\n--- Captured Logs ---');
            buffer.forEach((line) => console.log(line));
            console.log('--- End of Logs ---\n');
        }
    },
    get isVerbose() {
        return isVerbose;
    },
};
