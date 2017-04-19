import test from 'tape'
import sinon from 'sinon'
import { isFunction } from '../src/helpers'
import BaseAppender from '../src/BaseAppender'

test('BaseAppender prototype', (t) => {
    const baseAppender = new BaseAppender({ queueInterval: 0 });
    t.equal(isFunction(baseAppender.onLogEventHandler), true, 'should implement an apply function')
    t.end()
})


test('BaseAppender queuing', (t) => {
    const baseAppender = new BaseAppender({ queueSize: 4, queueInterval: 0 });

    const appendSpy = sinon.spy(baseAppender, 'append')

    baseAppender.onLogEventHandler(null, { test1: 'test1' })
    baseAppender.onLogEventHandler(null, { test1: 'test1' })
    baseAppender.onLogEventHandler(null, { test1: 'test1' })
    t.equal(baseAppender.queue.queue.length, 3, 'should increment queue when apply is called')

    baseAppender.onLogEventHandler(null, { test1: 'test1' })
    t.equal(appendSpy.called, true, 'should call release function when threshold is met')

    t.end()
})

test('BaseAppender session storage implementation', (t) => {
    const mockSessionStorage = {
        logging: JSON.stringify([ 'test0' ])
    }

    global.window = {}
    global.sessionStorage = {
        setItem: (key, value) => mockSessionStorage[key] = value,
        getItem: (key) => mockSessionStorage[key]
    }

    const baseAppender = new BaseAppender({ queueType: 'persistent-session', queueSize: 5, queueInterval: 0 });
    const appendSpy = sinon.spy(baseAppender, 'append')

    baseAppender.onLogEventHandler(null, 'test1')
    baseAppender.onLogEventHandler(null, 'test2')
    baseAppender.onLogEventHandler(null, 'test3')
    t.equal(baseAppender.queue.queue[0], 'test0', 'should inherit initial state')
    t.equal(baseAppender.queue.queue.length, 4, 'should increment queue when apply is called')

    baseAppender.onLogEventHandler(null, 'test4')
    t.equal(appendSpy.called, true, 'should call release function when threshold is met')

    t.end()
})