// just to ensure that we do have objects in process.env.SOME_OBJECT
// which is not the default behaviour in node
// see https://nodejs.org/api/process.html#process_process_env

require('./myApp/dist/index.js');

console.log(process.env);
console.log(process.env.SOME_OBJECT.two);
