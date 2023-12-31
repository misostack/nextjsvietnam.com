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
