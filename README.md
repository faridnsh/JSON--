# JSON--

This is a streaminig json parser, that only parsers what you tell it, based on [dominictarr's JSONStream](https://github.com/dominictarr/JSONStream) idea and [creationix's jsonparse](https://github.com/creationix/jsonparse/) code(mostly his, didn't change much).

With the fact that I havent profiled it yet and this was my first time writing a parser(with not much of knowledge of the correct things), the initial test against the full npm registry with the path of `rows.*.doc.name` (just parse the names) ended up faster than v8 JSON.parse(). JSON-- took 4000ms and v8 JSON parser took 6000ms to parse it all. But if we set the path to `rows.*.doc`(parse all the docs), then it takes 15000 seconds.

As of memory, since it all keeps what it needs to emit(unlike creationix's jsonparse, which kept everything to have a complete root object.), it uses much less memory.
