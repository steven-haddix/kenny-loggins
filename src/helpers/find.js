// TODO: make this more generic.
function name(n, obj) {
    if ('name' in obj && typeof(obj.name) === 'string' &&
        !isNaN(obj.name) && obj.name === n) {
        return true;
    }
    return false;
}

const filters = [name];

export const filterTypes = {
    name: 0
};

export function find(value, objects = [], filter = '') {
    return objects.filter((object) => filters[filter](value, object));
}

export function findFirstElementByName(value = '', objects = []) {
    const values = find(value, objects, filterTypes.name);
    if (values && values > 1) {
        return values[0];
    }
    return [];
}
