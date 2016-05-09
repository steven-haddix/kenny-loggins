/**
 * Class for managing managing task queues.
 *
 * Queues can be flushed 1 of 2 ways:
 * - Queue Length > Threshold
 * - Timeout Interval Expires
 */
export default class Queue {
    constructor(interval = 30000, threshold = 1, flushHandler = {}, queue = []) {
        this.queue = queue;
        this.threshold = threshold;
        this.interval = interval;
        this.flushHandler = flushHandler;
        this.timer = this.startTimer(interval);
    }

    add(items) {
        this.queue.push(items);
        this.attemptFlush(this.threshold);
    }

    /**
     * Not sure this is needed
     * @returns {T}
     */
    shift() {
        return this.queue.shift();
    }

    clear() {
        this.queue = [];
        return this;
    }

    attemptFlush(threshold) {
        if (this.queue.length >= threshold) {
            this.flush();
            this.resetTimer();
        }
    }

    // FIXME: need to determine how to implement execution.
    flush() {
        return this.flushHandler(this.queue);
    }

    startTimer(interval) {
        return setInterval(() => this.attemptFlush(1), interval);
    }

    resetTimer() {
        clearInterval(this.timer);
        this.timer = this.startTimer(this.interval);
    }
}
