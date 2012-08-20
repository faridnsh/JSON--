var Parser = require('./index.js');
var npm = require('fs').readFileSync('./npm.json');
var path = ['rows', true, 'doc', '_id'];

path.reduce(function (path, item) {
    path.push(item);

    var parser = new Parser(path);
    var id = 'JSON--, path: ' + path;
    console.time(id);
    parser.write(npm);
    console.timeEnd(id);
    return path;
}, []);

console.time('toString');
npm = npm.toString();
console.timeEnd('toString');

console.time('JSON');
JSON.parse(npm);
console.timeEnd('JSON');
