---
title: "Aws Series High Availability and Scaling"
type: "post"
date: 2023-12-30T09:31:02+07:00
description: "In this topic you will learn how to scale on AWS architecture"
keywords: ["aws", "solution architecture", "aws solution architect associate"]
categories: ["systemdesign", "aws"]
tags: ["aws"]
image: "https://gist.github.com/assets/31009750/d011d22e-3f5b-446b-bb01-efa7655968c5"
---

## Vertical Scaling vs Horizontal Scaling

### Vertical Scaling

Eg:

- Increase your EC2 RAM
- Increase your EC2 CPU
- ...

![image](https://gist.github.com/assets/31009750/dd252275-7a83-4e64-9ac4-9a6d8387896a)

### Horizontal Scaling

Eg:

- Add new EC2
- Add new EC2
- ...

![image](https://gist.github.com/assets/31009750/c1b33a1a-7933-4427-86dc-33384ec14def)

But we dont' only scale EC2, it should include other parts:

- Database
- VPC
- AZ
- ...

### The 3W's of Scaling

> What do we scale?

- What sort of resource, we're going to scale. How do we define template?

> Where do we scale?

- When applying the model, where does it go? Should we scale out database? Or Webservers?

> When do we scale?

- How do we know we need more? CloudWatch alarms can tell us it's time to add more resources.

## Launch Template

- A launch template specifies the needed settings that go into building out an EC2 instance. It is a collection of settings you can configure so you dont' have to walk through the EC2 wizard over and over.

It's a heart of auto scaling feature.

Let's compare Lauch Template with Configurations:

**Launch Template**

- Capable of leveraging all EC2 auto scaling features.
- Supports versioning
- More granularity
- AWS recommends this approach

**Configuration**

- Only for certain EC2 auto scaling features
- Immutable
- Limited configuration options
- Try not to use them

### What can be included inside a Launch Template?

- AMI
- EC Instance Size
- Security Groups
- Potentially networking information( if you use autoscaling, this part should be set inside autoscaling group configuration)
- Potentially UserData

## Scaling EC2 Instances with Auto Scaling Groups

- Creating a **High Available** application
- Remember spread the resources out over multiple AZs and utilize load balancers

### Auto Scaling Groups

- Contain a collection of EC2 Instances that are treated as collective group for purposes of scaling and management.

### Auto Scaling Steps

![image](https://gist.github.com/assets/31009750/dfbc4bff-2f5f-41be-969c-bfcf83fbfb5d)

### LifeCycle

![image](https://gist.github.com/assets/31009750/bc5b2d34-4d48-44df-b296-cc635c28b73d)

## Step Scaling

![image](https://gist.github.com/assets/31009750/5dd648ba-07c5-466f-a115-cc916d9fba25)

![image](https://gist.github.com/assets/31009750/6ba94b3f-4555-4733-8789-5918445aaa8a)

![image](https://gist.github.com/assets/31009750/0fcf9021-261e-4227-b8d4-e5e15674851f)

### Simple Scaling

- Relies on metrics for scaling needs

Example: Add 1 instances if CPU Utilization metric > 80%

### Target Tracking

- Uses a Scaling metric and value that ASG should maintain at all times

Eg: Maintain ASGAverageCPUUtilization = 50%

### Instance Warm-up and CoolDown

> Warm-Up: stops instances from being placed behind the load balancer, failing the health check, and being terminated prematurely

> CoolDown: Pauses Auto Scaling for a set amount of time. Help you avoid runaway scaling events. -> prevent over doing auto scaling

> Avoid Thrashing: You want to create instances quickly and spin them down slowly

### Scaling Types

- Reactive Scaling: Measure and determine if you need to create/remove resources
- Schedule Scaling: Have a predictable workload, create a scaling event to get your resources ready to go before they're actually needed -> shopping events(black Friday, Christmas, Hoildays)
- Predictive Scaling: AWS uses it machine learning algorithms to determine when you'll need to scale. They are reevaluated every 24 hours to create a forecast for the next 48 hours

### Key Figures

- Desired: initial value
- Min: minimum value
- Max: maximum value
