import test from 'tape'
import sinon from 'sinon'
import BaseAppender from '../src/BaseAppender'

test('Base appender', (t) => {
    const baseAppender = new BaseAppender({ bufferSize: 10 })
    t.deepEqual(baseAppender.buffer, [], 'should create empty buffer')
    t.equal(baseAppender.bufferSize, 10, 'should allow default overrides')
    t.end()
})

test('Base appender buffer timer', (t) => {
    const baseAppender = new BaseAppender({ bufferTimeout: 1000 })
    const drainBufferSpy = sinon.spy(baseAppender, 'drainBuffer')

    setTimeout(() => {
        t.equal(drainBufferSpy.called, true, 'should call buffer timeout after set timeout')
        t.end()
    }, 2000)
})

test('Base appender buffer count', (t) => {
    const baseAppender = new BaseAppender({ bufferSize: 3 })
    const drainBufferSpy = sinon.spy(baseAppender, 'drainBuffer')
    const doAppendSpy = sinon.spy(baseAppender, 'doAppend')

    baseAppender.addToBuffer('item 1')
    baseAppender.addToBuffer('item 2')
    baseAppender.addToBuffer('item 3')

    t.deepEqual(doAppendSpy.getCalls()[0].args[0], ['item 1', 'item 2', 'item 3'], 'should call doAppend with buffer items if threshold is reached')
    t.equal(drainBufferSpy.called, true, 'should drain buffer when threshold is reached')
    t.end()
})