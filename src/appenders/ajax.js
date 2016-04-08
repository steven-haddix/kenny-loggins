import Appender from '../appender';
import XMLLayout from '../layouts/xml';
const FifoBuffer = require('../fifoBuffer');

/**
 * AJAX Appender sending {@link Log4js.LoggingEvent}s asynchron via
 * <code>XMLHttpRequest</code> to server.<br />
 * The {@link Log4js.LoggingEvent} is POSTed as response content and is
 * formatted by the accociated layout. Default layout is {@link Log4js.XMLLayout}.
 * The <code>threshold</code> defines when the logs
 * should be send to the server. By default every event is sent on its
 * own (threshold=1). If it is set to 10, then the events are send in groups of
 * 10 events.
 *
 * @extends Log4js.Appender
 * @constructor
 * @param {Log4js.Logger} logger log4js instance this appender is attached to
 * @param {String} loggingUrl url where appender will post log messages to
 * @author Stephan Strittmatter
 */
export default class AjaxAppender extends Appender {
	constructor(loggingUrl) {
		super();
		/**
		 * is still esnding data to server
		 * @type boolean
		 * @private
		 */
		this.isInProgress = false;

		/**
		 * @type String
		 * @private
		 */
		this.loggingUrl = loggingUrl || 'logging.log4js';

		/**
		 * @type Integer
		 * @private
		 */
		this.threshold = 1;

		/**
		 * timeout when request is aborted.
		 * @private
		 */
		this.timeout = 2000;

		/**
		 * List of LoggingEvents which should be send after threshold is reached.
		 * @type Map
		 * @private
		 */
		this.loggingEventMap = new FifoBuffer();

		/**
		 * @type Log4js.Layout
		 * @private
		 */
		this.layout = new XMLLayout();
		/**
		 * @type XMLHttpRequest
		 * @private
		 */
		this.httpRequest = null;
	}

	/**
	 * sends the logs to the server
	 * @param loggingEvent event to be logged
	 * @see Log4js.Appender#doAppend
	 */
	doAppend(loggingEvent) {
		console.trace('> AjaxAppender.append');

		if (this.loggingEventMap.length() <= this.threshold || this.isInProgress === true) {
			this.loggingEventMap.push(loggingEvent);
		}

		if (this.loggingEventMap.length() >= this.threshold && this.isInProgress === false) {
			// if threshold is reached send the events and reset current threshold
			this.send();
		}

		console.trace('< AjaxAppender.append');
	}

	/** @see Appender#doClear */
	doClear() {
		console.trace('> AjaxAppender.doClear');
		if (this.loggingEventMap.length() > 0) {
			this.send();
		}
		console.trace('< AjaxAppender.doClear');
	}

	/**
	 * Set the threshold when logs have to be send. Default threshold is 1.
	 * @praram {int} threshold new threshold
	 */
	setThreshold(threshold) {
		console.trace('> AjaxAppender.setThreshold: ' + threshold);
		this.threshold = threshold;
		console.trace('< AjaxAppender.setThreshold');
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
	send() {
		if (this.loggingEventMap.length() > 0) {
			console.trace("> AjaxAppender.send");

			this.isInProgress = true;
			const a = [];

			for (let i = 0; i < this.loggingEventMap.length() && i < this.threshold; i++) {
				a.push(this.layout.format(this.loggingEventMap.pull()));
			}

			let content = this.layout.getHeader();
			content += a.join(this.layout.getSeparator());
			content += this.layout.getFooter();

			let appender = this;
			if (this.httpRequest === null) {
				this.httpRequest = this.getXmlHttpRequest();
			}
			this.httpRequest.onreadystatechange = function () {
				appender.onReadyStateChanged.call(appender);
			};

			this.httpRequest.open('POST', this.loggingUrl, true);
			// set the request headers.
			// this.httpRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			this.httpRequest.setRequestHeader('Content-type', this.layout.getContentType());
			// REFERER will be the top-level
			// URI which may differ from the location of the error if
			// it occurs in an included .js file
			this.httpRequest.setRequestHeader('REFERER', location.href);
			this.httpRequest.setRequestHeader('Content-length', content.length);
			this.httpRequest.setRequestHeader('Connection', 'close');
			this.httpRequest.send(content);

			appender = this;

			try {
				window.setTimeout(() => {
					console.trace("> AjaxAppender.timeout");
					appender.httpRequest.onreadystatechange = function () { };
					appender.httpRequest.abort();
					// this.httpRequest = null;
					appender.isInProgress = false;

					if (appender.loggingEventMap.length() > 0) {
						appender.send();
					}

					console.trace("< AjaxAppender.timeout");
				}, this.timeout);
			} catch (e) {
				console.fatal(e);
			}
			console.trace("> AjaxAppender.send");
		}
	}

	/**
	 * @private
	 */
	onReadyStateChanged() {
		console.trace("> AjaxAppender.onReadyStateChanged");
		const req = this.httpRequest;
		if (this.httpRequest.readyState !== 4) {
			console.trace(
				"< AjaxAppender.onReadyStateChanged: readyState " + req.readyState + " != 4"
			);
			return;
		}

		const success = ((typeof req.status === 'undefined') ||
			req.status === 0 ||
			(req.status >= 200 && req.status < 300));

		if (success) {
			console.trace("  AjaxAppender.onReadyStateChanged: success");

			//ready sending data
			this.isInProgress = false;
		} else {
			const msg = "  AjaxAppender.onReadyStateChanged: XMLHttpRequest request to URL " +
				this.loggingUrl + " returned status code " +
				this.httpRequest.status;
			console.error(msg);
		}

		console.trace("< AjaxAppender.onReadyStateChanged: readyState == 4");
	}

	/**
	 * Get the XMLHttpRequest object independent of browser.
	 * @private
	 */
	getXmlHttpRequest() {
		console.trace('> AjaxAppender.getXmlHttpRequest');

		let httpRequest = false;

		try {
			if (window.XMLHttpRequest) { // Mozilla, Safari, IE7...
					httpRequest = new XMLHttpRequest();
				if (httpRequest.overrideMimeType) {
					httpRequest.overrideMimeType(this.layout.getContentType());
				}
			} else if (window.ActiveXObject) { // IE
				try {
					httpRequest = new ActiveXObject('Msxml2.XMLHTTP');
				} catch (e) {
					httpRequest = new ActiveXObject('Microsoft.XMLHTTP');
				}
			}
		} catch (e) {
			httpRequest = false;
		}

		if (!httpRequest) {
			console.fatal('Unfortunately, your browser does not support AjaxAppender for log4js!');
		}

		console.trace('< AjaxAppender.getXmlHttpRequest');
		return httpRequest;
	}

	/**
	 * toString
	 */
	toString() {
		return 'Log4js.AjaxAppender[loggingUrl=' +
			this.loggingUrl + ', threshold=' + this.threshold + ']';
	}
}
