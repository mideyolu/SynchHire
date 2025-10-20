/**
 * Convert bytes to a human readable string in KB or MB.
 * - Uses 1024 as the unit divisor.
 * - Shows values in KB when under 1 MB, otherwise in MB.
 * - Uses at most one decimal place and omits the decimal when it's .0
 *
 * Examples:
 * formatSize(0) -> "0 KB"
 * formatSize(512) -> "0.5 KB"
 * formatSize(1024 * 300) -> "300 KB"
 * formatSize(1024 * 1024 * 2.3) -> "2.3 MB"
 */

export function formatSize(bytes: number): string {
    const KB = 1024;
    const MB = KB * 1024;

    if (!isFinite(bytes) || bytes <= 0) return "0 KB";

    const trim = (n: number) => {
        // round to 1 decimal place
        const rounded = Math.round(n * 10) / 10;
        return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
    };

    if (bytes >= MB) {
        return `${trim(bytes / MB)} MB`;
    }

    return `${trim(bytes / KB)} KB`;
}

export default formatSize;

export const generateUUID = () => crypto.randomUUID();
