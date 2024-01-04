---
title: "Aws Series Caching"
type: "post"
date: 2024-01-03T15:20:47+07:00
description: "In this topic you will learn about caching in AWS architecture"
keywords: ["aws", "solution architecture", "aws solution architect associate"]
categories: ["systemdesign", "aws"]
tags: ["aws"]
image: "https://gist.github.com/assets/31009750/c20c75e0-9149-403e-bdc8-fb4e9ee704ae"
---

What can we cache:

1. External: data that's going to be returned to our users
2. Internal: eg, we can speed up our databases, the less we talk to the database, the better.

Caching solutions

![image](https://gist.github.com/assets/31009750/b53bc9b3-76e9-4fe7-bade-2b0a184ab0ce)

## Global Caching with CloudFront

- CDN service, help to reduce latency and provide high transfer speed using AWS edge locations.
- Https is default
- Global distribution
- Can be used to front AWS endpoint along with non-AWS applications
- Expiring content with TTL configuration

![image](https://gist.github.com/assets/31009750/ce2b3617-6394-4152-aaf6-98cf5041a5ed)

![image](https://gist.github.com/assets/31009750/dcc4df84-d0ff-4ef0-8618-efba250aecfe)

## Elastic Cache

- A managed version of two opensource: memcached and redis
- And for RDS

![image](https://gist.github.com/assets/31009750/00d97912-7e0d-4470-ae12-1eb97bc9af2e)

## DAX

- DynamoDB Accelerator
- In Memory Cache: ml to nano
- Live inside VPC
- You can control size of node, TTL,

## IP Caching with Global Accelerators

- A service that send user's traffic to the global AWS Infrastructure via accelerators. Anycast IP.

![image](https://gist.github.com/assets/31009750/7d004c3d-b89c-41bd-a14c-0932a8841d56)
![image](https://gist.github.com/assets/31009750/245a1583-ef36-491f-a983-70969f1a749d)
![image](https://gist.github.com/assets/31009750/ab226cb7-8720-4bfe-a0ce-4da7a7ebf9c3)
