---
title: "Happy New Year 2024"
type: "post"
date: 2023-01-31T18:25:50+07:00
description: "I don't know who you are, but if you know javascript, I wish you all the best in 2024"
keywords: ["Happy New Year 2024"]
categories: ["cheatsheet"]
tags: ["well-being"]
image: "https://gist.github.com/assets/31009750/afc1d00c-ba25-4505-88cc-ee6d81128ada"
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
