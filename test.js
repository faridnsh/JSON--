var Parser = require('./index.js');
var parser = new Parser(['rows', true, 'doc', 'name']);
require('fs')
  .createReadStream('./npm.json')
  .on('data', parser.write.bind(parser))
  .on('end', console.log.bind(console, 'end'))
