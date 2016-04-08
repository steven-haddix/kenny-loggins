import Layout from '../layout';
import Level from '../Level';

/**
 * HtmlLayout write the logs in Html format.
 *
 * @constructor
 * @extends Log4js.Layout
 * @author Stephan Strittmatter
 */
export default class HtmlLayout extends Layout {
	/**
	 * Implement this method to create your own layout format.
	 * @param {Log4js.LoggingEvent} loggingEvent loggingEvent to format
	 * @return formatted String
	 * @type String
	 */
	format(loggingEvent) {
		return "<div style=\"" + this.getStyle(loggingEvent) +
			"\">" + loggingEvent.getFormattedTimestamp() + " - " +
			loggingEvent.level.toString() + " - " + loggingEvent.message + "</div>\n";
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

	getStyle(loggingEvent) {
		switch (loggingEvent.level) {
			case Level.ERROR:
				return 'color:red';
			case Level.FATAL:
				return 'color:red';
			case Level.WARN:
				return 'color:orange';
			case Level.DEBUG:
				return 'color:green';
			case Level.INFO:
				return 'color:white';
			default:
				return 'color:yellow';
		}
	}
}
