import Layout from '../layout';

/**
 * BasicLayout is a simple layout for storing the loggs. The loggs are stored
 * in following format:
 * <pre>
 * categoryName~startTime [logLevel] message\n
 * </pre>
 *
 * @constructor
 * @extends Log4js.Layout
 * @author Stephan Strittmatter
 */
export default class BasicLayout extends Layout {
	constructor() {
		this.LINE_SEP = '\n';
	}

	/**
	 * Implement this method to create your own layout format.
	 * @param {Log4js.LoggingEvent} loggingEvent loggingEvent to format
	 * @return formatted String
	 * @type String
	 */
	format(loggingEvent) {
		return loggingEvent.categoryName + '~' +
			loggingEvent.startTime.toLocaleString() +
			' [' + loggingEvent.level.toString() + '] ' +
			loggingEvent.message + this.LINE_SEP;
	}

	/**
	 * Returns the content type output by this layout.
	 * @return The base class returns "text/plain".
	 * @type String
	 */
	getContentType() {
		return 'text/plain';
	}

	/**
	 * @return Returns the header for the layout format. The base class returns null.
	 * @type String
	 */
	getHeader() {
		return '';
	}

	/**
	 * @return Returns the footer for the layout format. The base class returns null.
	 * @type String
	 */
	getFooter() {
		return '';
	}
}
