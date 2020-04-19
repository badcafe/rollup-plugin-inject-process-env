import * as puppeteer from 'puppeteer';
import * as fs from 'fs';

// jest set process.env this is why we need a real browser environment
describe('Browser', () => {
    let browser: puppeteer.Browser;
    let frame: puppeteer.Frame;
    beforeAll(async (done) => {
        browser = await puppeteer.launch({
            headless: true
        });
        const page = await browser.newPage();
        page.on('console', async msg => console.log(await Promise.all(msg.args().map(jsh => jsh.jsonValue()))));
        const js = fs.readFileSync(`./test/myApp/dist/index.js`, 'utf8');
//        await page.evaluate('const process={};' + js);
        await page.evaluate(js);
        frame = page.mainFrame();
        done();
    });
    afterAll(async (done) => {
        await browser.close();
        done();
    })
    test('get NODE_ENV', async () => {
        const nodeEnv = await frame.evaluate('myApp.getNodeEnv()');
        expect(nodeEnv).toBe('production');
    });
    test('get SOME_OBJECT', async () => {
        const someObject = await frame.evaluate('myApp.getSomeObject()');
        expect(someObject).toEqual({ one: 1, three: '3', two: [1,2] });
    });
    test('get MISSING', async () => {
        const missing = await frame.evaluate('myApp.getMissing()');
        expect(missing).toBeUndefined();
    });
});
