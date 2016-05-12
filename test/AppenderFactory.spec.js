/**
 * Created by shadd01 on 5/9/16.
 */
import Logger from '../src/logger';
import { create, createAppenders, appenderTypes } from '../src/AppenderFactory';
import AjaxAppender from '../src/appenders/ajax';
import ConsoleAppender from '../src/appenders/Console';
import expect, { spyOn } from 'expect'

describe('Appender Factory', () => {
    let logger;

    beforeEach(() => {
        logger = new Logger('Test');
    })

    afterEach(() => {
        logger = null;
        expect.restoreSpies();
    })

    it('creates appender with configuration', () => {
        var appender = create(appenderTypes.Ajax, {});
        expect(appender).toEqual(new AjaxAppender({}));
    })

    it('creates multiple appenders with configurations', () => {
        var appenders = ['Ajax', 'Console'];
        var configs = [
            { name: 'Ajax' },
            { name: 'Console' }
        ];

        var appender = createAppenders(appenders, configs);

        expect(appender).toEqual([
            new AjaxAppender({}),
            new ConsoleAppender({})
        ]);
    })
});
