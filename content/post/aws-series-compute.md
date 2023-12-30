---
title: "Aws Series Compute"
type: "post"
date: 2023-12-28T10:27:36+07:00
description: "In this topic you will learn about AWS Computing services: EC2, EKS, Lambda, ..."
keywords: ["aws", "solution architecture", "aws solution architect associate"]
categories: ["systemdesign", "aws"]
tags: ["aws"]
image: "https://gist.github.com/assets/31009750/3d19a308-0376-448c-9bb0-84fd12a86842"
---

## 3. Compute

### 3.1. EC2

> VM but hosted on Amazon Infrastructure

#### 3.1..1 Amazon EC2 Pricing Options:

**On Demand**

- Pay by the hour or the second, depend on instance type
- Short term
- Flexible
- Testing the water

**Reversed capacity**:

- Predictable usage
- Specific capacity requirement
- Pay upfront for 1 or 3 years
- Standard RIs - up to 72% off the on-demand price.
- Convertible RIs - 54% off the on-demand price. Has option to change to a different RI type of equal or greater value
- Scheduled RIs: launch within the time window you defined.
- Reserved Instances can be sold after they have been active for at least 30 days and once AWS has received the upfront payment (if applicable)
- https://aws.amazon.com/ec2/pricing/reserved-instances/marketplace/

**Spot:**

- Purchase unused capacity
- Image rendering
- Genomic sequencing
- Algorithmic trading engines

![image](https://gist.github.com/assets/31009750/4ca33b79-1e7b-45f0-9d55-ccba882d6ea5)

**Dedicated**

- Expensive
- A physical EC2 server dedicated

#### 3.1.2. Using Roles

- Using role

#### 3.1.3. Security Groups and Bootstrap Scripts

> Security Groups

- Act as a **virtual firewall** for your EC2 instances to control incoming and outgoing traffic.
- **Inbound rules** control the **incoming traffic to** your instance
- **Outbound rules** control the **outgoing traffic from** your instance
- If you don't specify a security group, Amazon EC2 uses the default security group for the VPC

> Bootstrap Scripts

- Because your instance metadata is available from your running instance, you do not need to use the Amazon EC2 console or the AWS CLI. This can be helpful when you're writing scripts to run from your instance.
- https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instancedata-data-retrieval.html

```sh
curl http://169.254.169.254/latest/meta-data/
curl http://169.254.169.254/latest/meta-data/placement
curl http://169.254.169.254/latest/meta-data/placement/availability-zone

#!/bin/bash
sudo apt-get update -y
sudo apt-get install apache2 unzip -y
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
echo '<html><h1>Bootstrap Demo</h1><h3>Availability Zone: ' > /var/www/html/index.html
curl http://169.254.169.254/latest/meta-data/placement/availability-zone >> /var/www/html/index.html
echo '</h3> <h3>Instance Id: ' >> /var/www/html/index.html
curl http://169.254.169.254/latest/meta-data/instance-id >> /var/www/html/index.html
echo '</h3> <h3>Public IP: ' >> /var/www/html/index.html
curl http://169.254.169.254/latest/meta-data/public-ipv4 >> /var/www/html/index.html
echo '</h3> <h3>Local IP: ' >> /var/www/html/index.html
curl http://169.254.169.254/latest/meta-data/local-ipv4 >> /var/www/html/index.html
echo '</h3></html> ' >> /var/www/html/index.html
apt-get install mysql-server
sudo systemctl enable mysql
```

#### 3.1.4. Networking with EC2

There are 3 different types of virtual networking cards to your EC2 instances

![image](https://gist.github.com/assets/31009750/8feace9d-1995-419d-b0a5-f177ba309447)

- ENI: Elastic Network Interface - basis, day to day networking
- EN: Enhanced Networking - Uses single root I/O virtualization(SR-IOV) to provide high performance
- EFA: Elastic Fabric Adapter - Accelerate High Performance Computing(HPC) and machine learning applications

**ENI**

- Elastic Networking Interface
- Private IPv4 addresses
- Public IPv4 addresses
- Many IPv6 Addresses
- MAC Address
- 1 or more security groups
- Low budget, high availability solution

**EI**

- Enhance Networking
- High Performance Networking from 10 Gbps - 100 Gbps
- Higher bandwidth, higher packet per second(PPS) performance
- Consistently lower inter-instance latencies
- Single Root I/O Virtualization(SR-IOV)

You can enable enhanced networking by:

**ENA**

- Supports network speed up to 100 Gbps

**INTEL 82599 VIRTUAL FUNCTION(VF) Interface**

- Supports network speed up to 10 Gbps

**EFA**

- Elastic Fabric Adapter
- A network device you can attach to your Amazon EC2 instance to accelerate High Performance Computing(HPC) and machine learning applications.
- Provide lower and more consistent latency and higher throughput than TCP transport traditionally.
- Can use **OS-BYPASS** (only support Linux), os-bypass enables HPC and machine learning applications to bypass operating system kernel and communicate directly with EFA device.

#### 3.1.5. EC2 Placement Groups

When you launch a new EC2 instance, the EC2 service attempts to place the instance in such a way that all of your instances are spread out across underlying hardware to minimize correlated failures

Depending on the type of workload, you can create a placement group using one of the following placement strategies

- **Cluster** – packs instances close together inside an Availability Zone. This strategy enables workloads to achieve the low-latency network. - typical of high-performance computing (HPC) applications.
- **Partition** - spreads your instances across logical partitions such that groups of instances in one partition do not share the underlying hardware with groups of instances in different partitions. - typically used by large distributed and replicated workloads, such as Hadoop, Cassandra, and Kafka (dedicated racks)
- **Spread** - strictly places a small group of instances across distinct underlying hardware to reduce correlated failures - individual critical EC2 instances

- Only certain types of instances can be launched in a placement group.
- You can move an existing instance into a placement group

**There is no charge for creating a placement group.**

**Spot instances are useful for**:

- big data and analytics
- containerized workloads
- CI/CD and testing
- image and media rendering
- High-performance computing
- save up to 90% on-demand price
- you don't need persistent storage
- you can block Spot instances from terminating by using **Spot block**

**Spot Fleets**:

- Collection of spot instances and (optionally) on-demand instances
- Attempts to launch the number of spot instances and on-demand instances to meet your target capacity you specified in the Spot Fleet request.
- The request is fulfilled if there is capacity and maximum price you specified in the request exceed the current Spot price. It also attempts to maintain its target capacity fleet.
- You can define several launch pools(EC2 instance type, OS, AZ), fleet will choose the best way to implement depending on your defined strategy.

Some strategy:

- capacityOptimized
- lowestPrice
- diversified(spot instances are distributed accross pools)
- InstancePoolsToUseCount(spot instances are distributed across the number of spot instance pools you specify - only valid with lowestPrice)

### 3.2. EKS or ECS (Container)

### 3.3. Lambda

### 3.4. Elastic Beanstalk
