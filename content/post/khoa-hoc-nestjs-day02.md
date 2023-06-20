---
title: "Khóa học Nestjs - Ngày 02"
type: "post"
date: 2023-06-20T14:57:33+07:00
description: "Xây dựng Pet Website bằng NestJS - Ngày 02"
keywords: ["nestjs", "nestjs-mvc", "nestjs-tutorial"]
categories: ["nestjs-tutorial"]
tags: ["nestjs", "nestjs-pet-website"]
image: "https://user-images.githubusercontent.com/31009750/181449337-70081a76-5a01-4229-805e-39ed0ded6b5b.png"
---

## Source Code

- [Day 002 Source Code](https://github.com/misostack/nestjs-tutorial-2023/tree/day02)

## Mục tiêu

1. Phân tích yêu cầu thiết kế sơ bộ
2. Thiết lập cấu trúc dự án
3. Giới thiệu tổng quan về các lớp trong mô hình MVC và code thực hành

### Phân tích yêu cầu

#### Sitemap

![image](https://user-images.githubusercontent.com/31009750/247061383-15931be5-9bb5-4e85-9577-8fa6faa3f16f.png)

#### Functional details

![image](https://user-images.githubusercontent.com/31009750/247061467-18d4c3e4-f726-47e9-9b83-35136cfbb876.png)

#### Thiết kế cơ sở dữ liệu

![image](https://user-images.githubusercontent.com/31009750/247068026-284c4402-5853-479e-b086-647db777d17b.png)

### Thiết lập cấu trúc dự án

1. Tạo 1 dự án mới với NestJS
2. Cấu trúc thư mục dự án theo cấu trúc module và mô hình MVC
3. Debug dự án NestJS với VSCode

#### Tạo 1 dự án mới với NestJS

```sh
nest new nestjs-tutorial-2023 --skip-install
cd nestjs-tutorial-2023
npm i
```

![image](https://user-images.githubusercontent.com/31009750/247071423-19b685cc-56ea-463b-be0a-4d0de94993ef.png)

Sau khi khởi tạo dự án , cấu trúc cây thư mục của dự án sẽ giống như hình bên dưới:

![image](https://user-images.githubusercontent.com/31009750/247074456-6dedab95-aee1-4029-ab02-f0a1a948dc6c.png)

#### Cấu trúc thư mục dự án theo cấu trúc module và mô hình MVC

1. Cài đặt NestJS hỗ trợ template Engine EJS

Chúng ta cùng quay lại một chút với kiến trúc của expressjs, bạn cần thiết lập 1 số thông số như sau:

- Template Engine : một số template engine phổ biến như pug, ejs, hbs
- Static Assets: thư mục chứa các file tĩnh như css, js, images của website

```js
const express = require("express");
const app = express();
const port = process.env.PORT || 1337;
const path = require("path");

// static assets
const publicAssetsPath = path.resolve(process.cwd(), "public");
// using express static middleware
app.use("/public", express.static(publicAssetsPath));
// Your asset will be placed at : http://localhost:1337/public/assets/main.css

// select view engine is ejs
app.set("view engine", "ejs");

// set view folder
const viewsPath = process.cwd() + "/views";
app.set("views", [viewsPath]);

// global variable through app
app.locals = {
  title: "MVC Tutorial",
};

// home page
app.get("/", (req, res) => {
  res.render("index", { heading: "Home page" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
```

Còn trong NestJS, chúng ta sẽ làm thế nào

```sh
npm install --save @nestjs/serve-static
npm i --save ejs
```

```ts
// src/app.module.ts
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ServeStaticModule } from "@nestjs/serve-static";
import { join } from "path";

@Module({
  imports: [
    // public folder
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), "public"),
      // Your asset will be placed at : http://localhost:1337/public/assets/main.css
      serveRoot: "/public",
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

```ts
// src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from "path";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // app.useStaticAssets(join(process.cwd(), 'public'));
  app.setViewEngine("ejs");
  app.setBaseViewsDir([join(process.cwd(), "views")]);

  await app.listen(3000);
}
bootstrap();
```

```ts
// src/app.controller.ts

import { Controller, Get, Render } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render("index")
  homePage() {
    return {};
  }
}
```

> views/index.ejs

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title><%= title %></title>
    <link rel="stylesheet" href="/public/assets/main.css" />
  </head>
  <body>
    <h1><%= title %></h1>
    <img
      src="/public/assets/nestjs-tutorial-2023.png"
      alt="NestJS Tutorial 2023"
    />
    <script src="/public/assets/main.js"></script>
  </body>
</html>
```

And here is what you get

![image](https://user-images.githubusercontent.com/31009750/247096434-124def02-443d-4c01-bae9-1b2be8ac113e.png)
