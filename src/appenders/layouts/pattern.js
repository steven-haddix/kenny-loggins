import BaseLayout from './BaseLayout';
import { formatDate } from '../helpers/dateHelper';


export const PatternTypes = {
	TTCC_CONVERSION_PATTERN:"%r %p %c - %m%n",
	DEFAULT_CONVERSION_PATTERN: "%m%n",
	ISO8601_DATEFORMAT: "yyyy-MM-dd HH:mm:ss,SSS",
	DATETIME_DATEFORMAT: "dd MMM YYYY HH:mm:ss,SSS",
	ABSOLUTETIME_DATEFORMAT: "HH:mm:ss,SSS"
};

/**
 * PatternLayout
 *
 * @constructor
 * @extends Log4js.Layout
 * @author Stephan Strittmatter
 */
export default class PatternLayout extends BaseLayout {
	constructor(pattern) {
		super();

		if (pattern) {
			this.pattern = pattern;
		} else {
			this.pattern = PatternTypes.DEFAULT_CONVERSION_PATTERN;
		}
	}

	/**
	 * Returns the content type output by this layout.
	 * @return "text/plain".
	 * @type String
	 */
	getContentType() {
		return "text/plain";
	}

	/** 
	 * @return Returns the header for the layout format.
	 * @type String
	 */
	getHeader() {
		return null;
	}

	/** 
	 * @return Returns the footer for the layout format.
	 * @type String
	 */
	getFooter() {
		return null;
	}
	
	format(loggingEvent) {
		var regex = /%(-?[0-9]+)?(\.?[0-9]+)?([cdmnpr%])(\{([^\}]+)\})?|([^%]+)/;
		var formattedString = "";
		var result;
		var searchString = this.pattern;

		// Cannot use regex global flag since it doesn't work in IE5
		while ((result = regex.exec(searchString))) {
			var matchedString = result[0];
			var padding = result[1];
			var truncation = result[2];
			var conversionCharacter = result[3];
			var specifier = result[5];
			var text = result[6];

			// Check if the pattern matched was just normal text
			if (text) {
				formattedString += "" + text;
			} else {
				// Create a raw replacement string based on the conversion
				// character and specifier
				var replacement = "";
				switch(conversionCharacter) {
					case "c":
						var loggerName = loggingEvent.categoryName;
						if (specifier) {
							var precision = parseInt(specifier, 10);
							var loggerNameBits = loggingEvent.categoryName.split(".");
							if (precision >= loggerNameBits.length) {
								replacement = loggerName;
							} else {
								replacement = loggerNameBits.slice(loggerNameBits.length - precision).join(".");
							}
						} else {
							replacement = loggerName;
						}
						break;
					case "d":
						var dateFormat = PatternTypes.ISO8601_DATEFORMAT;
						if (specifier) {
							dateFormat = specifier;
							// Pick up special cases
							if (dateFormat == "ISO8601") {
								dateFormat = PatternTypes.ISO8601_DATEFORMAT;
							} else if (dateFormat == "ABSOLUTE") {
								dateFormat = PatternTypes.ABSOLUTETIME_DATEFORMAT;
							} else if (dateFormat == "DATE") {
								dateFormat = PatternTypes.DATETIME_DATEFORMAT;
							}
						}
						// Format the date
						replacement = formatDate(loggingEvent.startTime, dateFormat);
						break;
					case "m":
						replacement = loggingEvent.message;
						break;
					case "n":
						replacement = "\n";
						break;
					case "p":
						replacement = loggingEvent.level.toString();
						break;
					case "r":
						replacement = "" + loggingEvent.startTime.toLocaleTimeString(); //TODO: .getDifference(Log4js.applicationStartDate);
						break;
					case "%":
						replacement = "%";
						break;
					default:
						replacement = matchedString;
						break;
				}
				// Format the replacement according to any padding or
				// truncation specified

				var len;

				// First, truncation
				if (truncation) {
					len = parseInt(truncation.substr(1), 10);
					replacement = replacement.substring(0, len);
				}
				// Next, padding
				if (padding) {
					if (padding.charAt(0) == "-") {
						len = parseInt(padding.substr(1), 10);
						// Right pad with spaces
						while (replacement.length < len) {
							replacement += " ";
						}
					} else {
						len = parseInt(padding, 10);
						// Left pad with spaces
						while (replacement.length < len) {
							replacement = " " + replacement;
						}
					}
				}
				formattedString += replacement;
			}
			searchString = searchString.substr(result.index + result[0].length);
		}
		return formattedString;
	}
}
