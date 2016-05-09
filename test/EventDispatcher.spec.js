/**
 * Created by shadd01 on 5/9/16.
 */
import EventDispatcher from '../src/EventDispatcher';
import expect, { spyOn } from 'expect'

describe('EventDispatcher', () => {
    let dispatcher, mockEventListener, eventSpy;

    beforeEach(() => {
        dispatcher = new EventDispatcher();
        eventSpy = expect.createSpy();

        mockEventListener = {
            eventType: 'log',
            callback: eventSpy
        }
    })

    afterEach(() => {
        expect.restoreSpies();
    })

    it('registers event listeners', () => {
        dispatcher.register({});
        expect(dispatcher.listeners.length).toEqual(1);
    })

    it('calls event listener', () => {
        const loggingEvent = {};
        dispatcher.register(mockEventListener);
        dispatcher.dispatch('log', loggingEvent);
        expect(eventSpy).toHaveBeenCalledWith({});
    })
});
