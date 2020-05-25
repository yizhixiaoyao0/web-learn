// point free

// Hello  World => hello_world 


const fp = require('lodash/fp');

const f = fp.flowRight(fp.replace(/\s+/, '_'), fp.toLower);

console.log(f('Hello  World'));