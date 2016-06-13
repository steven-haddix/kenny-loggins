/**
 * Models a logging event.
 * @constructor
 * @param {String} loggerName name of logger
 * @param {Level} level level of message
 * @param {String} message message to log
 * @param {Logger} logger the associated logger
 * @param {String} exception to log
 */
export default class LoggingEvent {
	constructor(loggerName, level, message, exception) {
		/**
		 * the timestamp of the Logging Event
		 * @type Date
		 * @private
		 */
		this.dateLogged = new Date();
		/**
		 * loggerName of event
		 * @type String
		 * @private
		 */
		this.loggerName = loggerName;
		/**
		 * level of log
		 * @type Level
		 * @private
		 */
		this.logLevel = level;
		/**
		 * the logging message
		 * @type String
		 * @private
		 */
		this.logMessage = message;
		/**
		 * the logging exception
		 * @type String
		 * @private
		 */
		this.exception = exception;
	}
}
