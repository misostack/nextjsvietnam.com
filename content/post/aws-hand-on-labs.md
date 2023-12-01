---
title: "Aws Hand on Labs"
type: "post"
date: 2023-12-01T22:15:06+07:00
description: "Free hand-on labs and cheatsheet for AWS Infrastructure"
keywords: ["Aws Hand on Labs"]
keywords: ["aws", "solution architecture", "aws solution architect associate"]
categories: ["systemdesign", "aws"]
tags: ["aws"]
image: "https://user-images.githubusercontent.com/31009750/195486548-37a0588f-2fb5-4a5f-8ce3-dbd4478e97ab.png"
---

## Types of labs

### Using EC2 Roles and Instance Profiles in AWS

**Architecture**

![image](https://gist.github.com/assets/31009750/17511430-6e5c-4a60-aaf8-c5227b74ed36)

**Scenario**

You are responsible for ensuring your applications hosted in Amazon EC2 are able to securely access other AWS services. Credentials need to be rotated regularly to minimize the adverse impact of a security breach. You want to minimize the time it takes to manage these credentials. AWS IAM roles provide the ability to automatically grant instances temporary credentials without the need for manual management. IAM instance profiles provide the mechanism to attach IAM roles to EC2 instances.

**Refs**

- https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-service.html

> trust_policy_ec2.json

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": { "Service": "ec2.amazonaws.com" },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

> Create the DEV_ROLE IAM Role

```sh
aws iam create-role --role-name DEV_ROLE --assume-role-policy-document file://trust_policy_ec2.json
```

> Create an IAM Policy Defining Read-Only Access Permissions to an S3 Bucket

> dev_s3_read_access.json

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowUserToSeeBucketListInTheConsole",
      "Action": ["s3:ListAllMyBuckets", "s3:GetBucketLocation"],
      "Effect": "Allow",
      "Resource": ["arn:aws:s3:::*"]
    },
    {
      "Effect": "Allow",
      "Action": ["s3:Get*", "s3:List*"],
      "Resource": [
        "arn:aws:s3:::cfst-3035-7ee914b77993dcc2eb84ddda709-s3bucketdev-czqbr1bqu9b6/*",
        "arn:aws:s3:::cfst-3035-7ee914b77993dcc2eb84ddda709-s3bucketdev-czqbr1bqu9b6"
      ]
    }
  ]
}
```

```sh
aws iam create-policy --policy-name DevS3ReadAccess --policy-document file://dev_s3_read_access.json
```

```json
{
  "Policy": {
    "PolicyName": "DevS3ReadAccess",
    "PermissionsBoundaryUsageCount": 0,
    "CreateDate": "2023-12-01T15:39:39Z",
    "AttachmentCount": 0,
    "IsAttachable": true,
    "PolicyId": "ANPA4DETGS5AKDZRKX5MY",
    "DefaultVersionId": "v1",
    "Path": "/",
    "Arn": "arn:aws:iam::831384885056:policy/DevS3ReadAccess",
    "UpdateDate": "2023-12-01T15:39:39Z"
  }
}
```

> Attach Managed Policy to Role

```sh
aws iam attach-role-policy --role-name DEV_ROLE --policy-arn "arn:aws:iam::831384885056:policy/DevS3ReadAccess"
```

> Create the Instance Profile and Add the DEV_ROLE via the AWS CLI

```sh
aws iam create-instance-profile --instance-profile-name DEV_PROFILE
aws iam add-role-to-instance-profile --instance-profile-name DEV_PROFILE --role-name DEV_ROLE
aws iam get-instance-profile --instance-profile-name DEV_PROFILE #verify
```

> Attach the DEV_PROFILE Role to an Instance

```sh
aws ec2 associate-iam-instance-profile --instance-id i-0483cd085e97179bd --iam-instance-profile Name="DEV_PROFILE"

aws ec2 describe-instances --instance-ids i-0483cd085e97179bd
```

> ssh on the webserver(instance-id)

```sh
# test role
aws sts get-caller-identity
```
