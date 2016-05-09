var Appender = require('appender');
var helper = require('../helper');

/**
 * Windows Event Appender writes the logs to the Windows Event log.
 * PLEASE NOTE - Only works in IE..uses ActiveX to write to Windows Event log
 *
 * @extends Log4js.Appender
 * @constructor
 * @param logger log4js instance this appender is attached to
 * @author Seth Chisamore
 */
function WindowsEventAppender() {
	try {
		this.shell = new ActiveXObject('WScript.Shell');
	} catch (e) {
		console.log(e);
	}
}

WindowsEventAppender.prototype = helper.extend(new Appender(), /** @lends Log4js.WindowsEventAppender# */ {
	/**
	 * @param loggingEvent event to be logged
	 * @see Log4js.Appender#doAppend
	 */
	doAppend() {},

	/**
	* toString
	*/
	toString() {
		return 'Log4js.WindowsEventAppender';
	}
});
