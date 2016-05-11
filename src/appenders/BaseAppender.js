import { configure } from './config/defaults';

/**
 * Abstract base class for other appenders.
 */
export default class BaseAppender {
	constructor(config) {
		configure(this, {}, config);
		this.tokens = [];
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
	 * @returns {boolean}
	 */
	subscribeToLogger(logger) {
		if (typeof logger.subscribe !== 'function') {
			return true;
		}

		const token = logger.subscribe('log', this.onLogEventHandler.bind(this));

		if (token) {
			this.tokens.push({ log: token });
		}

		return false;
	}

	/**
	 * Unsubscribes from logger events
	 * @param {Logger} logger
	 * @returns {boolean}
     */
	unsubscribeFromLogger(logger) {
		if (typeof logger.subscribe !== 'function') {
			return false;
		}

		let token;

		for (token in this.tokens) {
			if (this.tokens.hasOwnProperty(token)) {
				logger.unsubscribe(this.tokens[token]);
			}
		}

		return true;
	}
}
