---
title: "Happy New Year 2024"
type: "post"
date: 2023-12-31T18:25:50+07:00
description: "I don't know who you are, but if you know javascript, I wish you all the best in 2024"
keywords: ["Happy New Year 2024"]
categories: ["cheatsheet"]
tags: ["well-being"]
image: "https://gist.github.com/assets/31009750/2f669cda-1449-4242-b9b2-9719d8d00221"
---

```js
#!/usr/bin/env node

const words = ["Happy", "New", "Year", "2024"];
const message = {};
words.map((w, index) => {
  Reflect.set(message, index, w);
});

let happyNewYearMessage2024 = "";
Reflect.ownKeys(message)
  .sort()
  .forEach((index) => {
    happyNewYearMessage2024 = `${happyNewYearMessage2024} ${Reflect.get(
      message,
      index
    )}`;
  });

console.log(happyNewYearMessage2024);
```
