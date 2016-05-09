import Logger from './Logger';

export default class KennyLoggins {
	constructor() {
		/**
		 * Current version of log4js.
		 * @static
		 * @final
		 */
		this.version = '1.0.0';

		/**
		 * Date of logger initialized.
		 * @static
		 * @final
		 */
		this.applicationStartDate = new Date();

		/**
		 * Hashtable of loggers.
		 * @static
		 * @final
		 * @private
		 */
		this.loggers = {};
	}


	/**
	 * Get a logger instance. Instance is cached on categoryName level.
	 * @param  {Object} name of category to log to.
	 * @return {Logger} instance of logger for the category
	 * @static
	 */
	getLogger(name) {
		if (typeof name !== 'string') {
			name = '[default]';
		}

		if (!this.loggers[name]) {
			// Create the logger for this name if it doesn't already exist
			this.loggers[name] = new Logger(name);
		}

		return this.loggers[name];
	}

	/**
	 * Get the default logger instance.
	 * @return {Logger} instance of default logger
	 * @static
	 */
	getDefaultLogger() {
		return this.getLogger('[default]');
	}

	/**
	 * Atatch an observer function to an elements event browser independent.
	 *
	 * @param element element to attach event
	 * @param name name of event
	 * @param observer observer method to be called
	 * @private
	 */
	attachEvent(element, name, observer) {
		if (element.addEventListener) { // DOM event model
			element.addEventListener(name, observer, false);
		} else if (element.attachEvent) { // M$ event model
			element.attachEvent('on' + name, observer);
		}
	}
}