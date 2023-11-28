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

## Tools

- [AWS Policy Generator](https://awspolicygen.s3.amazonaws.com/policygen.html)

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

> VM but hosted on Amazon Infrastructure

#### 3.1..1 Amazon EC2 Pricing Options:

**On Demand**

- Pay by the hour or the second, depend on instance type
- Short term
- Flexible
- Testing the water

**Reversed capacity**:

- Predictable usage
- Specific capacity requirement
- Pay upfront for 1 or 3 years
- Standard RIs - up to 72% off the on-demand price.
- Convertible RIs - 54% off the on-demand price. Has option to change to a different RI type of equal or greater value
- Scheduled RIs: launch within the time window you defined.

**Spot:**

- Purchase unused capacity
- Image rendering
- Genomic sequencing
- Algorithmic trading engines

![image](https://gist.github.com/assets/31009750/4ca33b79-1e7b-45f0-9d55-ccba882d6ea5)

**Dedicated**

- Expensive
- A physical EC2 server dedicated

#### 3.1.2. Using Roles

- Using role

#### 3.1.3. Security Groups and Bootstrap Scripts

> Security Groups

- Act as a **virtual firewall** for your EC2 instances to control incoming and outgoing traffic.
- **Inbound rules** control the **incoming traffic to** your instance
- **Outbound rules** control the **outgoing traffic from** your instance
- If you don't specify a security group, Amazon EC2 uses the default security group for the VPC

> Bootstrap Scripts

- Because your instance metadata is available from your running instance, you do not need to use the Amazon EC2 console or the AWS CLI. This can be helpful when you're writing scripts to run from your instance.
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-data-retrieval.html

#### 3.1.4. Networking with EC2

There are 3 different types of virtual networking cards to your EC2 instances

![image](https://gist.github.com/assets/31009750/8feace9d-1995-419d-b0a5-f177ba309447)

- ENI: Elastic Network Interface - basis, day to day networking
- EN: Enhanced Networking - Uses single root I/O virtualization(SR-IOV) to provide high performance
- EFA: Elastic Fabric Adapter - Accelerate High Performance Computing(HPC) and machine learning applications

**ENI**

- Elastic Networking Interface
- Private IPv4 addresses
- Public IPv4 addresses
- Many IPv6 Addresses
- MAC Address
- 1 or more security groups
- Low budget, high availability solution

**EI**

- Enhance Networking
- High Performance Networking from 10 Gbps - 100 Gbps
- Higher bandwidth, higher packet per second(PPS) performance
- Consistently lower inter-instance latencies
- Single Root I/O Virtualization(SR-IOV)

You can enable enhanced networking by:

**ENA**

- Supports network speed up to 100 Gbps

**INTEL 82599 VIRTUAL FUNCTION(VF) Interface**

- Supports network speed up to 10 Gbps

**EFA**

- Elastic Fabric Adapter
- A network device you can attach to your Amazon EC2 instance to accelerate High Performance Computing(HPC) and machine learning applications.
- Provide lower and more consistent latency and higher throughput than TCP transport traditionally.
- Can use **OS-BYPASS** (only support Linux), os-bypass enables HPC and machine learning applications to bypass operating system kernel and communicate directly with EFA device.

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

- Buckets are private by default: you have to allow public access on both the bucket and its objects in order to make the bucket public
- Object ACLs: You can make individual objects public using object ACLs

#### 4.2.3. Hosting a static website on S3

- Create your bucket
- Upload 2 files : index.html, error.html
- Adjust the bucket policies
- Enable static website for your bucket

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::BUCKET_NAME/*"]
    }
  ]
}
```

![image](https://user-images.githubusercontent.com/31009750/285398092-56d0d079-da8f-485b-b4ec-4a2c19844a98.png)

- [Reference S3 Web Hosting](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)

#### 4.2.4. Versioning

- All versions of an object are stored in S3. This includes writes and even if you delete an object.
- Lifecycle Rules: Can be integrated with lifecycle rules
- Backup: Can be a great backup tool
- Supports MFA
- Can not be disabled - only suspend

![image](https://user-images.githubusercontent.com/31009750/285400913-3152d06e-383b-4d84-8ff7-1923ed06c59b.png)

#### 4.2.5. S3 Storage Classses

Amazon S3 provide various storage classes

![image](https://user-images.githubusercontent.com/31009750/285402129-6728567d-8b9c-4e16-85ca-6b0e49580062.png)

#### 4.2.6. S3 Lifecycle Management

![image](https://user-images.githubusercontent.com/31009750/285415429-3fe9ca42-6cd8-4404-bf5e-08b52cae88b6.png)

![image](https://user-images.githubusercontent.com/31009750/285416574-4a0d2594-f0e4-4015-a2a7-cffc7a2514b7.png)

![image](https://user-images.githubusercontent.com/31009750/285416827-2df61a19-f00f-40e7-9a1a-af1bd34334ad.png)

#### 4.2.7. S3 Object Lock

- S3 Object Lock use WORM(write once, read many) model. Prevent objects from being deleted or modified for a fixed amount of time or indefinitely.
- It is an extra layer of protection against deletion.

**S3 Object Lock Modes**

- **Governance mode**: users can't overwrite or delete an object version or alter its lock settings unless they have special permissions
- **Compliance mode**: a protected object version can't be overwritten or deleted by any user, including the root user in your AWS Account. Its retention period can't be changed or can't be shortened. And nobody can overwrite or delete during the retention period.

**Legal Holds**

- A legal hold prevents an object version being overwritten or deleted.(no retention period, can only be removed by someone who has s3:PutObjectLegalHold permission)

**Glacier Vault Lock**

- Allows you to easily deploy and enforce compliance controls for individual s3 glacier vaults with a vault lock policy.

> A vault is a container for storing archives

#### 4.2.8. Encrypting S3 Objects

**Type of encryption**

1. Encryption in Transit:

- SSL/TLS
- HTTPS

2. Encryption at Rest: Server-Side Encryption

- SSE-S3: S3 manage keys, using AES-256-bit encryption
- SSE-KMS: AWS Key Management Service-managed keys
- SSE-C: Customer-provided keys
- Enabled by default (SSE-S3)

3. Encryption at Rest: Client-Side Encryption

- You encrypt the files yourself before you upload to S3

![image](https://user-images.githubusercontent.com/31009750/285423993-31ab82ea-b6cf-4595-a754-994b450f924e.png)

Sample

```json
{
  "Id": "Policy1700821014223",
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "Stmt1700821009746",
      "Action": ["s3:PutObject"],
      "Effect": "Deny",
      "Resource": "arn:aws:s3:::nextjsvietnam.com",
      "Condition": {
        "ArnNotEqualsIfExists": {
          "s3:x-amz-server-side-encryption": "AES256"
        }
      },
      "Principal": "*"
    }
  ]
}
```

#### 4.2.9. Optimize S3 Performance

> S3 Prefixes : folders inside bucket

nextjsvietnam.com/make/it/simple.jpg

> S3 Performance

- Low latency: You can get first byte out S3 within 100-200 ms
- You can also achieve a high number requests: 3,500 PUT/COPY/POST/DELETE and 5500 HEAD requests/second, per prefix.

For example, if you create 10 prefixes in an Amazon S3 bucket to parallelize reads, you could scale your read performance to 55,000 read requests per second. Similarly, you can scale write operations by writing to multiple prefixes.

> Limitation with KMS

- It is applied [KMS Limit](https://docs.aws.amazon.com/kms/latest/developerguide/requests-per-second.html)
- When you upload a file, you will call GenerateDataKey in KMS API
- When you download a file, you will call Decrypt in the KMS API

#### 4.2.10. S3 Performance Upload - Multipart Uploads

- Recommended for files over 100MB
- Required for files over 5GB
- Parallelize uploads (increase efficiency)

Seperate by chunks

![image](https://user-images.githubusercontent.com/31009750/285430539-f07003b6-9414-4b11-9e90-28145abcf64f.png)

#### 4.2.11. S3 Performance Download - S3 Byte Range Fetches

- Parallelize downloads by specifying byte ranges
- If there's failure in the download, it's only for a specific byte range.

![image](https://user-images.githubusercontent.com/31009750/285431521-2828ba8f-806c-4e02-ac8b-255f3f18bc34.png)

#### 4.2.12. Backup Data with S3

> S3 Replication

- You can replicate objects from one bucket to another bucket (versioning must be enabled on both the source and destination buckets)
- Objects in an existing buckets are not replicated automatically( once replication is turned on, all subsequent updated objects will be replicated automatically)
- Delete markers are not replicated by default (delete individual versions or delete markers will not be replicated)

![image](https://user-images.githubusercontent.com/31009750/285437334-d28c1145-466e-4f69-b942-2e2614477038.png)

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
