---
title: "Aws Series Security"
type: "post"
date: 2024-01-03T10:12:10+07:00
description: "In this topic you will learn how to protect your infrastructure on AWS"
keywords: ["aws", "solution architecture", "aws solution architect associate"]
categories: ["systemdesign", "aws"]
tags: ["aws"]
image: "https://gist.github.com/assets/31009750/8e399333-fb60-4510-b61d-f0d253d560e7"
---

## DDos Attack

### SYN Floods Attack

> SYN Flood use TCP 3-Way Handshake to attack the servers

> Some concepts

- SYN(Synchronize Sequence Number)
- ACK(Acknowledgement)

[TCP 3-Way Handshake Process](https://www.geeksforgeeks.org/tcp-3-way-handshake-process/)

![image](https://gist.github.com/assets/31009750/8503776e-e14b-43e1-b53c-b87949dfb45a)
![image](https://gist.github.com/assets/31009750/8b3ec0c5-b515-4c44-8bb6-799d2e759b16)

> How SYN floods attack work?

- Uses the built-in patience of the TCP stacks to overwhelm a server by sending a large number of SYN packets and then ignoring the SYN-ACKs returned by the server. This causes the server to use up resources waiting for a set of amount time for the anticipated ACK that should come from a legitimate client.
- There are so many concurrent TCP connections that a web or application server can have open, so if an attacker sends enough SYN packets to a server, it can easily eat through the allowed number of TCP connections.

### Amplification Attack

- Amplicafication/Reflection attacks can include things such as NTP, SSDP, DNS, Chargen, SNMP attacks,...
- This is where an attacker may send a third-party server(such as an NTP server) a request using a spoofed IP address. Then the server will response to that request with a greater payload than the initial request(28-54 times larger than the request) to the spoofed IP address.
- Attackers can cordinate this use multiple NTP servers a second to send legitimate NTP traffic to the target

![image](https://gist.github.com/assets/31009750/67fc1dcc-ae49-4ef8-ad14-3c3e3fb559bf)

- [Example About Amplication Attack](https://www.cloudflare.com/learning/ddos/ntp-amplification-ddos-attack/)

### Layer 7 Attack

- A typically layer 7 attack occurs when a web server receives flood of GET or POST requests, usually from a botnet or a large number of compromised computer.

![image](https://gist.github.com/assets/31009750/77f21b0b-caec-4587-9b6c-7a9c0a4013d1)

## CloudTrail

You can identity which users and accounts called AWS, the source IP address from which the calls were made, and when the calls occurred. Basically, it logs all your API calls and store in S3.

![image](https://gist.github.com/assets/31009750/2d334e9b-0a34-458b-93c3-034c445aa850)

## AWS Shield

- Free DDos Protection
- Protect all customers on ELB, CloudFront, Route53
- Protect againts SYN/UDP floods, reflection attacks, and other Layer3/Layer4 attacks

### AWS Shiled Advanced

- Always on, flow-based monitoring
- 24/7 access to DDos response Team(DRT) to help and mitigate application-layer
- Protect your AWS bill against higher fees due to ELB, CloudFront, Route53 usage spikes during a DDos attack
- Costs 3,000 USD per month.

![image](https://gist.github.com/assets/31009750/48e719e9-d9dc-4ad3-96ac-1cb50cc19b5c)

> Shield Protection against Layer3/Layer4 attacks

## Filtering Traffic with WAF

> WAF: web application firewall to monitor: http/https requests that are forward to Amazon CloudFront or an Application Load Balancer. It also let you control access to your content.

- You can configure: ip addresses, query string parameters to be allowed
- It will return error 403 if the requests are not allowed
- Operate at Layer 7

WAFs allow you:

- Allow/Block all requests except the ones you specify
- Count the requests that match properties you specify

Conditions:

- Ip addressess,
- Country
- Values in headers
- Presense of SQL code(SQL Injection)
- Presense of scripts(Cross Site Scripting)
- Strings that appear in requests(specific strings/regex)

## Guard your network with GuardDuty

- Threat Detection service that uses machine learning to continous monitor malicious behavior from: unusual API calls, calls from malicious ip, attempt to disable CloudTrail logging, unauthorized deployments
- Alerts appear in GuardDuty console and CloudWatch Events
- Receives feeds from third party Proofpoint, as well as AWS Security about known malicious domain or IP addresses, etc
- Monitor CloudTrail logs, VPC Flow logs, DNS logs
- Machine learning and anomaly detection
- 7days-14days to set baseline, once active you will find GuardDuty console, and in CloudWatch Events

## AWS Firewall Manager

- Security management service in a single pane of glass. Allow you to centrally set up and manage firewall rules across multiple AWS accounts and applications in AWS Organizations
- You can create WAF rules for your ALB, API Gateways, Amazon CloudFront, or Shield Protection for your ALB, Elastic IPs

## Monitoring S3 Buckets wih Macie

### Personal Identifiable Information

- Personal Data used to establish an individual's identity
- This data could be exploited by criminals, used in identity theft and financial fraud
- Home address, email address, Social Security Number
- Passport number, driver license number

> Macie uses machine learning and pattern matching to discover sensitive data in S3

- Alerts you about unencrypted buckets
- Alerts you about public buckets
- Alerts you about buckets shared with AWS accounts outside of those defined in your AWS Organizations.
- Great for frameworks like HIPAA and GDPR
- It looks for PI, PII and financial data

### Security Operating system using Amazon Inspector

- Used to perform vulnerability scans on both EC2 instances and VPCs: host assessments and network assessments.

## Manage Encryption Keys with KMS and CloudHSM

### KMS

- KMS: key management service to create and control encryption key to encrypt your data. Integrated with EBS, S3, RDS.
- Centralized control
- Shared tenancy
- Automatic key rotation
- Automatic key generation

### CMK

- A customer master key(CMK) is a logical presentation or master key. Includes: metadata, description, key state.
- To start using KMS you start with request of creating a CMK.

### HSM

- A hardware security module is a physical computing device that safeguards and manage digital keys, perform encryption/decryption functions.
- A HSM contains one or more secure cryptoprocessor chips.
- Dedicated HSM
- Full control of users, groups, keys
- No automatic key rotation

## Storing Your Secrets in Secret Mananger

> A service that securely stores, encrypts, rotate your database credentials and other secrets

- Encryption in transit and at-rest using KMS
- Automatically rotates credentials
- Apply fine-grained access control using IAM policies
- Costs money but is highly scalable
- Your appplication makes an API call to Secrets Manager to receive the secret programmatically

> What can be stored:

- RDS credentials
- Credentials for non-RDS databases
- Any other types of secrets: ssh keys, API keys

> If you enable rotation, SM immediately rotates the secret once to test the configuration

## Storing your secrets in Parameter Store

- AWS Systems Manager to store configuration data: passwords, database strings, AMI IDs, license. Your values can be stored as plain text or encrypted data
- Parameter is free
- Limit number of params: 10,000
- No Key Rotation

## Temporately shared S3 object with presigned URLs

- When you wanna share private files in your S3 buckets, thinks about presigned URLs

## IAM Policy Documents

### Amazon Resource Names(ARNs)

- Uniquely Identify a resource in Amazon

![image](https://gist.github.com/assets/31009750/c0273391-6c5c-493e-a5fd-d90665e4ebca)

- IAM : global, so there is no region
- S3 : global namespace, so there is no region

### IAM Policy

- JSON document defines policies
- Identity policy
- Resource policy
- No effect until attached

### Policy Document

- A list of statements

![image](https://gist.github.com/assets/31009750/210dfab7-b6f2-422d-8e50-d903142f75e7)

![image](https://gist.github.com/assets/31009750/a9caf348-ca38-4735-b5fb-c6bf9aa829c6)

- Not explicit allowed <==> Implicitly defined
- Explicit Deny > everything
- Only attached policies have effect
- AWS joins all applicable policies

### Permission Boundaries

![image](https://gist.github.com/assets/31009750/4407a4e5-bb2e-4039-bd08-70b686ffa479)

## AWS Certificate Mananger

- Allow to create,manage,deploy public or private SSL certificates
- Free SSL
- Automated Renewals and Deployment
- Easier to setup
- Supported services: ELB, CloudFront, API Gateway

## Audit Manager

- Continually audit your AWS usage to make sure you stay compliant with industry standards: PCI compliance, GDPR, ...
- Compliance with HIPAA, GDPR, continous auditing and automate auditing reports

## Downloading Compliance Documents from AWS Artifact

- Single source to get compliance-related information: compliance reports: HIPAA, GDPR, ...

## Authentication Access with Cognito

- Provide authentication, authorization, and user management for web and mobile apps in a single service without the need for custom code. It supports user login via SNS accounts(social network service account: google, facebook, apple)

There main two components of Cognito:

- User pools: directories of users that provide sign-up/sign-in options for your application users.
- Identity pools: allow you to give your users access to other AWS services

![image](https://gist.github.com/assets/31009750/0bc74ab6-0f64-4762-b160-cb4a5996c77f)

![image](https://gist.github.com/assets/31009750/745e20d8-9f12-425c-b6b7-2dc11e5d8342)

## AWS Network Firewall

- Physical firewall protected your VPCs
- Works with AWS Firewall Manager
- Filter Internet traffic with ACL
- Filter Outbound traffic: url/domain name, ipaddress
- Layer 4 Firewall

## Other services

### Amazon Detective

- Triage Security Findings: resources, ip addresses, aws accounts
- Threat Hunting
- Analyze root course of event across multiple AWS services.

### Security Hub

- Single place to view all your security alerts service: GuardDuty(Threat Detection service AI), Amazon Inspector(automate security assessments), Amazon Detective(Root cause detective) and AWS Firewall Manager across multiple AWS security services and accounts
