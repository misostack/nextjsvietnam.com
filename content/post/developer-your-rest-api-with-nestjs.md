---
title: "Developer Your Rest Api With Nestjs"
type: "post"
date: 2022-07-12T11:39:11+07:00
description: "How to setup a nestjs boillerplate to developer a Restful Api Project"
keywords: ["nestjs", "rest-api", "nodejs"]
categories: ["frameworks"]
tags: ["nestjs", "nodejs"]
image: "https://user-images.githubusercontent.com/31009750/179174927-7a62ee24-15c1-4884-875a-57838f31fdcf.png"
---

## Ứng dụng

> Xây dựng REST API cung cấp dữ liệu thời gian thực giá vàng

![image](https://user-images.githubusercontent.com/31009750/179179969-d1b9fbb0-0b8c-45a1-9892-8d151d6b67b5.png)

### Tính năng cập nhật giá vàng

1. Cập nhật giá vàng theo ngày : nhập thông thường
2. Cập nhật giá vàng hàng loạt: import tập tin excel theo định dạng
3. Cập nhật giá vàng tự động: thiết lập link liên kết lấy giá vàng, khoảng thời gian lấy

### Tính năng hiển thị giá vàng

> Dạng hiện thị : dạng bảng hoặc dạng biểu đồ

1. Hiển thị giá vàng theo giờ
2. Hiển thị giá vàng theo ngày
3. Hiển thị giá vàng theo tuần
4. Hiển thị giá vàng theo tháng
5. Hiển thị giá vàng theo năm

## Phân tích

![image](https://user-images.githubusercontent.com/31009750/179182045-19c02cd0-25be-4282-bd4b-454be7434e9c.png)
![image](https://user-images.githubusercontent.com/31009750/179182071-307082c3-12c9-4249-b08c-88d29d194e70.png)

> Output

![image](https://user-images.githubusercontent.com/31009750/179183039-29d2c58c-feea-4b9d-955c-01f999eba6da.png)

**Lựa chọn database và cách lưu trữ**

1. MongoDB
2. Nested Object

![image](https://user-images.githubusercontent.com/31009750/179183556-3813547e-830e-4e68-89dd-d468d96eb782.png)

## Coding

### Database first

1. [x] Install mongoose package for NestJS
2. [x] Configure mongoose connection
3. [x] Create Model
4. [x] Generate dataseed
5. [x] Write tests for create, read, update, delete

```bash
yarn add @nestjs/mongoose mongoose dotenv uuid
```
