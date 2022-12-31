---
title: "Happy New Year 2023"
type: "post"
date: 2022-12-31T21:10:13+07:00
description: "Happy New Year 2023"
keywords: ["Happy New Year 2023"]
categories: ["lifestyle"]
tags: ["well-being"]
image: "https://user-images.githubusercontent.com/31009750/210140054-d94534f3-f665-46c6-94d1-ac492aae4517.png"
---

```js
#!/usr/bin/env node

const words = ["Happy", "New", "Year", "2023"];
const message = {};
words.map((w, index) => {
  Reflect.set(message, index, w);
});

let happyNewYearMessage2023 = "";
Reflect.ownKeys(message)
  .sort()
  .forEach((index) => {
    happyNewYearMessage2023 = `${happyNewYearMessage2023} ${Reflect.get(
      message,
      index
    )}`;
  });

console.log(happyNewYearMessage2023);
```
