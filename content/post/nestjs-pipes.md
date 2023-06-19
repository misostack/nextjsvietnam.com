---
title: "Nestjs Pipes"
type: "post"
date: 2022-08-04T10:46:09+07:00
description: "Nest interposes a pipe just before a method is invoked, and the pipe receives the arguments destined for the method and operates on them"
keywords: ["nestjs", "dto", "validation"]
categories: ["nestjs", "frameworks"]
tags: ["nestjs"]
image: "https://user-images.githubusercontent.com/31009750/181449337-70081a76-5a01-4229-805e-39ed0ded6b5b.png"
---

**Note**: All of demo source code you can find our in github [nestjs boilerplate](https://github.com/misostack/finance.api.sonnm.com)

**What is Pipe?**

> A pipe is a class annotated with the @Injectable() decorator, which implements the PipeTransform interface

> Pipes operate on the arguments being processed by a controller route handler.

> Nest interposes a pipe just before a method is invoked, and the pipe receives the arguments destined for the method and operates on them

So that, we can use pipes in two typical use cases:

1. Transformation : transform input data to the desired form
2. Validation : evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception when the data is incorrect

> Let's get back to our example

In NestJS we have some built-in pipes for transformation

1. ValidationPipe

> Let's dive into this example

```json
{
    "title": {
        "dataType": string,
        "required": true,
        "maxLength": 75,
        "minLength": 1,
    },
    "description": {
        "dataType": string,
        "required": false,
        "maxLength": 160,
    },
    "content": {
        "dataType": string,
        "required": false
    },
    "status": {
        "dataType": enum,
        "required": false,
        "default": 1,
        "enum": {pending:1, published:2, archived:3}, // can not be archived when creating
    },
    "tags": {
        "dataType": Array[string],
        "required": false,
        "arrayMaxLength": 5,
        "eachValidation": {
            "minLength": 3,
            "maxLength": 10,
        }
    }
}
```

> Steps

- [x] Install the required packages: [class-validator and class transformer](/post/nestjs-validate-request-input-in-nestjs)
- [x] Create DTO class and defined constraints
- [x] Use Pipe

**You need to install the required packages before going further**

```bash
npm i --save class-validator class-transformer
```

> **DTO** : A **D**ata **T**ransfer **O**bject is an object that is used to encapsulate data, and send it from one subsystem of an application to another

```ts
import { IsNotEmpty, IsOptional, MaxLength } from "class-validator";

export enum ExampleStatus {
  pending = 1,
  published = 2,
  archived = 3,
}

export class ExampleDTO {
  @MaxLength(75)
  @IsNotEmpty()
  title: string;

  @IsOptional()
  description = "";
  @IsOptional()
  content = "";
  @IsOptional()
  status: ExampleStatus = ExampleStatus.pending;
  @IsOptional()
  tags: Array<string> = [];

  note = "";
}
```

**Using it**

```ts
import {
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Post('built-in-pipes/example-validation-pipe')
@UsePipes(
  new ValidationPipe({
    skipMissingProperties: false,
    stopAtFirstError: true,
  }),
)
exampleValidationPipe(@Body() exampleDTO: ExampleDTO) {
  return { exampleDTO };
}
```

**If all validation were passed**

![image](https://user-images.githubusercontent.com/31009750/182997559-45641111-42a9-42b0-baff-a55e0901bd80.png)

> Let's adjust ExampleDTO to match the defined schema above

```ts
import {
  ArrayMaxSize,
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from "class-validator";

export enum ExampleStatus {
  pending = 1,
  published = 2,
  archived = 3,
}

export class ExampleDTO {
  @MaxLength(75)
  @IsNotEmpty()
  title: string;

  @MaxLength(160)
  @IsOptional()
  description = "";

  @IsOptional()
  content = "";

  @IsEnum(ExampleStatus)
  @IsOptional()
  status: ExampleStatus = ExampleStatus.pending;

  @MinLength(3, { each: true })
  @MaxLength(10, { each: true })
  @ArrayMaxSize(5)
  @IsArray()
  @IsOptional()
  tags: Array<string> = [];

  note = "";
}
```

**If we got errors**

![image](https://user-images.githubusercontent.com/31009750/182998825-4805544d-044b-4a4b-9670-2f6ad66610a3.png)

> The Exception that it will raise have this structure

![image](https://user-images.githubusercontent.com/31009750/182999177-9836a933-2b78-4ec7-b8cd-265f5dec4c94.png)

**When making a RESTful API application, the 1st rule you wanna have is "Uniform Interface"**

In this case, we want to have a uniform for error response which supports the application can highlight the field that got an error with : errorCode and errorMessage. So in this case we must adjust the error response from validation pipe. Can we do in the **exception filter layer**? Possible but it is too dirty and we will get some side effects and unexpected error if we dont' handle enough case.

**Our solution is very simple**: Create your **Custom Validation Pipe**

```ts
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate, ValidatorOptions } from "class-validator";

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  _validatiorOptions: ValidatorOptions;
  constructor(validatorOptions: Partial<ValidatorOptions>) {
    this._validatiorOptions = {
      ...validatorOptions,
    };
  }
  async transform(value: any, args: ArgumentMetadata) {
    const { metatype } = args;
    console.error({ value });
    console.error({ metatype });
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    // Pass `skipMissingProperties` as part of the custom validation
    const errors = await validate(object, this._validatiorOptions);
    if (errors.length > 0) {
      throw new BadRequestException({
        message: "Bad Request",
        errors,
        code: "HttpStatus.BAD_REQUEST",
      });
    }
    return value;
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

// Usage

@Post('built-in-pipes/example-validation-pipe')
@UsePipes(
  new CustomValidationPipe({
    skipMissingProperties: false,
    stopAtFirstError: true,
  }),
)
exampleValidationPipe(@Body() exampleDTO: ExampleDTO) {
  return { exampleDTO };
}
```

**What we have now**

```json
{
  "message": "Bad Request",
  "code": "HttpStatus.BAD_REQUEST",
  "errors": [
    {
      "target": {
        "description": "",
        "content": "",
        "status": 1,
        "tags": ["a"],
        "note": "",
        "title": ""
      },
      "value": "",
      "property": "title",
      "children": [],
      "constraints": {
        "isNotEmpty": "title should not be empty"
      }
    },
    {
      "target": {
        "description": "",
        "content": "",
        "status": 1,
        "tags": ["a"],
        "note": "",
        "title": ""
      },
      "value": ["a"],
      "property": "tags",
      "children": [],
      "constraints": {
        "minLength": "each value in tags must be longer than or equal to 3 characters"
      }
    }
  ]
}
```

It's better right, but it is still too much information. We can transform this object into a smaller and better format like this.

```json
{
  "message": "Bad Request",
  "code": "HttpStatus.BAD_REQUEST",
  "errors": [
    {
      "property": "title",
      "constraints": {
        "isNotEmpty": "title should not be empty"
      }
    }
  ]
}
```

```ts
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { validate, ValidationError, ValidatorOptions } from "class-validator";

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {
  _validatiorOptions: ValidatorOptions;
  constructor(validatorOptions: Partial<ValidatorOptions>) {
    this._validatiorOptions = {
      ...validatorOptions,
    };
  }
  async transform(value: any, args: ArgumentMetadata) {
    const { metatype } = args;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    // Pass `skipMissingProperties` as part of the custom validation
    const errors = await validate(object, this._validatiorOptions);
    if (errors.length > 0) {
      throw new BadRequestException({
        message: "Bad Request",
        errors: errors.map((error) => this.transformError(error)),
        code: "HttpStatus.BAD_REQUEST",
      });
    }
    return value;
  }

  private transformError(error: ValidationError) {
    const { property, constraints } = error;
    return {
      property,
      constraints,
    };
  }

  private toValidate(metatype: any): boolean {
    const types: any[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
```

And

```json
{
  "message": "Bad Request",
  "code": "HttpStatus.BAD_REQUEST",
  "errors": [
    {
      "property": "title",
      "constraints": {
        "isNotEmpty": "title should not be empty"
      }
    },
    {
      "property": "tags",
      "constraints": {
        "maxLength": "each value in tags must be shorter than or equal to 10 characters"
      }
    }
  ]
}
```

## Advanced

1. But we have to add these lines for all action

```ts
  @UsePipes(
    new CustomValidationPipe({
      skipMissingProperties: false,
      stopAtFirstError: true,
    }),
  )
```

> Don't worry, nestjs support us to add a pipe globally. Basically, we've only have to do like this

```ts
// DATA VALIDATIONS
app.useGlobalPipes(
  new CustomValidationPipe({
    skipMissingProperties: false,
    stopAtFirstError: false,
  })
);
```

> But, personally, I don't recommend this option. Because "global pipes registered from outside of any module "

**We can set up a global pipe directly from any module using the following construction:**

```ts
@Module({
  imports: [ExampleModule],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
    {
      provide: APP_PIPE,
      useFactory: () => {
        return new CustomValidationPipe({
          skipMissingProperties: false,
          stopAtFirstError: false,
        });
      },
    },
  ],
})
export class AppModule implements NestModule {}
```

> It's more clean right, and you can use the power of Dependency Injection if your validation pipe depends on the other providers
