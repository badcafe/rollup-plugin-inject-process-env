import './myApp/dist/index.iife.js';

describe('Node', () => {
    test('get NODE_ENV', async () => {
        expect(process.env.NODE_ENV)
            .toBe('production');
    });
    test('get SOME_OBJECT', async () => {
        expect(process.env['SOME_OBJECT'])
            .toEqual({ one: 1, three: '3', two: [1,2] });
    });
    test('get MISSING', async () => {
        expect(process.env.MISSING)
            .toBeUndefined();
    });
});
