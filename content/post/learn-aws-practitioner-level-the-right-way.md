---
title: "Learn Aws Practitioner Level the Right Way"
type: "post"
date: 2023-11-07T08:46:51+07:00
description: "The tutorial for self-learning AWS Practitioner Certificate. Includes latest practice exams for 2023 and 2024"
keywords: ["aws", "solution architecture", "aws solution architect associate"]
categories: ["systemdesign", "aws"]
tags: ["aws"]
image: "https://user-images.githubusercontent.com/31009750/280898567-03389303-d2a4-4ba2-9eed-6c5ad73e9ebd.png"
---

## Roadmap

1. [x] Introduction to AWS Services
2. [x] Cloud concepts
3. [x] Amazon EC2
4. [x] AWS Compute Services

### 1. Introduction to AWS Services

- What is cloud computing?
- Pay as you go model?
- The benefits of cloud computing?
- Introduction of AWS Services
- Practice Exams

#### 1.1. What is cloud computing?

> A solution to provide IT resources through internet

![image](https://user-images.githubusercontent.com/31009750/280898020-97048f8a-efcf-4ec9-b215-4558fcbfd083.png)

![image](https://user-images.githubusercontent.com/31009750/280900198-c0f46922-89c3-4707-8951-84fd41766381.png)
![image](https://user-images.githubusercontent.com/31009750/280900251-6ce0502c-af5d-4481-a26d-d2ba4718df31.png)
![image](https://user-images.githubusercontent.com/31009750/280900299-b6be6ac4-61b7-40c4-807d-01932c001aae.png)

#### 1.2. Summary

AWS Services:

- [x] Solution to provide IT resources through internet
- [x] Provide solutions for your business through internet: other aws services
- [x] The benefits of Cloud Computing(costs, time, speed and agility)
- [x] Deployment model: cloud-based, on-premises(private cloud), hybrid(cloud-based + on-premises)

Practition Level

![image](https://user-images.githubusercontent.com/31009750/281600158-1c70949b-e2cc-4cd5-ab00-e61fc90e337d.png)

## 2. Cloud concepts

### 2.1. Cloud Characteristics

![image](https://user-images.githubusercontent.com/31009750/281600500-9326f098-976d-49ed-828f-df8427d723d9.png)

### 2.2. Regions, Availability Zones, Edge Locations

#### Region and Availability Zone

![image](https://user-images.githubusercontent.com/31009750/281599345-df86c7fc-22f1-4db4-b188-468047671355.png)

**Region**

- Fully independent and isolated
- Resource and service specific

**Availability Zones(AZs)**

- Consist one or more physically seperated data centers
- Connected through low-latency links
- Fault tolerant
- Allows for high availability

#### Edge location

![image](https://user-images.githubusercontent.com/31009750/281599527-4d1ad9f7-5559-4880-a1f1-1baeae79c840.png)

### 2.3 Summary

![image](https://user-images.githubusercontent.com/31009750/281599258-c810912c-5a0c-444a-8713-8631f67b0408.png)

### 2.4. AWS Management

You can manage your AWS Service by:

- AWS Management Console ( Web Interface )
- AWS Command Line Interface (CLI)
- AWS SDKs : to access AWS services from popular programming languages

**Note:**

- The **root** user should only be used once and be protected with MFA

### 2.5. Questions and Answers

![image](https://user-images.githubusercontent.com/31009750/281605031-d92aa634-41a8-4921-834e-8515e44c2dc5.png)
![image](https://user-images.githubusercontent.com/31009750/281605132-df69090e-cf05-4d91-9a60-5c94d5dac0ba.png)
![image](https://user-images.githubusercontent.com/31009750/281605240-09b2b3be-0413-4158-9628-ffb5a6e86965.png)
![image](https://user-images.githubusercontent.com/31009750/281605295-254884b1-0668-4381-8e16-6dc50b879e4a.png)
![image](https://user-images.githubusercontent.com/31009750/281605334-62a8e7d8-d1f6-4e02-8ba7-9bf7b4e2bcf6.png)
![image](https://user-images.githubusercontent.com/31009750/281605393-4f4ce547-fba2-428e-b51a-451316eb6469.png)
![image](https://user-images.githubusercontent.com/31009750/281605493-5153e937-eb03-40f0-807b-47274d4dd5c7.png)
![image](https://user-images.githubusercontent.com/31009750/281605606-f78213a0-fd4e-4a62-bd11-43d7f29b5661.png)
![image](https://user-images.githubusercontent.com/31009750/281605802-66f06d3f-5cc4-4d37-adad-300234365a27.png)

## 3. Amazon EC2

### 3.1. Amazon EC2 Instances

There are 5 types of EC2 Instances

- General purpose: balanced resources(CPU, Memory, Networking, Storage)
- Compute Optimized: optimized for CPU - WebServer/Game Server
- Memory Optimized: optimized for memory - Database
- Accelerated Computing: use accelerate hardwares, eg: GPU - graphic applications/ streaming
- Storage optimized: optimize for high frequency online transaction processing(FOTP) and high input output operations per seconds(IOPS) - Data warehouse/Distributed File System

![image](https://user-images.githubusercontent.com/31009750/282697434-f1bd2693-3d5b-4c1a-b775-38ebd24e9801.png)

![image](https://user-images.githubusercontent.com/31009750/282697486-d1dd9655-ef15-4ce5-8339-1181eee96003.png)

### 3.2. Amazon EC2 Pricing

![image](https://user-images.githubusercontent.com/31009750/282703121-95ab1a3b-ab4d-48f6-aa2e-71292f698624.png)

## 4. AWS Compute Services

### 4.1 AWS Compute Options

There are 3 type of compute options

- **Compute**: Amazon EC2
- **Container**: EKS(Amazon Elastic Kubernetes Service), ECS(Amazon Elastic Container Service)
- **Serverless**: AWS Lambda

### 4.1.1. Amazon EC2

You should use when you have:

- compute-intensive or memory-intensive applications
- application that run more than 15 mins

#### 4.1.2. Container

You should use when you have:

- compute-intensive workloads
- a small application that runs under in 15 minutes but is compute intensive

#### 4.1.3. Serverless

You should use when:

- want to focus only on your code and not on infrastructure
- applications less compute intensive
- applications that you are running or building small, simple, or modular
- using multiple AWS services where one service might need to call another service
- applications that don't run longer than 15 minutes.

![image](https://user-images.githubusercontent.com/31009750/282710135-113ac6f2-986d-4b8f-b9ea-b8c8b8e52cec.png)

![image](https://user-images.githubusercontent.com/31009750/282706426-a907f6af-de7a-44b4-a78e-67b33fb9ded8.png)

## References

- [AWS Practitioner Course](https://explore.skillbuilder.aws/learn/course/134/play/93606/aws-cloud-practitioner-essentials)
