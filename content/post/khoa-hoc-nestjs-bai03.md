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
# for admin pages
nest g controller pet/controllers/admin/manage-pet --flat
nest g controller pet/controllers/admin/manage-pet-category --flat
nest g controller pet/controllers/admin/manage-pet-attribute --flat
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
  getList() {
    return "Pet List";
  }

  @Get(":id")
  getDetail(@Param() { id }: { id: number }) {
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

Cho admin

```ts
import { Controller, Get, Param } from "@nestjs/common";

@Controller("admin/pets")
export class ManagePetController {
  @Get("")
  getList() {
    return "admin pet list";
  }

  @Get(":id")
  getDetail(@Param() { id }: { id: string }) {
    return `admin pet detail ${id}`;
  }
}

import { Controller, Get, Param } from "@nestjs/common";

@Controller("admin/pet-categories")
export class ManagePetCategoryController {
  @Get("")
  getList() {
    return "admin pet categories";
  }

  @Get(":id")
  getDetail(@Param() { id }: { id: string }) {
    return `admin pet category detail ${id}`;
  }
}

import { Controller, Get, Param } from "@nestjs/common";

@Controller("admin/pet-attributes")
export class ManagePetAttributeController {
  @Get("")
  getList() {
    return "admin pet attribute list";
  }

  @Get(":id")
  getDetail(@Param() { id }: { id: string }) {
    return `admin pet attribute detail ${id}`;
  }
}
```

**Chúng ta hãy bắt đầu với form tạo 1 pet category**

- Tích hợp với bootstrap (https://getbootstrap.com/docs/5.0/getting-started/download/)
- Sử dụng ejs partial ( tách các phần chung của trang web - header, footer, và sử dụng lại trong từng template khác nhau)
- Tạo route
- Kết nối với view
- Nhận dữ liệu từ form và xử lý kết quả (fake data)

Cấu trúc thư mục view sẽ có dạng như sau

> views\pet\admin\manage-pet-category\create.ejs

Do đó khi sử dụng ta chỉ cần chỉ đường dẫn tới file template nằm trong thư mục view

```ts
@Render("pet/admin/manage-pet-category/create")
```

Sau khi sử dụng 1 số example có sẵn tại bootstrap ta có thể sử dụng template như bên dưới:

```ts
import { Controller, Get, Param, Post, Render } from "@nestjs/common";

@Controller("admin/pet-categories")
export class ManagePetCategoryController {
  @Get("")
  getList() {
    return "admin pet categories";
  }

  @Get("create")
  @Post("create")
  @Render("pet/admin/manage-pet-category/create")
  create() {
    // a form
    return {};
  }

  @Get(":id")
  getDetail(@Param() { id }: { id: string }) {
    return `admin pet category detail ${id}`;
  }
}
```

Trong đó phần header, footer sẽ chứa những thành phần dùng chung trong template

```ejs
<%- include('layouts/admin/header'); %>
<h1>Manage Pet Category - Create New Pet Category</h1>
<%- include('layouts/admin/footer'); %>
```

![image](https://user-images.githubusercontent.com/31009750/250268918-ee065a07-00fe-4036-8035-280fdd3345c3.png)

You can find all the related source code here:

- [Assets](https://github.com/misostack/nestjs-tutorial-2023/tree/lession03/public/assets)
- [Layouts](https://github.com/misostack/nestjs-tutorial-2023/tree/lession03/views/layouts/admin)

Và chúng ta có kết quả như sau:

![image](https://user-images.githubusercontent.com/31009750/250269750-766734ec-d18f-4c5f-b713-26a6e594bbf7.png)

Okie và hãy tới bước tiếp theo nào, hãy thiết kế 1 form để nhập và xử lý dữ liệu cho 1 PetCategory

Hãy chú ý rằng chúng ta có 3 trường hợp sử dụng cùng 1 view create form của admin pet category:

- Create New Pet Category
- Create New Pet Category thành công/thất bại
- Edit Pet Category
- Update Pet Categeory thành công/thất bại

Một số ràng buộc của form này:

- Pet category chỉ có title
- Pet category title không được để trống
- Pet category title không được dài hơn 150 kí tự

```sh
# to support multipart/form-data
npm install nestjs-form-data --save
# to support data validation and transformation
npm install class-transformer reflect-metadata --save
```

**Để sử dụng được multiplart/form-data**, chúng ta cần import module NestJSFormData như bên dưới.
Do mặc định NestJS được cấu hình chỉ để support json d

```ts
// src/pet/pet.module.ts

import { Module } from "@nestjs/common";
import { PetController } from "./controllers/pet.controller";
import { ManagePetController } from "./controllers/admin/manage-pet.controller";
import { ManagePetCategoryController } from "./controllers/admin/manage-pet-category.controller";
import { ManagePetAttributeController } from "./controllers/admin/manage-pet-attribute.controller";
import { NestjsFormDataModule } from "nestjs-form-data";
@Module({
  imports: [NestjsFormDataModule],
  controllers: [
    PetController,
    ManagePetController,
    ManagePetCategoryController,
    ManagePetAttributeController,
  ],
})
export class PetModule {}
```

```ts
// pet-dto.ts

import { IsNotEmpty, MaxLength } from "class-validator";

class CreatePetCategoryDto {
  @MaxLength(50)
  @IsNotEmpty()
  title: string;
}

export { CreatePetCategoryDto };
```

```ts
import { Body, Controller, Get, Param, Post, Render } from "@nestjs/common";
import { CreatePetCategoryDto } from "src/pet/dtos/pet-dto";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { FormDataRequest } from "nestjs-form-data";

const transformError = (error: ValidationError) => {
  const { property, constraints } = error;
  return {
    property,
    constraints,
  };
};
@Controller("admin/pet-categories")
export class ManagePetCategoryController {
  @Get("")
  getList() {
    return "admin pet categories";
  }

  @Get("create")
  @Render("pet/admin/manage-pet-category/create")
  view_create() {
    // a form
    return {
      data: {
        mode: "create",
      },
    };
  }

  @Post("create")
  @Render("pet/admin/manage-pet-category/create")
  @FormDataRequest()
  async create(@Body() createPetCategoryDto: CreatePetCategoryDto) {
    const data = {
      mode: "create",
    };
    // validation
    const object = plainToInstance(CreatePetCategoryDto, createPetCategoryDto);
    const errors = await validate(object, {
      stopAtFirstError: true,
    });
    if (errors.length > 0) {
      Reflect.set(data, "error", "Please correct all fields!");
      const responseError = {};
      errors.map((error) => {
        const rawError = transformError(error);
        Reflect.set(
          responseError,
          rawError.property,
          Object.values(rawError.constraints)[0]
        );
      });
      Reflect.set(data, "errors", responseError);
      return { data };
    }
    // set value and show success message
    Reflect.set(data, "values", object);
    Reflect.set(
      data,
      "success",
      `Pet Category : ${object.title} has been created!`
    );
    // success
    return { data };
  }

  @Get(":id")
  getDetail(@Param() { id }: { id: string }) {
    return `admin pet category detail ${id}`;
  }
}
```

```html
<%- include('layouts/admin/header'); %>
<section class="col-6">
  <form method="post" enctype="multipart/form-data">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <% if (data.mode === 'create') { %> New Pet Category <% } %>
        </h5>
        <!-- error -->
        <% if (data.error){ %>
        <div class="alert alert-danger" role="alert"><%= data.error %></div>
        <% } %>
        <!-- success -->
        <% if (data.success){ %>
        <div class="alert alert-success" role="alert"><%= data.success %></div>
        <% } %>
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <div class="input-group has-validation">
            <input
              type="text"
              class="form-control <%= data.errors && data.errors['title'] ? 'is-invalid': '' %>"
              id="title"
              name="title"
              value="<%= data.values && data.values['title'] %>"
              placeholder="Pet Category Title"
            />
            <% if (data.errors && data.errors['title']) { %>
            <div id="validationServerUsernameFeedback" class="invalid-feedback">
              <%= data.errors['title'] %>
            </div>
            <% } %>
          </div>
        </div>
      </div>
      <% if(!data.success) { %>
      <div class="mb-3 col-12 text-center">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
      <% } %>
    </div>
  </form>
</section>
<%- include('layouts/admin/footer'); %>
```

Và chúng ta có được 3 trạng thái của form như bên dưới

![image](https://user-images.githubusercontent.com/31009750/250274557-9a8d1677-7737-4127-b8d7-4ad1ca7404c0.png)
![image](https://user-images.githubusercontent.com/31009750/250274563-3952ec74-8aae-49ca-a093-39d2997eb8ed.png)
![image](https://user-images.githubusercontent.com/31009750/250274577-33997f54-815c-4600-9dd3-acfc1b96fb38.png)
