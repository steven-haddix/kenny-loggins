/**
 * Created by shadd01 on 5/11/16.
 */
import KennyLoggins from '../src/KennyLoggins';
import Logger from '../src/Logger';
import expect, { spyOn } from 'expect'

describe('Kenny Loggins', () => {
    let loggins, logger;

    beforeEach(() => {
        loggins = new KennyLoggins();
        logger = loggins.getLogger('Test');
    })

    afterEach(() => {
        loggins = null;
        logger = null;
        expect.restoreSpies();
    })

    it('creates logger', () => {
        expect(logger).toEqual(new Logger('Test'));
    })

    it('assures production logger swallows exceptions', () => {
        logger['bomb'] = () => {
            throw new Error('Boom!');
        };;

        loggins.productionize(logger);

        expect(logger.bomb).toNotThrow();
    })
});
