/**
 * Created by shadd01 on 5/9/16.
 */
import { Level } from '../src/level';
import expect from 'expect'

describe('Level', () => {
    it('returns level value', () => {
        expect(Level.ERROR).toEqual(40000);
    })

    it('converts level to string', () => {
        expect(Level.toString(Level.ERROR)).toEqual('ERROR');
    })

    it('returns default level if toString param is null', () => {
        expect(Level.toString(null)).toEqual('OFF');
    })

    it('converts string to level', () => {
        expect(Level.toLevel('ERROR')).toEqual(40000);
    })

    it('returns default level if toLevel param is null', () => {
        expect(Level.toLevel(null)).toEqual(Number.MAX_VALUE);
    })
});
