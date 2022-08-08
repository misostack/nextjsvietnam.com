---
title: "Nestjs Request and Response Object"
type: "post"
date: 2022-08-05T10:06:04+07:00
description: "As you've known, in a request we will have Route Params, Query Params, Body, Headers ..."
keywords: ["nestjs", "request", "response", "express"]
categories: ["frameworks"]
tags: ["nestjs"]
image: "https://user-images.githubusercontent.com/31009750/181449337-70081a76-5a01-4229-805e-39ed0ded6b5b.png"
---

**Note**: All of demo source code you can find our in github [nestjs boilerplate](https://github.com/misostack/finance.api.sonnm.com)

As you've known, in a request we will have:

- Route Params ( included in URL )
- Query Params ( included in URL )
- Body ( json/form-data/multipart/form-data )

> There are 2 ways to get these values

### Library specific Approach - Express

```ts
import { Controller, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";

@Controller("examples")
export class ExamplesController {
  @Post("request-object/express/:email")
  exampleRequestObjectExpress(@Req() req: Request, @Res() res: Response) {
    const responseData = {
      approach: "express",
      routeParams: req.params,
      queryParams: req.query,
      body: req.body,
      headers: req.headers,
      ip: req.ip,
      ips: req.ips,
      hostname: req.hostname,
      subdomain: req.subdomains,
    };
    res.status(200).json(responseData);
  }
}
```

### Standard using NestJS Decoratos

```ts
import {
  Controller,
  Delete,
  Get,
  Headers,
  Ip,
  Param,
  Patch,
  Post,
  Query,
  Req,
  Res,
} from "@nestjs/common";
import { Body } from "@nestjs/common";
import { Request, Response } from "express";

@Controller("examples")
export class ExamplesController {
  @Post("request-object/standard/:email")
  exampleRequestObjectStandard(
    @Body() body,
    @Query() query,
    @Param("email") email: string,
    @Headers() headers,
    @Ip() ip
  ) {
    const responseData = {
      approach: "standard",
      routeParams: { email },
      queryParams: query,
      body: body,
      headers: headers,
      ip,
    };
    return responseData;
  }
}
```

**It's more clean right? We only have to work with JSON object, NestJS will do serialization part for us**

### But how about uploading files with form-data/multipart?

![image](https://user-images.githubusercontent.com/31009750/182763620-ac27e35a-5a4b-4d3f-9153-0fc98c22c199.png)

**Let's have a look in POST data when a request is trying to upload a file**

![image](https://user-images.githubusercontent.com/31009750/182764168-96dd74f6-0297-47e5-9bb9-56f1c39321f3.png)

> Request is a streaming object

![image](https://user-images.githubusercontent.com/31009750/182773536-4edb3c95-520d-4afc-bf8f-d16adede3224.png)

> So let's do some transformation

```ts
import { Transform } from "stream";
import { createWriteStream } from "fs";

const writeStream = createWriteStream("./tmp/example-write-stream.pdf");
// This will write the stream data into the open file
req.pipe(writeStream);

const myMultipartParser = new Transform({
  transform(buffer, _, done) {
    console.log(buffer);
    console.log("-".repeat(50));
    done();
  },
});
req.pipe(myMultipartParser);
req
  .on("abort", () => res.send({ aborted: 1001 }))
  .on("err", (err) => res.send(err))
  .on("data", (buffer) => {
    console.log("buffer", buffer);
  })
  .on("end", () => {
    console.log("end");
    res.status(200).json({
      body: req.body,
      headers: req.headers,
    });
  });
```

**If we have only one file it is okie to write this stream directly. But if we allow to upload multiple files. It will write into a same file if we don't know how to seperate files based on the stream data. We don't have to invent the wheel**

> In NodeJS Ecosystem, we have 2 big libraries to handle this

- [Formidable](https://www.npmjs.com/package/formidable)
- [Multer](https://www.npmjs.com/package/multer)
- [Form Data](https://www.npmjs.com/package/form-data)

**Let's take a look at example with Formidable and Multer**

## 1. Multer is a middleware, so our approach here is creating a middleware and apply multer

- [x] Check in header if content type is mutipart
- [x] Example for middleware in NestJS
- [x] Apply multer middleware with configuration

```ts
const multipart = /multipart/i.test(req.headers["content-type"]);
```

> Let's create an example for middleware in NestJS

```ts
import { NextFunction, Request, Response } from "express";

const ExampleMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log("[ExampleMiddleware]");
  return next();
};
export default ExampleMiddleware;
```

**And we can use it like this**

```ts
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExampleMiddleware).forRoutes("*");
  }
}
```

**Example with Multer**

```ts
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";
import * as multer from "multer";

const MulterMiddleware = (
  multerOptions: MulterOptions,
  fieldName = "file",
  single = true
) => {
  const upload = multer(multerOptions);
  return single ? upload.single(fieldName) : upload.array(fieldName);
};

export default MulterMiddleware;
export class Environment {
  static getMulterOptions(options: Partial<MulterOptions> = {}): MulterOptions {
    return {
      dest: "./public/data/uploads",
      ...options,
    };
  }
}

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const SINGLE_MULTIPART_ROUTES = [
      "examples/request-object/express/upload-file/multer",
    ];
    const MULTIPLE_MULTIPART_ROUTES = [
      "examples/request-object/express/upload-multiple-file/multer",
    ];
    consumer
      .apply(ExampleMiddleware)
      .forRoutes("*")
      .apply(MulterMiddleware(Environment.getMulterOptions()))
      .forRoutes(...SINGLE_MULTIPART_ROUTES)
      .apply(
        MulterMiddleware(
          Environment.getMulterOptions({
            limits: {
              fileSize: 1024 * 1024 * 5, // in bytes : 5MB
              files: 2, // maximum files
            },
          }),
          "files",
          false
        )
      )
      .forRoutes(...MULTIPLE_MULTIPART_ROUTES);
  }
}
```

**Does multer support us to save file with custom file name? YES**

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

**It's pretty cool right, and you have to handle errors when multer validation was failed**

Okie, but the error will be thrown in middleware how do we handle? LOL.

**Don't worry**

![image](https://user-images.githubusercontent.com/31009750/182817635-c358897c-ef74-4f42-aede-e415f81e51d6.png)

NestJS provide us something call **Exception filters**, so you can catch and customize your error message before they were sending to client

### Exception Filters

```ts
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";
import { AbstractHttpAdapter, HttpAdapterHost } from "@nestjs/core";
import { MulterError } from "multer";

interface HttpErrorResponse {
  code: string;
  message: string;
  errors?: Array<any>;
}

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  handleHttpException(
    exception: HttpException,
    httpAdapter: AbstractHttpAdapter,
    ctx: HttpArgumentsHost,
    isProduction
  ) {
    const statusCode = exception.getStatus();
    const res = exception.getResponse() as HttpErrorResponse;
    return httpAdapter.reply(
      ctx.getResponse(),
      {
        message: res.message,
        code: (res.code ||= res.message),
        errors: (res.errors ||= null),
      },
      statusCode
    );
  }
  handleMulterException(
    exception: MulterError,
    httpAdapter: AbstractHttpAdapter,
    ctx: HttpArgumentsHost,
    isProduction
  ) {
    return httpAdapter.reply(
      ctx.getResponse(),
      {
        code: exception.code,
        message: isProduction ? exception.message : exception.code,
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST
    );
  }
  catch(exception: unknown, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const isProduction = process.env.NODE_ENV === "production";
    if (exception instanceof HttpException) {
      return this.handleHttpException(
        exception,
        httpAdapter,
        ctx,
        isProduction
      );
    }
    if (exception instanceof MulterError) {
      return this.handleMulterException(
        exception,
        httpAdapter,
        ctx,
        isProduction
      );
    }
    // otherwise
    return httpAdapter.reply(
      ctx.getResponse(),
      {
        message: isProduction
          ? "INTERNAL_SERVER_ERROR"
          : (exception as Error).message + (exception as Error).stack,
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      },
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
}

@Module({
  imports: [],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {}
```

### But this approach has some limitation

- You have more than 1 field for file upload. Eg: You have an entity that has: thumbnail, slide photos, icon
- You wanna have custom message for file size limit and specify which file was reached the limit
- You wanna throw and error if the request does not include files
- You wanna throw a custom error message for file extension validation with error 400/422 ( not 500 as default of MulterError for file extension)

**What is the** [right way to handle uploading files in NestJS](/post/nestjs-upload-files)
