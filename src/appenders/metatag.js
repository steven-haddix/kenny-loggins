var Appender = require('appender');
var helper = require('../helper');
/**
 * Metatag Appender writing the logs to meta tags
 *
 * @extends Log4js.Appender
 * @constructor
 * @param logger log4js instance this appender is attached to
 * @author Stephan Strittmatter
 */
function MetatagAppender() {
	this.currentLine = 0;
}

MetatagAppender.prototype = helper.extend(new Appender(), /** @lends Log4js.MetatagAppender# */ {
	/**
	 * @param loggingEvent event to be logged
	 * @see Log4js.Appender#doAppend
	 */
	doAppend: function(loggingEvent) {
		var now = new Date();
		var lines = loggingEvent.message.split("\n");
		var headTag = document.getElementsByTagName("head")[0];

		for (var i = 1; i <= lines.length; i++) {
			var value = lines[i - 1];
			if (i == 1) {
				value = loggingEvent.level.toString() + ": " + value;
			} else {
				value = "> " + value;
			}

			var metaTag = document.createElement("meta");
			metaTag.setAttribute("name", "X-log4js:" + this.currentLine);
			metaTag.setAttribute("content", value);
			headTag.appendChild(metaTag);
			this.currentLine += 1;
		}
	},

	/** 
	 * toString
	 */
	 toString: function() {
	 	return "Log4js.MetatagAppender"; 
	 }
});

module.exports = MetatagAppender;
