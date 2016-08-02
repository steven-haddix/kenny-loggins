import Logger from '../src/Logger';
import BaseAppender from '../src/BaseAppender';
import { Level } from '../src/level';
import LoggingEvent from '../src/loggingEvent';
import expect, { spyOn } from 'expect';

describe('Logger', () => {
  let logger;

  beforeEach(() => {
    logger = new Logger('Test');
  })

  afterEach(() => {
    logger = null;
    expect.restoreSpies();
  })

  describe('configuration', () => {
    it('runs each routine', () => {
      const configLevelSpy = expect.spyOn(logger, 'configureLevel').andReturn(logger);
      const configAppendersSpy = expect.spyOn(logger, 'configureAppenders').andReturn(logger);
      const configGlobalsSpy = expect.spyOn(logger, 'configureGlobals').andReturn(logger);

      logger.configure({});

      expect(configLevelSpy).toHaveBeenCalledWith({});
      expect(configAppendersSpy).toHaveBeenCalledWith({});
      expect(configGlobalsSpy).toHaveBeenCalledWith({});
    })

    it('sets log level', () => {
      const spy = expect.spyOn(logger, 'setLevel');

      expect(logger.configureLevel({ level: Level.WARN })).toEqual(logger);
      expect(spy).toHaveBeenCalledWith(Level.WARN);
    })

    it('uses default logging level if none is provided', () => {
      const spy = expect.spyOn(Level, 'toLevel');

      expect(logger.configureLevel(null)).toEqual(logger);
      expect(spy).toNotHaveBeenCalled();
    })

    it('sets global variables', () => {
        expect(
          logger.configureGlobals({ globals: {test: 'test'} }).globals
        ).toEqual({test: 'test'})
    })

    it('handles incorrect appender configurations', () => {
      expect(logger.configureAppenders(null)).toEqual(logger);
      expect(logger.configureAppenders({stuff: ""})).toEqual(logger);
      expect(logger.configureAppenders({appenders: [()=>{}]})).toEqual(logger);
    })

    it('subscribes appenders', () => {
      var baseAppender = new BaseAppender();
      var subscribeSpy = expect.spyOn(baseAppender, 'subscribeToLogger').andCallThrough();
      logger.configureAppenders({appenders: [baseAppender]});

      expect(logger.appenders.length).toEqual(1);
      expect(subscribeSpy).toHaveBeenCalledWith(logger);
    })
  })

  it('dispatches logging events', () => {
    const spy = expect.spyOn(logger.pubsub, 'publish');
    const error = new Error();
    const loggingEvent = new LoggingEvent(
        'Test',
        Level.toString(Level.INFO),
        'Test Message',
        error,
        logger
    );

    logger.log(Level.INFO, 'Test Message', error);

    expect(spy).toHaveBeenCalledWith('log', loggingEvent);
  })
});
