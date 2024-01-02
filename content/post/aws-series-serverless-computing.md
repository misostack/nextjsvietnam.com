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

## Serverless Application Repository

- Serverless Apps: allow user to easily find, deploy, or even publish their own serverless applications.
- Ability to privately share applications within orgs or publicity for the world
- AWS SAM template: upload load your application code and a manifest file.
- Deeply integrated with AWS Lambda service. Appears with console.

### SAM

> Serverless Application Model

```yml
AWSTemplateFormatVersion: 2010-09-09
Transform: AWS::Serverless-2016-10-31
Resources:
  getAllItemsFunction:
    Type: AWS::Serverless::Function
    Properties:
      Handler: src/get-all-items.getAllItemsHandler
      Runtime: nodejs12.x
      Events:
        Api:
          Type: HttpApi
          Properties:
            Path: /
            Method: GET
    Connectors:
      MyConn:
        Properties:
        Destination:
          Id: SampleTable
          Permissions:
            - Read
  SampleTable:
    Type: AWS::Serverless::SimpleTable
```

### Publish and Deploy

#### Publish

- Makes them available for others to find and deploy
- Define apps with AWS SAM template
- Set to private by default
- Must explicit share if desired

#### Deploy

- Find and deploy published applications
- Browse public apps without needing an AWS account
- Browse within AWS Lambda console
- Be careful of trusting all applications

## Running container in Amazon ECS or Amazon EKS

### Problems with Containers

![image](https://gist.github.com/assets/31009750/de720c02-35c3-49ce-9ec3-847e89ff12ca)

### ECS or EKS

#### ECS

- Proprietary AWS Specific container management solution
- Best use when you're all in on AWS
- You're looking for something simple to orchestrate containers

#### EKS

- AWS managed version of opensource Kubernetes container management solution
- Best used when you're all in on AWS
- Significantly more work to configure and integrate with AWS

Both of them are greate for long running applications.

### AWS Fargate

- AWF Fargate is a serverless compute engine for docker containers
- AWS owns and manages the infrastructure
- Require use of ECS or EKS
- Support both Linux and Windows Container

#### EC2 vs Fargate

**EC2**

- You are responsible for underlying operating system
- EC2 pricing model
- Long-running containers
- Multiple containers can share same host
- Capable of mouting EFS file systems for persistent, shared storage

**Fargate**

- No operating system access
- Pay based on resources allocated and time ran
- Short-running tasks
- Isolated environment per container
- Capable of mounting EFS file systems for persistent, shared storage

#### Fargate vs Lambda

**Fargate**

- Select Fargate when you have more consistent workloads.
- Allow Docker use across the organization and a great level of control by developers

**Lambda**

- Great for unpredictable or inconsistent workloads
- Perfect for applications that can be expressed as a single function

## Amazon EventBridge

- Amazon EventBridge(formerly CloudWatch Events) is a serverless event bus
- It allows you to pass events from a source to an endpoint. It's the glue that holds your serverless application together

### Main concepts

- Events: a recorded changed in an AWS environment, SaaS partner, or one of your own configured applications/services. This also included scheduled events
- Rules: criteria used to match incoming events and send them to the appropriate targets. Based on either event patterns or schedules
- Event bus: A router that receives events and delivers them to targets(destinations). Every account has a default bus, and you can create other custom buses.

#### Rule Triggers

- Event Pattern: Define an event source and event pattern that trigger your rule. Eg: EC terminated.
- Scheduled: Set up a recurring schedule for trigger your rule. Eg: Rate-based(1hour), Cron-based(0 12 \* _ ? _)

### Event Bridge Architecture

![image](https://gist.github.com/assets/31009750/04f5d25a-2057-4acf-857c-8ad6dd780eda)

## Amazon ECR

> Amazon Elastic Container Registry

- AWS-managed container image registry
- Private container image repositories with permissions via IAM
- Supported formats: OCI images, Docker images, OCI artifact
- Lifecycle policies: rules for expering and removing unused/older images
- Scan on push repository settings
- Sharing: Cross region, cross account, configured per repository and per region
- Cache rules: pull through cache rules allow for caching public repos privately
- Tags: prevent image tags from being overwritten, configured per repository this setting
- Integrations: your own container infrastructure, Amazon EC2, Amazon EKS clusters, Amazon Linux can be used locally

## Amazon EKS Distro

- Amazon EKS Distro(Amazon EKS-D) is Kubernetes distribution based on and used by Amazon EKS
- Amazon EKS is fully managed by you
- Where: anywhere
- Self-managed Kubernetes deployments

## Amazon EKS, ECS anywhere outside AWS

### EKS Anywhere

- On-premises EKS : on-premises way to manage K8s clusters with same practice use EKS, based on EKS distro, full lifecycle management of multiple K8s clusters, required enterprise subscriptions

### ECS anywhere

- Management of container-based apps on-premises
- No need to install and operate local container orchestration software
- No ELB support for inbound traffic

Requirements:

- SSM Agent
- ECS Agent
- Docker
- Must register external instances as SSM Managed Instances
- Can install scripts using ECS console
- Execute scripts on-premises VMs or bare-metal servers
- Deploy containers using the EXTERNAL lauch type

![image](https://gist.github.com/assets/31009750/4460ef27-ace9-40ba-8f06-115fcf499318)
