---
title: "Microservice Headfirst"
type: "post"
date: 2024-04-19T08:27:33+07:00
description: "In this post, you will learn how to design a simple microservices system"
keywords: ["microservice-architecture"]
categories: ["systemdesign", "microservice-architecture"]
tags: []
image: "https://user-images.githubusercontent.com/31009750/269891173-f10b1b6b-ea34-4e23-91b6-db9e995d6bff.png"
---

In theory, you will split your monolith application in to microservices like this

![image](https://gist.github.com/assets/31009750/a9f0ee0a-c2e7-4896-9dda-d2da9cf2a43d)

And the biggest issue we have to face is Data Management Between Services

![image](https://gist.github.com/assets/31009750/3850f906-aa90-4a76-b7c0-4fe5f553c27a)

In this article, we will go through 2 sections to help you dive in deeper in microservice world.

- [ ] Microservice Pattern
- [ ] Practice: build a shopping website with microservice architecture

## Microservice Pattern

### Database Per Service

- We want each service to run independently of other services
- Database schema/structure might change unexpectedly
- Some services might function more efficiently with different types of DB's (sql, non-sql)

Some issues we may got if we don't apply this pattern

**DB for All**

![image](https://gist.github.com/assets/31009750/0bd8745d-f0a6-4d10-a1d4-63b47706e808)

**Access to another service's DB**

![image](https://gist.github.com/assets/31009750/a980bf70-73e5-40d2-b102-2d5e2a5348c1)

### Communication strategies between services

This is our problem, as we do know, each services has their own database if needed.
So how do we manage communications between services when they need information from another services.

There are many ways to do that, but in general, they had been organized into 2 categories: **sync** and **async**

![image](https://gist.github.com/assets/31009750/52f446fb-4e97-4897-ad37-b2cfd80df382)

#### Sync

> Services communicate with each other using direct requests. Whatever protocol or data format.

![image](https://gist.github.com/assets/31009750/829f6d30-4550-46e9-8fc7-d2e93c9a74b8)

#### Async

> Services communicate with each other using events.

![image](https://gist.github.com/assets/31009750/2731da6b-aae6-4724-ac75-81b15fd9e5c3)

But looks like it can't solve the issues that sync strategy introduce.

### Command Query Responsibility Segregation

![image](https://gist.github.com/assets/31009750/90400553-0be0-4f23-88fd-5800f36370df)

- [CQRS](https://microservices.io/patterns/data/cqrs.html)

Let's dive in this example. We have an app with posts and allow user to create comments.
Apply this pattern we'll have the following services. And this is how these service interact when users add their new comments.

![image](https://gist.github.com/assets/31009750/00d1e071-bf91-4f13-b5ec-d2ca86c469f5)

![image](https://gist.github.com/assets/31009750/74369f87-29d5-47ac-82a7-aa7654b710f8)

But the business logic in the event is too precised. And what if we have a lot of features and services that applied this pattern.

![image](https://gist.github.com/assets/31009750/439e2489-51c6-4a57-abfe-0b20c6b150f9)

Finally, we may end up with event hell!!!

![image](https://gist.github.com/assets/31009750/0f2f7069-c8bf-4b3f-895d-a92058c256da)

So the solution is the service should have a deep understanding about the business in the event.
So we'll apply this "Single Responsibility", in this example CommentService is in charge of comment logic. Query service should only care about the generic event of the comment.

![image](https://gist.github.com/assets/31009750/13446e5f-9bec-4187-be63-7278374bc39f)

So Query Service only need to listen for update comment, just update

![image](https://gist.github.com/assets/31009750/1c160a59-1f37-42c5-877e-c24561e035d0)

### How do we deal with missing events

Your services, somehow, it had been down for a while

![image](https://gist.github.com/assets/31009750/c50cb841-4b0c-4b8b-b794-b319f7ca23fe)

You add a new service after your system run for a couple of months or even year

![image](https://gist.github.com/assets/31009750/261781ee-a6fb-4144-9d5a-728e20cacc10)

There are 3 options to solve this problem.

#### Option 1 - Sync Requests

![image](https://gist.github.com/assets/31009750/b7bb0857-33ce-427f-83ee-bac8161315f7)

#### Option 2 - Direct Access

![image](https://gist.github.com/assets/31009750/f9eb2191-cec2-4b2b-a90b-a1699c642f30)

![image](https://gist.github.com/assets/31009750/baeb2aab-5472-4be0-ae1f-23dd9258b10e)

#### Option 3 - Store Events

![image](https://gist.github.com/assets/31009750/97eb7414-9461-4fe1-a056-7565108734c9)

![image](https://gist.github.com/assets/31009750/2e4e2c80-5137-44b4-afea-f02768c58d62)

## Practice

Let assume that we have a monolith application looks like this

![image](https://gist.github.com/assets/31009750/d9c17d0c-4181-4ab6-9798-6c556e2a1793)

Your mission is to refactor this application with microservice architecture. The application has 2 parts: SPA(NextJS) + API (built with your microservices)
