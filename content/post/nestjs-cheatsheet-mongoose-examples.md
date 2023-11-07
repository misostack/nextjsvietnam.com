---
title: "Nestjs Cheatsheet Mongoose Examples"
type: "post"
date: 2023-10-07T09:26:40+07:00
description: "Nestjs Cheatsheet Mongoose Examples"
keywords: ["Nestjs Cheatsheet Mongoose Examples"]
categories: ["nestjs-examples"]
tags: ["mongoose"]
image: "https://user-images.githubusercontent.com/31009750/273357760-7e41f837-d573-4602-99a9-14d9b617c60c.png"
---

When you need to work with MongoDB and NestJS, the most powerful tool that you should use is "mongoose" - the most popular ORM for MongoDB. In this article, I will show you how to use Mongoose with NestJS.

What is this topic about?

- [ ] Configuration for Mongoose in NestJS
- [ ] Schema, Models, Documents Concepts and Examples
- [ ] CRUD Examples
- [ ] Data seeds
- [ ] Complex Queries: Using native query, aggregate, ...
- [ ] Transactions

We can use mongoose and create your own module and integrate with NestJS or use the official package from nestjs [@nestjs/mongoose](https://www.npmjs.com/package/@nestjs/mongoose).

Both has pros and cons, in this article, the first part will use the official package from nestjs, the second part we will write own custom module.

## Using NestJS Mongoose in your NestJS Project.

Let's install require packages

```ts
npm i @nestjs/mongoose mongoose
```
