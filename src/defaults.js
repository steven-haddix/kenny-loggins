import { Level } from './level'

export const logger = {
    name: 'default',
    level: Level.error,
    callback: () => {},
    globals: {}
};

export const queue = {
    type: 'non-persistent',
    queueSize: 1,
    queueInterval: 60000
};