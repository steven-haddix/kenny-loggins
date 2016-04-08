import Appender from './appender';
var DateFormatter = require('./dateFormatter');
var CustomEvent = require('./customEvent');
import LoggingEvent from './loggingEvent';
import { Level } from './level';

/**
 * Logger to log messages to the defined appender.</p>
 * Default appender is Appender, which is ignoring all messages. Please
 * use setAppender() to set a specific appender (e.g. WindowAppender).
 * use {@see Log4js#getLogger(String)} to get an instance.
 * @constructor
 * @param name name of category to log to
 * @author Stephan Strittmatter
 */
export default class Logger {
	constructor(name) {
		this.loggingEvents = [];
		this.appenders = [];
		/** category of logger */
		this.category = name || "";
		/** level to be logged */
		this.level = Level.FATAL;

		this.dateformat = DateFormatter.DEFAULT_DATE_FORMAT;

		this.onlog = new CustomEvent();
		this.onclear = new CustomEvent();

		/** appender to write in */
		this.appenders.push(new Appender(this));

		// if multiple log objects are instantiated this will only log to the log
		// object that is declared last can't seem to get the attachEvent method to
		// work correctly
		try {
			window.onerror = this.windowError.bind(this);
		} catch (e) {
			//log4jsLogger.fatal(e);
		}
	}


	/**
	 * add additional appender. DefaultAppender always is there.
	 * @param appender additional wanted appender
	 */
	addAppender(appender) {
		if (appender instanceof Appender) {
			appender.setLogger(this);
			this.appenders.push(appender);			
		} else {
			throw "Not instance of an Appender: " + appender;
		}
	}

	/**
	 * set Array of appenders. Previous Appenders are cleared and removed.
	 * @param {Array} appenders Array of Appenders
	 */
	setAppenders(appenders) {
		//clear first all existing appenders
		for(var i = 0; i < this.appenders.length; i++) {
			this.appenders[i].doClear();
		}
		
		this.appenders = appenders;
		
		for(var j = 0; j < this.appenders.length; j++) {
			this.appenders[j].setLogger(this);
		}
	}
	
	/**
	 * Set the Loglevel default is LogLEvel.TRACE
	 * @param level wanted logging level
	 */
	setLevel(level) {
		this.level = level;
	}
	
	/** 
	 * main log method logging to all available appenders 
	 * @private
	 */
	log(logLevel, message, exception) {
		var loggingEvent = new LoggingEvent(this.category, Level.toString(logLevel),
			message, exception, this);
		this.loggingEvents.push(loggingEvent);
		this.onlog.dispatch(loggingEvent);
	}
	
	/** clear logging */
	clear() {
		try{
			this.loggingEvents = [];
			this.onclear.dispatch();
		} catch(e){}
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
		debugger;
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
	 * Capture main window errors and log as fatal.
	 * @private
	 */
	windowError(msg, url, line){
		var message = "Error in (" + (url || window.location) + ") on line "+ line +" with message (" + msg + ")";
		this.log(Level.FATAL, message, null);
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
	  return DateFormatter.formatDate(date, this.dateformat);
	}
}
