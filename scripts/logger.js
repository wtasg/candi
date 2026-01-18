/**
 * Candi Script Logger
 *
 * Implements "Silent Success, Roaring Failures" pattern.
 * Buffers logs and only outputs them if an error occurs or VERBOSE=true.
 */

const isVerbose = process.env.VERBOSE === 'true' || process.argv.includes('--verbose') || process.argv.includes('-v');
const buffer = [];

const logger = {
    log: (...args) => {
        if (isVerbose) {
            console.log(...args);
        } else {
            buffer.push(args.join(' '));
        }
    },
    error: (...args) => {
        // Errors are always "roaring"
        console.error(...args);
    },
    warn: (...args) => {
        if (isVerbose) {
            console.warn(...args);
        } else {
            buffer.push(`[WARN] ${args.join(' ')}`);
        }
    },
    dump: () => {
        if (!isVerbose && buffer.length > 0) {
            console.log('\n--- Captured Logs ---');
            buffer.forEach(line => console.log(line));
            console.log('--- End of Logs ---\n');
        }
    },
    get isVerbose() {
        return isVerbose;
    }
};

module.exports = logger;
