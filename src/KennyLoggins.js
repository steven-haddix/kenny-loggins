import Logger from './logger';

export default class KennyLoggins {
	constructor(debugMode = false) {
		/**
		 * Whether to run debug mode
		 * @type {boolean}
         */
		this.debugMode = debugMode;

		/**
		 * Date of logger initialized.
		 * @static
		 * @final
		 */
		this.applicationStartDate = new Date();

		/**
		 * Object of loggers.
		 * @static
		 * @final
		 * @private
		 */
		this.loggers = {};
	}

	configure(configs) {
		if (Array.isArray(configs)) {
			return false;
		}

		configs.forEach((config) => {
			try {
				this.getLogger(config.name).configure(config);
			} catch (ex) {
				// continue regardless of error
			}
		});

		return true;
	}

	/**
	 * Get a logger instance. Instance is cached on categoryName level.
	 * @param  {Object} name of category to log to.
	 * @return {Logger} instance of logger for the category
	 * @static
	 */
	getLogger(name) {
		try {
			if (typeof name !== 'string') {
				name = '[default]';
			}

			if (!this.loggers[name]) {
				// Create the logger for this name if it doesn't already exist
				const logger = new Logger(name);

				if (!this.debugMode) {
					this.productionize(logger);
				}

				this.loggers[name] = logger;
			}

			return this.loggers[name];
		} catch (ex) {
			// continue regardless of error
		}
	}

	productionize(object) {
		let name;
		let method;

		const wrapper = function wrapper(n, m) {
			return () => {
				try {
					return m.apply(this, arguments);
				} catch (ex) {
					// continue regardless of error
				}
			};
		};

		for (name in object) {
			if (object.hasOwnProperty(name)) {
				method = object[name];
				if (typeof method === 'function') {
					object[name] = wrapper(name, method);
				}
			}
		}
	}
}