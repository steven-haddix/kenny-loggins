import Logger from './Logger';

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
		 * Array of loggers.
		 * @static
		 * @final
		 * @private
		 */
		this.loggers = [];

		this.configs = [];
	}

	/**
	 * Takes an array of configuration objects and creates loggers for each one.
	 * Order of configurations matter as the first matching configuration is
	 * returned when doing getLogger().
	 *
	 * Example Config:
	 * [{
	 * 		name: 'common.services.orders'
	 * 		appenders: [new ConsoleAppender(), new AjaxAppender()]
	 * 	},
	 * 	{
	 * 		pattern: '^common'
	 * 		appenders: [new ConsoleAppender()]
	 * }]
	 *
	 * @param config
	 * @returns {KennyLoggins}
     */
	configure(config) {
		if (typeof config !== 'object') {
			return this;
		}

		if(config.appenders && Array.isArray(config.appenders)) {
			config.appenders.forEach((appenderConfig) => {
				try {
					appenderConfig['globals'] = config.globals ? config.globals : {};
					this.configs.push(appenderConfig);
				} catch (ex) {
					// continue regardless of error
				}
			});
		}

		return this;
	}

	/**
	 * Get a logger instance. Instance is cached on categoryName level.
	 * @param  {String} name of logger to return.
	 * @return {Logger} instance of logger for the category
	 */
	getLogger(name) {
		try {
			const logger = this.getLoggerByName(name);

			if (logger) {
				return logger.logger;
			}

			const config = this.getLoggerConfig(name);

			if(config) {
				return this.createLogger(name, config);
			}

			return this.getDefaultLogger();
		} catch (ex) {
			// continue regardless of error
		}
	}

	/**
	 * Function for creating new loggers. Adds new logger to list of logger instances.
	 * @param {string} name
	 * @param {object} config
 	 * @returns {Logger}
     */
	createLogger(name, config) {
		const logger = new Logger(name).configure(config);

		if (!this.debugMode) {
			this.productionize(logger);
		}

		this.loggers.push({
			name,
			logger
		});

		return logger;
	}

	getDefaultLogger() {
		const defaultLogger = this.getLoggerByName('default');

		if (defaultLogger) {
			return defaultLogger.logger;
		}

		return this.createLogger('default');
	}

	getLoggerConfig(name) {
		let isFound = false;
		let config;

		this.configs.forEach((c) => {
			if (!isFound && this.regex(c.name, name)) {
				isFound = true;
				config = c;
			}
		});

		return config;
	}

	getLoggerByName(name) {
		let logger;

		this.loggers.forEach((l) => {
			if (l.name === name) {
				logger = l;
			}
		});

		return logger;
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

	regex(regx, str) {
		if (new RegExp(regx).exec(str)) {
			return true;
		}

		return false;
	}
}