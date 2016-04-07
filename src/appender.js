import { bind } from './helper';

/**
 * Abstract base class for other appenders. 
 * It is doing nothing.
 *
 * @constructor
 * @param {Log4js.Logger} logger log4js instance this appender is attached to
 * @author Stephan Strittmatter
 */
export default class Appender {
	constructor() {
		/**
		 * Reference to calling logger
		 * @type Log4js.Logger
		 * @private
		 */
		this.logger = null;
	}

	/** 
	 * appends the given loggingEvent appender specific
	 * @param {Log4js.LoggingEvent} loggingEvent loggingEvent to append
	 */
	doAppend(loggingEvent) {
		return;
	}

	/** 
	 * clears the Appender
	 */
	doClear() {
		return;
	}
	
	/**
	 * Set the Layout for this appender.
	 * @param {Log4js.Layout} layout Layout for formatting loggingEvent
	 */
	setLayout(layout){
		this.layout = layout;
	}

	/**
	 * Set reference to the logger.
	 * @param {Log4js.Logger} the invoking logger
	 */
	setLogger(logger){
		// add listener to the logger methods
		logger.onlog.addListener(
			bind(this.doAppend, this)
		);

		logger.onclear.addListener(
			bind(this.doClear, this)
		);
	
		this.logger = logger;
	}
}
