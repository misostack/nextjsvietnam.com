---
title: "Developer Philosophy"
type: "post"
date: 2023-09-25T21:13:42+07:00
description: "The collection of developer philosophy. Feel free to find the truth for your career."
keywords: ["Developer Philosophy"]
categories: ["cheatsheet"]
tags: []
image: "https://user-images.githubusercontent.com/31009750/270369155-120dd94a-0285-4741-9be2-35589f773ad4.png"
---

## Single Responsibility

> Gather together the things that change for the same reasons. Separate those things that change for different reasons.

## KISS ( Keep It Stupid Simple)

> Make things as simple as possible, but not simpler.

## DRY

> Every piece of knowledge must have a single, unambiguous, authoritative representation within a system.

## SOLID

### Single Responsibility

> A class should only have one responsibility. Furthermore, it should only have one reason to change

### Open for Extension, Closed for Modification

> Classes should be open for extension but closed for modification.

### Liskov Substituation Principle

> The Liskov Substitution Principle states that subclasses should be substitutable for their base classes. If class A is a subtype of class B, we should be able to replace B with A without disrupting the behavior of our program.

### Interface Segregation

> Larger interfaces should be split into smaller ones. By doing so, we can ensure that implementing classes only need to be concerned about the methods that are of interest to them

### Dependency Inversion

> The principle of dependency inversion refers to the decoupling of software modules. This way, instead of high-level modules depending on low-level modules, both will depend on abstractions.

## ReactJS Testing Philosophy

> Many integration tests. No snapshot tests. Few unit tests. Few e to e tests.

## Networking

### What is IOPS?

- IOPS - Input/Output operation per Second is a unit of measurement used for storage devices such as HDD, SSD or SAN - indicating the number of Write or Read tasks completed in 1 second. - IOPS numbers are published by device manufacturers, and have nothing to do with performance measurement applications.
- Depending on their feelings, Sys Admins can use different measurement applications (such as IOmeter, DiskSpd ..).

The higher the IOPS parameter, the faster the processing speed, the more tasks processed, and of course, the performance of the application on Cloud Server will be higher.

However, there are cases where IOPS is too high to the physical limit, causing a bottleneck (too high IOPS -> High **Latency** -> reduced **throughput**).

### What is throughput?

- Throughput is the average amount of data actually passing through in a certain period of time.
- Throughput does not necessarily equate to bandwidth. Because it is affected by **latency**.
- **Latency** is a measure of time, not the amount of data downloaded over time.

### What is latency

- Latency is the time that elapses between a user action and the resulting response.
- Network latency specifically refers to the delay that occurs within the network or on the Internet.
- In practical terms, latency is the time between a user action and the response from the website or application to this action.
- For example, latency between the time a user clicks on a link to a website and when the browser displays that website.

### Relationship between IOPS, Latency, ThroughPut

![image](https://gist.github.com/assets/31009750/e5944271-6d9e-4b24-9c43-51c2399f67c4)

There are many articles describing the relevance of these three concepts in shipping goods from point A to B as follows:

- IOPS: Number of trips performed in a period of time
- Throughput: Number of goods transferred in a period of time
- Latency: Average delay in all trips in a given time period

These three parameters, especially the two parameters IOPS and latency, reflect service quality but do not always go together like if one index is good, the remaining indexes are also good. There may be many shipments a day, but some are fast, some are slow, high IOPS but the average latency is also high. There may be few shipments a day but each trip carries a full load, the throughput is high even though the IOPS is low because Throughput = IOPS \* IO Average size (high IO average size means high throughput). Maybe the average latency is low, but the number of goods transferred is not that high due to few orders (applications have few requests to storage).

Có nhiều bài viết mô tả sự liên quan của 3 khái niệm này trong hoạt động ship hàng từ điểm A đến B như sau:

- IOPS: Số lượng chuyến đi thưc hiện trong một khoảng thời gian
- Throughput: Số hàng chuyển được trong một khoảng thời gian
- Latency: Độ trễ trung bình trong tất cả các chuyến đi trong một khoảng thời gian đã thực hiện.

### What is OLTP?

- The online transaction processing
- Processing data from transactions in real time(eg: customer orders, banking transactions, payments, and booking systems)
- OLTP is all about data processing and completing large numbers of small transactions in real time

### What is OLAP

- The online analytical processing
- Processes complex queries to analyze historical data( e.g: analyzing net profit figures from the past 3 years and sales forecasting)
- OLAP is all about data analysis using large amounts of data, as well as complex queries that take a long time to complete.
