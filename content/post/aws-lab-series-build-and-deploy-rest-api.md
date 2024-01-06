---
title: "Aws Lab Series Build and Deploy Rest Api"
type: "post"
date: 2024-01-06T08:56:51+07:00
keywords: ["aws"]
description: "In this topic you will learn how to build and deploy your rest api"
categories: ["systemdesign", "aws-labs"]
tags: ["aws"]
image: "https://gist.github.com/assets/31009750/f0790373-09b7-4a65-8742-a5a08884fa80"
---

First of all we have figure out our requirements and materials that we have.

## Overview of requirements

### Overview of the API Service

- Our Rest API service is written in NodeJS
- Use Relational Database
- There is a job queue inside the service
- The service store image on disk
- User can upload images via this service
- User data must be encrypted

### What system needs

1. We have a domain on godaddy and plan to use: api.domainame for api services, appname.domainname for application
2. Both app and api must have ssl connection

## Analyze requirements and design system for long-term usage

Things to cocerns:

1. Networking

**External**

- Route 53 for DNS
- S3 for file storage
- Prevent DDos Attack: AWS Shield for S3, AWS WAF for Layer 7
- Guard network with GuardDuty

Let's getting started

### Making Route 53 the DNS service for a domain that's in use

Reference Link : https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/migrate-dns-domain-in-use.html

1. Create Hosted Zone

![image](https://user-images.githubusercontent.com/31009750/294641000-23cf5ebb-3369-46bc-82e8-98e7dfed4e37.png)
![image](https://user-images.githubusercontent.com/31009750/294641019-144dee0b-9f34-46ec-9c67-c4c59687e5bf.png)
![image](https://user-images.githubusercontent.com/31009750/294641097-930bc731-3d55-4d04-a896-5a72380f78c1.png)
![image](https://user-images.githubusercontent.com/31009750/294641091-9fed873c-4a08-4148-8707-5b0ac1566e1f.png)

2. Update the NS records to use Route 53 name servers

Current NS records on my domain( godaddy )

![image](https://user-images.githubusercontent.com/31009750/294641289-4cb51586-903a-4d9d-b9a3-60341d5cad42.png)

After change your NS records by using 4 ns records in your hosted zone in AWS Route53, please wait a few minutes and recheck your domain ns records with nslookup command

```sh
nslookup -q=ns jsguru.net
```

### Create your services in AWS

**Create a test api with Amazon API Gateway**

- [x] Create your API Endpoint
- [x] Request AWS Certificate for your custom domain
- [x] Create custom domain and map with API Endpoint
- [x] Test your api with mapped domain
- [x] Create new routes for example resources
- [x] Create simple lambda function to handle

**Create your RDS database service in a private VPC and connect with your database**

- [x] Create your private VPC
- [x] Create your RDS Security Group
- [x] Create your RDS in your Database
- [x] Create VPC Endpoint for your RDS Service

### Details

#### 1. Create a test api with Amazon API Gateway

![image](https://user-images.githubusercontent.com/31009750/294641984-24e7ce20-7b11-47a4-857d-cec6e26a4963.png)

Create methods for root path

![image](https://user-images.githubusercontent.com/31009750/294642102-89351fa4-d1e0-4969-8174-a40c18ff9a31.png)

![image](https://user-images.githubusercontent.com/31009750/294642121-bedede47-1617-4451-88b2-b54f9f2f604e.png)

Create mock response template body for GET method

```json
{
 "status: "success",
 "data": {
  "examples": [
    {"id": 1, "title": "Example 1"},
    {"id": 2, "title": "Example 2"},
    {"id": 3, "title": "Example 3"},
    {"id": 4, "title": "Example 4"},
    {"id": 5, "title": "Example 5"},
    {"id": 6, "title": "Example 6"},
    {"id": 7, "title": "Example 7"},
    {"id": 8, "title": "Example 8"},
    {"id": 9, "title": "Example 9"},
    {"id": 10, "title": "Example 10"}
  ],
   "pagination": {
     "pageNumber": 1,
     "pageSize": 10,
     "totalItems": 100
   }
 }
}
```

Then deploy your API

![image](https://user-images.githubusercontent.com/31009750/294642386-d35952f0-d2a7-49b5-8abc-d078649ea808.png)

![image](https://user-images.githubusercontent.com/31009750/294642424-47b0be62-c16b-4033-bd31-479c7b23eb38.png)

Let's create production stage to map your api version

![image](https://user-images.githubusercontent.com/31009750/294642907-e0b6f52d-b017-428a-bf2f-9ea720e034fc.png)

After creation, you can use invoke URL to test your api

![image](https://user-images.githubusercontent.com/31009750/294643006-42ef89b9-65c4-481d-b540-6560f82bc56c.png)

Create custom domain name for your API Endpoint

![image](https://user-images.githubusercontent.com/31009750/294644818-6489ceac-3039-4102-9bc8-59b86acf98e2.png)

Request AWS CA via [AWS Certificate Manger](https://ap-southeast-1.console.aws.amazon.com/acm/home?region=ap-southeast-1#/certificates/request) ( it's completely free )

![image](https://user-images.githubusercontent.com/31009750/294645239-38365924-9755-44d0-8f5e-ae675620ad32.png)

![image](https://user-images.githubusercontent.com/31009750/294645533-8390dfd1-e436-4d72-8851-5023f11e3ca1.png)

Add API Mapping

![image](https://user-images.githubusercontent.com/31009750/294645834-fe4bb370-ddd5-4c24-9352-816919eef64e.png)

Add Route53 Alias record point to your API Gateway Endpoint

- https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-to-api-gateway.html

![image](https://user-images.githubusercontent.com/31009750/294645535-a58b2af0-8f22-4ff7-9d6b-afc29429ef9a.png)
