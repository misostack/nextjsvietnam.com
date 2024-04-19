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

And the biggest issue we have to face is

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
