var SimpleLayout = require('../layouts/simple');
import Appender from '../appender';
var Level = require('../level');
var helper = require('../helper');

/**
 * Appender writes the logs to the JavaScript console of Mozilla browser
 * More infos: http://kb.mozillazine.org/index.php?title=JavaScript_Console&redirect=no
 * PLEASE NOTE - Only works in Mozilla browser
 * @constructor
 * @extends Log4js.Appender  
 * @param logger log4js instance this appender is attached to
 * @author Stephan Strittmatter
 */
class MozillaJSConsoleAppender extends Appender {
	constructor() {
		super();
		this.layout = new SimpleLayout();
		try {
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			this.jsConsole = Components.classes["@mozilla.org/consoleservice;1"].getService(Components.interfaces.nsIConsoleService);
			this.scriptError = Components.classes["@mozilla.org/scripterror;1"].createInstance(Components.interfaces.nsIScriptError);
		} catch (e) {
			log4jsLogger && log4jsLogger.error(e);
		}
	}

	doAppend(loggingEvent) {
		try {
			netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
			this.scriptError.init(this.layout.format(loggingEvent), null, null, null, null, this.getFlag(loggingEvent), loggingEvent.categoryName);
			this.jsConsole.logMessage(this.scriptError);
		} catch (e) {
			log4jsLogger && log4jsLogger.error(e);
		}
	}
	
	/** 
	 * toString
	 */
	 toString() {
	 	return "Log4js.MozillaJSConsoleAppender"; 
	 }
	 
	/**
	 * Map Log4js.Level to jsConsole Flags:
	 * <ul>
	 * <li>nsIScriptError.errorFlag (0) = Level.Error</li>
	 * <li>nsIScriptError.warningFlag (1)= Log4js.Level.WARN</li>
	 * <li>nsIScriptError.exceptionFlag (2) = Log4js.Level.FATAL</li>
	 * <li>nsIScriptError.strictFlag (4) = unused</li>
	 * </ul>
	 * @private
	 */	
	getFlag(loggingEvent) {
		var retval;
		switch (loggingEvent.level) {	
			case Level.FATAL:
				retval = 2;//nsIScriptError.exceptionFlag = 2
				break;
			case Level.ERROR:
				retval = 0;//nsIScriptError.errorFlag
				break;
			case Level.WARN:
				retval = 1;//nsIScriptError.warningFlag = 1
				break;
			default:
				retval = 1;//nsIScriptError.warningFlag = 1
				break;
		}
		
		return retval;		
	}
}

/**
 * Appender writes the logs to the JavaScript console of Opera browser
 * PLEASE NOTE - Only works in Opera browser
 * @constructor
 * @extends Log4js.Appender  
 * @param logger log4js instance this appender is attached to
 * @author Stephan Strittmatter
 */
class OperaJSConsoleAppender extends Appender {
	constructor() {
		super();
		this.layout = new SimpleLayout();
	}

	/**
	 * @see Log4js.Appender#doAppend
	 */
	doAppend(loggingEvent) {
		opera.postError(this.layout.format(loggingEvent));
	}
	
	/** 
	 * toString
	 */
	 toString() {
	 	return "Log4js.OperaJSConsoleAppender"; 
	 }
}

/**
 * Appender writes the logs to the JavaScript console of Safari browser
 * PLEASE NOTE - Only works in Safari browser
 * @constructor
 * @extends Log4js.Appender  
 * @param logger log4js instance this appender is attached to
 * @author Stephan Strittmatter
 */
class SafariJSConsoleAppender extends Appender {
	constructor() {
		super();
		this.layout = new SimpleLayout();
	}

	/**
	 * @see Log4js.Appender#doAppend
	 */
	doAppend(loggingEvent) {
		window.console.log(this.layout.format(loggingEvent));
	}
	
	/** 
	 * toString
	 */
	 toString() {
	 	return "Log4js.SafariJSConsoleAppender"; 
	 }
}

/**
 * JavaScript Console Appender which is browser independent.
 * It checks internally for the current browser and adds delegate to
 * specific JavaScript Console Appender of the browser.
 *
 * @constructor
 * @extends Log4js.Appender 
 * @author Stephan Strittmatter
 * @since 1.0
 */
export default class BrowserConsoleAppender extends Appender {
	constructor() {
		super();
		/**
		 * Delegate for browser specific implementation
		 * @type Log4js.Appender
		 * @private
		 */
		this.consoleDelegate = null;

		if (window.console) {
			this.consoleDelegate = new SafariJSConsoleAppender();
		}
		else if (window.opera) {
			this.consoleDelegate = new OperaJSConsoleAppender();
		}
		else if (netscape) {
			this.consoleDelegate = new MozillaJSConsoleAppender();
		}
		else {
			//@todo
			log4jsLogger && log4jsLogger.error("Unsupported Browser");
		}
	}

	/** 
	 * @see Log4js.Appender#doAppend
	 */
	doAppend(loggingEvent) {
		this.consoleDelegate.doAppend(loggingEvent);
	}

	/** 
	 * @see Log4js.Appender#doClear
	 */
	doClear() {
		this.consoleDelegate.doClear();
	}
	/**
	 * @see Log4js.Appender#setLayout
	 */
	setLayout(layout){
		this.consoleDelegate.setLayout(layout);
	}
	
	/** 
	 * toString
	 */
	 toString() {
	 	return "Log4js.BrowserConsoleAppender: " + this.consoleDelegate.toString(); 
	 }
}
