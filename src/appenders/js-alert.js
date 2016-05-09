var SimpleLayout = require('./simple');
var Appender = require('appender');
var helper = require('../helper');

/**
 * JS Alert Appender writes the logs to the JavaScript alert dialog box
 * @constructor
 * @extends Log4js.Appender  
 * @param logger log4js instance this appender is attached to
 * @author S&eacute;bastien LECACHEUR
 */
 function JSAlertAppender() {
	this.layout = new SimpleLayout();
}

JSAlertAppender.prototype = helper.extend(new Appender(), /** @lends Log4js.JSAlertAppender# */ {
	/** 
	 * @see Log4js.Appender#doAppend
	 */
	doAppend: function(loggingEvent) {
		alert(this.layout.getHeader() + this.layout.format(loggingEvent) + this.layout.getFooter());
	},
	
	/** 
	 * toString
	 */
	 toString: function() {
	 	return "Log4js.JSAlertAppender"; 
	 }	
});

module.exports = JSAlertAppender;
