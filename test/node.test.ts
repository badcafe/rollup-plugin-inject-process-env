import { getNodeEnv, getSomeObject, getMissing } from './myApp/dist/index.js';

describe('Node', () => {
    test('get NODE_ENV', async () => {
        expect(getNodeEnv())
            .toBe('production');
    });
    test('get SOME_OBJECT', async () => {
        expect(getSomeObject())
            .toEqual({ one: 1, three: '3', two: [1,2] });
    });
    test('get MISSING', async () => {
        expect(getMissing())
            .toBeUndefined();
    });
});
