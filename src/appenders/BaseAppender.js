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
	 * @param loggingEvent - Logging event for appender to process
     */
	onLogEventHandler(loggingEvent) {
		this.doAppend(loggingEvent);
	}

	/**
	 * Event handler for clearing log events
	 * FIXME: determine if queue needed in base appender.
	 */
	onClearEventHandler() {
		// this.queue.clearQueue();
	}

	/**
	 * Registers appender events with the EventLogDispatcher
	 * @param {Logger} logger to register events with
	 */
	registerLoggingEvents(logger) {
		// add listener to the logger methods
		logger.dispatcher.register({
			eventType: 'log',
			callback: this.onLogEventHandler.bind(this)
		});

		/* logger.EventLogDispatcher.register({
			eventType: 'onClear',
			callback: bind(this.onClearEventHandler, this)
		}); */

		return this;
	}
}
