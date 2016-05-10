import { DEFAULT_DATE_FORMAT, formatDate } from './helpers/dateHelper';
import LoggingEvent from './LoggingEvent';
import PubSub from './PubSub';
import { Level, getLevelFromText } from './level';
import { createAppenders } from './appenderFactory.js';

export default class Logger {
	constructor(category = '') {
		this.loggingEvents = [];
		this.appenders = [];
		this.category = category;
		this.level = Level.ERROR;
		this.dateformat = DEFAULT_DATE_FORMAT;

		this.pubsub = new PubSub();
	}

	configure(config) {
		this.configureLevel(config)
			.configureAppenders(config);

		return this;
	}

	configureLevel(config) {
		if (config && config.logging) {
			this.level = Level.toLevel(config.logging.level);
		}
		return this;
	}

	configureAppenders(config) {
		if (config && config.logging) {
			const appenders = createAppenders(config.logging.appenders, config.appenders);
			appenders.forEach((appender) => {
				appender.subscribeLoggingEvents(this);
				this.appenders.push(appender);
			});
		}
		return this;
	}
	/**
	 * Set the Loglevel default is LogLEvel.TRACE
	 * @param level wanted logging level
	 */
	setLevel(level) {
		this.level = level;
	}

	subscribe(callback) {
		this.pubsub.subscribe('log', callback);
	}

	/**
	 * main log method logging to all available appenders
	 * @private
	 */
	log(logLevel, message, exception) {
		const loggingEvent = new LoggingEvent(
			this.category,
			Level.toString(logLevel),
			message,
			exception,
			this
		);

		this.pubsub.publish('log', loggingEvent);
	}

	/** clear logging */
	clear() {
		try {
			this.loggingEvents = [];
			this.dispatcher.dispatch('clear');
		} catch (e) {
			console.log(e);
		}
	}

	/** checks if Level Trace is enabled */
	isTraceEnabled() {
		if (this.level <= Level.TRACE) {
			return true;
		}
		return false;
	}

	/**
	 * Trace messages
	 * @param message {Object} message to be logged
	 */
	trace(message) {
		if (this.isTraceEnabled()) {
			this.log(Level.TRACE, message, null);
		}
	}

	/** checks if Level Debug is enabled */
	isDebugEnabled() {
		if (this.level <= Level.DEBUG) {
			return true;
		}
		return false;
	}

	/**
	 * Debug messages
	 * @param {Object} message  message to be logged
	 * @param {Throwable} throwable
	 */
	debug(message, throwable) {
		if (this.isDebugEnabled()) {
			this.log(Level.DEBUG, message, throwable);
		}
	}

	/** checks if Level Info is enabled */
	isInfoEnabled() {
		if (this.level <= Level.INFO) {
			return true;
		}
		return false;
	}

	/**
	 * logging info messages
	 * @param {Object} message  message to be logged
	 * @param {Throwable} throwable
	 */
	info(message, throwable) {
		if (this.isInfoEnabled()) {
			this.log(Level.INFO, message, throwable);
		}
	}

	/** checks if Level Warn is enabled */
	isWarnEnabled() {
		if (this.level <= Level.WARN) {
			return true;
		}
		return false;
	}

	/** logging warn messages */
	warn(message, throwable) {
		if (this.isWarnEnabled()) {
			this.log(Level.WARN, message, throwable);
		}
	}

	/** checks if Level Error is enabled */
	isErrorEnabled() {
		if (this.level <= Level.ERROR) {
			return true;
		}
		return false;
	}

	/** logging error messages */
	error(message, throwable) {
		if (this.isErrorEnabled()) {
			this.log(Level.ERROR, message, throwable);
		}
	}

	/** checks if Level Fatal is enabled */
	isFatalEnabled() {
		if (this.level <= Level.FATAL) {
			return true;
		}
		return false;
	}

	/** logging fatal messages */
	fatal(message, throwable) {
		if (this.isFatalEnabled()) {
			this.log(Level.FATAL, message, throwable);
		}
	}

	/**
	 * Set the date format of logger. Following switches are supported:
	 * <ul>
	 * <li>yyyy - The year</li>
	 * <li>MM - the month</li>
	 * <li>dd - the day of month<li>
	 * <li>hh - the hour<li>
	 * <li>mm - minutes</li>
	 * <li>O - timezone offset</li>
	 * </ul>
	 * @param {String} format format String for the date
	 * @see {@getTimestamp}
	 */
	setDateFormat(format) {
		this.dateformat = format;
	}

	/**
	 * Generates a timestamp using the format set in {Log4js.DateFormatter.formatDate}.
	 * @param {Date} date the date to format
	 * @see {@setDateFormat}
	 * @return {String} A formatted timestamp with the current date and time.
	 */
	getFormattedTimestamp(date) {
		return formatDate(date, this.dateformat);
	}
}
