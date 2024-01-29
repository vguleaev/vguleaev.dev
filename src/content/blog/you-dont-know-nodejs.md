---
title: You don't know Node.js
description: 'Features which exist in Nodejs but you probably dont know about'
pubDate: 2024-01-29
image:
  url: './covers/you-dont-know-nodejs.png'
  alt: 'Blog post image'
tags: ['Javascript', 'Node.js']
---

_Name of a post was inspired by a very popular Javascript book called "You don't know JS"_ .

Nodejs is more than you think, I will try to prove this point and tell about modules of Nodejs that you probably didn't know about.

Let's begin!

## Event Loop

Even though everybody knows about event loop, not so many people know that it's actually a part of Nodejs runtime. Not a part of Javascript and not even a part of V8 engine, but a part of Nodejs. It heavily relies on [libuv](https://libuv.org/) library written in C for non-blocking asynchronous operations. Browsers like Chrome also have event loop but it's actually a different implementation.

I'm not going to talk about event loop in this article, however it was impossible not to mention it here. I highly doubt many JS devs know how event loop works (neither do I 😃). As event loop is a very sophisticated mechanism it deserves it own article.

## Event Emitter

We will start with a bit easier concept **Event Emitter**.

Node.js Event Emitter is used to implement [pub-sub pattern](https://en.wikipedia.org/wiki/Publish%E2%80%93subscribe_pattern). The idea is very simple:
emitter is a publisher which emits **named events** and callback functions are registered as subscribers.

You can create instance of `EventEmitter` or inherit from it to create your own class.

```javascript
import { EventEmitter } from 'events';
const eventEmitter = new EventEmitter();
```

You are probably familiar with events by using Javascript in the browser: mouse click, input on change and so on. EventEmitter class has two mains functions
`emit` and `on`.

- `emit` is used to trigger the event
- `on` is to register event listener function

```javascript
import { EventEmitter } from 'events';
const eventEmitter = new EventEmitter();

eventEmitter.on('sendMessage', (message) => {
  console.log(message);
});

eventEmitter.emit('sendMessage', 'Hello Nodejs');
```

When you emit an event you must give it a name. Name of event is used to register listener. You can also send some data together with an event as arguments.

> If you change order of `emit` and `on` then you will not see a console log. This is because events are executed synchronous. Please consider using async functions for callback in case you need.

There can be multiple listeners to the same event. Event callbacks will be executed in the order they were registered.

```javascript
eventEmitter.on('event', () => console.log(1));
eventEmitter.on('event', () => console.log(2));
eventEmitter.on('event', () => console.log(3));

eventEmitter.emit('event'); // 1 2 3
```

You can also remove listeners by calling functions like `removeListener()` and `removeAllListener()`.

## Buffer

Buffer is used to store and manipulate **binary data** in Nodejs. Buffer class is inherited from `Uint8Array` and is internally represented as fixed sequence of bytes.

What is binary data?

Examples of binary data are images, files, audio, video and raw data from a network.

You can create buffer and select its size using `alloc()`. For example we will create 3 bytes buffer.

```javascript
import { Buffer } from 'buffer';

const buffer = new Buffer.alloc(3);

buffer[0] = 0;
buffer[1] = 1;
buffer[2] = 256;

console.log(buffer); // <Buffer 00 01 00>
```

> If you don't specify `fill` param in `alloc` function by default buffer is filled with zeros. Please note that since it's a byte array, values can be only in range 0 - 255. For value 256 we get 0 because it's a byte overflow.

Buffers can be created from string, byte array or another buffer. You can also specify buffer encoding.

```javascript
const buffer = Buffer.from('node', 'utf8');

console.log(buffer); // <Buffer 6e 6f 64 65>
console.log(buffer.byteLength); // 4

console.log(buffer.toString('utf8')); // node
console.log(buffer.toString('hex')); // 6e6f6465
```

In this example buffer is created from string `"node"`. Every char in a string is 1 byte, so our buffer should have 4 bytes size. When you console log buffer it shows every byte in hexadecimal notation but you can call `toString()` and specify the encoding.

To prove that `Buffer` is actually an array of bytes you can iterate over it with simple for loop.

```javascript
const buffer = Buffer.from('node');

for (const b of buffer) {
  console.log(b); // 110 111 100 101
}
```

> Bytes are printed in decimal notation here

## Stream

Streams in Node.js are used for processing data in chunks, piece by piece in a sequential way. They can be readable, writable and both (duplex).

A common use case for stream is reading or writing large amount of data. If you read a big file all at once it will be fully loaded in memory. However with a stream you can read file in chunks and save memory.

Let's assume we have a file called `file.txt` which contains just one line `hello`. This is an example of reading file using **readable stream**.

```javascript
import fs from 'fs';

// chunk size is 1 byte
const readerStream = fs.createReadStream('file.txt', { highWaterMark: 1 });

readerStream.on('data', (chunk) => {
  console.log(chunk.toString()); // h e l l o
});
```

> `highWaterMark` param is optional, if you don't provide it, the whole file will be read. In this example I wanted to read 1 letter at time. Because we know that 1 letter equals 1 byte we can define size of chunk as 1 byte.

You can notice that streams are actually instances of `EventEmitter`. It processes a chunk of data and emits an event called `data`.

Chunks values are actually of type `Buffer`. In this example chunk buffers have 1 byte size. This is why we need to call `toString()` to see one letter per console log.

Now let's create a file using **writable stream**.

```javascript
const file = fs.createWriteStream('example.txt');

file.write('hello ');
file.write('world');
file.end();
```

This should create a file called `example.txt` in current directory with content `hello world!`. We can call `write()` function multiple time to push chunks of data to the writing stream and then finish stream by calling `end()` function.

Classic examples of writable streams include: `http.ClientRequest`, `http.ServerResponse`, `fs.createWriteStream`, `process.stdout`.

## Final

For now we can wrap things up there! You can read more info in [official documentation](https://nodejs.org/docs/latest/api/).

I hope you can feel now more confident using unpopular features of Node.js 😄!
