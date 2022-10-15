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

## Question 5: Write a factorial function

```js
// factorial is a function that multiples a number by every number below it till 1
const factorialCalculation = (n) => {};
```

> Answer

```js
// factorial is a function that multiples a number by every number below it till 1
const factorialCalculation = (n) => {
  if (isNaN(n) || n.toString().indexOf(".") > 0 || n < 0) {
    throw new Error(`${n} is not a natural number`);
  }
  // n <= 1 : 0,1
  if (n <= 1) {
    return 1;
  }
  if (n >= 1e3) {
    throw new Error(`n is too large, it must be less than ${1e3}`);
  }
  let factorialResult = n;
  for (let i = n - 1; i > 1; factorialResult *= i--);
  return factorialResult;
};

console.log(0, factorialCalculation(0));
console.log(2.0, factorialCalculation(2.0));
console.log(3, factorialCalculation(3));
console.log(4, factorialCalculation(4));
console.log(5, factorialCalculation(5));
console.log(6, factorialCalculation(6));
console.log(1e2, factorialCalculation(1e2));
console.log("10", factorialCalculation("10"));
console.log("5", factorialCalculation("5"));
console.log(2.3, factorialCalculation(2.3));
console.log("a", factorialCalculation("a"));
console.log(1e99, factorialCalculation(1e9));
console.log(-2, factorialCalculation(-2));
```

## Question 6: Binary Gap

A binary gap within a positive integer N is any maximal sequence of consecutive zeros that is surrounded by ones at both ends in the binary representation of N.

For example, number 9 has binary representation 1001 and contains a binary gap of length 2. The number 529 has binary representation 1000010001 and contains two binary gaps: one of length 4 and one of length 3. The number 20 has binary representation 10100 and contains one binary gap of length 1. The number 15 has binary representation 1111 and has no binary gaps. The number 32 has binary representation 100000 and has no binary gaps.

Write a function:

function solution(N);

that, given a positive integer N, returns the length of its longest binary gap. The function should return 0 if N doesn't contain a binary gap.

For example, given N = 1041 the function should return 5, because N has binary representation 10000010001 and so its longest binary gap is of length 5. Given N = 32 the function should return 0, because N has binary representation '100000' and thus no binary gaps.

Write an efficient algorithm for the following assumptions:

N is an integer within the range [1..2,147,483,647].

### Answer

```js
// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(N) {
  // write your code in JavaScript (Node.js 14)

  try {
    const MAX_N = 2147483647;
    // if not a positive integer return 0
    if (isNaN(N) || N <= 0 || N.toString().includes(".") || parseInt(N) > MAX_N)
      return 0;
    // convert to binary number
    // 12 -> 6 -> 3 -> 2 -> 1 => 10000
    let cloneOfN = N;
    let longestBinaryGap = 0;
    let startGap = -1;
    let endGap = -1;
    for (let index = 0; cloneOfN >= 1; ) {
      // set startGap when startGap === -1 cloneOfN %2 === 1
      if (cloneOfN % 2 === 1) {
        if (startGap === -1) {
          startGap = index;
        } else if (startGap !== -1 && endGap === -1) {
          endGap = index;
          // closeGap and compare
          const gapDiff = endGap - startGap - 1;
          if (gapDiff > longestBinaryGap) {
            longestBinaryGap = gapDiff;
          }
          // reset gap
          startGap = index;
          endGap = -1;
        }
      }
      cloneOfN = (cloneOfN - (cloneOfN % 2)) / 2;
      index++;
    }
    return longestBinaryGap;
  } catch {
    return 0;
  }
}

console.log(solution(1041));
console.log(solution("abc"));

function solution2(N) {
  // write your code in JavaScript (Node.js 14)

  try {
    const MAX_N = 2147483647;
    // if not a positive integer return 0
    if (isNaN(N) || N <= 0 || N.toString().includes(".") || parseInt(N) > MAX_N)
      return 0;
    // convert to binary number
    // 12 -> 6 -> 3 -> 2 -> 1 => 10000
    let binaryOfN = N.toString(2);
    let longestBinaryGap = 0;
    let startGap = -1;
    let endGap = -1;
    for (let index = 0; index < binaryOfN.length; index++) {
      // set startGap when startGap === -1 cloneOfN %2 === 1
      if (binaryOfN.charAt(index) == 1) {
        if (startGap === -1) {
          startGap = index;
        } else if (startGap !== -1 && endGap === -1) {
          endGap = index;
          // closeGap and compare
          const gapDiff = endGap - startGap - 1;
          if (gapDiff > longestBinaryGap) {
            longestBinaryGap = gapDiff;
          }
          // reset gap
          startGap = index;
          endGap = -1;
        }
      }
    }
    return longestBinaryGap;
  } catch {
    return 0;
  }
}
```
