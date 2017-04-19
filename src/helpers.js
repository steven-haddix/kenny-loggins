import queueTypes from './queueTypes'

export function isRegexMatch(regx, str) {
    if (new RegExp(regx).exec(str)) {
        return true;
    }

    return false;
}

/**
 * Wrap object in try catch to prevent unhandled errors from escaping.
 * @param object
 */
export function safetyWrapper(object) {
    let name;
    let method;

    const wrapper = function wrapper(n, m) {
        return () => {
            try {
                return m.apply(this, arguments);
            } catch (ex) {
                // continue regardless of error
            }
        };
    };

    for (name in object) {
        if (object.hasOwnProperty(name)) {
            method = object[name];
            if (typeof method === 'function') {
                object[name] = wrapper(name, method);
            }
        }
    }
}

export function bind(fn, object) {
    return () => fn.apply(object, arguments);
}

export function extend(destination, source) {
    return source.map((property) => destination[property]);
}

export function hasKeys(obj) {
    let key;

    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            return true;
        }
    }
    return false;
}

export function merge(context, defaultConfig, newConfig) {
    Object.assign(context, defaultConfig, newConfig);
}

export function isString(string) {
    return string && typeof string === 'string'
}

export function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

export function isFunction(functionToCheck) {
    var getType = {};
    return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
}

export function isObject(object) {
    return object && typeof object === 'object'
}

export function initializeQueue(type) {
    if(!type || !queueTypes[type]) {
        return queueTypes['non-persistent']()
    }

    return queueTypes[type]()
}

export function validateQueueSize(size, defaultSize) {
    return (isNumeric(size) && size > 0) ? size : defaultSize
}

export function validateQueueInterval(interval, defaultInterval) {
    return (isNumeric(interval) && (interval >= 1000 || interval === 0)) ? interval : defaultInterval
}