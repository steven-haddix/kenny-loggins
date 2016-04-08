import { formatUTCDate } from '../dateFormatter';
import Layout from '../layout';
/**
 * JSONLayout write the logs in JSON format.
 * JSON library is required to use this Layout. See also {@link http://www.json.org}
 * @constructor
 * @extends Log4js.Layout
 * @author Stephan Strittmatter
 */
export default class JSONLayout extends Layout {

	/**
	 * Implement this method to create your own layout format.
	 * @param {LoggingEvent} loggingEvent loggingEvent to format
	 * @return formatted String
	 * @type String
	 */
	format(loggingEvent) {
		let useragent = 'unknown';
		try {
			useragent = navigator.userAgent;
		} catch (e) {
			useragent = 'unknown';
		}

		let referer = 'unknown';
		try {
			referer = location.href;
		} catch (e) {
			referer = 'unknown';
		}

		let jsonString = '{\n \"LoggingEvent\": {\n';
		jsonString += '\t\"logger\": \"' + loggingEvent.categoryName + '\",\n';
		jsonString += '\t\"level\": \"' + loggingEvent.level.toString() + '\",\n';
		jsonString += this.formatMessage(loggingEvent.message);
		jsonString += '\t\"referer\": \"' + referer + '\",\n';
		jsonString += '\t\"useragent\": \"' + useragent + '\",\n';
		jsonString += '\t\"timestamp\": \"' +
			formatUTCDate(loggingEvent.startTime, 'yyyy-MM-ddThh:mm:ssZ') + '\",\n';
		jsonString += '\t\"exception\": \"' + loggingEvent.exception + '\"\n';
		jsonString += '}}';

        return jsonString;
	}

	/**
	* Writes message object or string into given string stream.
	*/
	formatMessage(message) {
		let stream = '';
		if ((typeof message) === 'string') {
			stream += '\t\"message\": \"' + message + '\",\n';
		} else if ((typeof message) === 'object') {
			if ('message' in message) {
				stream += '\t\"message\": \"' + message.message + '\",\n';
			}

			for (const property in message) {
				if (property === 'message') continue;

				const val = message[property];
				if (val instanceof Date) {
					stream += "\t\"" + property + "_dt\": \"" +
						formatUTCDate(val, "yyyy-MM-ddThh:mm:ssZ") + "\",\n";
				} else {
					switch (typeof val) {
						case 'string':
							stream += "\t\"" + property + "_s\": \"" + val + "\",\n";
							break;
						case 'number':
							stream += "\t\"" + property + "_l\": " + val + ",\n";
							break;
						default:
							stream += "\t\"" + property + "_s\": \"" + val.toString() + "\",\n";
							break;
					}
				}
			}
		} else {
			stream += '\t\"message\": \"' + message.toString() + '\",\n';
		}
		return stream;
	}

	/**
	 * Returns the content type output by this layout.
	 * @return The base class returns "text/xml".
	 * @type String
	 */
	getContentType() {
		return 'text/json';
	}

	/**
	 * @return Returns the header for the layout format. The base class returns null.
	 * @type String
	 */
	getHeader() {
		return '{\"Log4js\": [\n';
	}

	/**
	 * @return Returns the footer for the layout format. The base class returns null.
	 * @type String
	 */
	getFooter() {
		return '\n]}';
	}

	getSeparator() {
		return ',\n';
	}
}
