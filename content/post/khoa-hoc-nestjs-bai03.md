---
title: "Khóa học NestJS Bài 03 - Controllers & Views"
type: "post"
date: 2023-06-21T14:59:42+07:00
description: "Cùng tìm hiểu mô hình MVC và NestJS bằng cách xây dựng một website chuyên về thú cưng"
keywords: ["nestjs", "nestjs-mvc", "nestjs-tutorial"]
categories: ["nestjs-tutorial"]
tags: ["nestjs", "nestjs-pet-website"]
image: "https://user-images.githubusercontent.com/31009750/181449337-70081a76-5a01-4229-805e-39ed0ded6b5b.png"
---

## Source Code

- [Lession 03 Source Code](https://github.com/misostack/nestjs-tutorial-2023/tree/lession03)

## Bài 03

1. Tìm hiểu về module trong NestJS - ứng dụng xây dựng cấu trúc thư mục cho Pet Website
2. Tìm hiểu về EJS và cách tạo layout chung
3. Làm việc với form và kiểm tra dữ liệu đầu vào

### Tổng quan

#### Mô hình MVC

![image](https://user-images.githubusercontent.com/31009750/250263049-03852064-b404-40a9-8292-8d14cdf48138.png)

Phía trên mô hình luồng dữ liệu từ khi người dùng thực hiện yêu cầu cho đến khi nhận được kết quả.

1. Bước 1 : Controller nhận dữ liệu từ User (www/form-data, multiplart/form-data, uri segements, query params, headers, ...)
2. Bước 2 : Gọi tới Service để yêu cầu xử lý nghiệp vụ tương ứng, input là data từ user
3. Bước 3 : Service thực hiện gọi tới Model để đọc/ghi dữ liệu tương ứng
4. Bước 4: Model thực hiện đọc/ghi dữ liệu tương ứng trong database
5. Bước 5: Service gửi trả cho controller dữ liệu đã được đọc/ghi/xử lý nghiệp vụ tương ứng
6. Bước 6: Controller đọc template tương ứng cho phần giao diện kết hợp với data nhận được từ service để render phần view cho người dùng.
7. Bước 7: Sau khi render được phần view tương ứng, controller gửi kết quả này lại cho người dùng -> HTML/JSON, ...

#### Áp dụng kiến trúc MVC này vào dự án đồng thời phân chia dự án theo từng module

![image](https://user-images.githubusercontent.com/31009750/250264066-b17799f6-b81f-4068-8f77-e90b3221bd27.png)

### Thực hành

1. Xây dựng module Pet

**1.1. Controllers**

- PetController - /pets - /pets/:petId
- ManagePetController /admin/pets/
- ManagePetCategoryController /admin/pet-categories
- ManagePetAttributeController / admin/pet-attributes

**1.2. Services**

- PetService
- PetCategoryService
- PetAttributeService

**1.3. Models**

- Pet
- PetCategory
- PetAttribute

```bash
# let's create a pet module
nest g module pet
# let's create controllers
nest g controller pet/controllers/pet --flat
```

**app.module.ts**

```ts
// src/app.module.ts

import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { PetModule } from "./pet/pet.module";

@Module({
  imports: [
    // public folder
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "public"),
      serveRoot: "/public",
    }),
    PetModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

**pet.module.ts**

```ts
// src/pet/pet.module.ts

import { Module } from "@nestjs/common";

@Module({})
export class PetModule {}
```

```ts
import { Controller, Get, Param } from "@nestjs/common";

@Controller("pets")
export class PetController {
  @Get("")
  petList() {
    return "Pet List";
  }

  @Get(":id")
  petDetail(@Param() { id }: { id: number }) {
    return `Pet Detail ${id}`;
  }
}
```

**Tại bước này NestJS cung cấp 1 số cú pháp để khai báo handler cho mỗi path**

- [Tài liệu tham khảo về route, params cho controller trong NestJS](https://docs.nestjs.com/controllers#route-parameters)

Đến đây hãy thử chạy lại ứng dụng của bạn xem chúng ta có gì nào

![image](https://user-images.githubusercontent.com/31009750/250266534-82dd679a-1b8c-4785-8360-5ca09862b12a.png)

![image](https://user-images.githubusercontent.com/31009750/250266589-680113f5-8baa-46a8-b0a3-57f16a9ab2bc.png)

![image](https://user-images.githubusercontent.com/31009750/250266598-8844188c-d6d9-463f-8fdf-adb597a3bbeb.png)
