---
title: "Build Restful Api With Nestjs the Right Way"
type: "post"
date: 2022-10-14T14:26:07+07:00
description: "The hands-on NestJS tutorial to build a standard Restful API"
keywords: ["nestjs", "dto", "validation"]
categories: ["frameworks"]
tags: ["nestjs"]
image: "https://user-images.githubusercontent.com/31009750/181449337-70081a76-5a01-4229-805e-39ed0ded6b5b.png"
---

> Foreword

If you are new with NestJS or you have been worked with it for several projects, this post is for you. In this article, I'll share with you the real world process to build a Restful API from scratch with NestJS

Okie, let's start. Imagination, we've already have detail specifications.
This is our requirements in this sample:

Create Restful API for a image storage service that allow:

1. Users can register to the system. They need to verify their account before using it (via email).
2. Users can only use the system if they have an active account
3. Users can upload images with png,jpg,jpeg format. The maximum size is 5MB
4. User's images won't be public unless they created a shared link and share with other people.
5. User's images can be used on other websites
6. A user has maximum 100 images.
7. A system will delete unused image(unused more than 1 year) automatically every weekends.

Infrastructure requirements:

1. Local : Local Docker
2. Staging: Run on VM with Docker
3. Production: Host everything on AWS

First of all, we need to write down what we have to do.

- [x] Install NestJS CLI
- [x] Setup your dev tools: vscode, config for debug, code linter
- [x] Design source code structure: seperate them into layers
- [x] Setup your local docker (database only)
- [x] Setup your application's configuration
- [x] Setup data access layer and configuration
- [x] Business Layer: define business models: inputModels, outputModels
- [x] Presentation Layer: define controllers
- [x] Presentation Layer: integrate data validation from business models
- [x] Business Layer: define business service
- [x] Presentation Layer: integrate with business layer
- [x] Presentation Layer: create swagger - the api document
- [x] Persistence Layer: define database's entities, create and run migration scripts, seeds
- [x] Persistence Layer: define repositories
- [x] Business Layer: integrate repository with business layer
- [x] Setup your staging docker: dockerfile, docker compose, setup scripts
- [x] Setup your CI/CD flow and setup on your staging
- [x] Design and setup AWS Infrastructure

### And assume that we already have the high level designs

![File Storage API](/documents/file-storage-api.png)

![File Storage API Entities](/documents/file-storage-api-entities.png)

![File Storage API Endpoints](/documents/file-storage-api-endpoints.png)

## Step 1 : Install NestJS CLI

```bash
npm i -g @nestjs/cli
nest new your-project-name
```

## Step 2: Setup your dev tools

1. How to debug NestJS in VSCode?

> .vscode/launch.json

```json
{
  "configurations": [
    {
      "name": "Debug API",
      "type": "node",
      "program": "${workspaceFolder}/src/application/api/main.ts",
      "runtimeArgs": [
        "-r",
        "ts-node/register",
        "-r",
        "tsconfig-paths/register"
      ],
      "console": "integratedTerminal",
      "request": "launch",
      "skipFiles": ["<node_internals>/**"],
      "outFiles": ["${workspaceFolder}/**/*.js", "!**/node_modules/**"]
    },
    {
      "name": "Debug remote api",
      "type": "node",
      "request": "attach",
      "remoteRoot": "/app",
      "localRoot": "${workspaceFolder}",
      "port": 9229,
      "restart": true,
      "address": "0.0.0.0",
      "skipFiles": ["<node_internals>/**"]
    }
  ]
}
```

> Debug main app (file storage api)

F5 -> Select Debug API

Make sure your program path is your api's main file

> Eg: "program": "${workspaceFolder}/src/application/api/main.ts",

> Debug remote

Example: Start app in debug mode - debugger port 9229

F5 -> Select Debug remote API

```bash
npm run start:debug
```

## Step 3: Design source code structure

**Overview layers**

![File Storage API clean architecture layer](/documents/file-storage-api-clean-architecture.png)

1. solutions
   - deployment -> deployment scripts, dockerfiles, k8s, ...
2. src

- src/application -> applications: file-storage-api, web, queues, ...
- src/domain -> Tables mapping
- src/business -> Business logic
- src/share -> Share/Common projects
- src/persistence -> TypeORM Core
- src/tool -> tools: migration data

3. test -> test configuration

**domain layer**
![File Storage API business layer](/documents/file-storage-api-domain-layer.png)

**application layer**
![File Storage API application layer](/documents/file-storage-api-application-layer.png)

**business layer**
![File Storage API business layer](/documents/file-storage-api-business-layer.png)

**persistence layer**
![File Storage API persistence layer](/documents/file-storage-api-persistence-layer.png)

**config layer**
![File Storage API config layer](/documents/file-storage-api-config-layer.png)

**Example domain layer**

```ts
// src/domain/base.entity.ts
export abstract class BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

// src/domain/user/user.entity.ts
import { UserSns } from "./user-sns.entity";
import { BaseEntity } from "../base.entity";
export enum UserType {
  admin = "admin",
  user = "user",
}

export class UserEntity extends BaseEntity {
  fullname: string;
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  userType: UserType;
  snsAccounts?: UserSns[] = [];
  avatar: string;
  maximumFiles: number;
  totalFiles: number;
}

// src/domain/user/user-sns.entity.ts
import { UserEntity } from "./user.entity";
import { BaseEntity } from "../base.entity";

export enum SnsType {
  FACEBOOK = "facebook",
  GOOGLE = "google",
  LINKEDIN = "linkedin",
  TWITTER = "twitter",
  INSTAGRAM = "instagram",
}

export class UserSns extends BaseEntity {
  snsType: SnsType;
  snsId: string;
  authorizedDate: Date;
  // relationship
  user: UserEntity;
}
```

**Example application layer**

```ts
// src/application/api/api.module.ts
import { Module } from "@nestjs/common";

import { ExampleModule } from "./example/example.module";
import { UserModule } from "./user/user.module";
import { FileModule } from "./file/file.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [ExampleModule, UserModule, FileModule, AuthModule],
  controllers: [],
  providers: [],
})
export class ApiModule {}

// src/application/api/example/example.module.ts
import { Module } from "@nestjs/common";
import { ExampleController } from "./controllers/example.controller";

@Module({
  controllers: [ExampleController],
})
export class ExampleModule {}

// src/application/api/example/controllers/example.controller.ts
import { Controller } from "@nestjs/common";

@Controller("examples")
export class ExampleController {}
```

**Example persistence layer**

In this example, i will use typeorm as our main ORM and MYSQL as main database

```bash
npm install --save @nestjs/typeorm typeorm mysql2
```

**Install and use typeorm cli**

```bash
npm install ts-node --save-dev
```

```ts
// src/persistence/database/entities/Example.ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Example {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;
}

// src/config/configuration/index.ts
import { MYSQL_DB_URI } from "@config/environment";
import { TypeOrmModule } from "@nestjs/typeorm";

export const getTypeORMConfiguration = (entities) => {
  return TypeOrmModule.forRoot({
    type: "mysql",
    url: MYSQL_DB_URI,
    entities,
    synchronize: false,
  });
};

// src/persistence/database/database.module.ts
import { DynamicModule, Module } from "@nestjs/common";
import { getTypeORMConfiguration } from "@config/configuration";
import entities from "./entities";

@Module({})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return getTypeORMConfiguration([entities]);
  }
}
```

> Data Migration

```ts
// src/persistence/database/data-source.ts
import { MYSQL_DB_URI } from "@config/environment";
import { DataSource } from "typeorm";
import entities from "./entities";

export const AppDataSource = new DataSource({
  type: "mysql",
  url: MYSQL_DB_URI,
  synchronize: false,
  logging: false,
  entities,
  migrations: ["./src/persistence/database/migrations/*.ts"],
  subscribers: [],
});
```

```json
  "scripts": {
    "typeorm": "typeorm-ts-node-commonjs --dataSource ./src/persistence/database/data-source.ts",
    "typeorm:migration:generate": "typeorm-ts-node-commonjs migration:generate --dataSource ./src/persistence/database/data-source.ts",
    "typeorm:migration:create": "typeorm-ts-node-commonjs migration:create"
  },
```

> generate migration script

```bash
npm run typeorm:migration:generate ./src/persistence/database/migrations/migration-script-name
```

> create migration script

```bash
npm run typeorm:migration:create ./src/persistence/database/migrations/migration-script-name
```

> show migration

```bash
npm run typeorm migration:show
npm run typeorm migration:run
npm run typeorm migration:revert
```

**Example config layer**

```ts
// src/config/environment/index.ts
import * as dotenv from "dotenv";
// LOAD process's enviroment variables
dotenv.config();
// REQUIRED VARIABLES
const REQUIRED_VARIABLES = ["NODE_ENV", "MYSQL_DB_URI"];
/*
Log level:
- fatal
- error
- warn
- info
- verbose
- debug
*/
export const LOG_LEVEL = process.env.LOG_LEVEL;
export const ERROR_LOG_PATH =
  process.env.ERROR_LOG_PATH || "logs/server-errors.log";
export const LOG_PATH = process.env.LOG_PATH || "logs/server.log";

export const validateRequiredEnviromentVariables = () => {
  const missingKeys = [];
  REQUIRED_VARIABLES.map((requiredKey) => {
    if (!process.env[requiredKey]) {
      missingKeys.push(requiredKey);
    }
  });
  if (missingKeys.length > 0) {
    console.log(missingKeys);
    missingKeys.map((key, index) => {
      console.error(`${index + 1}. Missing ${key} !!!`);
    });
    process.exit(1);
  }
};

export const NODE_ENV = process.env.NODE_ENV;
export const MYSQL_DB_URI = process.env.MYSQL_DB_URI;

validateRequiredEnviromentVariables();

// src/config/configuration/index.ts
import { MYSQL_DB_URI } from "@config/environment";
import { TypeOrmModule } from "@nestjs/typeorm";

export const getTypeORMConfiguration = (entities) => {
  return TypeOrmModule.forRoot({
    type: "mysql",
    url: MYSQL_DB_URI,
    entities,
    synchronize: false,
  });
};

// src/config/log/index.ts
import { ConsoleLogger, Optional } from "@nestjs/common";
import * as dayjs from "dayjs";
import * as utc from "dayjs/plugin/utc";
import {
  configure,
  getLogger,
  Layout,
  Logger as Log4js,
  LoggingEvent,
} from "log4js";
import { ERROR_LOG_PATH, LOG_LEVEL, LOG_PATH } from "@config/environment";

// Fix timezone
dayjs.extend(utc);

export const log4jLayout = (isConsole = false): Layout => {
  return {
    type: "pattern",
    pattern: isConsole
      ? "%[[%x{startTime}] [%p] [%c] -%] %m"
      : "[%x{startTime}] [%p] [%c] - %m",
    tokens: {
      startTime: (logEvent: LoggingEvent) =>
        dayjs.utc(logEvent.startTime).format(),
    },
  };
};

configure({
  appenders: {
    Server: {
      type: "dateFile",
      maxLogSize: 52428800,
      numBackups: 20,
      filename: LOG_PATH,
      layout: log4jLayout(),
      pattern: "yyyy-MM-dd",
      compress: true,
    },
    serverError: {
      type: "dateFile",
      maxLogSize: 52428800,
      numBackups: 20,
      filename: ERROR_LOG_PATH,
      layout: log4jLayout(),
      pattern: "yyyy-MM-dd",
      compress: true,
    },
    serverLogFilter: {
      type: "logLevelFilter",
      appender: `serverError`,
      level: "error",
    },
    console: {
      type: "console",
      layout: log4jLayout(true),
    },
  },
  categories: {
    default: {
      appenders: ["Server", "serverLogFilter", "console"],
      level: LOG_LEVEL,
    },
  },
});

export class Logger extends ConsoleLogger {
  logger: Log4js;
  constructor(
    @Optional() protected context?: string,
    @Optional() protected options: { timestamp?: boolean } = {}
  ) {
    super();
    this.logger = getLogger("Server");
  }

  log(message: any, ...optionalParams: any[]): void {
    optionalParams = this.context
      ? optionalParams.concat(this.context)
      : optionalParams;
    this.logger.info(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]): void {
    optionalParams = this.context
      ? optionalParams.concat(this.context)
      : optionalParams;
    this.logger.error(message, ...optionalParams);
  }

  warn(message: any, ...optionalParams: any[]): void {
    optionalParams = this.context
      ? optionalParams.concat(this.context)
      : optionalParams;
    this.logger.warn(message, ...optionalParams);
  }

  debug(message: any, ...optionalParams: any[]): void {
    optionalParams = this.context
      ? optionalParams.concat(this.context)
      : optionalParams;
    this.logger.debug(message, ...optionalParams);
  }
}
// Reference from : [Ho Nguyen Dang Khoa] - https://www.linkedin.com/in/ho-nguyen-dang-khoa-63b387187/

// src/application/api/main.ts
import { Logger } from "@config/log";
import { NestFactory } from "@nestjs/core";
import { ApiModule } from "./api.module";

async function bootstrap() {
  const app = await NestFactory.create(ApiModule, {
    logger: new Logger(), // overwrite default Logger
  });

  await app.listen(3000);
}
bootstrap();

// usage
import { Controller, Get, Logger } from "@nestjs/common";

@Controller("auth")
export class AuthController {
  @Get("")
  index() {
    Logger.error("test auth log");
  }
}
```
