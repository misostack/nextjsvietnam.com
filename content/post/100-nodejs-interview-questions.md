---
title: "100 Nodejs Interview Questions"
type: "post"
date: 2022-10-11T14:30:39+07:00
description: "100 Nodejs Interview Questions"
keywords: ["100 Nodejs Interview Questions"]
categories: ["cheatsheet"]
tags: []
image: "/common/no-image.png"
---

## Question 1 : NodeJS Write Stream

In the JavaScript file, write a program to perform a GET request on the route **https://coderbyte.com/api/challenges/json/age-counting** which contains a data key and the value is a string which contains items in the format: key=STRING, age=INTEGER. Your goal is to count how many items exist that have an age equal to 32. Then you should create a write stream to a file called output.txt and the contents should be the key values (from the json) each on a separate line in the order they appeared in the json file (the file should end with a newline character on its own line). Finally, then output the SHA1 hash of the file.

**Example Input**

```json
{
  "data": "key=IAfpK, age=32, key=WNVdi, age=64, key=jp9zt, age=40, key=9snd2, age=32"
}
```

**File Contents (output.txt)**

```txt
IAfpK
9snd2
```

**Example Output**

> 7caa78c7180ea52e5193d2b4c22e5e8a9e03b486

## Question 2 : NodeJS Counting age

In the JavaScript file, write a program to perform a GET request on the route https://coderbyte.com/api/challenges/json/age-counting which contains a data key and the value is a string which contains items in the format: key=STRING, age=INTEGER. Your goal is to count how many items exist that have an age equal to or greater than 50, and print this final value.

**Example Input**

```json
{ "data": "key=IAfpK, age=58, key=WNVdi, age=64, key=jp9zt, age=47" }
```

**Example Output**

> 2

## Question 3 : NodeJS Print Files

In the JavaScript file, write a program to first create a file in the current directory with the name newfile.txt filled with any content. Then, using exec, print to the console all the files in the current directory so that they are in the following format: FILENAME, FILENAME, ...

**Example output**

> file.js, helloworld.txt, abc.txt

## Question 4: NodeJS REST GET Simple

In the JavaScript file, write a program to perform a GET request on the route https://coderbyte.com/api/challenges/json/rest-get-simple and then print to the console the hobbies property in the following format: ITEM1, ITEM2, ...

**Example Output**

> running, painting

```js
const https = require("https");
https.get(
  "https://coderbyte.com/api/challenges/json/rest-get-simple",
  (resp) => {
    let rawData = "";

    // parse json data here...
    resp.on("data", (chunk) => {
      rawData += chunk;
    });

    resp.on("end", () => {});
  }
);
```
