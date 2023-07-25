---
title: "Validate Request Input in Nestjs"
type: "post"
date: 2022-07-29T15:17:27+07:00
description: "It is best practice to validate the correctness of any data sent into a web application"
keywords: ["nestjs", "dto", "validation"]
categories: ["frameworks", "nestjs"]
tags: ["nestjs"]
image: "https://user-images.githubusercontent.com/31009750/181449337-70081a76-5a01-4229-805e-39ed0ded6b5b.png"
---

**Note**: All of demo source code you can find our in github [nestjs boilerplate](https://github.com/misostack/finance.api.sonnm.com)

> It is best practice to validate the correctness of any data sent into a web application

**There are several libraries support us to verify data :**

- [json schema](https://www.npmjs.com/package/jsonschema)
- [joi](https://joi.dev/api/?v=17.6.0#version)
- [validator](https://www.npmjs.com/package/validator)

**And in typescript, we have a special library that support decorator**

- [Class Validator](https://github.com/typestack/class-validator) - internally uses validator.js to perform validation. Class-validator works on both browser and node.js platforms

> Let's dive in class validator usage example. Let's say that we have a requirement for example entity's data like this

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
            "maxLength": 5,
        }
    }
}
```

> Class validator supports 2 ways for validation

### Create your class and put some validation decorators on the properties you want to validate

> In real world projects, the request body will be JSON object, so that you need to create your class object by assign values from JSON object.

```bash
npm install class-validator --save
```

```ts
const postData = {
  title: "hello",
  description: "the greatest post",
  content: "lorem ipsum ...",
};
let post = new Post();
post.title = postData.title;
post.description = postData.description;
post.content = postData.content;
```

**OR**

```ts
let post = new Post(postData);
```

**And in the constructor of this class, you should binding the properties that corresponded with object's values**

Randomly, I've found a library for typescript that support us easily **transform your JSON object into an instance of a class**. It was called **["Class Transformer"](https://github.com/typestack/class-transformer)**

```bash
npm install class-transformer reflect-metadata --save
```

> **Should import this into your main.ts file**

```ts
import "reflect-metadata";
```

**Example of using class-transformer and class-validator**

```ts
import { plainToInstance } from "class-transformer";
import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  registerSchema,
  validate,
  ValidationSchema,
  ValidatorOptions,
} from "class-validator";

class LessionExample {
  @IsNotEmpty()
  title: string;
  @IsNumber()
  @IsNotEmpty()
  status: number;
  @IsDateString()
  @IsNotEmpty()
  publishedDate: Date;
}

const validatorOptions: ValidatorOptions = {
  skipMissingProperties: false,
};

describe("test class validator and class transformer utils", () => {
  describe("test class validator and class transformer utils - with decorator", () => {
    let lession: LessionExample = null;
    beforeEach(() => {
      const inputJson = {
        title: "Class validator",
        status: 1,
        publishedDate: "2022-07-29 00:00:00",
      };
      lession = plainToInstance(LessionExample, inputJson);
    });
    it("should transform an object to class", () => {
      console.log("typeof lession.publishedDate", typeof lession.publishedDate);
      expect(lession).toBeInstanceOf(LessionExample);
    });

    it("should be able to validate the instance data", async () => {
      const errors = await validate(lession, validatorOptions);
      console.log(errors);
      expect(errors.length).toEqual(0);
    });
  });
});
```

> When using class validator, if your data is valid, it will return an empty array of error

```ts
validate(post).then((errors) => {
  // errors is an array of validation errors
  if (errors.length > 0) {
    console.log("validation failed. errors: ", errors);
  } else {
    console.log("validation succeed");
  }
});
```

### Defining validation schema without decorators to validate your json object

- [Schema example in README.md not work](https://github.com/typestack/class-validator/issues/595)

- [All validation types listed in decorator classes](https://github.com/typestack/class-validator/tree/develop/src/decorator)

```ts
import {
  registerSchema,
  validate,
  ValidationSchema,
  ValidatorOptions,
} from "class-validator";

const validatorOptions: ValidatorOptions = {
  skipMissingProperties: false,
};

describe("test class validator and class transformer utils", () => {
  interface LessionInputDTO {
    title: string;
    status: number;
    publishedDate: string;
  }

  describe("test class validator and class transformer utils - using schema", () => {
    let lessionInput: Partial<LessionInputDTO> = null;
    let lessionSchema: ValidationSchema = null;
    beforeAll(() => {
      lessionInput = {
        //title: 'Class validator',
        status: 1,
        publishedDate: "2022-07-29 00:00:00",
      };
      lessionSchema = {
        name: "createLessionSchema",
        properties: {
          title: [{ type: "isNotEmpty" }],
          status: [
            { type: "isNotEmpty", constraints: [] },
            { type: "isNumber" },
          ],
          publishedDate: [
            { type: "isNotEmpty", constraints: [] },
            { type: "isDateString" },
          ],
        },
      };
      // registered schema
      registerSchema(lessionSchema);
    });

    it("should be able to validate the instance data", async () => {
      lessionInput.title = "";
      delete lessionInput.title;
      const errors = await validate(
        lessionSchema.name,
        {
          ...lessionInput,
          status: "",
        },
        validatorOptions
      );
      console.log(lessionInput, errors);
      expect(errors.length).toEqual(0);
    });
  });
});
```

**It is very cool right? BUT ...**

#### RedAlert

![image](https://user-images.githubusercontent.com/31009750/181743668-c05b4f3f-ff76-4232-aaec-1f88c8ea51c0.png)

> From this [PR 568](https://github.com/typestack/class-validator/pull/568/files#diff-8ad828b3cb077e586ecc20d38c15cd197e1efc9bf537cb8c985b845b63d97138L16), **CLASS VALIDATOR** WAS NOT SUPPORTED **"Validate with schema anymore"**

![image](https://user-images.githubusercontent.com/31009750/181744094-25b6e6fd-08de-42de-8bf0-b48c115d7e45.png)

## Let's dive in more details with NestJS standard approach

> NestJS provide us a built-in pipe which includes class-validator and class transformer.

[Using NestJS Pipes to Validate your Data](/post/nestjs-pipes/)
