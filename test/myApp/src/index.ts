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

console.log(getNodeEnv())
console.log(getSomeObject())
console.log(getMissing())
