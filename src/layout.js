/**
 * Interface for Layouts.
 * Use this Layout as "interface" for other Layouts. It is doing nothing.
 *
 * @constructor
 * @author Stephan Strittmatter
 */
export default class Layout {
	/**
	 * Implement this method to create your own layout format.
	 * @param {LoggingEvent} loggingEvent loggingEvent to format
	 * @return formatted String
	 * @type String
	 */
	format(loggingEvent) {
		return '';
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
		return null;
	}

	/**
	 * @return Returns the footer for the layout format. The base class returns null.
	 * @type String
	 */
	getFooter() {
		return null;
	}

	/**
	 * @return Separator between events
	 * @type String
	 */
	getSeparator() {
		return '';
	}
}
