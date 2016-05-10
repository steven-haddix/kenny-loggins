/**
 * Formats a log message into "Level - Message"
 *
 * @param {String} level
 * @param {String} message
 * @returns {String}
 */
export default function format(level, message) {
	return `${level} - ${message}\n`;
}
