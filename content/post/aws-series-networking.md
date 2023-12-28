---
title: "Aws Series Networking"
type: "post"
date: 2023-12-28T10:22:54+07:00
description: "In this topic you will learn about VPC, Network, Subnet, Internet Gateway,..."
keywords: ["aws", "solution architecture", "aws solution architect associate"]
categories: ["systemdesign", "aws"]
tags: ["aws"]
image: "https://gist.github.com/assets/31009750/2fcb9c85-9d55-443e-8301-93d716ab7524"
---

## 6. Networking

### 6.1. VPC

![image](https://gist.github.com/assets/31009750/dbaacce5-bb1d-4bf7-b14a-70467cd64c19)

![image](https://gist.github.com/assets/31009750/b228fd97-9a64-480e-ad7a-2a6c4a8704a0)

- Virtual Private Cloud
- Fully customized your network
- Create a **hardward Virtual Private Network(VPN)** connection between your data center and your AWS VPC.
- Logical data center in AWS
- Consists of: internet gateway, route tables, network access control lists, subnets, security groups
- 1 subnet is always in 1 Availability Zone (subnet can't span into multiple AZs)
- Amazon IPV4 CIDR block size must be between **/16 - /24**

**What can we do with VPC**

- Launch instances into a subnet of your choosing
- Custom IP Addresses: Assign IP Addresses Range for each subnet
- Route tables: config route tables between subnets
- Internet Gateway: create internet gateway and attach it to our VPC
- Access Control Lists: subnet network access control lists(NACLs)

> Tips: you can use Network Access Control Lists(NACLs) to block specific IP Addresses

**There 2 kinds of VPC**

- **Default VPC**: user friendly, all subnets in default VPC have a route to the internet, each ec2 instance has both a public and private IP address.
- **Custom VPC**: fully customizable, takes time to set up.

**Network Diagram**

![image](https://gist.github.com/assets/31009750/7349a654-65d3-47fd-91a3-c3e678ce5cb8)

**In a subnet with CIDR Block 10.0.0.0/24**, the first 4 IP addresses and the last IP address in each subnet block are not available for you to use. Because they are reserved:

10.0.0.0: Network address
10.0.0.1: Reserved by AWS for the VPC router
10.0.0.2: Reserved by AWS for DNS Purpose
10.0.0.3: Reserved by AWS for future use.
10.0.0.255: Network broadcast address

### 6.2. Direct Connect

### 6.3. Route 53

### 6.4. API Gateway

### 6.5. AWS GLobal Accelerator
