import BaseLayout from 'BaseLayout';
import { getLevelColorCode } from '../level';

/**
 * HtmlLayout write the logs in Html format.
 *
 * @constructor
 * @extends Log4js.Layout
 * @author Stephan Strittmatter
 */
export default class HtmlLayout extends BaseLayout {
	/**
	 * Implement this method to create your own layout format.
	 * @param {Log4js.LoggingEvent} loggingEvent loggingEvent to format
	 * @return formatted String
	 * @type String
	 */
	format(loggingEvent) {
		const logLevel = loggingEvent.level.toString();
		const logLevelColor = getLevelColorCode(loggingEvent.level);
		const timeStamp = loggingEvent.getFormattedTimestamp();
		return `<div style="color:${logLevelColor}">${timeStamp} - ${logLevel} - ${loggingEvent.message}</div>\n`;
	}

	/**
	 * Returns the content type output by this layout. 
	 * @return The base class returns "text/html".
	 * @type String
	 */
	getContentType() {
		return 'text/html';
	}

	/**
	 * @return Returns the header for the layout format. The base class returns null.
	 * @type String
	 */
	getHeader() {
		return '<html><head><title>log4js</head><body>';
	}

	/**
	 * @return Returns the footer for the layout format. The base class returns null.
	 * @type String
	 */
	getFooter() {
		return '</body></html>';
	}
}
