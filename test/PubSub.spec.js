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
        pubsub.subscribe('log', () => {});
        expect(Object.keys(pubsub.messages['log']).length).toBe(1);
    })

    it('can be unsubscribed from with token', () => {
        var token = pubsub.subscribe('log', () => {});
        pubsub.unsubscribe(token);
        expect(Object.keys(pubsub.messages['log']).length).toBe(0);
    })

    it('can be unsubscribed from with method', () => {
        pubsub.subscribe('log', callbackSpy);
        pubsub.unsubscribe(callbackSpy);
        expect(Object.keys(pubsub.messages['log']).length).toBe(0);
    })

    it('publishes to subscribed methods', () => {
        const loggingEvent = {};
        pubsub.subscribe('log', callbackSpy);
        pubsub.publish('log', loggingEvent);
        expect(callbackSpy).toHaveBeenCalledWith('log', {});
    })
});