---
title: "Aws Series Serverless Computing"
type: "post"
date: 2024-01-01T15:49:26+07:00
description: "In this topic you will learn about lambda, ecs and fargate, eks, ..."
keywords: ["aws", "solution architecture", "aws solution architect associate"]
categories: ["systemdesign", "aws"]
tags: ["aws"]
image: "https://gist.github.com/assets/31009750/6ec743dc-da52-49ca-b3fa-b7d06ece422c"
---

## AWS Lambda

> Serverless compute service that lets you run code without provisioning or managing the underlying servers. So you can focus on code, not the servers! Automated scaling

### Lambda Main features

- Free tier 1M requests and 400K GBs of compute per month
- Integrates with numerous AWS services: S3, DynamoDB, EventBridge, SQS/SNS, and Kinenis
- CloudWatch for Logging
- Set memories requirement as needed, up to 10,240 MB! CPU scales with memory
- Execution Length: short-term executions, limit time is 900s(15mins). For anything longer: AWS Batch, EC2
- Runtime support: Python,Golang,Java,Node.js and others

### Configuration:

- [x] Runtime
- [x] Permissions: you need to attach a role
- [x] Networking: optionally define VPC, subnet, and security groups your functions are a part of.
- [x] Resources: define the amount of available memory allocated to your function
- [x] Trigger: What's going to alert your Lambda function to start? Defining a trigger will kick Lambda off if that event occurs

### Lambda Function Quotas

![image](https://gist.github.com/assets/31009750/ad46b36b-543a-42ae-89df-a9fcf21b2312)

### Popular Architecture Example

![image](https://gist.github.com/assets/31009750/49b202ec-4f9a-48a9-87fd-739efe2feb1d)

![image](https://gist.github.com/assets/31009750/e754c0d1-09f6-46ab-b5d3-74b6e49b29d4)
