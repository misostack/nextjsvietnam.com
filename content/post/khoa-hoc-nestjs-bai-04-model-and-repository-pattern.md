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

1. Giới thiệu sơ qua về một số ORM phổ biến : Sequelize, TypeORM, Mongoose
2. Tìm hiểu về ActiveRecord Pattern
3. Tìm hiểu về Repository Pattern
4. Ứng dụng để tạo database schema với TypeORM trong NestJS
5. Ứng dụng để tạo data seed trong NestJS

### 1. Cấu hình cho NestJS làm với với MySQL thông qua TypeORM

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

![image](https://user-images.githubusercontent.com/31009750/250809387-f3fc13a6-8ece-4e34-bb45-c813f59828b2.png)

![image](https://user-images.githubusercontent.com/31009750/250809558-b78684c7-a441-4eec-ab4c-0cc201ef78bc.png)

Bước tiếp theo, chúng ta bắt đầu test thử một số method cơ bản của Model: thêm, cập nhật, xóa, tìm kiếm
