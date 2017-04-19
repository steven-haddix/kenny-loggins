import test from 'tape'
import sinon from 'sinon'
import sessionStorage from '../src/sessionStorage'

test('sessionStorage', (t) => {
    const mockSessionStorage = {
        test: JSON.stringify([ 'test1' ])
    }

    global.window = {}
    global.sessionStorage = {
        setItem: (key, value) => mockSessionStorage[key] = value,
        getItem: (key) => mockSessionStorage[key]
    }

    const storage = sessionStorage('test')
    storage.push('test2')

    t.equal(storage.key, 'test', 'should apply key to storage array')
    t.equal(storage[0], 'test1', 'should inherit initial storage elements')
    t.equal(storage[1], 'test2', 'should allow pushing elements to storage')
    t.deepEqual(mockSessionStorage.test, JSON.stringify(['test1', 'test2']), 'should copy items to sessionStorage')

    storage.splice(0, 1)
    t.deepEqual(mockSessionStorage.test, JSON.stringify(['test2']), 'should remove spliced items from sessionStorage')

    t.end()
})