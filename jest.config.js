const { defaults } = require('ts-jest/presets');

module.exports = {
    preset: 'jest-puppeteer',
    ...defaults
};
