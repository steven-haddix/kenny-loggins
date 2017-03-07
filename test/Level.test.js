import test from 'tape'
import { Level } from '../src/level';

test('Level.<type>', (t) => {
    t.equal(Level.ERROR, 40000, 'should map level types to integers')
    t.end()
})

test('Level.toString()', (t) => {
    t.equal(Level.toString(Level.ERROR), 'ERROR', 'should map level integer to string');
    t.equal(Level.toString(null), 'OFF', 'should map null type to default OFF type')
    t.end()
})

test('Level.toLevel()', (t) => {
    t.equal(Level.toLevel('ERROR'), 40000, 'should map level string to integer');
    t.equal(Level.toLevel(null), Number.MAX_VALUE, 'should map null type to maximum integer value')
    t.end()
})
