---
title: You don't know Node.js
description: 'Features which exist in Nodejs but you probably dont know about'
pubDate: 2024-01-29
image:
  url: './covers/you-dont-know-nodejs.png'
  alt: 'Blog post image'
tags: ['Javascript', 'Node.js']
---

_Name of a post was inspired by a popular Javascript book called "You don't know JS"_ .

Nodejs is more than you think, I will try to prove this point and tell about modules of Nodejs that you probably didn't know about.

Let's begin!

## Event Loop

Even though everybody knows about event loop, not so many people know that it's actually a part of Nodejs runtime. Not a part of Javascript and not even a part of V8 engine, but a part of Nodejs. It heavily relies on [libuv](https://libuv.org/) library written in C for non-blocking asynchronous operations. At the same time browsers like Chrome also have event loop, but it's actually a different implementation.

I'm not going to talk about event loop in this article, however it was impossible not to mention it here.

## Event Emitter

We will start with a bit easier concept **Event Emitter**. This class is a fundamental part of Node.js's asynchronous event-driven architecture.

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

You can create buffer and select its size using `alloc()` function. By default buffer is filled with zeros. This how you can create 3 bytes buffer.

```javascript
import { Buffer } from 'buffer';

const buffer = new Buffer.alloc(3);

buffer[0] = 0;
buffer[1] = 1;
buffer[2] = 256;

console.log(buffer); // <Buffer 00 01 00>
```

> Please note that since it's a byte array, values can be only in range 0 - 255. For value 256 we get 0 because it's a byte overflow.

Buffers can be created from string, byte array or another buffer. You can also specify buffer encoding.

```javascript
const buffer = Buffer.from('hello', 'utf8');

console.log(buffer); // <Buffer 68 65 6c 6c 6f>
console.log(buffer.byteLength); // 5

console.log(buffer.toString('utf8')); // hello
console.log(buffer.toString('hex')); // 68656c6c6f
```

In this example buffer is created from string `"hello"`. Every char in a string is 1 byte, so our buffer should have 5 bytes size. When you console log buffer it shows every byte in hexadecimal notation, but you can call `toString()` and specify the encoding.

To prove that `Buffer` is actually an array of bytes you can iterate over it with simple for loop.

```javascript
const buffer = Buffer.from('hello');

for (const b of buffer) {
  console.log(b); // 104 101 108 108 111
}
```

> Bytes are printed in decimal notation here

## Stream

Streams in Node.js are used for processing data in chunks, piece by piece in a sequential way. They can be readable, writable and both (duplex).

You can create new instances of Readable and Writable streams, however it is usually not necessary to import `stream` module to use them.

```javascript
import { Readable } from 'stream';

const readableStream = Readable.from('hello streams');

readableStream.on('data', (chunk) => {
  console.log(chunk); // hello streams
});
```

A common use case for stream is reading or writing large amount of data. If you read a big file all at once it will be fully loaded in memory. However with a stream you can read file in chunks and save memory.

Let's assume we have a file called `file.txt` which contains just one line `hello`. This is an example of reading file using **readable stream**.

```javascript
import fs from 'fs';

// chunk size is 1 byte
const readStream = fs.createReadStream('file.txt', { highWaterMark: 1 });

readStream.on('data', (chunk) => {
  console.log(chunk.toString()); // h e l l o
});
```

> `highWaterMark` param is optional, default value is 64 kb. In this example I wanted to read 1 letter at time. Because we know that 1 letter equals 1 byte we can define size of chunk as 1 byte.

You can notice that streams are actually instances of `EventEmitter`. It processes a chunk of data and emits an event called `data`.

Chunks values are actually of type `Buffer`. In this example chunk buffers have 1 byte size. This is why we need to call `toString()` to see one letter per console log.

Now let's create a file using **writable stream**.

```javascript
const writeStream = fs.createWriteStream('example.txt');

writeStream.write('hello ');
writeStream.write('world');
writeStream.end();
```

This should create a file called `example.txt` in current directory with content `hello world`. We can call `write()` function multiple time to push chunks of data to the writing stream and then finish stream by calling `end()` function.

Classic examples of writable streams include: `http.request`, `fs.createWriteStream`, `zlib.createGzip()`, `process.stdout`.

## zlib

Module **zlib** in Node.js provides compression functionality using Gzip, Deflate/Inflate, and Brotli.

We use compression algorithms to reduce the amount of space needed for a file. Compression and decompression functions work with **Streams**.

Let's again assume we have a file called `file.txt` which contains just one line `hello` and we want to **compress** it. For this we can use `createGzip()` function to create a gzip transformer and use it in stream `pipeline`.

```javascript
import { createGzip } from 'zlib';
import { pipeline } from 'stream';
import { createReadStream, createWriteStream } from 'fs';

const gzip = createGzip();
const source = createReadStream('file.txt');
const destination = createWriteStream('file.txt.gz');

pipeline(source, gzip, destination, (err) => {
  if (err) {
    console.error('Compression failed', err);
  } else {
    console.log(`Compression successful!`);
  }
});
```

As I mentioned before `zlib` module mostly works with streams. Function `createGzip()` returns a **TransformSteam** (_or ReadWriteStream_).

This stream is basically a transformer between input and output data. Then we need `pipeline()` function from `stream` module to be able to create a chain of streams. We can pass to this function our read, transform and write streams. Of course order of arguments is important here 😄!

Pipeline will process data in chunks, where every chunk will be read, compressed and then written to file. After running this code you should have gzip file created with name `file.txt.gz`.

Now let's have a look at the exactly opposite example. We want to read gziped file and extract its original content. This can be done very easy by again using `pipeline` but this time use gunzip transform from `createGunzip`.

```javascript
import { createGunzip } from 'zlib';
import { pipeline } from 'stream/promises';
import { createReadStream, createWriteStream } from 'fs';

const gunzip = createGunzip();
const read = createReadStream('file.txt.gz');
const write = createWriteStream('file-gziped.txt');

await pipeline(read, gunzip, write);
```

> Here I used promisified version of `pipline` which works with async/await. Most of modern Node.js modules has promisified versions which converts callback-based methods to promise-based e.g `fs/promises`.

After running this code you should have a file `file-gziped.txt` with its original content.

## crypto

The `crypto` module provides cryptographic functions useful for creating hashes, signing, verifying, encrypting and decrypting data.

For example we can easily create a **sha256** hash from a string by using `createHash()`.

```javascript
import crypto from 'crypto';

const hash = crypto.createHash('sha256');
hash.update('hello world');
const output = hash.digest('hex');
console.log(output); // b94d27b9934d3e08a52e52d7da7dabfac484efe37a5380ee9088f7ace2efcde9
```

> I know it may look confusing but by cryptographic rules we must create a hash object first, then `update()` it with our content and then call `digest()` to produce an output in specified encoding.

Another useful function from this module is `randomBytes()`. This function will produce a `Buffer` of cryptographically secure random bytes of given length.

```javascript
import crypto from 'crypto';

const buffer = crypto.randomBytes(16);
console.log(buffer.toString('hex')); // random 16 bytes hexadecimal string
```

More common use case for `crypto` module is actually encrypting data.

A popular example of encrypting/decrypting data usually uses an [aes-256-cbc](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) algorithm. This is a very secure symmetric algorithm, meaning the same key is used for both encrypting and decrypting the data.

```javascript
import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const password = 'pass';
const salt = crypto.randomBytes(16);
const key = crypto.scryptSync(password, salt, 32);
const iv = crypto.randomBytes(16);

const cipher = crypto.createCipheriv(algorithm, key, iv);
const encrypted = cipher.update('hello world', 'utf8', 'hex') + cipher.final('hex');
console.log(encrypted); // 94366f8f470486f2477c7f0908a55e9f
```

In this example I encrypt `"hello world"` string using `aes-256-cbc` algorithm. For this we will need to create cipher by calling `createCipheriv()` function and two things **key** and **iv**. Both are of type `Buffer`.

They need to be as much random as possible to prevent hacking attempts. Iv is an [Initialization vector](https://en.wikipedia.org/wiki/Initialization_vector) and must be specific length. Note that AES-256 uses a 256 bits length key (32 bytes) and 128 bits iv (16 bytes).

To decrypt string we can perform a very similar operation, but this time using decipher from `createDecipheriv()` function.

```javascript
const decipher = crypto.createDecipheriv(algorithm, key, iv);
const decrypted = decipher.update(encrypted, 'hex', 'utf8') + decipher.final('utf8');
console.log(decrypted); // hello world
```

> You must use the **same** key and iv to decrypt data back.

## http

The `http` module in Node.js is needed to transfer data over the **Hyper Text Transfer Protocol** (HTTP). It allows to make http requests in Node.js as well as create your own HTTP servers.

This example creates a very basic HTTP server that listens to port 8080. For any request it will just return `hello world` string. Pretty simple, right 😃?

```javascript
import http from 'http';

const server = http
  .createServer((req, res) => {
    res.write('hello world');
    res.end();
  })
  .listen(8080);
```

> Open http://localhost:8080 in browser to see "hello world" response.

This probably looks familiar to you if you used before any Javascript backend framework like _express.js_ or _fastify_. They of course use `http` module under the hood and simplify a lot of stuff for us, because dealing with raw http requests is not easy.

**req** argument represents http request and is instance of a class `http.IncomingMessage` which is a subclass of `ReadableStream`.

**res** argument represents http response and is instance of a class `http.ServerResponse` which is a subclass of `WritableStream`.

We can send status code and response headers by using `res.writeHead()` function. This means our http server suppose to return JSON content back.

```javascript
res.writeHead(200, { 'Content-Type': 'application/json' });
```

Let's create more real world endpoint for our server. We will implement GET `/hello` endpoint and return some JSON data.

For this we need to check for request's url and method, set proper header, create a response object and write it to response stream as a string.

```javascript
const server = http
  .createServer((req, res) => {
    if (req.url === '/hello' && req.method === 'GET') {
      const response = {
        message: 'Hello, World!',
      };
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(response));
      res.end();
    }
  })
  .listen(8080);
```

> If you try to access any other endpoint, our server will hang. This is because we only call `res.end()` for `/hello` GET endpoint.

We can go further and have a look at example of reading POST request body. Let's implement POST `/hello` endpoint that simply reads request body and logs it to console.
Even though it sounds very simple, but in reality it requires quite some operations.

We know that request is `EventEmitter` which emits event called **data** with chunks of request body. We have to make sure we read it fully and for this we need another event called **end**. Then we can simply concatenate chunks of data until **end** event is fired to get full request body.

```javascript
const server = http
  .createServer((req, res) => {
    if (req.url === '/hello' && req.method === 'POST') {
      let body = '';

      req.on('data', (chunk) => {
        body += chunk;
      });

      req.on('end', () => {
        console.log(body);
        res.end();
      });
    }
  })
  .listen(8080);
```

## https

The `https` module in Node.js is needed to transfer data over HTTP TLS/SSL protocol, which is the secure HTTP protocol. Yes, https in Node.js is implemented in a separate module.

This time we will not create a server, but instead make a http request. To make http request in Node.js you need to use method `https.request()` which returns back request object and accepts a callback function to process the response.

Here I will simply make a request to www.google.com and print to console HTML content of the google search page.

```javascript
import https from 'https';

const options = {
  hostname: 'www.google.com',
  port: 443,
  path: '/',
  method: 'GET',
};

const req = https.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', async () => {
    console.log(data);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.end();
```

> Port 443 is the standard port for HTTPS.

The `options` object is used to specify details about the HTTP request, such as the hostname, port, path, and method. In our response callback function you can notice a similar pattern we already used before. Again we get a response stream and listen to **data** event until stream is finished. We can also handle error cases by adding a callback function for **error** event.

## net

The `net` module in Node.js provides functionality to create **TCP or IPC** servers and clients.

How different is TCP server from HTTP? Well you probably know that HTTP utilizes TCP to transport data. TCP is transport layer protocol, while HTTP is application layer protocol. You can say that HTTP is more high level protocol which uses TCP under the hood.

Main difference is that TCP is stateful and connection-oriented, meaning a connection between client and server is established before data can be sent.

HTTP is generally considered stateless because, after the client has established a connection with a server, sent a request, and received a response, the connection is immediately dropped.

Enough theory.. 😬 Let's create a basic TCP server and send some data to it.

```javascript
import net from 'net';

const server = net.createServer((socket) => {
  socket.on('data', (data) => {
    console.log(data.toString());
  });

  socket.on('end', () => {
    console.log('Client disconnected');
  });
});

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});
```

To test this server you need to use something that can make TCP connections. Common terminal utilities for this are `netcat` or `telnet`. This is the command to connect using netcat:

```
netcat localhost 3000
```

## worker_threads

It's time to talk about controversial topic in Node.js which is **multithreading** 😄!

The `worker_threads` module allows you to execute Javascript code in parallel using threads.

## child_process

TBD

## cluster

TBD

## Final

For now we can wrap things up there! You can read more info in [official documentation](https://nodejs.org/docs/latest/api/).

I hope you can feel now more confident using unpopular features of Node.js 😄!
