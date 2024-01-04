---
title: "Aws Series Migration"
type: "post"
date: 2024-01-04T10:16:42+07:00
description: "In this topic you will learn about migrating data in/out of AWS"
keywords: ["aws", "solution architecture", "aws solution architect associate"]
categories: ["systemdesign", "aws"]
tags: ["aws"]
image: "https://gist.github.com/assets/31009750/e9537e53-3a84-470b-ac43-5b0bdc6a7e0f"
---

## Moving Data to AWS Cloud

![image](https://gist.github.com/assets/31009750/6019d854-da7e-4a53-a9e3-5f668095df55)

## Snow Family

### Snowcone

![image](https://gist.github.com/assets/31009750/a6b36347-236b-4407-8648-a37feb9913db)

- 8TB of storage

### Snowball Edge

- 48TB to 81 TB in storage
- One time migration is the best suite

![image](https://gist.github.com/assets/31009750/760751c0-44d4-440c-ac18-36b6b1997895)

### Snowmobile

- 100TB in storage

![image](https://gist.github.com/assets/31009750/873184d6-49f1-4a95-8bc3-0c37068cedae)

## Storage Gateway

- Hybrid Cloud Storage Service help you merge on-premises resources with the cloud
- It can help with a one-time migration and long-term pairing of your architecture with AWS

### File Gateway

- Caching local files
- NFS or SMB mount
- Keep a local copy of recently used files
- Extend on-premises storage
- Helps with migrations to AWS

![image](https://gist.github.com/assets/31009750/796cbe99-f8fb-4d7b-afbe-54bd4968d07d)

### Volume Gateway

- Backup Drives
- iSCSI mount
- Cached or stored mode
- Create EBS snapshots
- Perfect for backup or migration

![image](https://gist.github.com/assets/31009750/301b2ab5-a341-4610-b85f-53bd6401f797)

### Tape Gateway

- Ditch with tapes
- Replace physical tapes
- Doesn't change current workflow
- Encrypted communication

![image](https://gist.github.com/assets/31009750/f6600b24-af07-4d6b-95b4-a5c31c579ef5)

## AWS DataSync

- Agent-based solution for migrating on-premises storage to AWS. It allows you to move data between NFS and SMB shares and AWS storage solutions
- A migration service, is great for one-time migrationss

![image](https://gist.github.com/assets/31009750/8a47c4e9-ca9d-4b9b-82c2-430c433d1c30)

## AWS Transfer Family

- Allow you to move file in and out of S3 or EFS using SFTP, FPTS, FTP

![image](https://gist.github.com/assets/31009750/81fc1547-23cc-4961-ad67-e6dc104ef41c)

## AWS Migration Hub

- Single place to track the progress on your migration to AWS: Server Migration Service(SMS), Database Migration Service(DMS)

![image](https://gist.github.com/assets/31009750/f9fd7e2f-06f5-4379-9313-1de7683d84ae)

## AWS Application Discovery Service and AWS Application Migration Service

- Help plan migrations to AWS via collection of usage and configuration data from on-premises servers
- Integrate with AWS Migration Hub
- You can track many things

### Discovery Types

> Agentless vs Agent Based

![image](https://gist.github.com/assets/31009750/ffe06d24-207b-49c4-a9ed-2dab2e23d56e)

### AWS MGN

![image](https://gist.github.com/assets/31009750/a25b54e8-ef33-4e41-b715-cc1343961350)

### MGN RTO and RPO

![image](https://gist.github.com/assets/31009750/3a49236b-a842-4705-86ce-1cd3fffc6d54)

## AWS DMS

- Migrate data between on-premises database and AWS
- OneTime or on-going
- SCT: schema conversation tool
- Same Engines/Different Engines with SCT

![image](https://gist.github.com/assets/31009750/1fd93f3a-9c9f-45ea-b8f1-5a1158eb33e6)

### Migration Types

- Full Load
- Full Load and Change Data Capture(CDC)
- CDC Only

![image](https://gist.github.com/assets/31009750/f9341c61-b27f-4f6c-a46e-c197cbd76bf7)

For large data use AWS Snowball
