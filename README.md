# JSON--

This is a streaminig json parser, that only parsers what you tell it, based on [dominictarr's JSONStream](https://github.com/dominictarr/JSONStream) idea and [creationix's jsonparse](https://github.com/creationix/jsonparse/) code(mostly his, didn't change much).

## How to use?

    var JSONParser = require('json--'),
        parser = new JSONParser(['rows', true, 'name']);

    parser.onValue = console.log.bind(console);
    parser.write(new Buffer('{"rows":[{'));
    parser.write(new Buffer('"lolz": "wow", "name" : "sweet"'));
    parser.write(new Buffer('}]}'));

Note that the `parser.write` only accepts a Buffer instance.

### API

`require('json--')` will return a JSONParser class.

#### new JSONParser(path)

* `Array<Any>` path: Should contain at least one element. If it's a function, it will be called with the key name and it's value will be converted to a Boolean to see if the key is needed or not.

It will return an instance of json--.

#### jsonParser.onValue(value)

This function will be called on any value that matches the path completely.

#### jsonParser.write(buffer)

* `Buffer` buffer

## How fast is it?
Here's some numbers for parsing a subset of npm registry. The test file is `test.js` and the json file is `npm.json`. Tested under Ubuntu 12.04 64bit.

In Node 0.6.19:

    JSON--, path: rows: 3892ms
    JSON--, path: rows,true: 4661ms
    JSON--, path: rows,true,doc: 2433ms
    JSON--, path: rows,true,doc,_id: 543ms
    toString: 180ms
    JSON: 627ms

In Node v0.8.6:

    JSON--, path: rows: 4702ms
    JSON--, path: rows,true: 4049ms
    JSON--, path: rows,true,doc: 2417ms
    JSON--, path: rows,true,doc,_id: 825ms
    toString: 190ms
    JSON: 653ms

The toString is the amount of the time that it takes for the buffer to be converted to utf8(JSON.parse needs it to be in utf8 string), but JSON-- only operates on a buffer(it converts it internally).

## What about memory?

As of memory, since it all keeps what it needs to emit, only the objects in the specified path(unlike creationix's jsonparse, which kept everything to have a complete root object.), it uses much less memory.

## Why so fast?

The trick that made this sped up is that, it only parses the parts that are in the path, and it skips the parts that is not in the specified path with a simple code without verifying it. This is very experimental, and this skipping might result in an undefined state if it tries to parse an invalid JSON string.

## What's up with the name?

Since it doesn't parses fully, its not a complete JSON parser, so decrease one from it. If you have a better name, I'm open to suggestions.
