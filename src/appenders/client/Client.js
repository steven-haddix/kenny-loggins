/**
 * Created by shadd01 on 4/14/16.
 */
import Promise from 'bluebird';
const request = Promise.promisifyAll(require('superagent'));
const legacyIESupport = require('superagent-legacyiesupport');

export default class Client {
    wrapInSuccessCheck() {
    }

    legacyIESupportWrapper(superagent) {
        if (typeof XDomainRequest !== 'undefined' // IE 8, 9, & 10
            && !('withCredentials' in new XMLHttpRequest())) { // ONLY IE10
            // use the legacy support page
            legacyIESupport(superagent);
        }
    }

    postRequest(url, queryString, postParams, timeout = 5000) {
        return request.post(url)
                .use(this.legacyIESupportWrapper)
                .timeout(timeout)
                .query(queryString)
                .set('Content-Type', 'application/json')
                .set('Accept', 'application/json')
                .send(postParams);
    }
}


