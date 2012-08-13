# JSON--

This is a streaminig json parser, that only parsers what you tell it, based on [dominictarr's JSONStream](https://github.com/dominictarr/JSONStream) idea and [creationix's jsonparse](https://github.com/creationix/jsonparse/) code(mostly his, didn't change much).

## How to use?

    var JParser = require('./index'),
        parser = new JParser(['rows', true, 'name']);

    parser.onValue = console.log;
    parser.write('{"rows":[{');
    parser.write('"lolz": "wow", "name" : "sweet"');
    parser.write('}]}');

## How fast is it?

With the fact that I havent profiled it yet and this was my first time writing a parser(with not much of knowledge of the correct things), the initial test against the full npm registry with the path of `rows.*.doc.name` (just parse the names) ended up faster than v8 JSON.parse(). JSON-- took 4000ms and v8 JSON parser took 6000ms to parse it all. But if we set the path to `rows.*.doc`(parse all the docs), then it takes 15000 seconds.

## What about memory?

As of memory, since it all keeps what it needs to emit, only the objects in the specified path(unlike creationix's jsonparse, which kept everything to have a complete root object.), it uses much less memory.

## Why so fast?

The trick that made this sped up is that, it only parses the parts that are in the path, and it skips the parts that is not in the specified path with a simple code without verifying it. This is very experimental, and this skipping might result in an undefined state if it tries to parse an invalid JSON string.

## What's up with the name?

Since it doesn't parses fully, its not a complete JSON parser, so decrease one from it. If you have a better name, I'm open to suggestions.
