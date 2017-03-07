/**
 * Abstract base class for other appenders.
 */
export default class BaseAppender {
	constructor(config) {
		this.buffer = [];
		this.bufferTimer = null;
		this.bufferSize = 1;
		this.bufferInterval = 60;

		Object.assign(this, {}, config);

		this.tokens = [];
		this.startBufferTimer();
	}

	/**
	 * appends the given loggingEvent appender specific
	 * @param {LoggingEvent} loggingEvent to append
	 */
	doAppend() {}

	startBufferTimer() {
		if(this.bufferTimer !== null) {
			clearTimeout(this.bufferTimer)
		}

		this.bufferTimer = setTimeout(() => this.drainBuffer(), this.bufferInterval);
	}

	addToBuffer(event) {
		this.buffer.push(event)
		this.checkBuffer()
	}

	checkBuffer() {
		if(this.buffer.length >= this.bufferSize) {
			this.drainBuffer()
			this.startBufferTimer()
		}
	}

	drainBuffer() {
		if(this.buffer.length > 0) {
			this.doAppend(this.buffer)
		}
	}

	/**
	 * Event handler for log events
     */
	onLogEventHandler(message, payload) {
		this.addToBuffer(payload);
	}

	/**
	 * Subscribes to logger events
	 * @param {Logger} logger to subscribe to
	 * @returns {boolean}
	 */
	subscribeToLogger(logger) {
		if (typeof logger.subscribe !== 'function') {
			return false;
		}

		const token = logger.subscribe('log', this.onLogEventHandler.bind(this));

		if (token) {
			this.tokens.push({ log: token });
			return true;
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
