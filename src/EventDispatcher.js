/**
 * Event Dispatcher
 * @constructor
 * @author Steven Haddix
 */
export default class EventDispatcher {
	constructor() {
		this.listeners = [];
	}

	/**
 	 * @param method - method to be added
 	 */
	register(method) {
		this.listeners.push(method);
	}

	/**
 	 * @param method - method to be removed
 	 */
	unregister(method) {
		this.listeners = this.listeners.filter((listener) => listener !== method);
	}

	/**
	 * @param eventType
 	 * @param event
 	 */
	dispatch(eventType, event) {
		this.listeners.forEach((listener) => {
			if (listener.eventType === eventType) {
				listener.callback(event);
			}
		});
	}
}
