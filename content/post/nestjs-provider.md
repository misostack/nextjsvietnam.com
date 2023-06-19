---
title: "Nestjs Provider"
type: "post"
date: 2022-07-28T14:41:08+07:00
description: "Providers are plain JavaScript classes that are declared as providers in a module"
keywords: ["Nestjs Provider"]
categories: ["nestjs", "frameworks"]
tags: ["nestjs"]
image: "https://user-images.githubusercontent.com/31009750/181449337-70081a76-5a01-4229-805e-39ed0ded6b5b.png"
---

**Note**: All of demo source code you can find our in github [nestjs boilerplate](https://github.com/misostack/finance.api.sonnm.com)

**Many of the basic Nest classes may be treated as a provider:**

- Services
- Repositories
- Factories
- Helpers

**The main idea of a provider is that it can be injected as a dependency**

> This means NestJS will be act as a container and creating relationship between objects and wire them up at runtime

**When creating a provider, we should consider these aspects**

- [x] Dependency Inject
- [x] Scopes
- [x] Custom provider
- [x] Optional providers

## Using service provider in controller

**Creating service**

> **@Injectable()** : injectable decorator

```ts
export interface Example {
  id: string;
  title: string;
  keywords?: Array<string>;
  content: string;
  tags: Array<string>;
  createdAt: Date;
  updatedAt: Date;
}

import { Example } from "./../interfaces/example.interface";
import { Injectable } from "@nestjs/common";
import { v4 as uuidv4 } from "uuid";

@Injectable()
export class ExampleService {
  static initialTimes = 0;
  constructor() {
    ExampleService.initialTimes++;
    console.log(
      `initExampleService times: ${ExampleService.initialTimes} `,
      new Date().toISOString()
    );
  }
  create(payload: Partial<Example>): Example {
    const now = new Date();
    return {
      id: uuidv4(),
      title: "",
      keywords: [],
      content: "",
      tags: [],
      createdAt: now,
      updatedAt: now,
      ...payload,
    };
  }
}
```

**Register as a module's provider**

```ts
import { Module } from "@nestjs/common";
import { ExamplesController } from "./controllers/examples.controller";
import { ExampleService } from "./services/example.service";

@Module({
  controllers: [ExamplesController],
  providers: [ExampleService], // add service to module's providers
})
export class ExampleModule {}
```

**Use**

```ts
import { Example } from "./../interfaces/example.interface";
import { ExampleService } from "./../services/example.service";
import { Controller, Post } from "@nestjs/common";
import { Body } from "@nestjs/common";

@Controller("examples")
export class ExamplesController {
  constructor(private exampleService: ExampleService) {}

  @Post("")
  create(@Body() payload): Example {
    const example: Example = this.exampleService.create(payload);
    return example;
  }
}
```

## Understand scopes

> Providers normally have a lifetime ("scope") synchronized with the application lifecycle. When the application is bootstrapped, every dependency must be resolved, and therefore every provider has to be instantiated

**There are 3 type of scopes**

- DEFAULT : A single instance of the provider is shared across the entire application
- REQUEST : A new instance of the provider is created exclusively for each incoming request
- TRANSIENT: Transient providers are not shared across consumers. Each consumer that injects a transient provider will receive a new, dedicated instance

> Let's do some test

**DEFAULT** scope

```bash
[Nest] 13408  - 07/28/2022, 3:54:44 PM     LOG [NestFactory] Starting Nest application...
initExampleService times: 1  2022-07-28T08:54:44.622
```

**REQUEST** scope

```bash
[Nest] 16160  - 07/28/2022, 3:57:00 PM     LOG [RouterExplorer] Mapped {/examples/:id, GET} route +2ms
[Nest] 16160  - 07/28/2022, 3:57:00 PM     LOG [RouterExplorer] Mapped {/examples, POST} route +1ms
[Nest] 16160  - 07/28/2022, 3:57:00 PM     LOG [RouterExplorer] Mapped {/examples/:id, PATCH} route +2ms
[Nest] 16160  - 07/28/2022, 3:57:00 PM     LOG [RouterExplorer] Mapped {/examples/:id, DELETE} route +2ms
[Nest] 16160  - 07/28/2022, 3:57:00 PM     LOG [NestApplication] Nest application successfully started +5ms
initExampleService times: 1  2022-07-28T08:57:24.453Z
initExampleService times: 2  2022-07-28T08:57:28.310Z
initExampleService times: 3  2022-07-28T08:57:32.456Z
initExampleService times: 4  2022-07-28T08:57:36.250Z
initExampleService times: 5  2022-07-28T08:57:39.503Z
```

**TRANSIENT** scope

> Let's create a new controller and use the ExampleService

```ts
import { ExampleService } from "./../services/example.service";
import { Controller } from "@nestjs/common";

@Controller("example-groups")
export class ExampleGroupsController {
  constructor(private exampleService: ExampleService) {}
  index() {
    return [];
  }
}
```

**And we got**

```bash
[Nest] 19024  - 07/28/2022, 4:02:46 PM     LOG [NestFactory] Starting Nest application...
[Nest] 19024  - 07/28/2022, 4:02:46 PM     LOG [InstanceLoader] AppModule dependencies initialized +63ms
[Nest] 19024  - 07/28/2022, 4:02:46 PM     LOG [InstanceLoader] GoldModule dependencies initialized +0ms
initExampleService times: 1  2022-07-28T09:02:46.846Z
initExampleService times: 2  2022-07-28T09:02:46.847Z
```

## Custom provider

> There are several ways to define a provider: you can use plain **values**, **classes**, and either **asynchronous** or **synchronous factories**

**Standard Provider**

```ts
import { Module } from "@nestjs/common";
import { ExamplesController } from "./controllers/examples.controller";
import { ExampleService } from "./services/example.service";

@Module({
  controllers: [ExamplesController],
  providers: [ExampleService], // add service to module's providers
})
export class ExampleModule {}

// is the short-hand of

providers: [
  {
    provide: ExampleService,
    useClass: ExampleService,
  },
];
```

**Why do we need a customer provider?**

- You want to create a custom instance instead of having Nest instantiate (or return a cached instance of) a class
- You want to re-use an existing class in a second dependency
- You want to override a class with a mock version for testing

**How do we export custom providers for usage?**

> Like any provider, a custom provider is scoped to its declaring module. To make it visible to other modules, it must be exported. To export a custom provider, we can either use **its token** or the **full provider object**

> **Token Example**

```ts
const connectionFactory = {
  provide: "CONNECTION",
  useFactory: (optionsProvider: OptionsProvider) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [OptionsProvider],
};

@Module({
  providers: [connectionFactory],
  exports: ["CONNECTION"],
})
export class AppModule {}
```

> **Full Object Example**

```ts
const connectionFactory = {
  provide: "CONNECTION",
  useFactory: (optionsProvider: OptionsProvider) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [OptionsProvider],
};

@Module({
  providers: [connectionFactory],
  exports: [connectionFactory],
})
export class AppModule {}
```

**How to To get existing instances, or instantiate providers dynamically?**

> Module Reference

```ts
@Injectable()
export class CatsService implements OnModuleInit {
  private service: Service;
  constructor(private moduleRef: ModuleRef) {}

  onModuleInit() {
    this.service = this.moduleRef.get(Service);
  }
}
```

- https://docs.nestjs.com/fundamentals/module-ref => will have another post for this

### Value providers

> Using the same example. In this case uuid + now is generated at run time and different for each test. So the only way to test it is creating a mock of ExampleService.

```ts
    providers: [
    {
        provide: ExampleService,
        useValue: mockExampleService,
    },
    ],
```

```ts
import { ExampleService } from "./../services/example.service";
import { Test, TestingModule } from "@nestjs/testing";
import { ExamplesController } from "./examples.controller";
import { Example } from "@modules/example/interfaces/example.interface";
import { v4 as uuidv4 } from "uuid";

const mockExampleService = {
  /* mock implementation
  ...
  */
  create(payload: Partial<Example>): Example {
    const now = new Date("2022-07-28T08:59:02.246Z");
    return {
      id: "1170b8c2-630a-4ad6-842d-ac7255213cf6",
      title: "example 1",
      keywords: ["example"],
      content: "example",
      tags: ["nestjs"],
      createdAt: now,
      updatedAt: now,
      ...payload,
    };
  },
};

describe("ExamplesController", () => {
  let controller: ExamplesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExamplesController],
      providers: [
        {
          provide: ExampleService,
          useValue: mockExampleService,
        },
      ],
    }).compile();

    controller = module.get<ExamplesController>(ExamplesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("Create new example", () => {
    it("should create a new example successfully if data is valid", () => {
      const now = new Date("2022-07-28T08:59:02.246Z");
      const responseValue = controller.create({
        title: "example 1",
        keywords: ["example"],
        content: "example",
        tags: ["nestjs"],
      });
      const expectedValue = {
        id: "1170b8c2-630a-4ad6-842d-ac7255213cf6",
        title: "example 1",
        keywords: ["example"],
        content: "example",
        tags: ["nestjs"],
        createdAt: now,
        updatedAt: now,
      };
      expect(responseValue).toMatchObject(expectedValue);
    });
  });
});
```

### Non-class-based provider tokens

> So far, we've used class names as our provider tokens (the value of the provide property in a provider listed in the providers array). This is matched by the standard pattern used with **constructor based injection**, where the **token is also a class name**

> Sometimes, we may want the flexibility to use **strings or symbols as the DI token**

```ts
import dataProviders from "./providers";
import { Scope } from "@nestjs/common";
import { DynamicModule } from "@nestjs/common";

export const MONGODB_URL = Environment.getConfigValues().MONGODB_URL;
export const mongooseOptions: MongooseOptions = { autoCreate: true };

export const databaseProviders = [
  {
    scope: Scope.DEFAULT,
    provide: "DatabaseConnection",
    useFactory: async () =>
      await mongoose.connect(MONGODB_URL, mongooseOptions),
  },
  ...dataProviders,
];

console.log("MONGODB_URL", MONGODB_URL);

@Module({
  imports: [],
  providers: databaseProviders,
  exports: databaseProviders,
})
export class DatabaseModule {}
```

#### [NestJS Mongoose](https://github.com/nestjs/mongoose/blob/69d14845450a7675352e3202701bc7827fd1c583/lib/common/mongoose.utils.ts#L13)

```ts
export function getConnectionToken(name?: string) {
  return name && name !== DEFAULT_DB_CONNECTION
    ? `${name}Connection`
    : DEFAULT_DB_CONNECTION;
}

const mongooseConnectionFactory =
  connectionFactory || ((connection) => connection);
const mongooseConnectionName = getConnectionToken(connectionName);

const mongooseConnectionNameProvider = {
  provide: MONGOOSE_CONNECTION_NAME,
  useValue: mongooseConnectionName,
};
const connectionProvider = {
  provide: mongooseConnectionName,
  useFactory: async (): Promise<any> =>
    await lastValueFrom(
      defer(async () =>
        mongooseConnectionFactory(
          await mongoose.createConnection(uri, mongooseOptions).asPromise(),
          mongooseConnectionName
        )
      ).pipe(handleRetry(retryAttempts, retryDelay))
    ),
};
return {
  module: MongooseCoreModule,
  providers: [connectionProvider, mongooseConnectionNameProvider],
  exports: [connectionProvider],
};
```

**Custom injection key for connection**

```ts
import { Module } from "@nestjs/common";
import { MongooseModule, MongooseModuleOptions } from "@nestjs/mongoose";
import mongoose, { MongooseOptions } from "mongoose";
import { Environment } from "@config/environment";

import dataProviders from "./providers";
import { Scope } from "@nestjs/common";
import { DynamicModule } from "@nestjs/common";

export const MONGODB_URL = Environment.getConfigValues().MONGODB_URL;
export const mongooseOptions: MongooseModuleOptions = {
  autoCreate: true,
  connectionName: "Default",
};

export const databaseProviders = [...dataProviders];

@Module({
  imports: [MongooseModule.forRoot(MONGODB_URL, mongooseOptions)],
  providers: databaseProviders,
  exports: databaseProviders,
})
export class DatabaseModule {}

// usage
@Inject('DefaultConnection')
private connection: Connection,
```

### Class providers: useClass

> The useClass syntax allows you to dynamically determine a class that a token should resolve to

```ts
const configServiceProvider = {
  provide: ConfigService,
  useClass:
    process.env.NODE_ENV === "development"
      ? DevelopmentConfigService
      : ProductionConfigService,
};

@Module({
  providers: [configServiceProvider],
})
export class AppModule {}
```

### Factory providers: useFactory

> The useFactory syntax allows for creating providers dynamically. The actual provider will be supplied by the value returned from a factory function. The factory function can be as simple or complex as needed

Sometimes, you may need to create a provider that depends on others, so using Factory is a best approach here.

```ts
const connectionProvider = {
  provide: "CONNECTION",
  useFactory: (optionsProvider: OptionsProvider, optionalProvider?: string) => {
    const options = optionsProvider.get();
    return new DatabaseConnection(options);
  },
  inject: [OptionsProvider, { token: "SomeOptionalProvider", optional: true }],
  //       \_____________/            \__________________/
  //        This provider              The provider with this
  //        is mandatory.              token can resolve to `undefined`.
};

@Module({
  providers: [
    connectionProvider,
    OptionsProvider,
    // { provide: 'SomeOptionalProvider', useValue: 'anything' },
  ],
})
export class AppModule {}
```

### Alias providers : useExisting

> The useExisting syntax allows you to create aliases for existing providers. This creates two ways to access the same provider. In the example below, the (string-based) token 'AliasedLoggerService' is an alias for the (class-based) token LoggerService. If both dependencies are specified with SINGLETON scope, they'll both resolve to the same instance.

```ts
@Injectable()
class LoggerService {
  /* implementation details */
}

const loggerAliasProvider = {
  provide: "AliasedLoggerService",
  useExisting: LoggerService,
};

@Module({
  providers: [LoggerService, loggerAliasProvider],
})
export class AppModule {}
```

### Non-service based providers

```ts
const configFactory = {
  provide: "CONFIG",
  useFactory: () => {
    return process.env.NODE_ENV === "development" ? devConfig : prodConfig;
  },
};

@Module({
  providers: [configFactory],
})
export class AppModule {}
```

### [Custom provider References](https://docs.nestjs.com/fundamentals/custom-providers)

## Optional providers

> Occasionally, you might have dependencies which do not necessarily have to be resolved. For instance, your class may depend on a configuration object, but if none is passed, the default values should be used. In such a case, the dependency becomes optional, because lack of the configuration provider wouldn't lead to errors.

```ts
import { Injectable, Optional, Inject } from "@nestjs/common";

@Injectable()
export class HttpService<T> {
  constructor(@Optional() @Inject("HTTP_OPTIONS") private httpClient: T) {}
}
```

## Property-based injection

> The technique we've used so far is called constructor-based injection, as providers are injected via the constructor method. In some very specific cases, property-based injection might be useful. For instance, if your top-level class depends on either one or multiple providers, passing them all the way up by calling super() in sub-classes from the constructor can be very tedious. In order to avoid this, you can use the @Inject() decorator at the property level.

```ts
import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class HttpService<T> {
  @Inject("HTTP_OPTIONS")
  private readonly httpClient: T;
}
```

## Final

> It is up to you for choosing the right recipes for your application. Thanks for reading and have good day :))
