---
title: 'Comparison of JS runtimes (Node, Deno, Bun)'
description: 'Compare most popular javascript runtimes like Node, Deno and Bun'
pubDate: 2024-10-06
image:
  url: './covers/comparison-of-javascript-runtimes.png'
  alt: 'Blog post image'
tags: ['Javascript', 'Node.js', 'Deno', 'Bun']
---

I recently tried new Javascript runtimes like [Bun](https://bun.sh/) and [Deno](https://deno.com/) to see which new exciting features they bring and I would say it left me quite impressed. In this article, we'll compare Node.js with its competitors.

Let's begin!

## Overview

**Node.js**

Node.js is the most widely used JavaScript runtime, built on Chrome's V8 JavaScript engine. It revolutionized server-side JavaScript by providing a non-blocking, event-driven architecture. Node.js comes bundled with its package manager [npm](https://www.npmjs.com/), which also has a package registry with enormous amount of libraries. 😃

**Deno**

Deno is a modern runtime for JavaScript and TypeScript, created by Ryan Dahl, the original creator of Node.js and released in 2019. Deno also uses the V8 Javascript engine, but is written in Rust instead of C/C++. It aims to address some of the problems of Node.js, primarily focusing on security.

**Bun**

Bun is relatively new JavaScript and TypeScript runtime that focuses on performance and developer experience. Bun first version was released in 2021. Bun is written in Zig programming langauge and unlike Node and Deno uses WebKit's JavaScriptCore engine.


## Typescript

Typescript is first class citizen in Deno and Bun. This means both runtimes **can execute** `.ts` files without need of `ts.config` and compilation. 

I personally think this is an awesome feature, which made me try Deno and Bun in the first place.

Lets try it on example. We have an `example.ts` file:

```typescript
enum AccountType {
  SAVINGS = "Savings",
  CHECKING = "Checking",
  BUSINESS = "Business"
}

const myAccountType: AccountType = AccountType.SAVINGS;
console.log(myAccountType); 
```

To run with Bun use `bun run example.ts` and it just works! Same about Deno, simply `deno run example.ts`. Just perfect!

With Nodejs you can use a trick to run it, `npx tsx example.ts`. And this also works, but its a trick because it temporary installs tsx compiler for one run.

However...hold your horses. Because a recent release of **Nodejs v22** already has an experimental flag to enable executing typescript files. 🧐

This feature is called [Type stripping](https://nodejs.org/api/typescript.html) and only available with experimental flag ` --experimental-strip-types`. This basically allows Node to execute Typescript, but it **will not do a compilation** step. Essentially, it replaces all type definitions with whitespace 😎.

I specifically picked this example using `enum` from Typescript, because this is a functionality that doesn't exist in Javascript. So as you probably guess if you try to run this `node --experimental-strip-types example.ts`, then it wil fail. Saying that enum is not supported in strip-only mode. Same will apply to other TS only functionalities like namespaces and decorators. 

Anyway this is a very cool feature of Nodejs and a big step forward.

## Dependency management

Node.js uses npm to manage dependencies. They are listed in `package.json` file and needs to be installed by `npm install` into a black hole folder called `node_modules`. 🌚 This folder usually gets gigantic since it has project dependencies and all dependencies of dependencies...

Let's first have a look at Deno, because it takes absolutely different approach to manage dependencies. Imports in Deno are called **URL-based imports** and look something like this:

```javascript
import { serve } from "https://deno.land/std@0.106.0/http/server.ts";
```

In Deno you don't need to run a separate command like `deno install` and it also **does not have** `node_modules` folder 🤯. Deno fetches and caches the dependencies automatically when you run your code and stores them globally in user's home directory.

> Deno also provides support for `package.json` and `node_modules` folder as part of backward Nodejs compatibility, as well as `deno install`.

I know you probably think that having _ugly long urls_ are no very convenient 😆, leave alone that versions are hardcoded inside string. There is a solution though, which is a `deno.json` file. This file acts similliar to `package.json`, it has tasks to run and also listed dependencies with the versions, which allow you simply to create aliases for imports. 

Let's make an example of adding **lodash** package. Run `deno add lodash`, it will first try to find this package in [JSR](https://jsr.io/) and then will suggest to add it from [npm](https://www.npmjs.com/). After that you will se a `deno.json` file like this:

```json
{
  "tasks": {
    "dev": "deno run --watch main.ts"
  },
  "imports": {
    "lodash": "npm:lodash@^4.17.21"
  }
}
```

Here in `imports` section we simply resolve lodash import to an npm package with specific version. This is how you can use this in code after:

```typescript
import _ from 'lodash';
```

Personally, I find URL imports to be complicated and an unnecessary learning curve 😞. This feature seems overly complex and doesn't offer significant benefits compared to Node.js imports and the `package.json` approach.

I mentioned that Deno will try to find package in **JSR** registry first, this is a new alternative to npm registry created by Deno team. JSR main feature is security, transparency and typescript support.

So what about Bun dependencies? 🤔

With Bun you use dependencies in exactly same way as in Node. It also has same `package.json` file and it also has `node_modules` folder. The main imporovement of Bun is **blazingly fast installation** of packages. Yes..it is that fast. Simply try it yourself. 

Bun also replaces `package.lock` file with `bun.lockb` file which is a binary. To add lodash with Bun run `bun add lodash` (this took 200 ms for me).

## Deno permissions management

Deno takes security seriously when running Javascript. By default, Deno scripts do not have access to the file system, network, environment variables, or other potentially sensitive resources. To access these resources, you must **explicitly grant permissions** using command-line flags.

Let's see an example. We have `main.ts` file:

```typescript
const fileContent = await Deno.readTextFile('test.txt');
const result = fileContent.replace(/{name}/g, 'John');
await Deno.writeTextFile('./test.txt', result);
```

If you just run `bun run main.ts` then script won't start. You will see a prompt asking to allow read and write permissions. You can use flags to allow them without prompting.

```sh
deno run --allow-write --allow-read  main.ts
```

Same permission management model will apply to the following:

- file system `--allow-read` and `--alow-write`
- network access `--allow-net`
- environment vars `--allow-env`
- run subprocesses `--alow-run`
- all permissions `--allow-all`

🔒 Security is a big concern nowadays and making Javascript programms more secure makes me happy. I see only benefits in this approach, even though allowing stuff can be annoying. But sometimes very surprising, like in this example with `chalk`:

```javascript
import chalk from 'npm:chalk';
console.log(chalk.green('Hello, world!'));
```

Would you ever guess that making a console log green also involves _reading 5 environment_ variables? When you run this with Deno, it will prompt you for permission to read each one of them and list them as well. This provides excellent awareness 👀.

However...hold your horses again! Because a recent release of Nodejs v22 also has [permissions](https://nodejs.org/api/permissions.html#permissions). This feature is available with `--experimental-permission` flag and looks like this:

```
node --experimental-permission --allow-fs-read=* --allow-fs-write=* index.js
```

Without providing corresponding flags you will get an error saying "Error: Access to this API has been restricted".

## All-in-one Tools (Deno and Bun)

Deno enhance the developer experience (DX) by integrating several essential tools directly into the runtime. It has built-in features like:

- formatter
- linter
- test runner
- executable compilation

You can forget about `prettier`, `eslint` and `tsc` 😅 . Honesty, I am glad to see idea becomes popular because setting up these **absolutely necessary tools** over and over again is very annoying.

Commands like `deno fmt`, `deno lint` and `deno test` are available for you without any additional packages.

Compile is an interesting feature (`deno compile main.ts`), it actually takes your Javascript together with runtime and creates a binary output as single executable file. 

Unfortunately, both Bun and Node.js have not gone as far as Deno in this regard. They **do not have** built-in format and lint commands.

However, all three runtimes have built-in test runners. Tests in Node.js, Bun, and Deno have a `jest-like` syntax and look very similar.

Here is a test example using Node test runner. Use `node --test` to run it.

```javascript
import { describe, it } from 'node:test';
import assert from 'assert';

describe('great test', () => {
  it('should be 1', () => {
    assert.strictEqual(1, 1);
  });

  it('should be 2', () => {
    assert.strictEqual(2, 2);
  });
}); 
```

> Test runner in Node is considered stable, read more [here](https://nodejs.org/api/test.html).

## Node.js compatibility

Both Deno and Bun are created as **drop-in Node replacements** and trying to provide full Node.js compatibility.

This includes support for common Node.js APIs and the ability to run existing JavaScript and TypeScript code.

For example this code is valid in all three runtimes:

```javascript
import fs from 'node:fs';

const fileContent = fs.readFileSync('./test.txt', 'utf-8');
console.log(fileContent);
```

This feature is crucial for a smooth transition for developers, which is something I highly value when exploring new technologies 😍.

## Examples (HTTP server)

Time for code! Lets compare how a simple HTTP server will look like implemented in all three runtimes.

Nodejs:
```javascript
const http = require('http');

const server = http.createServer((req, res) => {
  res.end('Hello, World!');
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
```

Deno:
```typescript
function handler(req: Request): Response {
  return new Response('Hello, World!');
}

Deno.serve({ port: 3000, handler });

console.log('Server running at http://localhost:3000/');
```

Bun:
```typescript
function handler(req: Request): Response {
  return new Response('Hello, World!');
}

Bun.serve({ port: 3000, fetch: handler });

console.log('Server running at http://localhost:3000/');
```

As you can see, the Bun and Deno versions are nearly identical and offer a more modern and elegant approach compared to Node.js.

Another important note is that both Bun and Deno use **Web API standards**. The [Request](https://developer.mozilla.org/en-US/docs/Web/API/Request) and [Response](https://developer.mozilla.org/en-US/docs/Web/API/Response) objects are standard Web APIs (Fetch API), while Node.js uses its own specific `http.IncomingMessage` and `http.ServerResponse` objects.

This allows me to make such a simple change to read a request body:

```typescript
async function handler(req: Request): Promise<Response> {
  const body = await req.json();
  return new Response(body);
}
```

Feels like a breath of fresh air after Nodejs 🍃!

## Final

I hope you enjoyed reading this article 😄. I aimed to keep it small, so I skipped over many cool features.

If you're eager to learn more about Deno and Bun, I highly recommend visiting their documentation sites:

- [Deno Documentation](https://docs.deno.com/)
- [Bun Documentation](https://bun.sh/docs)

Check out their examples sections, they are very cool!