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

## API Gateway

- Fully managed service that allow you to easy publish, create, maintain, monitor and secure your API.
- It allow you to put a safe "frontdoor" on your application

**Notable Features**

- Protect endpoints by attaching WAF
- Easily implement DDos protection and rare limiting
- Easy to use

**API Options**

- REST API: API Keys, per-client throttles, validation of requests, WAF integration -> Restful API
- HTTP API: Simpler option than REST API, cheaper, minimum features -> Restful API
- Websocket API: Collection of WebSocket routes integrated with Lambda functions, HTTP Endpoints and other AWS services

**Endpoint Types**

- Edge-Optimized: Default option. API requests get sent through a CloudFront edge. Best for global users
- Regional: Perfect for clients that reside in the same, specific region. Ability to leverage with CloudFront if required.
- Private: only accessible via VPCs using interface VPC Endpoints.

**Securing your APIs**

- User authentication can be accomplished to control access to your APIs
- Authentication methods include IAM roles, Amazon Coginito, or even your own custom authorizer(Lambda functions)
- DNS: Edge optimized endpoints require ACM(AWS Certificate Manager) certs in the us-east-1
- SSL: Regional endpoints require ACM certs in the same region.
- WAF: you can place WAF in front of your API to prevent DDos

**Example usecase**

![image](https://gist.github.com/assets/31009750/4c9cb901-feaf-4e6e-8e42-ba6b1af7be30)

## AWS Batch

### Batch Workloads

- You can use AWS Batch to run batch computing workloads withi AWS(run on EC2 or EC2/Fargate)
- Scale based on your configuration
- Automatically Provision and Scale
- No install required

### Important Components

#### Jobs

- Units of work that are submitted to AWS Batch(shell scripts, executeables, and Docker Images)

#### Job Definitions

- Specify how your jobs are to be run(blueprint for resources in job)

#### JobQueues

- Jobs get submitted to specific queues and reside until scheduled to run in a compute environment.

#### Compute Environment

- Set of managed or unmanaged compute resources used to run your jobs

### How do you choose between Fargate and EC2 compute environment

![image](https://gist.github.com/assets/31009750/1e9807b3-17cf-4082-be13-0cb4cc709cb3)

#### Fargate

- Recommend approach for MOST workloads
- Require fast start times(< 30 seconds)
- Require 16 vCPU or less
- Require no GPUs
- Require 120 Gib of memory or less

#### EC2

- Need more control over instance selection
- Require GPUs
- Require Elastic Fabric Adapter
- Require custom AMIs
- High levels of concurrency
- Require access to Linux parameters

### AWS Batch or Lambda

#### Time limits

- Lambda : 15 mins execution time limit
- Batch: does not have this

#### Disk Space

- Lambda: has limited disk space, and if you wanna leverage it with EFS requires functions live within a VPC

#### Runtime limitations

- Lambda is serverless but it has limited runtimes

#### Batch Runtimes

- Batch uses Docker, so any runtime can be used

### How to leverage AWS Batch in your application

![image](https://gist.github.com/assets/31009750/f677c26e-df43-44a3-a105-14f2ba7dfd93)

![image](https://gist.github.com/assets/31009750/d11ef996-91f5-46d8-8f03-43f388c0901e)

### Summary for AWS Batch

![image](https://gist.github.com/assets/31009750/b350d236-074a-4c17-b0d0-0ad2ba0b247c)

## Amazon MQ

![image](https://gist.github.com/assets/31009750/75584195-9f83-4c85-8917-37cd3d763652)
![image](https://gist.github.com/assets/31009750/93e6d6a0-4132-43d0-91d5-43d5945a3f02)

- Message broker service allowing easier migrating message broker system to AWS Clouds
- Allows you to leverage both Apache ActiveMQ and RabbitMQ engine types
- New applications should try and leverage SNS with SQS
- Amazon MQ restricts access to private networks. So require VPC connectivity
- Amazon MQ offer HA architectures: cluster deployments for Amazon RabbitMQ across multi AZ behind NLB

## Cordinating Distributed Apps with AWS Step Functions

- A serverless orchetration service to manage and run event-driven task executions

![image](https://gist.github.com/assets/31009750/4a3bb45f-7c20-43bd-a013-8bd479fc4741)

![image](https://gist.github.com/assets/31009750/2170b556-b89c-40a5-aa15-64accd1f115d)

## Ingesting Data from SASS Applications to AWS with Amazon AppFlow

- Integration: Fully managed integration service for exchanging data between SaaS apps and AWS Services
- Ingest Data: Pull data records from third-party SaaS vendors and store them in S3
- Bi-directional data transfer with limited combinations

- Flow : flows transfer data between sources and destinations
- Map: determines how your source data is stored within your destination
- Filters: criteria to control which data is transfered
- Trigger: how flow start(run on demand, run on event, run on schedule)

![image](https://gist.github.com/assets/31009750/c93ed9e3-0648-424e-8a49-802175b9d446)

### Usecases

- Transfering Salesforce records to Amazon Redshift (datawarehouse but cheaper)
- Ingesting and analyzing Slack conversations in S3
- Migrate Zenddesk and other help desk support tickets to Snowflake(datawarehouse but more expesive)
- Transfering aggregate data on a schedule basis to S3\*
