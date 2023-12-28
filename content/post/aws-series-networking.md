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

- 10.0.0.0: Network address
- 10.0.0.1: Reserved by AWS for the VPC router
- 10.0.0.2: Reserved by AWS for DNS Purpose
- 10.0.0.3: Reserved by AWS for future use.
- 10.0.0.255: Network broadcast address

**NAT Gateway**

![image](https://gist.github.com/assets/31009750/76c11b9c-2df3-4f13-82c2-26f40b5b1cdc)

- Redundant inside the AZ
- Starts at 5Gbps and scales currently to 45Gbps
- No need to patch
- Not associated with Security Groups
- Automatically assigned a public IP address

**Protect your resources with Security Group**

- Last line of defend
- Virtual Firewall on AWS
- By default everything is block
- **Stateful**

> If you send a request from your instance, the response traffic for that request is allowed to flow in regardless of inbound security group rules

> Responses to allowed inbound traffic are allowed to flow out, regardless of outbound group.

For instance:

- If you have an allow inbound rule for port 80, and you set a deny for outbound rule for port 80(the deny rule won't work)

**Network ACL**

- The first line of defense
- ACL: access control list
- Act as a firewall for controlling traffic in and out of one or more subnets
- Default Network ACLs: VPC automatically comes with a default network ACL, by default it allows all outbound and inbound traffic
- You can create custom Network ACL. By default custom network ACL denies all inbound and outbound traffic
- Subnet Associations: each subnet must be associated with a network ACL. If you don't explicitly associate a subnet with a network ACL, it will be automatically associated with a default network ACL.
- **Block IP Addresses**: Block IP addresses using **network ACLs**, not security groups
- Network ACL is stateless, you have to define your inbound and outbound rules
- Network ACL evaluate the rules in order, **starting with the lowest numbered rule**, when deciding whether allow or deny traffic. If the traffic **matches a rule**, the rule is **applied** and we **do not evaluate any additional rules**.

**VPC Endpoints**

- Are virtual devices
- Not impose availability risk or bandwith constraints when your VPC communicate with AWS Services.
- Enable you privately connect your **VPC** to **supported AWS Services** powered by private link without requiring an Internet Gateway/NAT/VPC Connection/AWS Direct Connect
- Traffic between your VPC and other service does not leave the Amazon Network

### 6.2. Direct Connect

### 6.3. Route 53

### 6.4. API Gateway

### 6.5. AWS GLobal Accelerator
