/// <reference types="./@types/chartjs-node" />
import * as fs from 'fs';
import * as ChartjsNode from 'chartjs-node';

const loc = JSON.parse(fs.readFileSync(`${__dirname}/sloc-report.json`, 'utf8')); // this file is generated (see package.json)
const locTests = JSON.parse(fs.readFileSync(`${__dirname}/sloc-tests-report.json`, 'utf8')); // this file is generated (see package.json)
const tsl = JSON.parse(fs.readFileSync(`${__dirname}/tslint-report.json`, 'utf8')); // this file is generated (see package.json)
const jest = JSON.parse(fs.readFileSync(`${__dirname}/jest-report.json`, 'utf8')); // this file is generated (see package.json)

(async function () {
    const chartDataUri = await drawChart();
    const readme = readmeText(chartDataUri);
    fs.writeFileSync(`${__dirname}/../README.md`, readme);
})();

async function drawChart() {
    const chartNode = new ChartjsNode(380, 380);
    await chartNode.drawChart({
        type: 'pie',
        data: {
            labels: ['Code', 'Comments', 'Empty', 'Tests'],
            datasets: [{
                label: 'Metrics',
                data: [ loc.summary.source, 
                    loc.summary.comment - loc.summary.mixed, 
                    loc.summary.empty,
                    locTests.summary.source
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 2
            }]
        },
        options: {}
    });
    return chartNode.getImageDataUrl('image/png');
}

/**
 * Generate REPORTS.md
 * 
 * * Metrics from sloc + Pie chart
 * * Linter from tslint
 * * Tests from jest
 */
function readmeText(chartDataUri: string) {
    const README = fs.readFileSync(`${__dirname}/../doc/README.md`, {encoding: 'utf8'});
    const LOGO = fs.readFileSync(`${__dirname}/../doc/logo.svg`, {encoding: 'utf8'});
    return `<!--DO NOT EDIT : this file has been generated-->

${README}

## Reports

> Code quality reports

### Metrics

<div style="float:right; height:380px; width:380px">
    <img src="${chartDataUri}"/>
</div>

| Files | ${loc.files.length} | |
| ----- | -: | - |
| Lines of code | ${loc.summary.source} | (w/o comments) |
| Comments | ${loc.summary.comment - loc.summary.mixed} | (+ ${loc.summary.mixed} with code) |
| Empty lines | ${loc.summary.empty} | |
| **Total lines** | **${loc.summary.total}** | (w/o tests) |
| TODO | ${loc.summary.todo} | lines |
| Tests | ${locTests.summary.source} | (w/o comments) |

### Linter

**${tsl.length === 0 ? '✅': '❌'} ${tsl.length} problem${tsl.length === 1 ? '': 's'}**

${tsl.length === 0 ? '': `
| File | Position | Severity | Type | Failure |
| ---- | --- | -------- | ---- | ------- |
${tsl.map((lint: any) => 
`| ${lint.name.substring(4)} | ${position(lint)} | ${lint.ruleSeverity} | ${lint.ruleName} | ${lint.failure} |
`).join('')}
` /* end tsl.length === 0 */}

### Tests

|   | Tests suites | Tests |
| - | ------------ | ----- |
| ❌ Failed | ${jest.numFailedTestSuites} | ${jest.numFailedTests} |
| ✅ Passed | ${jest.numPassedTestSuites} | ${jest.numPassedTests} |
| ✴ Pending | ${jest.numPendingTestSuites} | ${jest.numPendingTests} |
| ☢ Error | ${jest.numRuntimeErrorTestSuites} | |
| **Total** | **${jest.numTotalTestSuites}** | **${jest.numTotalTests}** |

${jest.wasInterrupted ? '💥 Tests interrupted !': ''}

${jest.testResults.map((suite: any) => `
#### ${statusIcon(suite.status)} \`${suite.name.substring(suite.name.indexOf('/test/'))}\` **${(suite.endTime - suite.startTime) / 1000}s** ${(suite.endTime - suite.startTime) / 1000 > 5 ? '🐢': ''}

${suite.assertionResults.length === 0 ? '': `
| Status | Suite | Test |
| ------ | ----- | ---- |
${suite.assertionResults.map((test: any) =>
`| ${statusIcon(test.status)} | ${test.ancestorTitles.join(' 🔹 ')} | ${test.title} |
`).join('')}
` /* end suite.assertionResults.length === 0 */}
`).join('')}

## License

MIT

## Who ?

<div style="float:right; width:150px">
    ${LOGO}
</div>

* [Inria](http://inria.fr)
* [Inria @ Github](https://github.com/inria)

`;
}

/**
 * Display a position of a lint result :
 * 
 * * `264,12`
 * * `264,12-13`
 * * `264,12 - 275,8`
 * 
 * @param lint Linter value
 */
function position(lint: any) {
    let pos = `${lint.startPosition.line},${lint.startPosition.character}`;
    if (lint.startPosition.line === lint.endPosition.line) {
        if (lint.startPosition.character !== lint.endPosition.character) {
            pos += `-${lint.endPosition.character}`
        }
    } else {
        pos += ` - ${lint.endPosition.line},${lint.endPosition.character}`
    }
    return pos;
}

/**
 * Get the status Icon
 * 
 * @param status 
 */
function statusIcon(status: string) {
    return ({
        'passed':  '✅',
        'failed': '❌',
        'pending': '✴'
    } as any)[status]
}
