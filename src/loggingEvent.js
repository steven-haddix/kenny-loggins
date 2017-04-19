/**
 * Models a logging event.
 * @constructor
 * @param {String} name - name of logger
 * @param {Level} level - level of message (INFO, ERROR...)
 */
export default class LoggingEvent {
	constructor(name, level) {
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
		this.name = name;
		/**
		 * level of log
		 * @type Level
		 * @private
		 */
		this.level = level;
	}
}
