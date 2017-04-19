import { queue } from './defaults'
import {
    initializeQueue,
    isFunction,
    validateQueueSize,
    validateQueueInterval
} from './helpers'

export default class Queue {
    constructor(config = {}) {
        this.configure(config)
        this.queueTimer = null;
        this.startQueueTimer();
    }

    configure(config) {
        const newConfig = {
            queueSize: validateQueueSize(config.queueSize, queue.queueSize),
            queueInterval: validateQueueInterval(config.queueInterval, queue.queueInterval)
        };

        this.queue = initializeQueue(config.queueType);
        Object.assign(this, newConfig)
    }

    startQueueTimer() {
        if(!this.queueInterval) {
            return;
        }

        if(this.queueTimer !== null) {
            clearTimeout(this.queueTimer)
        }

        this.queueTimer = setTimeout(() => this.drainQueue(), this.queueInterval);
    }

    addToQueue(event) {
        this.queue.push(event)
        this.checkQueue()
    }

    checkQueue() {
        if(this.queue.length >= this.queueSize) {
            this.drainQueue()
            this.startQueueTimer()
        }
    }

    setDrainCallback(callback) {
        this.drainCallback = callback;
    }

    drainQueue() {
        if(this.queue.length > 0 && isFunction(this.drainCallback)) {
            this.drainCallback(this.queue.splice(0, this.queue.length))
        }
    }
}