/**
 * Created by shadd01 on 5/9/16.
 */
import Queue from '../src/Queue';
import expect, { spyOn } from 'expect'

describe('Queue', () => {
    it('creates new queue', () => {
        const queue = new Queue();
        expect(queue.queue).toEqual([]);
    })

    it('adds items to queue, calls attemptFlush', () => {
        const queue = new Queue(3000, 2, []);
        const spy = expect.spyOn(queue, 'attemptFlush');
        queue.add(1);
        expect(queue.queue.length).toEqual(1);
        expect(spy).toHaveBeenCalledWith(2);
    })

    it('clears queue items', () => {
        const queue = new Queue(3000, 5, [1, 2, 3]).clear();
        expect(queue.queue.length).toEqual(0);
    })
});
