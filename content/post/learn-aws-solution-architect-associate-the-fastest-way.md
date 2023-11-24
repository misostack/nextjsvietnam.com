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

## IV. Storage

### 4.1. EBS

### 4.2. S3

#### 4.2.1 S3 Overview

##### What is S3?

- Object Storage: S3 provides secure, durable, highly scalable object storage
- Scalable: S3 allows you to store and retrieve any amount of data from anywhere on the web at a very low cost
- Simple: Amazon S3 is easy to use, with a simple web service interface

> S3 is object based storage, manage data as objects rather than in file systems or data blocks

- Upload any file type you think of to S3
- Examples include photos, videos, code, documents, and text files.
- Cannot be used to run an operating system or database

##### S3 Limitation

- Unlimited storage : total volume of data and number of objects you can store is unlimited.
- S3 objects can range in size from a minimum of 0 bytes to a maximum of 5 terabytes
- S3 buckets: store files in buckets(similar to folders)

##### Working with S3 Buckets

- Universal Namespace: globally unique ( all AWS accounts )
- Example S3 URLs: https://**bucket-name**.s3.**Region**.amazonaws.com/**key-name**
- Uploading files: when you upload a file to an S3 bucket, you will receive an HTTP 200 code if the upload was successful.

##### S3 is Key-Store Value

- Key: the name of the object
- Version ID: multiple version of the same object
- Value: the data itself, which is made up of a sequence of bytes
- Metadata: Data about the data you're storing(content-type, last-modified, etc)
- The data is spread across multiple devices and facilities to ensure availability and durability.

##### S3 is highly available and highly durability

- 99.95% - 99.99% service availability, depending on S3 tier
- 99.99% durability for data stored in S3

##### S3 Standard

- High Availability and Durability: Data is stored redundantly across multiple devices and facilities( >=3 AZs)
- Design for Frequent Access
- Suitable for Most Workloads: default storage class, websites, content distribution, mobile and gaming applications, and big data analytics

##### S3 characteristics

- **Tiered storage**: S3 offers range of storage classes designed for different usecases
- **Life cycle management**: Define rules to automatically transition objects to a cheaper storage tier or delete objects that are no longer required after a set of period time.
- **Versioning**: with versioning, all versions of an object are stored can be retrieved, **including deleted objects**

##### Securing Your Data

- **Server Side Encryption**: You can set default encryption on a bucket to encrypt all new objects when they are stored in the bucket
- **Access Control List(ACL)**: Define which AWS Accounts or Groups are granted access and the type of access. You can attach ACLs to individual objects within a bucket
- **Bucket Policies**: S3 Bucket Policies specify what actions are allowed or denied( eg: allow user JSBase to PUT but not DELETE objects in the bucket)

##### S3 - Strong Read-After-Write Consistency

- After a successful write of a new object(PUT) or an overwrite of an existing object,any subsequent read request immediately receives the lastest version of the object
- Strong Consistency for list operations, so after a write, you can immediately perform a listing of the objects in a bucket with all changes reflected

#### 4.2.2. Securing S3 Buckets with ACL and Bucket Policies

##### Object ACLs vs Bucket Policies

![image](https://user-images.githubusercontent.com/31009750/285349940-1ebc0763-768a-467e-a58c-9a8844616e22.png)

Object ACLs: work on an individual object
Bucket Policies: work on an entire bucket level

### 4.3. Others

## V. Databases

### 5.1. RDS

### 5.2. DynamoDB

### 5.3. Redshift

## 6. Networking

### 6.1. VPC

### 6.2. Direct Connect

### 6.3. Route 53

### 6.4. API Gateway

### 6.5. AWS GLobal Accelerator
