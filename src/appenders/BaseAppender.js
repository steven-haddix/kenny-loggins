import { defaults, configure } from './config/defaults';

/**
 * Abstract base class for other appenders.
 */
export default class BaseAppender {
	constructor(config) {
		configure(this, {}, config);
	}

	/**
	 * appends the given loggingEvent appender specific
	 * @param {LoggingEvent} loggingEvent to append
	 */
	doAppend() {}

	/**
	 * Event handler for log events
     */
	onLogEventHandler(message, payload) {
		this.doAppend(payload);
	}

	/**
	 * Subscribes to logger events
	 * @param {Logger} logger to subscribe to
	 */
	subscribeLoggingEvents(logger) {
		logger.subscribe(this.onLogEventHandler.bind(this));
		return this;
	}
}
