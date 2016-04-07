/**
 * Created by shadd01 on 4/6/16.
 */

export function bind(fn, object) {
    return function() {
        return fn.apply(object, arguments);
    };
}

export function extend(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
}
