import BaseAppender from './BaseAppender';
import Client from './client/Client';
import { defaults, injectConfig } from './config/defaults';
import format from '../layouts/json';

export default class AjaxAppender extends BaseAppender {
	constructor(config) {
		super(config);
		// TODO: There's probably a better way to implement this.
		injectConfig(this, defaults.ajax, config);
	}

	/**
	 * sends the logs to the server
	 * @param loggingEvent event to be logged
	 */
	doAppend(loggingEvent) {
		return this.send(format(loggingEvent));
	}

	/**
	 * Set the timeout in milli seconds until sending request is aborted.
	 * Default is 2000 ms.
	 * @param {int} milliseconds the new timeout
	 */
	setTimeout(milliseconds) {
		this.timeout = milliseconds;
	}

	/**
	 * send the request.
	 */
	send(request) {
		// TODO: figure out how to handle client responses.
		return new Client().postRequest(this.url, null, request)
			.then((res) => console.log(res))
			.catch((err) => console.log(err));
	}

	/**
	 * toString
	 */
	toString() {
		return 'AjaxAppender[loggingUrl=' +
			this.loggingUrl + ', threshold=' + this.threshold + ']';
	}
}
