/**
 * Created by shadd01 on 5/11/16.
 */
import KennyLoggins from '../src/KennyLoggins';
import Logger from '../src/Logger';
import expect, { spyOn } from 'expect'

describe('Kenny Loggins', () => {
    let loggins;

    beforeEach(() => {
        loggins = new KennyLoggins().configure({
            appenders:
                [{
                    name: 'com.wendys.web.services.test',
                    appenders: []
                },
                {
                    pattern: '^com.wendys.web.services.orders',
                    appenders: []
                },
                {
                    pattern: '^com.wendys.web.services',
                    appenders: []
                },
                {
                    pattern: '^com.wendys.web',
                    appenders: []
                }],
            globals: {

            }
        });
    })

    afterEach(() => {
        loggins = null;
        expect.restoreSpies();
    })

    it('assures production logger swallows exceptions', () => {
        var logger = loggins.getLogger('default');

        logger['bomb'] = () => {
            throw new Error('Boom!');
        };

        loggins.productionize(logger);

        expect(logger.bomb).toNotThrow();
    })

    describe('configure', () => {
        it('creates and adds loggers to logger array', () => {
            expect(loggins.loggers.length).toEqual(4);
        })

        it('returns instance of loggins when complete', () => {
            expect(loggins.configure([])).toEqual(loggins);
        })

        it('returns instance of loggins when not passed an array', () => {
            expect(loggins.configure({})).toEqual(loggins);
        })
    })

    describe('getLogger', () => {
        it('returns logger', () => {
            var pattern = 'com.wendys.web.services.test';
            var logger = loggins.getLogger(`${pattern}`);
            expect(logger.name).toEqual(pattern);
        })

        it('returns default instance if no logger is found', () => {
            var pattern = 'not.to.be.found';
            var logger = loggins.getLogger(`${pattern}`);
            expect(logger.name).toEqual('default');
        })
    })

    describe('getLoggerByPattern', () => {
        it('returns first matching logger', () => {
            var name = 'com.wendys.web.services.test';
            var logger = loggins.getLogger(`${name}`);
            expect(logger.name).toEqual(name);
        })
    })

    describe('getLoggerByName', () => {
        it('returns first matching logger', () => {
            var name = 'com.wendys.web.services.test';
            var logger = loggins.getLoggerByName(`${name}`);
            expect(logger.name).toEqual(name);
        })
    })

    describe('getDefaultLogger', () => {
        it('creates default logger if it doesn\'t exist', () => {
            var logger = loggins.getDefaultLogger();
            expect(logger.name).toEqual('default');
        })

        it('returns default logger if it exists', () => {
            loggins.createLogger('default');
            var logger = loggins.getDefaultLogger();
            expect(logger.name).toEqual('default');
        })
    })

    describe('regex', () => {
        it('returns tue if pattern matches', () => {
            expect(loggins.regex('^test$', 'test')).toEqual(true);
        })

        it('returns false if pattern does not match', () => {
            expect(loggins.regex('^test$', 'test!')).toEqual(false);
        })
    })
});
