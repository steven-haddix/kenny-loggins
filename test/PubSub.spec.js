/**
 * Created by shadd01 on 5/10/16.
 */
import PubSub from '../src/PubSub';
import expect, { spyOn } from 'expect'

describe('PubSub', () => {
    let pubsub, callbackSpy;

    beforeEach(() => {
        pubsub = new PubSub();
        callbackSpy = expect.createSpy();
    })

    afterEach(() => {
        pubsub = null;
        expect.restoreSpies();
    })

    it('can be subscribed to', () => {
        pubsub.subscribe('log', callbackSpy);
        expect(pubsub.messages['log']).toExist();
    })

    it('publishes to subscribed methods', () => {
        const loggingEvent = {};
        pubsub.subscribe('log', callbackSpy);
        pubsub.publish('log', loggingEvent);
        expect(callbackSpy).toHaveBeenCalledWith('log', {});
    })
});