---
title: "Aws Series Elb"
type: "post"
date: 2023-12-29T17:03:17+07:00
description: "In this topic you will learn how to use AWS ELB"
keywords: ["aws", "solution architecture", "aws solution architect associate"]
categories: ["systemdesign", "aws"]
tags: ["aws"]
image: "https://gist.github.com/assets/31009750/80784dbb-3619-4751-aaa9-100b0a0ec8d1"
---

**Elastic Load Balancing**

- Automatically distributes incoming application traffic across multiple targets, such as Amazon EC Instances.

**4 Diffrent Types of Load Balancers**

- Application Load Balancer: http/https traffic, operate at layer 7 (Intelligence)
- Network Load Balancer: operating at connection level (layer 4) on OSI Model (Performance)
- Gateway Load Balancers: operating at network level (layer 3 on OSI Model) (inline Virtual Appliance Load Balancing)
- Classic Load Balancers: http/https traffic, use layer 7 specific feature X-Forwarded, sticky session, classic/dev/test

> Load Balancer routes request only to the healthy instances

![image](https://gist.github.com/assets/31009750/1b8b9cc7-21f2-4a62-b581-3aff3bcc7ab1)

![image](https://gist.github.com/assets/31009750/bf6f8ab6-dc20-4d7f-89ae-84f116e73dee)

### Application Load Balancers

![image](https://gist.github.com/assets/31009750/aa496c30-0865-4a99-9454-d3f4d2fbd925)

- Limitation of Application Load Balancers: only support http/https
- You must deploy at least one ssl/tls certificate on your load balancer

- Listeners: checks for connection request from clients, using the protocol and port you configure
- Rules: determine how the load balancer routes requests to its registered targets. Each rule consists of a priority , one or more actions/conditions
- Target Groups: each target group routes requests to one or more registered targets, such us EC2 instances, using protocol and port number you specify

### Network Load Balancers

- Functions at the 4th layer of OIS model. It can handle millions of requests/second, maintain ultra-low latency, for extreme performance.
- Receives a connection request -> attempt to open a TCP connection to the selected target on the port specified in the listener configuration
- The listener then forwards the request to the target group. There no rules unlike application load balancers.
- Target Groups: each target group routes requests to one or more registered targets, such us EC2 instances, using protocol and port number you specify

Protocols: TCP, TLS, UDP, TCP_UDP
Ports: 1-65535

- Encryption: You can use TSL listener to offload the work of encryption/decryption to your load balancer so your app can focus on business logic
- If listener protocol is TLS, you must deploy exactly one SSL server certificate on the listener

### Classic Load Balancer

- Layer 4/7
- Legacy load balancer
- Use X-Forwarded-For to see the original IP Address of the client
- If you application stops, you will see 504 Error

### Sticky Session

- Classic Load Balancers route each request independently to registered EC2 instance with the smallest load
- Sticky sessions allow you to bind a user's session to a specific EC2 instance -> ensure all requests from the user during session are sent to the same instance.
- But you will have scaling issue, if don't disable sticky session
- Also you can use for Application Load Balancer, but it will go to the target group.

### Deregistration Delay

- Allows LBs to keep existing connections open if the EC2 instances are de-registered or become unhealthy
- The time to way for in-flight request(inprogress request) to complete while de-registering a target. During this time the state of target is draining

# What's happened when all targets are unhealthy?

When the NLB has only unhealthy registered targets, the Network Load Balancer routes requests to all the registered targets, known as fail-open mode
