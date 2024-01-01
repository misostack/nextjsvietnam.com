---
title: "Aws Series Big Data"
type: "post"
date: 2023-12-31T19:06:05+07:00
description: "In this topic you will learn how to use Redshift, Kinesis, ..."
keywords: ["aws", "solution architecture", "aws solution architect associate"]
categories: ["systemdesign", "aws"]
tags: ["aws"]
image: "https://gist.github.com/assets/31009750/8ff95173-79c5-41b9-977a-93a641c614f7"
---

## The 3Vs of Big Data

> Volume

- Ranges from terabytes to petabytes of data

> Variety

- Includes data from a wide range of sources and formats

> Velocity

- Data needs to be collected, stored, processed, and analyzed within a short period of time

## Amazon Redshift

- Fully managed, petabyte-scale data warehouse service in cloud
- It's a very large relational database traditional used in big data applications.

Fun fact: reserved its name due to desire to have people leave Oracle databases and leverage this AWS service instead!

### Oview and Uses

- Size: incredibly big - it can hold up to 16 PB of data. You don't have to split up your large datasets.
- Relational: This database is relational. You use your standard SQL and business intelligence(BI) tools to interact with it.
- Based on PostgreSQL engine type, however, it is NOT used for OLTP workloads
- Usage: is not meant to be replacement for standard RDS databases
- High Performance: 10x performance of other data warehouse offered in cloud
- Columnar: Storage of data is column-based instead of row-based. Allows for efficient parallel queries

### High Availability, Snapshot, and Disaster Recovery

- Redshift now supports Multi-AZ deployments! It only spans two AZs at this time
- Snapshots are incremental and point-in-time. They can be automated or manual. Always contained in Amazon S3(you cannot manage the bucket)
- No conversions from Single-AZ to Multi-AZ(or vice versa)
- Leverage large batch inserts

### Redshift Spectrum

- Efficient query and retrieve data from Amazon S3 without having to load the data into Amazon Redshift tables
- Massive parallelism allows this to run extremely fast against large datasets. Use Redshift servers that are independent of your clusters

### Enhanced VPC Routing

- All COPY and UNLOAD traffic between your cluster and your data repositories is forced to go through your VPC
- Enables you to use VPC features: VPC Endpoints, VPC Flow Logs, ...

## Processing Data with EMR(Elastic MapReduce)

### What is ETL?

- Extract , Transform, Load

![image](https://gist.github.com/assets/31009750/4bd355a4-ae11-4272-95df-487e4ae9a97f)

### EMR

- AWS Service to help with ETL processing
- A managed big data platform that allows you to process vast amounts of data using open-source tools, such as Spark, Hive, HBase, Flink, Hudi, and Presto

#### EMR Storage

There are 3 different types of storage options within EMR

- Hadoop Distributed File System(HDSF): distributed, scalable file systems for Hadoop that distributes stored data across instances.

## Streaming Data with Kinesis

- Allow you ingest, process, and analyze real-time streaming data. You can think of its as a huge data highway connected to your AWS account.

There 2 major versions Kinenis:

### Data Streams

- Purpose: Real-time streaming for ingesting data
- Speed: Real time
- Difficult: You're responsible for creating consumer and scaling the stream.

![image](https://gist.github.com/assets/31009750/00dece40-b4ec-4b84-9f0e-34630641df0b)

### Data Firehose

- Purpose: Data transfer tool to get information to S3, Redshift, Elasticsearch, or Splunk
- Speed: Near real time (within 60s)
- Difficult: Plug and Play with AWS architecture

![image](https://gist.github.com/assets/31009750/6d076a0c-04c1-46b2-ac5c-58083b283037)

### Kinesis Data Analytics

- Analyze data using standard SQL
- Easy: simple to tie Data Analytics into your Kinesis Pipeline. It's directly supported by Data Streams and Data Firehose
- This is full managed, real time serverless service, automatically handle scaling and provisioning of needed resources.
- You only pay for the amount of resources you consume or your data passes through.

### Kinesis and SQS

- SQS is a message broker that is simple to use and doesn't require much configurion. It doesn't offer real-time message delivery
- Kinesis is a bit more complicated to configure and its mostly used in big data applications. If does provide real-time communication.

## Amazon Athena

- Athena is an interactive query service that makes it easy to analyze data in S3 using SQL. This is allow you to directly query data in your S3 bucket without loading it into a database.

## Amazon Glue

- Amazon Glue is a serverless data integration service that makes it easy to discover, prepare, and combine data. It allows you to perform ETL(extract,transform,load) workloads without managing underlying servers.

![image](https://gist.github.com/assets/31009750/da7fd631-84d3-4489-99d3-78cef76314b5)

## Visualizing Data with Amazon QuickSight

- Fully managed serverless business intelligence (BI) data visualization service.
- It allows you to dashboard to shared with users
- SPICE: Robust in-memory engine to perform advanced calculations
- Offer Column-Level Security(CLS)
- Price per session and per user basis

## Moving Transformed Data Using Amazon Data Pipeline

- Managed AWS Service for ETL Workflows that automates movements and transformations of your data
- Data Driven Workflow, can create dependencies between tasks and activities.
- Storage Integrations: DynamoDB, RDS, Redshift, and S3
- Compute Integrations: EC2, EMR

![image](https://gist.github.com/assets/31009750/615d9bdf-c667-4325-8d3f-05786bc5023c)

## Amazon Managed Streaming for Apache Kafka(Amazon MSK)

- Fully managed service for running data stream applications that leverage Apache Kafka
- Automatic Recovery
- Detection and replacement unhealthy node
- Integration with KMS for SSE requirements
- Encryption at rest by default
- TLS 1.2 for encryption in transit between brokers in clusters
- Deliver broker logs to Amazon CloudWatch, Amazon S3, Amazon Kinesis. API calls are logged to CloudTrail.

![image](https://gist.github.com/assets/31009750/73a20fdc-482d-4862-9d36-50ad0ec072f8)

## Analyzing Data with Amazon OpenSearch

- OpenSearch is a managed service allowing you to run search and analytics engines for various use cases
- It is the successor to Amazon Elasticsearch Service

![image](https://gist.github.com/assets/31009750/4a62c53c-09a2-4823-9906-8796a6c0280f)

![image](https://gist.github.com/assets/31009750/cd2643b2-9ab3-419f-9a4b-349fd4495a9f)
![image](https://gist.github.com/assets/31009750/56fdddb4-970a-4bc9-8b3d-753fe0cb1cb0)
