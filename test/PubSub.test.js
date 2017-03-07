import test from 'tape'
import sinon from 'sinon'
import PubSub from '../src/PubSub';

test('subscribe()', (t) => {
    const pubsub = new PubSub();
    var token = pubsub.subscribe('log', () => {});
    t.equal(Object.keys(pubsub.messages['log']).length, 1, 'should add subscribers');

    t.end()
})

test('unsubscribe()', (t) => {
    const pubsub = new PubSub();

    var token = pubsub.subscribe('log', () => {});
    pubsub.unsubscribe(token);
    t.equal(Object.keys(pubsub.messages['log']).length, 0, 'should remove subscribers by token');

    const testFunction = sinon.spy()
    pubsub.subscribe('log', testFunction);
    pubsub.unsubscribe(testFunction);
    t.equal(Object.keys(pubsub.messages['log']).length, 0, 'should remove subscribers by function');
    t.end()
})


test('publish()', (t) => {
    const pubsub = new PubSub();
    const testFunction = sinon.spy()
    pubsub.subscribe('log', testFunction);
    pubsub.publish('log', { test: 'test' })
    t.equal(testFunction.called, true, 'should publish messages to subscribers');
    t.end()
})

