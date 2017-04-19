import test from 'tape'
import sinon from 'sinon'
import KennyLoggins from '../src/KennyLoggins'
import BaseAppender from '../src/BaseAppender'
import { Level } from '../src/level'
import { isFunction } from '../src/helpers'
import { getArgs } from './testHelpers'

test('Kenny loggins prototype', (t) => {
    const loggins = new KennyLoggins()
    t.equal(isFunction(loggins.getLogger), true, 'should implement getLogger')
    t.equal(isFunction(loggins.configure), true, 'should implement configure')
    t.end()
})

test('Kenny loggins logger subscription', (t) => {
    const appender = new BaseAppender({ queueInterval: 0 });
    const appenderSpy = sinon.spy(appender, 'onLogEventHandler')
    const loggins = new KennyLoggins().configure({
        loggers: [{
            name: 'test.logger.name',
            level: Level.INFO,
            appenders: [appender, appender]
        }]
    })
    const subscribeSpy = sinon.spy(loggins.pubsub, 'subscribe')
    const publishSpy = sinon.spy(loggins.pubsub, 'publish')

    const logger = loggins.getLogger('test.logger.name')
    t.equal(subscribeSpy.getCalls().length, 2, 'should subscribe appenders to logger when initializing logger')
    t.equal(getArgs(subscribeSpy, 0, 0), 'test.logger.name', 'should subscribe appender with logger name')

    logger.info('Test')
    t.equal(getArgs(publishSpy, 0, 0), 'test.logger.name', 'should publish logger messages')
    t.equal(getArgs(publishSpy, 0, 1).message, 'Test', 'should publish logger messages')

    t.equal(getArgs(appenderSpy, 0, 0), 'test.logger.name', 'should publish with correct logger name')
    t.equal(getArgs(appenderSpy, 0, 1).message, 'Test', 'should publish with correct logger event')

    t.end()
})

test('Kenny loggins default logger', (t) => {
    const loggins = new KennyLoggins().configure({})

    const logger = loggins.getLogger('test.logger.name')

    t.equal(typeof logger !== 'undefined', true, 'should return valid logger')
    t.equal(logger ? logger.name : null, 'default', 'should return default logger if no loggers are configured')

    t.end()
})
