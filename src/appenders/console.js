/**
 * Created by shadd01 on 4/12/16.
 */
import BaseAppender from './BaseAppender';
import { defaults, injectConfig } from './config/defaults';

export default class ConsoleAppender extends BaseAppender {
	constructor(config) {
		super(config);
		// TODO: There's probably a better way to implement this.
		injectConfig(this, defaults.console, config);
	}

	doAppend(loggingEvent) {
		console.log(this.layout.format(loggingEvent));
	}
}
