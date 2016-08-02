export default class Helper {
    static bind(fn, object) {
        return () => fn.apply(object, arguments);
    }

    static extend(destination, source) {
        return source.map((property) => destination[property]);
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

    static merge(context, defaultConfig, newConfig) {
        Object.assign(context, defaultConfig, newConfig);
    }
}
