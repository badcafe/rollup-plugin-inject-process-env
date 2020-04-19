export function getNodeEnv() {
    // test dot member
    return process.env.NODE_ENV;
}

export function getSomeObject() {
    // test [] member
    return process.env['SOME_OBJECT'];
}

export function getMissing() {
    return process.env.MISSING;
}

console.log('========= start MyApp');
console.log(typeof getNodeEnv(), getNodeEnv())
console.log(typeof getSomeObject(), getSomeObject())
console.log(typeof getMissing(), getMissing())
console.log('========= end MyApp');
