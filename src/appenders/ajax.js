import BaseAppender from './BaseAppender';
import Client from './client/Client';
import { defaults, configure } from './config/defaults';
import format from './layouts/json';

export default class AjaxAppender extends BaseAppender {
	constructor(config) {
		super(config);
		// FIXME: There's probably a better way to implement configurations.
		configure(this, defaults.ajax, config);
		this.client = new Client();
	}

	/**
	 * sends the logs to the server
	 * @param loggingEvent event to be logged
	 */
	doAppend(loggingEvent) {
		// TODO: layout should be configurable
		this.send(format(loggingEvent));
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
		return this.client
					.postRequest(this.url, null, request)
					.then(
						// TODO: determine what to do with client responses.
						() => {},
						() => {}
					);
	}

	/**
	 * toString
	 */
	toString() {
		return 'AjaxAppender[loggingUrl=' +
			this.loggingUrl + ', threshold=' + this.threshold + ']';
	}
}
