/**
 * Created by shadd01 on 4/12/16.
 */
import BaseAppender from './BaseAppender';
import { defaults, injectConfig } from './config/defaults';

export default class ConsoleAppender extends BaseAppender {
	constructor(config) {
		super(config);

		// FIXME: There's probably a better way to implement configurations.
		injectConfig(this, defaults.console, config);
	}

	doAppend(loggingEvent) {
		// TODO: layout should be configurable
		console.log(this.layout(loggingEvent));
	}
}
