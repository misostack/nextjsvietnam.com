---
title: "Learn Aws Solution Architect Associate the Fastest Way"
type: "post"
date: 2022-10-13T09:40:09+07:00
description: "Learn Aws Solution Architect Associate the Fastest Way"
keywords: ["aws", "solution architecture", "aws solution architect associate"]
categories: ["systemdesign", "aws"]
tags: ["aws"]
image: "https://user-images.githubusercontent.com/31009750/195486548-37a0588f-2fb5-4a5f-8ce3-dbd4478e97ab.png"
---

The main topics will be discussed in this article:

- [x] Hands-on practice tutorials
- [x] The architecture patterns : real cases example

## I.Overview

AWS provide us "The SAA-C03 Exam", if you can pass the exam, you will get this certificate

> AWS Solution Architect - Associate

About the exam:

- **Level** : Associate
- **Length**: 130 minutes
- **Format**: 65 questions
- **Cost** : $150 USD
- **Delivery Method** : Testing center or online
- **Scoring**: scaled score between 100 - 1000. **Minimum passing score** of **720**
- **Question format**: multiple choice, multiple response

### Six Pillars of a well-architecture framework

![image](https://user-images.githubusercontent.com/31009750/285127662-2507af4a-33ea-4e94-9d1b-488679a22a6f.png)

The common pillars when we design a system:

### 1.1.Domain 1. Secure Applications & Architectures

- Design secure access to AWS resources
- Design secure workloads and application
- Determine approriate data security controls

### 1.2.Domain 2. Resillient Architectures

- Design scalable and loosely coupled architectures
- Design highly available and/or fault-tolerant architectures

### 1.3.Domain 3. High Performance Architectures

- Determine high-performing and/or scalable **storage** solutions
- Design high-performing and elastic **compute** solutions
- Determine high-performing **database** solutions
- Determine high-performing and/or scalable **network** architectures
- Determine high-performing **data** _ingestion_ and _transformation_ solutions

### 1.4.Domain 4. Cost Optimized Architectures

- Design cost-optimized storage solutions
- Design cost-optimized compute solutions
- Design cost-optimized database solutions
- Design cost-optimized network architectures

### AWS Freetier vs Sandbox

#### AWS Freetier

- Create your own AWS Free Tier Account
- Full control
- You've responsible for the bills
- ... but you can operate in the free tier and set a billing alarm

#### Sandbox

- AWS account is hosted by a provider
- Limited control
- No clouds billing(no risk)
- Scenario-based challenges

Some of creditable cloud training labs:

- [DigitalCloud Training](https://digitalcloud.training/hands-on-challenge-labs/) by [Neal David](https://twitter.com/nealkdavis)
- [Cloud Guru - The best learning labs for cloud and devops](https://acloudguru.com/)

## Fun facts

> Cloud Guru is a holding company of LinuxAcademy, and is a subsidiary of Pluralsight

## II.The building blocks of AWS Service Types

- AWS Global Infrastructure
- Compute
- Storage
- Databases
- Network & Content Delivery
- Containers
- Migration & Transfer
- Management and Governance
- Analytics
- Security, Identity & Compliance
- Application Integration
- AWS Cost Management

### 2.1. AWS Global Infrastructure

> Region: a geographical area.

> Availability Zone: Data centers

> Edge Network: endpoints that AWS use for caching content. eg: CloudFront

![image](https://user-images.githubusercontent.com/31009750/285122379-e8579772-f75d-48ce-9b16-62cc40dde750.png)

### 2.2. AWS Shared Responsibility Model

![image](https://user-images.githubusercontent.com/31009750/285122766-3b23ee84-e93a-4634-a3f1-707513e221a4.png)

![image](https://user-images.githubusercontent.com/31009750/285123352-c17e16d7-ec1f-4391-9e38-eb3f67066583.png)

### 2.3. IAM

> What is IAM?

- Create users and grant permissions to those users
- Create groups and roles
- Control access to AWS resources

> What is root account?

- The email you used to sign up for AWS.
- The root account has full administrative access to AWS
- It's important to secure this account.s

> How to secure your AWS root account?

- Enable multi-factor authentication on the root account
- Create an admin group for your administrators, and assign the approripriate permissions to this group.
- Create user accounts for your administrators
- Add your users to the admin group.
- IAM policies are global

> Permissions

- Are made by assigning policy documents
- Policy document is an json object

![image](https://user-images.githubusercontent.com/31009750/285130554-b932c2d9-2332-4919-baba-02979c9aa2af.png)

Typically, we can assign IAM policy documents to a group, a user, a role. But the best practice is user can assign policies to a group, then add user to that group.

> The best practice

- **Users**: A physical person
- **Groups**: Functions, such as administrators, developers, etc, contains users
- **Roles**: Internal usage within AWS (allow one service in AWS can use another service in AWS)

![image](https://user-images.githubusercontent.com/31009750/285132709-ce1cdd5a-5e09-40b2-8ff9-a5adf5ad3587.png)

> The principle of least privilege

- Only assign a user the minimum amount of privileges they need to do their job

> Identity Provider

- Allow use to connect Active Directory(SAML) or OpenID Connect(Google)

## III. Compute

### 3.1. EC2

### 3.2. EKS or ECS (Container)

### 3.3. Lambda

### 3.4. Elastic Beanstalk

## 4. Storage

### 4.1. EBS

### 4.2. S3

### 4.3. Others

## 5. Databases

### 5.1. RDS

### 5.2. DynamoDB

### 5.3. Redshift

## 6. Networking

### 6.1. VPC

### 6.2. Direct Connect

### 6.3. Route 53

### 6.4. API Gateway

### 6.5. AWS GLobal Accelerator
