/**
 * Formats a log message into "Level - Message"
 * @param loggingEvent
 * @returns {String}
 */
export default function format(loggingEvent) {
	return `${loggingEvent.level.toString()} - ${loggingEvent.message}\n`;
}
