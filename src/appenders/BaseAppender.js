import { defaults, injectConfig } from './config/defaults';

/**
 * Abstract base class for other appenders.
 *
 * @constructor
 * @param config - Configuration from class extending base appender.
 * @author Steven Haddix
 */
export default class BaseAppender {
	constructor(config) {
		injectConfig(this, {}, config);
	}

	/**
	 * appends the given loggingEvent appender specific
	 * @param {Log4js.LoggingEvent} loggingEvent loggingEvent to append
	 */
	doAppend() {}

	/**
	 * Event handler for log events
     */
	onLogEventHandler(message, payload) {
		this.doAppend(payload);
	}

	/**
	 * Registers appender events with the EventLogDispatcher
	 * @param {Logger} logger to register events with
	 */
	subscribeLoggingEvents(logger) {
		logger.subscribe(this.onLogEventHandler.bind(this));
		return this;
	}
}
