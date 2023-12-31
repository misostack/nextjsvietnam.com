---
title: "Aws Series Decoupling Workflows"
type: "post"
date: 2023-12-30T23:48:50+07:00
description: "In this topic you will learn how to decouple your workflows on AWS architecture"
keywords: ["aws", "solution architecture", "aws solution architect associate"]
categories: ["systemdesign", "aws"]
tags: ["aws"]
image: "https://gist.github.com/assets/31009750/2509a342-da20-4d40-ad32-921a5e8263f3"
---

## The issue with tight coupling

![image](https://gist.github.com/assets/31009750/aecd21b5-5ee2-473c-aa12-34db20ce1d25)

## The solution : loose coupling

![image](https://gist.github.com/assets/31009750/796c33fb-ee23-4be2-876c-10e90e611534)

![image](https://gist.github.com/assets/31009750/d503a69a-787f-49ed-a778-b73c32cb72a9)

### Simple Queue Service(SQS)

![image](https://gist.github.com/assets/31009750/2610a121-0c58-4e60-99e4-de83cff617ee)

- SQS is fully managed message queuing service that enables you to decouple and scale microservices, distributed systems, and serverless applications.
- A message queue that allows asynchronous processing of work. One resource write a message to an SQS queue, and then another resource retrieve that messages from SQS

#### Some important settings

- Delivery delay: default is 0, max value is 15 minutes
- Message size: up to 256KB of text in any format
- Encryption: messages are encrypted in transit by default, but you can add at-rest
- Message retention: default is 4 days, can be set between 1 minutes and 14 days.
- Long vs Short: Long polling isn't the default, but it should be.
- Queue Depth: this can be a trigger for autoscaling -> if two many messages in queue, add more instances to solve it.

SSE-SQS

![image](https://gist.github.com/assets/31009750/5ac88950-bc5b-4f08-9b84-d917ad9fd88e)

**Visibility Timeout**

![image](https://gist.github.com/assets/31009750/97d476b7-b69c-4ef5-bf9f-ae18cbe00b8d)

### Simple Notification Service(SNS)

- SNS is a fully managed messaging service for both application-to-application (A2A) and application-to-person(A2P) communication

### API Gateway

- API Gateway is a fully managed service that makes easy for developers to create,publish,maintain, monitor, and secure APIs at any scale.

### Sidelining Message Queue with Dead-Letter Queues

- **DLQ** are the targets for messages that can not be processed successfully
- Works with SQS and SNS!
- Useful for debugging applications and messaging systems
- Ability to isolate unconsumed messages to troubleshoot
- Redrive capacity allows you to move the message back into the source queue
- These are technically just other SQS queues
- DLQs used FIFO SQS queues must ALSO be FIFO queues

**Benefits**:

- Configure alarms based on message availability counts
- Quickly identify which logs to investigate for exceptions
- Analyze the SQS message contents for any errors
- Troubleshoot consumer permissions

![image](https://gist.github.com/assets/31009750/f4d67d8d-c2dd-4a86-9d1e-651767e14a8a)

### Order Messages using SQS FIFO

- Guaranteed ordering
- No message duplication
- 300 transactions per second <--> Batching can achieve up to 3,000 messages per second, per API call

![image](https://gist.github.com/assets/31009750/420941b0-6cc1-4486-b6c8-1963d17d0102)

**FIFO High throughput**

- Process up to 9,000 transactions per second, per API without batching
- Up to 90,000 transactions per second by using batching APIs

![image](https://gist.github.com/assets/31009750/b87f2da1-375e-41be-942c-2a4f0de8a938)

## Delivering Messages with SNS

![image](https://gist.github.com/assets/31009750/169b8c77-acec-4044-a3cf-f0590548f2ff)

SNS: Simple Notification Service

- Push-based messaging service, proactively delivers messages to the endpoints that are subscribed to it.
- This can be used to alert a system or a person
- One message can be sent to many

### SNS Settings and Quotas

**Subcribers**

- Kinesis Data Firehose, SQS, Lambda, email, HTTP(s), SMS and platform application endpoint.

**Message Size**

- Up to 256KB of text in any format

**DLQ support**

- Messages that failed to delivered can be stored in SQS DLQ

**FIFO or Standard**

- FIFO only supports SQS FIFO queues as subcribers

**Encryption**

- Messages are encrypted in transit by default, and you can add at-rest via AWS KMS

**Access Policies**

- A resource policy can be added to a topic, similar to S3. Useful for cross-account access.

**Large Message Payloads**

- The SNS Extended Library allows sending messages up to 2GB in size
- The payload is stored in Amazon S3, then SNS published a reference to the object

**SNS Fanout**

- Messages published in SNS topics are replicated in multiple endpoint subcriptions
- Allow for fully decoupled parallel asynchronous processing

**SNS Architecture**

![image](https://gist.github.com/assets/31009750/dde420a1-ec4e-4c9a-839d-91df589f850e)
![image](https://gist.github.com/assets/31009750/73b5274f-fbe6-4a35-950a-677e0dfe1762)
![image](https://gist.github.com/assets/31009750/301bf0bb-0b0b-4902-860d-e387692df0e0)

**Message Filtering**

- By default, every message published to a topic is sent to all subcribers
- Filter policies use JSON to define which messages get sent to specific subscribers

![image](https://gist.github.com/assets/31009750/64be337a-6d55-4970-bcdd-29ef7d4b6aef)
