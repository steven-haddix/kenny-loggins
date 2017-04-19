import cloneDeep from 'lodash.clonedeep';
import LoggingEvent from './loggingEvent';
import { formatError } from './formatters'
import { Level } from './level';
import { logger } from './defaults'
import { isFunction, isNumeric, isString, isObject } from './helpers'

export default class Logger {
	constructor(config = logger) {
		Object.assign(this, config)
	}

	static createLogger(config) {
		const configuration = {
			name: Logger.validateName(config.name),
			level: Logger.validateLevel(config.name, config.level),
			formatters: Logger.validateFormatters(config.formatters),
			globals: Logger.validateGlobals(config.globals),
			callback: Logger.validateCallback(config.callback)
		}

		Logger.prototype.trace = Logger.createEmitters(Level.TRACE)
		Logger.prototype.debug = Logger.createEmitters(Level.DEBUG)
		Logger.prototype.info = Logger.createEmitters(Level.INFO)
		Logger.prototype.warn = Logger.createEmitters(Level.WARN)
		Logger.prototype.error = Logger.createEmitters(Level.ERROR)
		Logger.prototype.fatal = Logger.createEmitters(Level.FATAL)

		return new Logger(configuration)
	}

	static validateName(name) {
		if (isString(name)) {
			return name
		}
		throw new Error(`Invalid logger name "${name}". Must be a non-empty string.`)
	}

	static validateCallback(callback) {
		if (isFunction(callback)) {
			return callback
		}
		throw new Error(`Invalid logger callback. Must be a of type function.`)
	}

	static validateFormatters(formatters) {
		if (isObject(formatters)) {
			return formatters
		}
		return {}
	}

	static validateLevel(name, logLevel) {
		if (isNumeric(logLevel)) {
			return logLevel
		}
		console.log(`Invalid logging level for "${name}". Defaulting to "ERROR".`)
		return Level.ERROR;
	}

	static validateGlobals(globals) {
		if(typeof globals === 'undefined') {
			return {}
		}

		if(isObject(globals)) {
			return globals
		}

		console.log('Invalid global configurations. Must be a non-empty object.')
		return {};
	}

	static createEmitters(level) {
		return function() {
			if(this.level <= level) {
				this.log(level, cloneDeep(arguments))
			}
		}
	}

	applyFormatters(event) {
		if(!this.formatters || this.formatters.length < 1) {
			return;
		}
		Object.keys(this.formatters).forEach(name => {
			if(!event[name]) {
				return;
			}
			try {
				event[name] = this.formatters[name](event[name])
			} catch(err) {
				console.warn('There was an error applying a log formatter.', err)
			}
		})
	}

	/**
	 * main log method logging to all available appenders
	 */
	log(minLevel, args) {
		const loggingEvent = new LoggingEvent(this.name, Level.toString(minLevel));

		if (args[0] instanceof Error) {
			loggingEvent.exception = formatError(args[0])
			loggingEvent.message = loggingEvent.exception.message
		} else if(isString(args[0])) {
			loggingEvent.message = args[0]
			if(args[1] instanceof Error) {
				loggingEvent.exception = formatError(args[1])
			}
		} else if(isObject(args[0]) && !(args[0] instanceof Error)) {
			Object.assign(loggingEvent, args[0])
		}

		this.applyFormatters(loggingEvent)
		this.callback(loggingEvent)
	}
}
