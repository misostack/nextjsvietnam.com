---
title: "Aws Series Cloud Watch"
type: "post"
date: 2023-12-29T20:30:53+07:00
description: "In this topic you will learn how to use AWS ELB"
keywords: ["aws", "solution architecture", "aws solution architect associate"]
categories: ["systemdesign", "aws"]
tags: ["aws"]
image: "https://gist.github.com/assets/31009750/8d1607c5-0277-4348-bf2c-6b99ffecfab1"
---

> CloudWatch is an monitoring and observability platform that was designed to give us insight into our AWS architecture. It allows us to monitor multiple levels of our applications and identify potential issues

## CloudWatch Features

- System Metrics
- Application Metrics : information inside EC2
- Alarms: Alarms us when something's wrong

## Types of Metrics

![image](https://gist.github.com/assets/31009750/45bce0d3-8b60-47cc-bd1e-871b59234c5f)

## Application Monitoring Using CloudWatch Logs

What do we do with our logs which comes from: EC2, RDS, LAMBDA, CloudTrail, On-Premises

=> CloudWatch logs allow you to monitor, store, and access log files from variety sources

Terms:

- Log Event: timestamp + data, log entry
- Log Stream: A collection of log events come from the same source creates a log stream. Think of continuous set of logs from a single instance.
- Log Group: Collection of log streams. Eg: you would like to group all your Apache web server logs across hosts together

Features:

- Filter Patterns: You can look for specific terms in your logs. Think 400 errors in your web server logs.
- CloudWatch Logs Insights: This is allow you to query all your logs using SQL-like interactive solution
- Alarms: Once you've identified your trends or patterns, it's time to set up alerts for them

Logs should Go to CloudWatch Logs

- Except for situations where we don't need to process them. Then they should go straight to S3.

### Amazon Managed Grafana

- Fully managed Amazon service allowing secure data visualizations for instant querying,correlating, and visualizing your operational metrics, logs, and traces from different resources.
- Easy deploy, operate and scale
- Workspaces(logical Grafana servers) for seperation of data visualizations and querying
- AWS Managed
- Secure
- Pricing is based per active user in workspace
- Integrate with several sources: Amazon CLoudWatch, Amazon Managed Service for Prometheus, Amazon OpenSearch Service, and Amazon TimeStream.

Usecases:

- Connect datasources like Prometheus for visualizing EKS, ECS, or your own k8s cluster metrics.
- Vast Data plugins make service a perfect fit for monitoring IoT and edge device data.
- Centralizing dashboards

### Amazon Managed Service for Prometheus

- Serverless, Prometheus-compatible service
- Automatically scale
- AWS replicate your data accress 3 AZ in same region. Designed for Availability
- Work with clusters running on Amazon EKS or self-managed k8s clusters
- PromQL
- Data retention: 150 days in your workspace(automatically deleted afterward)
