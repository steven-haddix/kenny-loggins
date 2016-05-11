import Logger from '../src/Logger';
import { Level } from '../src/level';
import LoggingEvent from '../src/LoggingEvent';
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

  it('runs configuration routine', () => {
    const configLevelSpy = expect.spyOn(logger, 'configureLevel').andReturn(logger);
    const configAppendersSpy = expect.spyOn(logger, 'configureAppenders');

    logger.configure({});

    expect(configLevelSpy).toHaveBeenCalledWith({});
    expect(configAppendersSpy).toHaveBeenCalledWith({});
  })

  it('configures log level', () => {
    const spy = expect.spyOn(Level, 'toLevel');

    expect(logger.configureLevel({ level: 'warn' })).toEqual(logger);
    expect(spy).toHaveBeenCalledWith('warn');
  })

  it('handles incorrect appender configurations', () => {
    expect(logger.configureAppenders(null)).toEqual(logger);
    expect(logger.configureAppenders({stuff: ""})).toEqual(logger);
    expect(logger.configureAppenders({appenders: [()=>{}]})).toEqual(logger);
  })

  it('uses default logging level if none is provided', () => {
    const spy = expect.spyOn(Level, 'toLevel');

    expect(logger.configureLevel(null)).toEqual(logger);
    expect(spy).toNotHaveBeenCalled();
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
