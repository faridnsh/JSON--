var Parser = require('./index.js');
var parser = new Parser(['rows', true, 'doc', '_id']);
var npm = require('fs').readFileSync('./npm.json');

console.time('JSON--');
parser.write(npm);
console.timeEnd('JSON--')

console.time('toString')
npm = npm.toString();
console.timeEnd('toString')

console.time('JSON');
JSON.parse(npm);
console.timeEnd('JSON')

// require('fs')
//   .createReadStream('./npm.json')
//   .on('data', parser.write.bind(parser))
//   .on('end', console.log.bind(console, 'end'))
