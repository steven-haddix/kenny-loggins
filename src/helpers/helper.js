export function bind(fn, object) {
    return () => fn.apply(object, arguments);
}

export function extend(destination, source) {
    return source.map((property) => destination[property]);
}
