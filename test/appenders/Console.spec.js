import ConsoleAppender from '../../src/appenders/console';
import expect, { spyOn } from 'expect'

describe('Appenders', () => {
    describe('ConsoleAppender', () => {
        let consoleAppender, consoleSpy;

        beforeEach(() => {
            consoleAppender = new ConsoleAppender();
            consoleSpy = spyOn(console, 'trace');
        })

        afterEach(() => {
            consoleAppender = null;
            expect.restoreSpies();
        })

        it('validates logging event parameters', () => {
            expect(consoleAppender.doAppend(null)).toBe(false);
        })

        it('handles invalid level', () => {
            expect(ConsoleAppender.console('INVALID', 'test message')).toBe(false);
            expect(consoleSpy).toNotHaveBeenCalled();
        })

        it('calls correct console function', () => {
            ConsoleAppender.console('TRACE', 'test message');
            expect(consoleSpy).toHaveBeenCalledWith('test message');
        })
    })
});
