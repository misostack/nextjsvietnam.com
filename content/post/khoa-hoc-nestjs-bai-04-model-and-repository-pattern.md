---
title: "Khóa học NestJS Bài 04 - Model and Repository Pattern"
type: "post"
date: 2023-07-03T14:29:29+07:00
description: "Cùng tìm hiểu về Model trong MVC và so sánh giữa ActiveRecord với Repository Pattern trong NestJS"
keywords: ["nestjs", "nestjs-mvc", "nestjs-tutorial"]
categories: ["nestjs-tutorial"]
tags: ["nestjs", "nestjs-pet-website"]
image: "https://user-images.githubusercontent.com/31009750/181449337-70081a76-5a01-4229-805e-39ed0ded6b5b.png"
---

## Source Code

- [Lession 04 Source Code](https://github.com/misostack/nestjs-tutorial-2023/tree/lession04)

## Bài 04

1. Giới thiệu sơ qua về một số ORM phổ biến : Sequelize
2. Tìm hiểu về ActiveRecord Pattern
3. Ứng dụng để tạo database schema với Sequelize trong NestJS
4. Ứng dụng thêm,xóa,sửa,tìm kiếm với Model cho PetCategory
5. Ứng dụng để tạo data seed trong NestJS

### Cấu hình cho NestJS làm với với MySQL thông qua Sequelize

Đầu tiên bạn cần tạo database trước
Database name : **nestjs_tutorial_2023**

```sql
CREATE DATABASE `nestjs_tutorial_2023` CHARACTER SET 'utf8mb4' COLLATE 'utf8mb4_bin';
```

![image](https://user-images.githubusercontent.com/31009750/250492489-8e106e4c-640f-4aea-84d4-d3663f223c02.png)

- Kết nối với MYSQL bằng Sequelize
- Kết nối với PostgreSQL bằng TypeORM
- Kết nối với MongoDB bằng Mongoose

**1.1. Kết nối với MYSQL bằng Sequelize**

Cài đặt các packages

```sh
npm install --save @nestjs/sequelize sequelize sequelize-typescript mysql2
npm install --save-dev @types/sequelize
npm install --save-dev sequelize-cli
npx sequelize-cli init
```

Trong phần này tôi xin giới thiệu với các anh chị 3 bước chính làm việc với database:

1. [x] Thiết lập kết nối
2. [x] Khai báo model
3. [x] Cấu trúc thư mục database migration - khởi tạo, cập nhật database schema

> Thiết lập kết nối

```ts
// src/app.module.ts

import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { PetModule } from "./pet/pet.module";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [
    // public folder
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "public"),
      serveRoot: "/public",
    }),
    PetModule,
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "123456",
      database: "nestjs_tutorial_2023",
      models: [],
    }),
  ],
  providers: [],
})
export class AppModule {}
```

> Khai báo model

**Model trong ORM:**

- Chính là ánh xạ của 1 thực thể trong cơ sở dữ liệu, thông qua ORM chúng ta chỉ cần làm việc với các phương thức (method) của Model, phần còn lại là các câu lệnh SQL/NoSQL sẽ được ORM xử lý. Ưu điểm là việc lập trình sẽ trở nên dễ dàng và có tính nhất quán hơn. Nhược điểm là đôi khi 1 số câu query sẽ chậm và khó để triển khai các query có tính chất phức tạp. Tuy nhiên với trường hợp đó ORM vẫn hỗ trợ chúng thực hiện SQL/NoSQL query truyền thống.

```ts
"use strict";

import { PetCategory } from "src/pet/models/pet-category.model";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("pet_categories", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("pet_categories");
  },
};
```

> Điều chỉnh lại config để sử dụng model và sử dụng database uri

```ts
// src/app.module.ts

import { Module } from "@nestjs/common";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";
import { PetModule } from "./pet/pet.module";
import { SequelizeModule } from "@nestjs/sequelize";
import models from "./pet/models";

@Module({
  imports: [
    // public folder
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "public"),
      serveRoot: "/public",
    }),
    PetModule,
    SequelizeModule.forRoot({
      uri: "mysql://root:123456@localhost/nestjs_tutorial_2023",
      dialect: "mysql",
      models: models,
    }),
  ],
  providers: [],
})
export class AppModule {}
```

> Cấu trúc thư mục database migration - khởi tạo, cập nhật database schema

Đôi lời giải thích tại sao chúng ta cần sử dụng sequelize-cli để cập nhật database.
Trong quá trình phát triển dự án, khi có 1 bảng dữ liệu cần thêm mới/xóa hoặc cập nhật các cột trong bảng. Cách trực tiếp nhất là các câu lệnh SQL, mặc dù chúng ta vẫn có thể quản lí được câu lệnh nào đã chạy hoặc chưa và việc chia sẻ với các thành viên trong team hoặc người phụ trách triển khai sản phẩm trên môi trường production.

Trong các ORM hiện đại ngày nay, để thống nhất cách làm và quy chuẩn hóa, thông thường chúng ta sẽ sử dụng cli của các ORM này liên quan đến với tạo/chỉnh sửa database, table.
Và thực hiện việc migrate qua các dòng lệnh. Còn cấu trúc các bảng dữ liệu sẽ được triển khai thông qua code - nhằm mang tính thống nhất với model đã được quản lí bởi ORM.

Sau khi chạy câu lệnh mặc định sau của sequelize-cli chúng ta sẽ có cấu trúc thư mục mặc định như sau.

```sh
npx sequelize-cli init
```

```xs
config
  database.json
db
  models
  seeders
  migrations
```

> **.sequelizerc**

```js
// .sequelizerc

const path = require("path");

module.exports = {
  config: path.resolve("config", "database.json"),
  "models-path": path.resolve("db", "models"),
  "seeders-path": path.resolve("db", "seeders"),
  "migrations-path": path.resolve("db", "migrations"),
};
```

Tuy nhiên để phù hợp với cấu trúc hiện tại của dự án, ta cần điều chỉnh lại 1 chút như sau

```xss
src
    database
        config
            config.ts
    migrations
        *.ts
    seeds
        *.ts
```

> **.sequelizerc**

```js
const path = require("path");

module.exports = {
  config: path.resolve("./dist/database/config/config.js"),
  "seeders-path": path.resolve("./dist/database/seeders"),
  "migrations-path": path.resolve("./dist/database/migrations"),
};
```

Ở đây, thay vì chạy trực tiếp bản source, chúng ta sẽ chạy bản build của chúng

```ts
// config.ts
module.exports = {
  production: {
    url: "mysql://root:123456@localhost/nestjs_tutorial_2023",
    dialect: "mysql",
  },
};
```

```ts
// src/pet/models/pet-category.model
import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "pet_categories",
})
export class PetCategory extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id?: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  name: string;
}
```

```ts
// src\database\migrations\20230704043449-create-pet-category-table.ts
"use strict";

import { PetCategory } from "src/pet/models/pet-category.model";

/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("pet_categories", {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(60),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("pet_categories");
  },
};
```

### Lưu ý đặc biệt cho model ở đây

Do PetCategory Model trong ví dụ có kế thừa từ Model từ sequelize nên sẽ thừa kế 1 số field định sẵn, dù trong code của Model PetCategory ta không thấy chúng xuất hiện.
Do vậy khi tạo script migrate cho PetCategory cần lưu ý thêm 2 cột mặc định này.

```ts
export declare abstract class Model<TModelAttributes extends {} = any, TCreationAttributes extends {} = TModelAttributes> extends OriginModel<TModelAttributes, TCreationAttributes> {
    id?: number | any;
    createdAt?: Date | any;
    updatedAt?: Date | any;
    deletedAt?: Date | any;
    version?: number | any;
    static isInitialized: boolean;
```

**Một số command phổ biến**

```sh
$ npx sequelize-cli --help

Sequelize CLI [Node: 16.19.1, CLI: 6.6.1, ORM: 6.32.1]

sequelize <command>

Commands:
  sequelize db:migrate                        Run pending migrations
  sequelize db:migrate:schema:timestamps:add  Update migration table to have timestamps
  sequelize db:migrate:status                 List the status of all migrations
  sequelize db:migrate:undo                   Reverts a migration
  sequelize db:migrate:undo:all               Revert all migrations ran
  sequelize db:seed                           Run specified seeder
  sequelize db:seed:undo                      Deletes data from the database
  sequelize db:seed:all                       Run every seeder
  sequelize db:seed:undo:all                  Deletes data from the database
  sequelize db:create                         Create database specified by configuration
  sequelize db:drop                           Drop database specified by configuration
  sequelize init                              Initializes project
  sequelize init:config                       Initializes configuration
  sequelize init:migrations                   Initializes migrations
  sequelize init:models                       Initializes models
  sequelize init:seeders                      Initializes seeders
  sequelize migration:generate                Generates a new migration file
  sequelize migration:create                  Generates a new migration file
  sequelize model:generate                    Generates a model and its migration
  sequelize model:create                      Generates a model and its migration
  sequelize seed:generate                     Generates a new seed file
  sequelize seed:create                       Generates a new seed file
```

**Tôi xin ví dụ command để thực hiện tạo file migration, sau đó build, và chạy**

```sh
# create migration
npx sequelize-cli migration:create --name create-pet-category-table --migrations-path ./src/database/migrations
# build
npm run build
# run migration
npx sequelize-cli db:migrate --env production
```

Lưu ý nếu không chỉ định env thì mặc định là development. Như trong file config ở trên chúng ta chỉ set duy nhất một môi trường là production. Và các config sẽ được thay thế bằng biến môi trường.

Sau khi chạy migrate xong lúc này kiểm tra database ta sẽ thấy

![image](https://user-images.githubusercontent.com/31009750/250823645-6f52bcab-9a90-4c76-b658-04612fb44db2.png)
![image](https://user-images.githubusercontent.com/31009750/250823856-425b437a-6107-4f75-ba83-48f7ea63bef4.png)

Bước tiếp theo, chúng ta bắt đầu test thử một số method cơ bản của Model: thêm, cập nhật, xóa, tìm kiếm

Lưu ý nhỏ khi tiếp tục bài học với ví dụ của Pet Category hiện tại, chúng ta cần cập nhật PetCategory Model lại 1 chút, thay vì column title -> sẽ chuyển sang column name, cho tương thích với database lúc này.

> Thêm PetCategory

```ts
import { PetCategory } from "src/pet/models/pet-category.model";
await PetCategory.create({ ...object });
```

```ts
@Controller("admin/pet-categories")
export class ManagePetCategoryController {
  @Post("create")
  @Render("pet/admin/manage-pet-category/create")
  @FormDataRequest()
  async create(@Body() createPetCategoryDto: CreatePetCategoryDto) {
    const data = {
      mode: "create",
    };
    // validation
    const object = plainToInstance(CreatePetCategoryDto, createPetCategoryDto);

    // ...

    // set value and show success message
    Reflect.set(data, "values", object);

    // create PetCategory
    const newPetCategory = await PetCategory.create({ ...object });

    Reflect.set(
      data,
      "success",
      `Pet Category : ${newPetCategory.id} - ${newPetCategory.name} has been created!`
    );
    // success
    return { data };
  }
}
```

Sau khi chạy thử http://localhost:3000/admin/pet-categories/create chúng ta có được kết quả như bên dưới

![image](https://user-images.githubusercontent.com/31009750/250825079-e29b1b36-bc07-4a48-bb9e-cfba92dc3129.png)

Ngoài ra Sequelize còn hỗ trợ bạn cấu hình để có thể xem chi tiết được câu sql được ORM tạo ra. Thay đổi một chút ở phần config cho kết nối database tại app module.

```ts
SequelizeModule.forRoot({
  uri: 'mysql://root:123456@localhost/nestjs_tutorial_2023',
  dialect: 'mysql',
  models: models,
  logging: console.log,
}),
```

![image](https://user-images.githubusercontent.com/31009750/250826619-d4ddb66e-31b7-41b2-b828-527924474ef7.png)

> Tìm kiếm PetCategory - danh sách

```ts
@Controller('admin/pet-categories')
export class ManagePetCategoryController {
  @Get('')
  @Render('pet/admin/manage-pet-category/list')
  async getList() {
    const petCategories = await PetCategory.findAll();
    return {
      petCategories,
    };
  }
```

```html
<%- include('layouts/admin/header'); %>
<section class="col-12">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">List Pet Categories</h5>
      <div class="table-responsive">
        <table class="table table-light table-striped">
          <thead>
            <tr>
              <th scope="col" style="width: 360px">ID</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            <% petCategories.forEach(petCategory => { %>
            <tr class="">
              <td><%= petCategory.id %></td>
              <td><%= petCategory.name %></td>
            </tr>
            <% }) %>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>
<%- include('layouts/admin/footer'); %>
```

![image](https://user-images.githubusercontent.com/31009750/250829442-dbb50893-c56f-4842-a130-58d559fd90e0.png)

```ts
// find all
const petCategories = await PetCategory.findAll();
// delete
await PetCategory.destroy({ where: { id } });
// create
const newPetCategory = await PetCategory.create({ ...object });
// find by primary key
const petCategory = await PetCategory.findByPk(id);
// update
await petCategory.update(object);
```

Update source code of ManagePetCategory controllers and views

```ts
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Redirect,
  Render,
} from "@nestjs/common";
import { CreatePetCategoryDto } from "src/pet/dtos/pet-dto";
import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { FormDataRequest } from "nestjs-form-data";
import { PetCategory } from "src/pet/models/pet-category.model";
import { Response } from "express";

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
  @Render("pet/admin/manage-pet-category/list")
  async getList() {
    const petCategories = await PetCategory.findAll();
    return {
      petCategories,
    };
  }

  @Post("delete/:id")
  @Redirect("/admin/pet-categories/")
  async deleteOne(@Param() { id }: { id: string }) {
    await PetCategory.destroy({ where: { id } });
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

    // create PetCategory
    const newPetCategory = await PetCategory.create({ ...object });

    Reflect.set(
      data,
      "success",
      `Pet Category : ${newPetCategory.id} - ${newPetCategory.name} has been created!`
    );
    // success
    return { data };
  }

  @Get(":id")
  @Render("pet/admin/manage-pet-category/create")
  async getDetail(@Param() { id }: { id: string }) {
    const data = {
      mode: "edit",
    };
    const petCategory = await PetCategory.findByPk(id);
    Reflect.set(data, "values", petCategory);
    return { data };
  }

  @Post(":id")
  @Render("pet/admin/manage-pet-category/create")
  @FormDataRequest()
  async updateOne(
    @Param() { id }: { id: string },
    @Body() createPetCategoryDto: CreatePetCategoryDto
  ) {
    const data = {
      mode: "edit",
    };
    const petCategory = await PetCategory.findByPk(id);
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
    await petCategory.update(object);

    Reflect.set(data, "values", petCategory);
    return { data };
  }
}
```

> Views - list.html

```html
<%- include('layouts/admin/header'); %>
<section class="col-12">
  <div class="card">
    <div class="card-body">
      <h5 class="card-title">List Pet Categories</h5>
      <div class="pb-4">
        <a
          class="btn btn-primary"
          href="/admin/pet-categories/create"
          role="button"
          >New Pet Category</a
        >
      </div>
      <div class="table-responsive">
        <table class="table table-light table-striped">
          <thead>
            <tr>
              <th scope="col" style="width: 360px">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <% petCategories.forEach(petCategory => { %>
            <tr class="">
              <td><%= petCategory.id %></td>
              <td><%= petCategory.name %></td>
              <td>
                <a
                  href="/admin/pet-categories/<%= petCategory.id %>"
                  title="Edit"
                  >Edit</a
                >
                <form
                  action="/admin/pet-categories/delete/<%= petCategory.id %>"
                  method="post"
                >
                  <button type="submit">Delete</button>
                </form>
              </td>
            </tr>
            <% }) %>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</section>
<%- include('layouts/admin/footer'); %>
```

> Views - Create/Edit

```html
<%- include('layouts/admin/header'); %>
<section class="col-6">
  <form method="post" enctype="multipart/form-data">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">
          <% if (data.mode === 'create') { %> New Pet Category <% } %> <% if
          (data.mode === 'edit') { %> Edit Pet Category <% } %>
        </h5>
        <!-- error -->
        <% if (data.error){ %>
        <div class="alert alert-danger" role="alert"><%= data.error %></div>
        <% } %>
        <!-- success -->
        <% if (data.success){ %>
        <div class="alert alert-success" role="alert"><%= data.success %></div>
        <script type="text/javascript">
          setTimeout(() => {
            window.location.href = "/admin/pet-categories/";
          }, 2000);
        </script>
        <% } %>
        <div class="mb-3">
          <label for="title" class="form-label">Name</label>
          <div class="input-group has-validation">
            <input
              type="text"
              class="form-control <%= data.errors && data.errors['name'] ? 'is-invalid': '' %>"
              id="name"
              name="name"
              value="<%= data.values && data.values['name'] %>"
              placeholder="Pet Category name"
            />
            <% if (data.errors && data.errors['name']) { %>
            <div id="validationServerUsernameFeedback" class="invalid-feedback">
              <%= data.errors['name'] %>
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

### Tạo data seed với sequlize-cli

> Lưu ý tại bước này, nếu sử dụng generate của cli, thư mục target trong config của sequelize lúc này là thư mục dist.

Do đó, ta cần điều chỉnh một chút lại config cho **.sequelizerc** như sau. Một lưu ý tiếp theo, là hãy nhớ chỉnh lại file extension cho file seeding hay migrations sang đuôi ts nhé.

```js
const path = require("path");

const database_dist = process.env.NODE_ENV === "production" ? "dist" : "src";

module.exports = {
  config: path.resolve(`./${database_dist}/database/config/config.js`),
  "seeders-path": path.resolve(`./${database_dist}/database/seeders`),
  "migrations-path": path.resolve(`./${database_dist}/database/migrations`),
};
```

```sh
# create migration
npx sequelize-cli migration:create --name create-pet-category-table --migrations-path ./src/database/migrations
# create seed
npx sequelize-cli seed:generate --name pet-category
# build
npm run build
# run migration/seeds
NODE_ENV=production npx sequelize-cli db:migrate --env production
```

```ts
import { Column, DataType, Model, Table } from "sequelize-typescript";

export const PetCategoryTableName = "pet_categories";

@Table({
  tableName: PetCategoryTableName,
})
export class PetCategory extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id?: string;

  @Column({
    type: DataType.STRING(60),
    allowNull: false,
  })
  name: string;
}
```

> src\database\seeders\20230706141027-pet-category.ts

```ts
"use strict";

import {
  PetCategory,
  PetCategoryTableName,
} from "src/pet/models/pet-category.model";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      PetCategoryTableName,
      [
        { name: "Dogs" },
        { name: "Cats" },
        { name: "Pigs" },
        { name: "Birds" },
        { name: "Others" },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(PetCategoryTableName, null, {});
  },
};
```

Mọi thứ trông có vẻ ổn, tuy nhiên, khi chạy câu lệnh migrate seed, bạn có thể gặp phải lỗi được mô tả tại [đây](https://github.com/sequelize/sequelize/issues/13224)

```sh
Loaded configuration file "dist\database\config\config.js".
Using environment "production".
== 20230706141027-pet-category: migrating =======

ERROR: Field 'id' doesn't have a default value
```

Để bypass issue này trong lúc sequelize chưa có bản vá cho lỗi này, ngay lúc migrate, chúng ta sẽ phải generate uuid trực tiếp, bằng package [này](https://www.npmjs.com/package/uuid)

Cập nhật lại 1 chút file seed src\database\seeders\20230706141027-pet-category.ts

```ts
"use strict";

import { PetCategoryTableName } from "src/pet/models/pet-category.model";

import { v4 as uuidv4 } from "uuid";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      PetCategoryTableName,
      [
        { id: uuidv4(), name: "Dogs" },
        { id: uuidv4(), name: "Cats" },
        { id: uuidv4(), name: "Pigs" },
        { id: uuidv4(), name: "Birds" },
        { id: uuidv4(), name: "Others" },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(PetCategoryTableName, null, {});
  },
};
```

```bash
$ NODE_ENV=production npx sequelize-cli db:seed:all

Sequelize CLI [Node: 16.19.1, CLI: 6.6.1, ORM: 6.32.1]

Loaded configuration file "dist\database\config\config.js".
Using environment "production".
== 20230706141027-pet-category: migrating =======
== 20230706141027-pet-category: migrated (0.155s)
```

Và kết quả

![image](https://user-images.githubusercontent.com/31009750/251483919-c00301f0-70f8-4342-b745-090547146eb2.png)
