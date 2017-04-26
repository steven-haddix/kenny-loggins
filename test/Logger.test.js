import test from 'tape'
import sinon from 'sinon'
import Logger from '../src/Logger';
import LoggingEvent from '../src/loggingEvent';
import BaseAppender from '../src/BaseAppender';
import { Level } from '../src/level';
import { isFunction } from '../src/helpers'

test('Logger creation', (t) => {
  const callbackSpy = sinon.spy();
  const logger = Logger.createLogger({
    name: 'test',
    level: Level.INFO,
    callback: callbackSpy,
    globals: { app: 'test.wendys.com' },
    formatters: { formatField: (msg) => msg + ' format'}
  })

  t.equal(isFunction(logger.trace), true, 'should implement trace function')
  t.equal(isFunction(logger.debug), true, 'should implement debug function')
  t.equal(isFunction(logger.info), true, 'should implement info function')
  t.equal(isFunction(logger.warn), true, 'should implement warn function')
  t.equal(isFunction(logger.error), true, 'should implement error function')
  t.equal(isFunction(logger.fatal), true, 'should implement fatal function')

  logger.info('test')

  t.equal(callbackSpy.called, true, 'should call logger callback on log event')
  t.equal(callbackSpy.getCall(0).args[0].message, 'test', 'should call logger callback with string message')
  t.equal(callbackSpy.getCall(0).args[0].app, 'test.wendys.com', 'should merge globals into log event')

  logger.info(new Error('test'))
  t.equal(callbackSpy.getCall(1).args[0].exception.message, 'test', 'should handle first parameter being an exception')

  logger.info('test message', new Error('test error message'))
  t.equal(callbackSpy.getCall(2).args[0].message, 'test message', 'should handle first parameter being a string')
  t.equal(callbackSpy.getCall(2).args[0].exception.message, 'test error message', 'should handle second parameter being an exception')

  logger.info({ formatField: 'test' })
  t.equal(callbackSpy.getCall(3).args[0].formatField, 'test format', 'should apply format to proper field')

  t.end()
})
