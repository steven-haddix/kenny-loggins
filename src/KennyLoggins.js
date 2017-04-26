import PubSub from './PubSub'
import Logger from './Logger';
import { Level } from './level';
import {
	isRegexMatch,
	isObject,
	isFunction,
	isString,
	safetyWrapper
} from './helpers'

export default class KennyLoggins {
	constructor(debugMode = false) {

		this.debugMode = debugMode;

		this.pubsub = new PubSub();

		this.loggers = [];

		this.formatters = {};

		this.configs = [];

		this.globals = {};

		this.defaultLogger = Logger.createLogger({
			name: 'default',
			level: Level.ERROR,
			callback: () => {}
		})
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
	 * 		name: '^common'
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

		this.setFormatters(config.formatters)

		this.setGlobals(config.globals)

		if(config.loggers) {
			this.setLoggerConfigs(config.loggers)
		} else if(config.appenders) {
			console.log('The .configure({ appenders: [] }) syntax is now deprecated. Please switch to .configure({ loggers: [] }) in the future.')
			this.setLoggerConfigs(config.appenders)
		}
		return this;
	}

	setFormatters(formatters) {
		if(!Array.isArray(formatters)) {
			return;
		}

		formatters.forEach(formatter => {
			const name = isString(formatter.name) || '[ UNKNOWN ]'
			if(isObject(formatter) && isString(formatter.name) && isFunction(formatter.format)) {
				this.formatters[formatter.name] = formatter.format;
			} else {
				console.warn(`Invalid formatter configuration for formatter ${name}. Expecting: "{ name: [field name], format: [format function] }".`)
			}
		})
	}

	setLoggerConfigs(configs) {
		if(!Array.isArray(configs)) {
			return;
		}
		configs.forEach(config => {
			if(config.name) {
				this.configs.push(config)
			} else {
				console.warn('Invalid logger configuration name found. This configuration will be ignored.', config)
			}
		})
	}

	setGlobals(globals) {
		if(!globals) {
			return;
		}

		this.globals = globals
	}

	/**
	 * Loops through array of appenders, subscribes them to the logger
	 * @param {string} logger - Name of logger to set appenders to listen
	 * @param {Object} appenders - Object that contains an array of appenders
	 * @returns {KennyLoggins} returns self to allow for chaining
	 */
	configureAppenders(logger, appenders) {
		if (!Array.isArray(appenders)) {
			return this
		}

		appenders.forEach((appender) => {
			if (typeof appender === 'object' && typeof appender.onLogEventHandler === 'function') {
				this.pubsub.subscribe(logger, (logger, event) => appender.onLogEventHandler(logger, event))
			}
		});
	}

	/**
	 * Get a logger instance if it exists or create a new one.
	 * Returns a default logger if no configuration is found.
	 * @param  {String} name of logger config to use.
	 * @return {Logger} instance of a logger
	 */
	getLogger(name) {
		try {
			const logger = this.getLoggerByName(name);

			if (logger) {
				return logger.logger;
			}

			const config = this.getLoggerConfig(name);

			if(config) {
				return this.createLogger(Object.assign(config, { name }));
			}

			return this.defaultLogger;
		} catch (err) {
			console.log(err)
			return this.getDefaultLogger();
		}
	}

	/**
	 * Function for creating new loggers. Adds new logger to list of logger instances.
	 * @param {object} config
 	 * @returns {Logger}
     */
	createLogger(config) {
		config.callback = (param) => this.pubsub.publish(config.name, param)

		const logger = Logger.createLogger(Object.assign(config, { formatters: this.formatters, globals: this.globals }))
		this.configureAppenders(config.name, config.appenders);

		if (!this.debugMode) {
			// FIXME: this is messing with logger callback scoping when enabled
			// safetyWrapper(logger);
		}

		this.loggers.push({ name: config.name, logger });

		return logger;
	}

	getDefaultLogger() {
		return this.getLoggerByName('default');
	}

	getLoggerConfig(name) {
		let isFound = false;
		let config;

		if(this.configs.length === 0 || !name) {
			return config
		}

		this.configs.forEach((c) => {
			if (!isFound && isRegexMatch(c.name, name)) {
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
}