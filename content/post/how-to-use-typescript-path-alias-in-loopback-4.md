---
title: "How to Use Typescript Path Alias in Loopback 4"
type: "post"
date: 2022-08-05T15:07:40+07:00
description: "In TypeScript you can avoid these 'bad' looking imports with the help of path aliases. With path aliases you can declare aliases that map to a certain absolute path in your application."
keywords: ["typescript", "path alias"]
categories: ["cheatsheet"]
tags: ["typescript"]
image: "/common/no-image.png"
---

## The problem

In Node.js (or TS/JS in general) you can import single modules into your code.
This might look the following:

```ts
import { Example } from "../example/model";
import { Article } from "../article/model";
```

The problem we have here is that the deeper your project tree is the more '../' are required to access modules in higher layers. Actually, this doesn't look very beautiful to be honest. Fortunately we can change that.

The solution: **path aliases**

```ts
import { Example } from "@modules/example/model";
import { Article } from "@modules/article/model";
```

**In our case**

> @modules that maps to './src/modules'

Our tsconfig

```json
"baseUrl": "./src",
"paths": {
    "@modules/*": ["./*"]
}
```

And run

```bash
ts-node -r tsconfig-paths/register src/index.ts
```

But everything is not pink and you will get this error at run time

```bash
node dist/index.js
```

> Error: Cannot find module '@modules/example/model'

> Why?

Because when you build, it is still keep your alias, so there are 2 ways to allow us to start the application:

1. Using tsconfig-paths at run time, at start up time, it will map the path alias to your relative paths

```bash
node -r tsconfig-paths/register dist/index.js
```

2. Replace all relative path in your build with [tsc-alias](https://github.com/justkey007/tsc-alias)

```bash
npm install --save-dev tsc-alias
```

```json
"build": "lb-tsc --copy-resources && tsc-alias",
```
