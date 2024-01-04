---
title: "Aws Series Governance"
type: "post"
date: 2024-01-03T23:05:24+07:00
description: "In this topic you will learn how to use AWS Organization"
keywords: ["aws", "solution architecture", "aws solution architect associate"]
categories: ["systemdesign", "aws"]
tags: ["aws"]
image: "/common/no-image.png"
---

## Account Types

- Management Account is the primary account that hosts and manage organization (payer account)
- Member Account is all AWS accounts that belong to the organization

## Features

- Consolidated Billing
- Usage Discounts
- Shared Savings

## Main concepts

- Multi Account
- Tag Enforcement
- Organization Unit(ou): group of accounts
- Service Controler Policies(SCP): JSON policies that get applied to OUs or accounts to restrict actions that are or are not allowed
- Management Account: SCP do affect the management account like they do all member accounts.
- Account Best Practices: create a centralized logging account for organization CloudTrail logs. Also, levelrage cross-account roles for accessing member accounts.

![image](https://gist.github.com/assets/31009750/c53f9497-0b96-4d81-bc3c-ff7b0e21ce37)

**Example of SCP**

![image](https://gist.github.com/assets/31009750/a0ccc820-1cd7-4040-83b0-c33d3ae34d01)

## Sharing resources using AWS RAM

> AWS RAM(Resource Access Manager)

- A Free service that allows you to share resources with other accounts inside or outside your organization. It is actually shared not duplicating

> What could be shared?

- Transit gateways
- VPC subnets
- License Manager
- Route 53 Resolver(Rules and Endpoints)
- Dedicated Hosts
- ...

> Ownership and Participants

- Ownership: create and manage VPC resources that get shared. Can not delete or modify resourced deployed by participant accounts.
- Participants: able to provision services in the shared VPC subnets. Can not modify or delete the shared resources.

## Setting up cross account role access

> Cross-account role access gives you the ability to setup temporately credentials that can be revoked as needed

![image](https://gist.github.com/assets/31009750/dee02994-6901-4759-8efa-13383a4b9ba5)
![image](https://gist.github.com/assets/31009750/28c9eb37-f43c-4444-aecf-8c34a32b32cf)
![image](https://gist.github.com/assets/31009750/4508d18a-f7d0-47c4-a101-3bb28a1d9190)
![image](https://gist.github.com/assets/31009750/50f8b8c7-6296-4be7-8290-e4bcbc33aeac)
![image](https://gist.github.com/assets/31009750/406c79bd-c32d-4e6a-a9db-8882b0e4366f)

## AWS config

- An inventory management and control tool
- Allow to show configuration history
- Ability to create rules to make sure resources conform to your requirements
- Capable of receiving alerts via SNS
- Configured per Region
- Results can be aggregated across regions and AWS accounts

![image](https://gist.github.com/assets/31009750/1e9f9e04-f320-4bf9-bfec-e44046b1a06a)

![image](https://gist.github.com/assets/31009750/9ec989ee-47d8-4fb1-859d-4f39844f56c3)

![image](https://gist.github.com/assets/31009750/73345dad-9d46-44d6-8a61-8824512aa81a)

Examples

![image](https://gist.github.com/assets/31009750/97ce2750-3366-4418-88d6-8612f79fd084)

## AWS Directory Service

- A fully managed version of Active Directory

![image](https://gist.github.com/assets/31009750/8454b091-4766-496e-8de1-373a3929ba43)

There 2 types:

- Managed Microsoft AD
- AD Connector

## AWS Cost Explorer

![image](https://gist.github.com/assets/31009750/e0f99f2f-a60b-4944-90b0-d0335a9dc11f)

## AWS Budgets

- The best way to let users know they are getting close to overspending

![image](https://gist.github.com/assets/31009750/ce32dcc2-8048-4681-b809-5feafdd74d64)

## Optimize AWS CUR

> Cost and Usage Report

![image](https://gist.github.com/assets/31009750/bcf51104-1b18-4253-a17f-fe2b6615af29)

## AWS Trusted Advisor

![image](https://gist.github.com/assets/31009750/4789f89f-a6f2-493c-a648-0da9fc238bdb)

## AWS Control Tower and GuardRails

- Automated multi-account governance, guardrails, account orchestration

![image](https://gist.github.com/assets/31009750/7f169cda-e705-4585-971a-94b961db3387)

## Manage software license in AWS using AWS License Manager

![image](https://gist.github.com/assets/31009750/f7e76ff0-2ac1-4e9e-8764-ec626c48273d)

## AWS Health and Personal Health Dashboard

![image](https://gist.github.com/assets/31009750/ac5d293a-ab83-48d0-9a7a-75d195bd5420)

## AWS Service Catalog and AWS Proton

### Catalog

![image](https://gist.github.com/assets/31009750/ddf05823-f889-4614-bb20-6079b4ad4a64)

### AWS Proton

![image](https://gist.github.com/assets/31009750/5fb94f79-f00a-4d6d-97d1-f679f94ebb8e)

## AWS Well Architected Framework

![image](https://gist.github.com/assets/31009750/de394b33-e5c1-425f-bcdb-54b42edb04a2)
