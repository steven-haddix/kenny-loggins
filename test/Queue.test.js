import test from 'tape'
import sinon from 'sinon'
import Queue from '../src/Queue'

test('Queue', (t) => {
    const queue = new Queue({ queueSize : 10, queueInterval: 1001 })
    t.equal(queue.queueSize, 10, 'should allow overriding defaults')
    t.equal(queue.queueInterval, 1001, 'should allow overriding defaults')
    t.end()
})

test('Queue timer', (t) => {
    const queue = new Queue({ queueInterval: 1000 })
    const drainQueueSpy = sinon.spy(queue, 'drainQueue')

    setTimeout(() => {
        t.equal(drainQueueSpy.called, true, 'should call queue timeout after set timeout')
        t.end()
    }, 2000)
})

test('Queue timer', (t) => {
    let queue = new Queue({ queueInterval: 0 })
    const drainQueueSpy = sinon.spy(queue, 'drainQueue')

    setTimeout(() => {
        t.equal(drainQueueSpy.called, false, 'should not drain queue if disabled')
        t.end()
    }, 2000)
})

test('Queue size', (t) => {
    const queue = new Queue({ queueSize: 3, queueInterval: 0 })
    const drainQueueSpy = sinon.spy(queue, 'drainQueue')
    const callbackSpy = sinon.spy()

    queue.setDrainCallback(callbackSpy)

    queue.addToQueue('item 1')
    queue.addToQueue('item 2')
    queue.addToQueue('item 3')

    t.deepEqual(callbackSpy.getCalls()[0].args[0], ['item 1', 'item 2', 'item 3'], 'should call callback with queue items if threshold is reached')
    t.equal(drainQueueSpy.called, true, 'should call drainCallback if threshold is reached')
    t.equal(queue.queue.length, 0, 'should drain queue when threshold is reached')
    t.end()
})
