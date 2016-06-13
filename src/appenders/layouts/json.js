import { formatUTCDate } from '../../helpers/dateHelper';

// TODO: Refactor this block of code.
function formatMessage(message) {
	let stream = '';
	if ((typeof message) === 'string') {
		stream += '\t\"message\": \"' + message + '\",\n';
	} else if ((typeof message) === 'object') {
		if ('message' in message) {
			stream += '\t\"message\": \"' + message.message + '\",\n';
		}

		for (const property in message) {
			if (property === 'message') continue;

			const val = message[property];
			if (val instanceof Date) {
				stream += "\t\"" + property + "_dt\": \"" +
					formatUTCDate(val, "yyyy-MM-ddThh:mm:ssZ") + "\",\n";
			} else {
				switch (typeof val) {
					case 'string':
						stream += "\t\"" + property + "_s\": \"" + val + "\",\n";
						break;
					case 'number':
						stream += "\t\"" + property + "_l\": " + val + ",\n";
						break;
					default:
						stream += "\t\"" + property + "_s\": \"" + val.toString() + "\",\n";
						break;
				}
			}
		}
	} else {
		stream += '\t\"message\": \"' + message.toString() + '\",\n';
	}
	return stream;
}

function generateJSONMessage(loggingEvent, referer, useragent) {
	return JSON.stringify({
		system: loggingEvent.categoryName,
		logLevel: loggingEvent.level.toString(),
		logMessage: loggingEvent.message,
		referer,
		useragent,
		dateLogged: formatUTCDate(loggingEvent.startTime, 'yyyy-MM-ddThh:mm:ssZ')
	});
}

// TODO: Determine if this is actually needed
function getUserAgent() {
	try {
		return navigator.userAgent;
	} catch (e) {
		return 'unknown';
	}
}

// TODO: Determine if this is actually needed
function getReferer() {
	try {
		return location.href;
	} catch (e) {
		return 'unknown';
	}
}

export default function format(loggingEvent) {
	return generateJSONMessage(
		loggingEvent,
		getReferer(),
		getUserAgent()
	);
}
