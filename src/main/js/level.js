/**
 * Level Enumeration. Do not use directly. Use static objects instead.
 * @constructor
 * @param {Number} level number of level
 * @param {String} levelString String representation of level
 * @private
 */
function Level(level, levelStr) {
	this.level = level;
	this.levelStr = levelStr;
};

Level.prototype =  {
	/**
	 * converts given String to corresponding Level
	 * @param {String} sArg String value of Level
	 * @param {Level} defaultLevel default Level, if no String representation
	 * @return Level object
	 * @type Level
	 */
	toLevel: function(sArg, defaultLevel) {
		if(sArg === null) {
			return defaultLevel;
		}

		if(typeof sArg == "string") {
			var s = sArg.toUpperCase();

			switch(s) {
				case "ALL": return Level.ALL;
				case "DEBUG": return Level.DEBUG;
				case "INFO": return Level.INFO;
				case "WARN": return Level.WARN;
				case "ERROR": return Level.ERROR;
				case "FATAL": return Level.FATAL;
				case "OFF": return Level.OFF;
				case "TRACE": return Level.TRACE;
				default: return defaultLevel;
			}
		} else if(typeof sArg == "number") {
			switch(sArg) {
				case ALL_INT: return Level.ALL;
				case DEBUG_INT: return Level.DEBUG;
				case INFO_INT: return Level.INFO;
				case WARN_INT: return Level.WARN;
				case ERROR_INT: return Level.ERROR;
				case FATAL_INT: return Level.FATAL;
				case OFF_INT: return Level.OFF;
				case TRACE_INT: return Level.TRACE;
				default: return defaultLevel;
			}
		} else {
			return defaultLevel;
		}
	},
	/**
	 * @return  converted Level to String
	 * @type String
	 */
	toString: function() {
		return this.levelStr;
	},
	/**
	 * @return internal Number value of Level
	 * @type Number
	 */
	valueOf: function() {
		return this.level;
	}
};

module.exports = Level;

// Static variables
/**
 * @private
 */
Level.OFF_INT = Number.MAX_VALUE;
/**
 * @private
 */
Level.FATAL_INT = 50000;
/**
 * @private
 */
Level.ERROR_INT = 40000;
/**
 * @private
 */
Level.WARN_INT = 30000;
/**
 * @private
 */
Level.INFO_INT = 20000;
/**
 * @private
 */
Level.DEBUG_INT = 10000;
/**
 * @private
 */
Level.TRACE_INT = 5000;
/**
 * @private
 */
Level.ALL_INT = Number.MIN_VALUE;

/**
 * Logging Level OFF - all disabled
 * @type Level
 * @static
 */
Level.OFF = new Level(Level.OFF_INT, "OFF");
/**
 * Logging Level Fatal
 * @type Level
 * @static
 */
Level.FATAL = new Level(Level.FATAL_INT, "FATAL");
/**
 * Logging Level Error
 * @type Level
 * @static
 */
Level.ERROR = new Level(Level.ERROR_INT, "ERROR");
/**
 * Logging Level Warn
 * @type Level
 * @static
 */
Level.WARN = new Level(Level.WARN_INT, "WARN");
/**
 * Logging Level Info
 * @type Level
 * @static
 */
Level.INFO = new Level(Level.INFO_INT, "INFO");
/**
 * Logging Level Debug
 * @type Level
 * @static
 */
Level.DEBUG = new Level(Level.DEBUG_INT, "DEBUG");
/**
 * Logging Level Trace
 * @type Level
 * @static
 */
Level.TRACE = new Level(Level.TRACE_INT, "TRACE");
/**
 * Logging Level All - All traces are enabled
 * @type Level
 * @static
 */
Level.ALL = new Level(Level.ALL_INT, "ALL");


