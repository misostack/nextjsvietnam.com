---
title: "Khóa học NestJS - Bài 06 Hướng dẫn viết Unit Test"
type: "post"
date: 2023-07-06T21:52:16+07:00
description: "Cùng tìm hiểu cách viết unit test và cách mà nó giúp ích cho bạn cũng như dự án"
keywords: ["nestjs", "nestjs-mvc", "nestjs-tutorial"]
categories: ["nestjs-tutorial"]
tags: ["nestjs", "nestjs-pet-website"]
image: "https://user-images.githubusercontent.com/31009750/181449337-70081a76-5a01-4229-805e-39ed0ded6b5b.png"
---

- [Lession 06 Source Code](https://github.com/misostack/nestjs2024/tree/course-basic/lession-06)

## Bài 06

1. Giới thiệu sơ qua về Unit Test
2. Cách test một service trong NestJS
3. Hướng dẫn debug unit test trong NestJS
4. Ứng dụng viết Unit Test cho PetCategory

Đầu tiên, các anh/chị có thể thấy rằng sẽ có một mối quan hệ mật thiết giữa 3 thứ trong ngành này: errors/bugs(lỗi), stress(căng thẳng), tests(kiểm tra)

![image](https://user-images.githubusercontent.com/31009750/261230050-80f15af7-6ed7-49fd-9907-6bb248aa7137.png)

1. Càng nhiều lỗi (errors/bugs) thì càng căng thẳng(stress)
2. Càng căng thẳng(stress) thì càng tạo ra nhiều lỗi(errors/bugs)
3. Càng kiểm tra nhiều(test) thì càng ít lỗi(errors/bugs) do đã phát hiện và được sửa
4. Càng ít lỗi(errors/bugs) thì càng ít cằng thẳng(stress)

Do đó, việc test nhiều/kĩ sẽ đảm bảo được các anh/chị sẽ ít căng thẳng(stress) hơn.

Tiếp theo tôi xin giới thiệu với các anh/chị nghệ thuật viết test như thế nào cho đúng. Trước tiên, tôi xin phép đi qua một khái niệm tổng quát về testing trong ngành phần mềm.

> Kim tự tháp kiểm thử phần mềm

![image](https://user-images.githubusercontent.com/31009750/261233946-8a85e14e-e153-4dd0-a22c-ced35255d20c.png)

Bao gồm tất cả các giai đoạn của vòng đời phát triển phần mềm (SDLC). Nó bắt đầu từ unit testing, đến kiểm thử tích hợp (integration testing) và kết thúc với kiểm thử chức năng ở đỉnh(e2e)

Không có sự phân bổ cố định giữa các loại kiểm thử này. Thay vào đó, bạn nên xác định những bài kiểm thử nào phù hợp nhất với nhu cầu của bạn dựa vào việc cân đối chi phí, thời gian thực hiện và tài nguyên cho từng loại kiểm thử.

Các nhà phát triển phần mềm Agile cũng sử dụng phương pháp góc phần tư kiểm thử phần mềm ( Software Testing Quadrants) để phân loại các kiểm thử theo **nghiệp vụ**(business-facing) hay **technology facing**(công nghệ) nhằm tìm ra những bất cập của sản phẩm(critique product) và hỗ trợ đội ngũ phát triển xây dựng và thay đổi ứng dụng 1 cách tự tin.

![image](https://user-images.githubusercontent.com/31009750/261236689-fd1a32e5-bd46-439f-a455-997507a259e6.png)

Vậy là chúng ta đã đi qua tổng quan về một số khái niệm cũng như phương pháp kiểm thử phần mềm. Trong phạm vi bài viết này, tôi sẽ tập trung trình bày vào 2 phần chính:

- Unit Tests

## Vậy viết Unit Test cụ thể là làm gì

Các anh/chị cố gắng ghi nhớ định nghĩa đơn giản sau đây, để phân tích và áp dụng được unit test vào trong dự án mà không tốn quá nhiều thời gian/tài nguyên.

> Unit test được áp dụng để kiểm tra logic của một đoạn code thuộc 1 phần mềm. Đôi khi trong một hệ thống, cũng có thể tình một module là 1 unit.

## Công cụ hỗ trợ viết Unit Test

Các anh/chị có 2 lựa chọn khi viết Unit Test:

- [x] Tự xây dựng 1 framework hỗ trợ viết Unit Test
- [x] Sử dụng 1 framework Unit Test có sẵn trong hệ sinh thái

Framework được xây dựng/lựa chọn cần phải đáp ứng các tiêu chí sau:

- Dễ setup và well document
- Hỗ trợ tạo test suite, gom nhóm các test case
- Hỗ trợ các util cho việc kiểm tra kết quả
- Hỗ trợ Mock/Stub
- Hỗ trợ Async
- Hỗ trợ report

Các framework Unit Test hiện tại trong hệ sinh thái NodeJS được gom thành 2 trường phái:

![NodeJS Testing Frameworks](https://github.com/misostack/typescript-examples/blob/master/images/tdd-vs-bdd.png?raw=true)

1. JestJS : support jsdom, BDD style ( support typescript )
2. Jasmine: BDD style
3. Mocha(Testing Framework) & Chai(Assertion Libs): TDD style

Trong phạm vi của bài viết này, tôi sẽ chia sẻ với các anh/chị về một số cú pháp/khái niệm khi sử dụng JestJS ( testing framework được giới thiệu chung với NestJS). Do đó mục này sẽ gồm 2 phần:

1. Tìm hiểu và thực hành 1 số khái niệm cùng với JestJS
2. Tìm hiểu và thực hành Unit Test cùng với JestJS trên nên tảng web/api được viết bằng NestJS

### Tìm hiểu và thực hành một số khái niệm cùng với JestJS

1. [x] Cấu hình hỗ trợ module alias cho file test
2. [x] Cấu hình debug file test trong vscode
3. [x] Giới thiệu một số function test cơ bản của jest


#### 1.Cấu hình hỗ trợ module alias cho file test
> Mặc định NestJS đã tích hợp và cấu hình JestJS vào trong framework

Có 1 số điểm cần lưu ý như sau:

- Module Alias in Test File

```ts
import { validate } from 'class-validator';
import { CreateExampleDto } from './example-dtos';
import { plainToInstance } from 'class-transformer';
import { CLASS_VALIDATOR_VALIDATION_OPTIONS } from '@modules/constants';
import { describe } from 'node:test';
import { isEqual } from 'lodash';
import { transformClassValidatorErrors } from '@modules/helpers/class-validator.helpers';
import { inspect } from 'node:util';
```

Để sử dụng alias trong file test (*.test.ts | *.spec.ts) các anh/chị cần thêm dòng config sau.

Đối với path alias như dưới **tsconfig.json**

```json
    "paths": {
      "@modules/*": ["src/*"],
      "@database/*": ["src/database/*"]
    },
```

Thì tương ứng trong file **package.json**

```ts
  "jest": {
    ...
    "moduleNameMapper": {
      "@modules/(.*)": [
        "<rootDir>/$1"
      ],
      "@database/(.*)": [
        "<rootDir>/database/$1"
      ]
    },
    "testTimeout": 30000
  }
```

#### 2.Cấu hình debug file test trong vscode

> .vscode/launch.json

```json
{
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug:JestFile",
      "cwd": "${workspaceRoot}",
      "program": "${workspaceFolder}/node_modules/jest/bin/jest.js",
      "args": ["${fileBasenameNoExtension}"],
      "console": "integratedTerminal",
      "envFile": "${workspaceFolder}/.env.test"
    }
  ]
}
```

#### 3.Giới thiệu một số function test cơ bản của jest

```js
{
  "jest": {
    "moduleFileExtensions": [
      "js",
      "json",
      "ts"
    ],
    "rootDir": "src",
    "testRegex": ".*\\.spec\\.ts$",
    "transform": {
      "^.+\\.(t|j)s$": "ts-jest"
    },
    "collectCoverageFrom": [
      "**/*.(t|j)s"
    ],
}
```
**package.json**

```js
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:cov": "jest --coverage",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json",
  },
```

Cấu hình mặc định khi chạy lệnh test thì jest sẽ duyệt qua toàn bộ các file *.spec.ts trong thư mục source.

```sh
# execute jest command
npm run test
```

![image](https://gist.github.com/assets/31009750/648e0d33-64ff-4c1f-9b13-bbd4e998fb0b)

Các anh/chị có thể thấy, trong source code đã có 1 số file test có sẵn, kết quả cho thấy có 1 số chạy đúng, 1 số chạy sai.

Việc viết test này như đã nói có thể chạy tự động, do đó việc kiểm tra code có thể tự động hóa, giúp giảm thiểu thời gian, cũng như phát hiện lỗi ngay lập tức.

Cùng viết thử Unit Test nào.

Hãy tạo 2 file trong thư mục src/example như sau:

```ts
calculation.ts
calculation.spec.ts
```
Ở bước này, nếu sử dụng vscode, các anh chị có thể cài thêm extension này **vscode-jest-snippets**, mục đích nhắc các lệnh cơ bản của jest

```ts
// calculation.ts
interface ICalculation{
    add(...numbers: number[]):number;
    substract(a: number, b: number): number;
    asyncCalculation(a: number, b: number): Promise<number>
}

class Calculation implements ICalculation {
    add(...numbers: number[]): number {
        return numbers.reduce((prev, current) => prev + current, 0);
    }
    substract(a:number, b:number): number {
        return a - b;
    }
    async asyncCalculation(a: number, b: number): Promise<number> {
        return new Promise(resolve => {
            setTimeout(()=>{
                resolve(a*b)
            },500)
        })
    }    
}

export default Calculation;
```

```ts
// calculation.spec.ts
import Calculation from "./calculation";

describe('Calculation', () => {
    let calculation: Calculation = null;
    beforeAll(()=>{
        calculation = new Calculation();
    })
    describe('add', () => {
        test('TC1: two integer numbers', () => {
            const a = 1;
            const b = 2;            
            const expectedValue = 3;
            const calculatedValue = calculation.add(a, b);
            expect(calculatedValue).toEqual(expectedValue);
        });
        it('TC2: 3 integer numbers', () => {
            const a = 1;
            const b = 2;            
            const c = 3;
            const expectedValue = 6;
            const calculatedValue = calculation.add(a, b, c);
            expect(calculatedValue).toEqual(expectedValue);            
        })
    });
    describe('substract', () => {
        test('TC1: two integer numbers', () => {
            const a = 1;
            const b = 2;            
            const expectedValue = -1;
            const calculatedValue = calculation.substract(a, b)
            expect(calculatedValue).toEqual(expectedValue);
        })
    });    
    describe('asyncCalculation', () => {
        test('TC1: two integer numbers', async () => {
            const a = 3;
            const b = 2;            
            const expectedValue = 6; // 3 * 2
            const calculatedValue = await calculation.asyncCalculation(a, b)
            expect(calculatedValue).toEqual(expectedValue);
        })        
    })
});
```

Các điểm đặt breakpoint, khi bấm F5 để chạy debug, các anh chị sẽ thấy chúng lần lượt đi qua các điểm.

Về cơ bản:

- beforeAll: function callback khai báo trong đây sẽ chạy 1 lần trước tất cả các testcases
- describe: để group các test case lại theo nhóm
- it, test: để khai báo 1 test case và viết hàm kiểm tra
- expect(valueA).toEqual(valueB) : phương thức sẵn có của jest giúp compare giá trị tính toán với giá trị mong đợi

![image](https://gist.github.com/assets/31009750/020627c0-7aef-4abf-9a17-fd1e07d326e1)

## Thực hành viết Unit Test cho TodoList API

Chúng ta có sơ đồ thiết kế tổng quan như sau

![image](https://github.com/misostack/nestjs2024/assets/31009750/c028d2be-2440-44f6-8044-5f3561cd9182)

## Tham khảo

- https://www.guru99.com/component-testing.html - Component Testing
- https://www.onpathtesting.com/blog/what-are-agile-testing-quadrants - Agile testing quadrants
- https://circleci.com/blog/component-vs-unit-testing/ - Component vs Unit Testing
