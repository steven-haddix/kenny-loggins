/**
 * Models a logging event.
 * @constructor
 * @param {String} categoryName name of category
 * @param {Log4js.Level} level level of message
 * @param {String} message message to log
 * @param {Log4js.Logger} logger the associated logger
 * @author Seth Chisamore
 */
export default class LoggingEvent {
	constructor(categoryName, level, message, exception, logger) {
		/**
		 * the timestamp of the Logging Event
		 * @type Date
		 * @private
		 */
		this.startTime = new Date();
		/**
		 * category of event
		 * @type String
		 * @private
		 */
		this.categoryName = categoryName;
		/**
		 * the logging message
		 * @type String
		 * @private
		 */
		this.message = message;
		/**
		 * the logging exception
		 * @type Exception
		 * @private
		 */
		this.exception = exception;
		/**
		 * level of log
		 * @type Log4js.Level
		 * @private
		 */
		this.level = level;
		/**
		 * reference to logger
		 * @type Log4js.Logger
		 * @private
		 */
		this.logger = logger;
	}

	getLevel() {
		return this.level;
	}

	/**
	 * get the timestamp formatted as String.
	 * @return {String} formatted timestamp
	 * @see Log4js#setDateFormat()
	 */
	getFormattedTimestamp() {
		if (this.logger) {
			return this.logger.getFormattedTimestamp(this.startTime);
		}
		return this.startTime.toGMTString();
	}
}
