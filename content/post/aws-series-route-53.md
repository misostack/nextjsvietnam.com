---
title: "Aws Series Route 53"
type: "post"
date: 2023-12-29T10:30:59+07:00
description: "This topic will give you a broad overview about Amazon Route 53 and routing algorithm"
keywords: ["aws", "solution architecture", "aws solution architect associate"]
categories: ["systemdesign", "aws"]
tags: ["aws"]
image: "https://gist.github.com/assets/31009750/76a01b41-89b2-4703-a0be-84a020d1e070"
---

> Route 53 is Amazon's DNS service. It allows you to register domain names, create hosted zones, and manage and create DNS records

DNS operates on port 53 -> so that's why it is called Route 53

> SOA(Start of Authority) Record:

```sh
nslookup -q=soa jsbase.dev

# Then
Non-authoritative answer:
jsbase.dev
        origin = izabella.ns.cloudflare.com
        mail addr = dns.cloudflare.com
        serial = 2324118412
        refresh = 10000
        retry = 2400
        expire = 604800
        minimum = 1800
```

> NS(Name Server) Record: include IP of DNS Server and information about that domain

```sh
nslookup -q=ns jsbase.dev
# then
Server:         fe80::1%15
Address:        fe80::1%15#53

Non-authoritative answer:
jsbase.dev      nameserver = izabella.ns.cloudflare.com.
jsbase.dev      nameserver = yisroel.ns.cloudflare.com.
```

> A Record: a record is used by a computer to translate the name of domain to an IP Address

```sh
nslookup -q=a jsbase.dev
Server:         fe80::1%15
Address:        fe80::1%15#53

Non-authoritative answer:
Name:   jsbase.dev
Address: 172.67.152.64
Name:   jsbase.dev
Address: 104.21.1.132
```

> CNAME : canonical name can be used to resolve one domain name to another.

Eg: mobile.jsbase.dev -> m.jsbase.dev

> Alias Record : used to map resource record sets in your hosted zone to load balancers, CloudFront Distribution, or S3 buckets that are configured as a website

Eg: you can map one DNS name www.jsbase.dev -> to the target DNS name elb1234.elb.amazonaws.com

## Routing Policies Available with Route 53

### 1. Simple Routing

![image](https://gist.github.com/assets/31009750/27b1e958-02c0-408b-bea9-502c40ec7451)

- One record with multiple IP addresses.
- If you specify multiple values in a record, Route 53 returns all values to the user in a random order.

### 2. Weighted Routing

- Allow you to split your traffic based on diffirent weights assigned.

Eg: you can set 10% of your traffic to go to us-east-1 and 90% to go to eu-west-1

**Health Checks**

- You can set health check on individual record sets.
- If a record set fails a health check, it will be removed from Route 53 until it passes the health check.
- You can set SNS Notification to alert you about failed health checks.

### 3. Failover Routing

- Are used when you wanna create a active/passive setup
- Route 53 will monitor the health of your primary site using a health check

![image](https://gist.github.com/assets/31009750/741f82d7-ae1b-4fa7-a67e-d8bf196d3bc2)

### 4. Geolocation Routing

- Lets you choose where your traffic will be sent based on the geographic location of your users(the location from which DNS queries originate)

**Usecases:**

- You want all queries from Europe will be routed to a fleet of EC2 instances that are specifically configured for your European customers.
- Localization: these servers may have local language of European customers and display all prices in euro.

### 5. Geoproximity Routing(Traffic Flow Only)

You can use Route 53 traffic flow to build a routing system that uses a combination of:

- geographic location
- latency
- and availability to route traffic

from your users to your cloud or on-premises endpoint.

You can build your traffic routing policies from scratch or pick a template from a library and then customize it.

Geoproximy Routing(Traffic Flow Only)

- Lets Amazon Route 53 route traffic to your resources based on the geographic location of your users and your resources.
- You can also optionally choose to route more traffic/less to a given resource( know as bias )
- A bias expands or shrinks the size of geographic region from which traffic is routed to a resource

### 6. Latency Based Routing

- Allows you to route your traffic based on the lowest network latency for your end user(which region give them the fastest response time)

### 7. Multivalue Answer Routing

![image](https://gist.github.com/assets/31009750/26ad17d8-1214-44af-8f97-d07e71ea1a63)

- Let you configure Amazon Route 53 to return multiple values, such as IP addresses for your web servers, in response to DNS queries, similar to simple routing
- But multivalue answer routing also lets you check the health of each resource, so Route 53 returns only values for healthy resources
