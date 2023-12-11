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
- [AWS CLI](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)
- [AWS EBS Volume Types](https://aws.amazon.com/ebs/volume-types/)

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

```sh
curl http://169.254.169.254/latest/meta-data/
curl http://169.254.169.254/latest/meta-data/placement
curl http://169.254.169.254/latest/meta-data/placement/availability-zone

#!/bin/bash
sudo apt-get update -y
sudo apt-get install apache2 unzip -y
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
echo '<html><h1>Bootstrap Demo</h1><h3>Availability Zone: ' > /var/www/html/index.html
curl http://169.254.169.254/latest/meta-data/placement/availability-zone >> /var/www/html/index.html
echo '</h3> <h3>Instance Id: ' >> /var/www/html/index.html
curl http://169.254.169.254/latest/meta-data/instance-id >> /var/www/html/index.html
echo '</h3> <h3>Public IP: ' >> /var/www/html/index.html
curl http://169.254.169.254/latest/meta-data/public-ipv4 >> /var/www/html/index.html
echo '</h3> <h3>Local IP: ' >> /var/www/html/index.html
curl http://169.254.169.254/latest/meta-data/local-ipv4 >> /var/www/html/index.html
echo '</h3></html> ' >> /var/www/html/index.html
apt-get install mysql-server
sudo systemctl enable mysql
```

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

#### 3.1.5. EC2 Placement Groups

When you launch a new EC2 instance, the EC2 service attempts to place the instance in such a way that all of your instances are spread out across underlying hardware to minimize correlated failures

Depending on the type of workload, you can create a placement group using one of the following placement strategies

- **Cluster** – packs instances close together inside an Availability Zone. This strategy enables workloads to achieve the low-latency network. - typical of high-performance computing (HPC) applications.
- **Partition** - spreads your instances across logical partitions such that groups of instances in one partition do not share the underlying hardware with groups of instances in different partitions. - typically used by large distributed and replicated workloads, such as Hadoop, Cassandra, and Kafka (dedicated racks)
- **Spread** - strictly places a small group of instances across distinct underlying hardware to reduce correlated failures - individual critical EC2 instances

- Only certain types of instances can be launched in a placement group.
- You can move an existing instance into a placement group

**There is no charge for creating a placement group.**

**Spot instances are useful for**:

- big data and analytics
- containerized workloads
- CI/CD and testing
- image and media rendering
- High-performance computing
- save up to 90% on-demand price
- you don't need persistent storage
- you can block Spot instances from terminating by using **Spot block**

**Spot Fleets**:

- Collection of spot instances and (optionally) on-demand instances
- Attempts to launch the number of spot instances and on-demand instances to meet your target capacity you specified in the Spot Fleet request.
- The request is fulfilled if there is capacity and maximum price you specified in the request exceed the current Spot price. It also attempts to maintain its target capacity fleet.
- You can define several launch pools(EC2 instance type, OS, AZ), fleet will choose the best way to implement depending on your defined strategy.

Some strategy:

- capacityOptimized
- lowestPrice
- diversified(spot instances are distributed accross pools)
- InstancePoolsToUseCount(spot instances are distributed across the number of spot instance pools you specify - only valid with lowestPrice)

### 3.2. EKS or ECS (Container)

### 3.3. Lambda

### 3.4. Elastic Beanstalk

## IV. Storage

### 4.1. EBS

**Overview of SSD**

- High Performance
- High available and scalable storage volumes
- Expensive

![image](https://gist.github.com/assets/31009750/3528c3e8-c743-4e35-bd89-059f8201e352)

**Overview of HDD**

- High available and scalable storage volumes
- Low Price

![image](https://gist.github.com/assets/31009750/2a4678d5-6923-4f19-ad42-fb024ee4ce36)

#### 4.1.1. What are EBS Volumes?

- **Elastic Block Store** : Storage volumes that you can attach to an EC2 Instances
- Production Workloads: Designed for mission-critical workloads
- High Available: Automatically replicated within a single Availability Zone to protect against hardward failures
- Scalable: Dynamically increase capacity and change the volume type with no downtime or performance impact to your live systems

#### 4.1.2. ESB Volume Types

**General Purpose SSD(gp2)**

- A balance price and performance
- 3 IOPS per Gib, up to maximum of 16,000 IOPS per volume
- gp2 volumes smaller than 1TB can burst up to 3,000 IOPs
- Good for boot volumes or development and test applications that are not latency sensitive

**General Purpose SSD(gp3)**

- A balance price and performance
- Predictable 3,000 IOPS base line performance and 125 Mib/s regardless of volume size.
- Ideal for applications that require **high performance at low cost**, such as MYSQL, Cassandra, virtual desktops, and Hadoop analytics
- Customers looking for higher performance can scale up to 16,000 IOPS and 1,000 MiB/s for an additional fee
- The top performance of gp3 is 4 times faster than max throughput of gp2

**Provisioned IOPS SSD(io1)**

- The high performance and most expensive
- Up to 64,000 IOPS per volume. 50 IOPS per GIB.
- Use if you need more than 16,000 IOPS.
- Designed for I/O Intensive applications, large databases, and latency-sensitive workloads.

**Provisioned IOPS SSD(io2)**

- Latest generation
- Up to 64,000 IOPS per volume. 500 IOPS per GIB.
- Higher durability and more IOPS

**HDD Through put Optimized(st1)**

- Low cost HDD Volume
- Baseline throughput of 40MB/s per TB
- Ability to burst up 250 MB/s per TB
- Frequently data accessed, throughput-intensive workload
- Big data, data warehouses, ETL(Export, Tranformation, Load), and log processing
- A cost effetive way to store mountains of data
- Cannot be a boot volume

**Cold HDD(sc1)**

- Lowest cost option
- Base throughput 12MB/s per TB
- Good choice for colder data requiring fewer scans per day
- Good for applications that need the lowest cost and performance is not a factor
- Can not be a boot volume

![image](https://gist.github.com/assets/31009750/21a096d2-f4e5-43a0-b357-ed60d24bf355)

#### 4.1.3. Volumes and Snapshot

> Volume:

- Think of it as a virtual hard disk.
- Need a minimum of 1 volume per EC2 instance => root device volume => where OS installed

> Snapshot

- Exist on S3: think of snapshots as a photograph of hark disk/volume
- Are point in time copy of a volume
- Are incremental: only data that has been changed since your last snapshot are moved to S3 (saved a lot of money and time, 1st snapshot may take longer than the subsequence snapshot)

> Tips for snapshots

- Consistent Snapshots: stop the instance and take a snap (won't include temp files during operation)
- Encrypted Snapshots: if you take a snapshot of an encrypted EBS volume, it will be encrypted automatically.
- Sharing Snapshots: you can share, only in region which they were created. To share cross regions, you need to copy them to the destination region first.

> What to know about volumes

- Location: EBS volumes will always be in the same AZ as EC2.
- Resizing: Resize on the fly, no need to stop/restart the EC2 instance. But need to extend the filesystem in the OS, so the OS can see the resized volume.
- Volume type: you can switch the volume type on the fly(switch from gp2 to io2) without stop/restart the instance.

#### 4.1.4. EBS Encryption

- You can encrypt your volume with AES-256 algorithm
- Amazon EBS encryption uses AWS Key Management Service(KMS) when creating encrypted volumes and snapshots
- E2E encryption
- Encryption and decryption are handled transparently(you don't need to do anything)
- Has a minimal impact on latency

![image](https://gist.github.com/assets/31009750/0cd46371-87ab-41ad-bb6a-cba220120842)

![image](https://gist.github.com/assets/31009750/ff24a666-9da1-4102-9db8-5e08637eaaf0)

#### 4.1.5. EC2 Hibernation

- Hibernation saves the contents from the instance memory(RAM) to your Amazon EBS root volume. Then it persists the instance's EBS root volume.

So that when you start your instance out of hibernation:

- Amazon EBS root volume is restored to its previous state
- The RAM contents are loaded
- The processes that were previously running on the instance are resumed
- Previously attached data volumes are reattached and the instance retains its instance ID

![image](https://gist.github.com/assets/31009750/357ba1ee-0aa7-45e7-af3b-d122f1bb70ae)

Benefits:

- Instance boots much faster
- Useful for long running processes
- Useful for services that take time to initialize

![image](https://gist.github.com/assets/31009750/d77915e3-47b2-4f8b-96ba-25fff4000e82)

#### 4.1.6. EFS

> Amazon Elastic File System

![image](https://gist.github.com/assets/31009750/a7a2fa45-72be-476b-9764-08aa69c0d2ca)

- Manage NFS(Network File System) that can be mounted on many EC2 instances
- EFS works with EC2 instances in multiple Availability Zones
- Highly Available and scalable
- Expensive

> Usecases

- Content Management: Wordpress, Drupal.
- Web Servers: single folder structure for your website

> Overview

- Uses NFSv4 protocol
- Compatible with Linux-based AMI(not support Windows at this time)
- Encryption at rest using KMS
- File system scales automatically; no capacity planning required
- Pay per use

> Performance

- 1000 concurrent connections
- 10Gps Throughput
- Scale your storage to Petabytes
- Controlling Performance: General Purpose(CMS, Web Servers), Max I/O(big data, media processing)

> Storage Tiers + Lifecycle Management

- Standard
- Infrequently Accessed

> Use it when you need highly shared available file system

![image](https://gist.github.com/assets/31009750/14236f97-722b-4733-9143-d0431e0409a6)

#### 4.1.7. Fsx for Windows

- Fully Managed native Microsoft file sytem
- Designed for Windows
- Supports AD users, ACL, groups, DFs

#### 4.1.8. Amazon FSx for Lustre

![image](https://gist.github.com/assets/31009750/06717ac6-2885-4fa6-b8c7-51d9cfb2637f)

#### 4.1.9. Amazone Machine Image(AMI)

- Region
- Operating System
- Architecture(32bit for 64bit)
- Launch permissions
- Storage for the root device(root device volume)

All AMI are backed by

- Amazon EBS: AMI is an Amazon EBS volume created from an Amazon EBS Snapshot
- The root device for an instance launch is an instance store volume created from a template stored in Amazon S3 - can not be stopped

![image](https://gist.github.com/assets/31009750/3d9c23ab-2243-4b7c-97c0-265e9845e1fa)

#### 4.1.10. AWS Backup

- Consolidate your backups across multiple AWS services: EC2, EBS, EFS, Amazon Fsx for Lustre/Window File Server, and AWS Storage Gateway(includes S3,...)
- And also include other services. Eg: RDS or DynamoDB
- AWS Backup with Organizations: be able to back up multiple accounts in your organization

> Benefits

- Central Management
- Automation: schedule, retention policies, lifecycle policies
- Improve Compliance: encrypted, auditing more easy

![image](https://gist.github.com/assets/31009750/7af3b950-577a-43d5-98d8-95973bdb0688)

#### 4.1.11. Tips

![image](https://gist.github.com/assets/31009750/3dca9a74-7fb1-4154-a1e8-301e41fa6c6d)

1. [EC2 instances and EBS volumes must live in the same AZ. Reference Documentation: Amazon EBS Volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ebs-volumes.html)
2. [You can only create an un-encrypted volume from an encrypt volume by using rescue instance and connect to both of volumes and transfer data between them ](https://repost.aws/knowledge-center/create-unencrypted-volume-kms-key)
3. [EBS Snapshots are stored in S3](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSSnapshots.html)
4. You've been tasked with creating a file system for a Linux workload that should support concurrent access to the same file or directory from thousands of compute instances and handle massive datasets, up to hundreds of gigabytes per second. What AWS service would you use? [Amazon FSx for Lustre](https://aws.amazon.com/vi/fsx/lustre/)
5. You've been tasked with creating a highly performant database on your EC2 instance. Which type of EBS volume will support the high level of IOPS that you require? [Amazon EBS Provisioned IOPS Volume](https://aws.amazon.com/ebs/provisioned-iops/)
6. [Amazon Machine Images are Region specific. To use one in another Region, it needs to be explicitly copied there](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)
7. [EBS volumes are not encrypted by default](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html)
8. [What is the best way to ensure the security of both data-at-rest and data-in-transit between an instance and its attached EBS storage? Use Amazon EBS encryption](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/EBSEncryption.html)
9. [How do you add more storage to EFS? EFS automatically scales the volume size based on usage](https://aws.amazon.com/efs/)
10. [There are a number of prerequisites that must be met to allow for hibernation, including a specific set of supported EC2 instance types.](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/hibernating-prerequisites.html#hibernation-prereqs-supported-instance-families)
11. [What is the purpose of an Amazon Machine Image (AMI)? AMIs are templates for EC2 instances](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html)
12. [What type of storage does EFS offer? EFS is a file-level storage solution](https://aws.amazon.com/efs/when-to-choose-efs/)

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

- [x] Relational databases
- [x] RDS Advantages
- [x] OLTP and OLAP
- [x] Multi-AZ
- [x] Unplanned Failures and Maintenance

#### 5.1.1. Relational Databases

![image](https://gist.github.com/assets/31009750/74be99ea-6376-4c4a-8017-3796563c0ce6)

![image](https://gist.github.com/assets/31009750/625572c4-f594-4e7a-a049-49fc44263947)

**RDS Database Engines**

- MYSQL
- MariaDB
- PostgreSQL
- Amazon Aurora
- SQL Server
- Oracle

**Advantages**:

- Up and Running in Minutes
- Multi-AZ
- Failover capability
- Automated backups

**When would we use RDS?**

- RDS is generally used for OLTP(online transaction processing) workloads
- OLTP

**When not?**

- OLAP -> need to use a data warehouse - something like Redshift

**AWS Multi-AZ**

![image](https://gist.github.com/assets/31009750/19b0b194-4c33-4968-bd8a-f3a882f3b8c8)

- Exact copy of your production database in another AZ
- Handles replication for you : auto synchronize to standby database
- Support which RDS types: MYSQL, MariaDB, PostgreSQL, SQL Server, Oracle
- Aurora is support by default.

**Unplanned failure Event**

![image](https://gist.github.com/assets/31009750/7f451a8a-7ffa-4f1c-9c2f-5fba725c52a9)

![image](https://gist.github.com/assets/31009750/fe7673c4-4f32-4d53-9f50-30f56dc26a44)

![image](https://gist.github.com/assets/31009750/1d9fb209-d88d-4308-a9fc-0d7fb8d37a7a)

- Automatically Recover
- Is for disater recover not for performance
- Also AWS offers Multi-AZ deployment clusters - create 2 readable standby instances

### 5.2. DynamoDB

### 5.3. Redshift

## 6. Networking

### 6.1. VPC

### 6.2. Direct Connect

### 6.3. Route 53

### 6.4. API Gateway

### 6.5. AWS GLobal Accelerator
