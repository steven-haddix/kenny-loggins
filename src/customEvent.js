/**
 * Log4js CustomEvent
 * @constructor
 * @author Corey Johnson - original code in Lumberjack (http://gleepglop.com/javascripts/logger/)
 * @author Seth Chisamore - adapted for Log4js
 * @private
 */
function CustomEvent() {
	this.listeners = [];
}

CustomEvent.prototype = {

	/**
 	 * @param method method to be added
 	 */
	addListener(method) {
		this.listeners.push(method);
	},

	/**
 	 * @param method method to be removed
 	 */
	removeListener(method) {
		const foundIndexes = this.findListenerIndexes(method);

		for (let i = 0; i < foundIndexes.length; i++) {
			this.listeners.splice(foundIndexes[i], 1);
		}
	},

	/**
 	 * @param handler
 	 */
	dispatch(handler) {
		for (let i = 0; i < this.listeners.length; i++) {
			try {
				this.listeners[i](handler);
			} catch (e) {
				console.warn('Could not run the listener ' + this.listeners[i] + '. \n' + e);
				console.log(e);
			}
		}
	},

	/**
	 * @private
	 * @param method
	 */
	findListenerIndexes(method) {
		const indexes = [];
		for (let i = 0; i < this.listeners.length; i++) {
			if (this.listeners[i] === method) {
				indexes.push(i);
			}
		}

		return indexes;
	}
};

module.exports = CustomEvent;
