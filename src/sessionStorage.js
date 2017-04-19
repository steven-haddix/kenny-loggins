const setStorage = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value))
}

const getStorage = (key) => {
    const storage = sessionStorage.getItem(key)
    if(storage) {
        return JSON.parse(storage)
    }
    return []
}

const addStorageItem = (key, value) => {
    const storage = getStorage(key)
    storage.push(value)
    setStorage(key, storage)
}

const spliceStorageItem = (key, start, count) => {
    const storage = getStorage(key)
    const items = storage.splice(start, count)
    setStorage(key, storage)
    return items
}

const initializeNonPersistentStorage = function(key, initialState = []) {
    let storage = initialState
    storage.key = key
    storage.oldPush = storage.push;

    storage.push = function(item) {
        addStorageItem(this.key, item)
        return Array.prototype.push.apply(this, [item]);
    }

    storage.splice = function(start, count) {
        spliceStorageItem(this.key, start, count)
        return Array.prototype.splice.apply(this, [start, count]);
    }

    return storage
}


export default function(key) {
    if(typeof window === 'undefined') {
        console.warn('Session storage middleware only runs in browsers. Defaulting to non-persistent storage.')
        return []
    }

    if(typeof sessionStorage === 'undefined') {
        console.warn('Session storage does not appear to be supported by this browser. Defaulting to non-persistent storage.')
        return []
    }

    const initialState = getStorage(key) || []
    return initializeNonPersistentStorage(key, initialState)
}