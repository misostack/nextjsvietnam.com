---
title: "The Best Way to Upload File in Nestjs"
type: "post"
date: 2022-08-10T17:01:06+07:00
description: "In this topic, we will learn how to use NestJS's built-in module (multer) to upload files"
keywords: ["nestjs", "upload file", "nestjs multer"]
categories: ["frameworks", "nestjs"]
tags: ["nestjs"]
image: "/common/no-image.png"
---

In the last topic, we've already learn how to upload file with Multer.
In this post, I wanna share with you the NestJS's best practice to upload file.

Firstly, we need to install type safe for multer in case you didn't.

```bash
npm i -D @types/multer
```

In real world projects, we may have to allow user upload a single file or multiple files.
With multer we need to define with the target route, we will upload single or multiple.

```ts
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import * as multer from "multer";

const getMyStorage = (destination = "./public/data/uploads") => {
  return multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, destination);
    },
    filename: function (req, file, cb) {
      // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, `${file.originalname}`);
    },
  });
};

const getMyFileFilter = function (req, file, cb) {
  const allowedMimes = [
    "image/jpeg",
    "image/pjpeg",
    "image/png",
    "application/pdf",
  ];
  if (!allowedMimes || allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      {
        success: false,
        code: "invalid_file_type",
        message: "Invalid file type. Only jpg, png image files are allowed.",
      },
      false
    );
  }
};

const MulterMiddleware = (
  multerOptions: MulterOptions,
  fieldName = "file",
  single = true
) => {
  const upload = multer({
    storage: getMyStorage(multerOptions.dest),
    fileFilter: getMyFileFilter,
    ...multerOptions,
  });
  return single ? upload.single(fieldName) : upload.array(fieldName);
};

export default MulterMiddleware;
```

NestJS has a built-in module which use Multer. So that in concept, it will work in the same way.

Let's dive into details

## Let's make an example to upload a single file

In the official doc, an article about this introduce with us 2 annotation:

1. FileInterceptor : attach multer to handle file upload
2. UploadedFile : extract file from request

```ts

```
