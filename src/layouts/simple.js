import Layout from '../layout';

/**
 * SimpleLayout consists of the level of the log statement, followed by " - " 
 * and then the log message itself. For example,
 * <code>DEBUG - Hello world</code>
 *
 * @constructor
 * @extends Log4js.Layout
 * @author Stephan Strittmatter
 */
export default class SimpleLayout extends Layout {
	constructor() {
		super();

		this.LINE_SEP = '\n';
		this.LINE_SEP_LEN = 1;
	}

	/**
	 * Implement this method to create your own layout format.
	 * @param {Log4js.LoggingEvent} loggingEvent loggingEvent to format
	 * @return formatted String
	 * @type String
	 */
	format(loggingEvent) {
		return loggingEvent.level.toString() + ' - ' +
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
