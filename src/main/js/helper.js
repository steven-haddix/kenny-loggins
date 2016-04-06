/**
 * Created by shadd01 on 4/6/16.
 */

function bind(fn, object) {
    return function() {
        return fn.apply(object, arguments);
    };
}

function extend(destination, source) {
    for (var property in source) {
        destination[property] = source[property];
    }
    return destination;
}

module.exports = {
    bind,
    extend
};
