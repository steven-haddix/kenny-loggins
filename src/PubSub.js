export default class PubSub {
    constructor() {
        this.messages = {};
        this.lastToken = -1;
    }

    subscribe(message, func) {
        if (typeof func !== 'function') {
            return false;
        }

        if (!this.messages.hasOwnProperty(message)) {
            this.messages[message] = {};
        }

        const token = `token_${String(++this.lastToken)}`;
        this.messages[message][token] = func;

        return token;
    }

    unsubscribe(value) {
        const isToken = !this.messages.hasOwnProperty(value) && typeof value === 'string';
        const isFunction = typeof value === 'function';
        let result = false;
        let m;
        let t;
        let message;

        for (m in this.messages) {
            if (this.messages.hasOwnProperty(m)) {
                message = this.messages[m];

                if (isToken && message[value]) {
                    delete message[value];
                    result = value;
                    break;
                }

                if (isFunction) {
                    for (t in message) {
                        if (message.hasOwnProperty(t) && message[t] === value) {
                            delete message[t];
                            result = true;
                        }
                    }
                }
            }
        }

        return result;
    }

    publish(message, data) {
        const hasSubscribers = this.messageHasSubscribers(message);

        if (!hasSubscribers) {
            return false;
        }

        const subscriber = this.messages[message];
        let s;

        for (s in subscriber) {
            if (subscriber.hasOwnProperty(s)) {
                subscriber[s](message, data);
            }
        }

        return true;
    }

    messageHasSubscribers(message) {
        return PubSub.hasKeys(this.messages[message]);
    }

    static hasKeys(obj) {
        let key;

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                return true;
            }
        }
        return false;
    }
}
