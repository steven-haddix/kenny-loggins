import BaseAppender from './BaseAppender';
import format from './layouts/simple';
import { defaults, injectConfig } from './config/defaults';

export default class ConsoleAppender extends BaseAppender {
	constructor(config) {
		super(config);

		// FIXME: There's probably a better way to implement configurations.
		injectConfig(this, defaults.console, config);
	}

	doAppend(loggingEvent) {
		if (!loggingEvent || !loggingEvent.message || !loggingEvent.level) {
			return false;
		}

		const level = loggingEvent.level.toString();

		// TODO: implement configurable layouts
		const message = format(level, loggingEvent.message);

		return ConsoleAppender.console(level, message);
	}

	/* eslint-disable no-console */
	static console(level, message) {
		switch (level) {
			case 'FATAL':
			case 'ERROR':
				console.error(message);
				return true;
			case 'WARN':
				console.warn(message);
				return true;
			case 'DEBUG':
			case 'INFO':
				console.info(message);
				return true;
			case 'TRACE':
				console.trace(message);
				return true;
			default:
				return false;
		}
	}
	/* eslint-enable no-console */
}
