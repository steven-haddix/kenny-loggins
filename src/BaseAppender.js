import Queue from './Queue'
import { isFunction } from './helpers'

/**
 * Abstract base class for other appenders.
 */
export default class BaseAppender {
	constructor(config) {
		this.queue = new Queue(config)
		this.queue.setDrainCallback((events) => {
			if(isFunction(this.doAppend)) {
				events.forEach((event) => this.doAppend(event))
			}

			if(isFunction(this.append)) {
				this.append(events)
			}
		})

		Object.assign(this, {}, config);
	}

	/**
	 * @param {array} events
     */
	append(events) {}

	/**
	 * Event handler for log events
     */
	onLogEventHandler(message, payload) {
		this.queue.addToQueue(payload);
	}
}
