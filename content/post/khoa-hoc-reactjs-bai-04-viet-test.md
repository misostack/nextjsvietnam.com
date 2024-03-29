---
title: "Khóa học ReactJS Bài 04 - viết test cho dự án React"
type: "post"
date: 2023-09-28T08:07:25+07:00
description: "Tổng hợp các công cụ và phương pháp để test tự động 1 dự án ReactJS. Minh họa với vitest và cypress"
keywords: ["reactjs", "reactjs-beginner"]
categories: ["reactjs-tutorial"]
tags: ["reactjs"]
image: "https://user-images.githubusercontent.com/31009750/246856332-ece36caa-82ef-4a4f-86d9-9dad4a108929.png"
---

**Note**: Toàn bộ mã nguồn của khóa học này đều được công khai trên github tại [ReactJS Tutorial 2023](https://github.com/misostack/reactjs-tutorial-2023/tree/lession04)

Đầu tiên, trước khi bắt đầu viết test, các anh/chị cần suy nghĩ xem dự án của mình sẽ test những gì. Cùng nhìn vào hình minh họa bên dưới sau:

> Kim tự tháp kiểm thử phần mềm

![image](https://user-images.githubusercontent.com/31009750/261233946-8a85e14e-e153-4dd0-a22c-ced35255d20c.png)

Do đó, việc viết test được phân vào 3 nhóm chính:

1. Unit Test
2. Integration Test
3. E2E Test ( end to end Test)

Vậy trong mỗi nhóm như vậy các anh/chị sẽ test những gì, công cụ nào có thể hỗ trợ chúng ta làm công việc này.

## Unit Test trong dự án ReactJS

> Unit Test còn được gọi là kiểm thử đơn vị, đơn vị đôi khi là 1 function hoặc cũng có thể làm 1 component, hay thậm chí là 1 module nếu xem xét ở 1 góc độ rộng hơn.

Vậy trong dự án ReactJS, các đơn vị này là gì, và các anh/chị cần test ra sao?

- [x] Test Render Component with props
- [x] Test Util Function

### 1. Test Component

Chính xác đây là cốt lõi và bản chất của các dự án ReactJS (component based system), toàn bộ ứng dụng sẽ được cấu thành từ các component nhỏ(chúng tự quản lí state, và kết hợp chúng để render thành các giao diện hiển thị cho người dùng, react lại hành vi của user khi tương tác).

Như vậy thì test component là test những gì?

- Test render - test kết quả của component(nhận props) sau đó render ra UI tương ứng.

Tại bước này ReactJS cung cấp 1 kĩ thuật gọi là "shallow rendering" giúp các anh/chị có thể test được kết quả của component mà không cần thiết phải mount(headless), giảm được rất nhiều thời gian khi chạy test.

Có nên test state change hay không? Có nhưng nó không thuộc phạm vi cần test trong khi thực hiện Unit Test

### 2. Test Util Function

Trong dự án ReactJS, chắc hẳn sẽ có những function được viết nhằm mục đích biến đổi dữ liệu trước khi được sử dụng, đây cũng được xem là 1 phần trong kiểm thử đơn vị

## Integration Test trong dự án ReactJS

Tại bước này các anh/chị sẽ kiểm tra khi các component ở bước trên có tương tác với các component khác/Api call/Hành vi của user thì nó có hoạt động đúng hay không. Và tại bước này các anh/chị cần sử dụng tới việc mounting của component để kiểm tra xem các component con có hoạt động đúng như mong đợi không.

Ở bước này, khi test các anh/chị sẽ phải áp dụng các kĩ thuật như : mock/stub để giả lập 1 số component/api call/user behavior liên quan nhằm giảm bớt thời gian chạy kiểm thử.

Như vậy có thể tổng hợp lại tại bước này các anh/chị nên test:

1. [x] Test Component with state change
2. [x] Test Component with API call
3. [x] Test Component with User Action

## E2E Test trong dự án ReactJS

Kiểm thử E2E nhằm mục đích sẽ giả lập việc user sử dụng ứng dụng, và kiểm tra xem ứng dụng có hoạt động chính xác không, và việc kiểm này sẽ kiểm tra toàn bộ ứng dụng hoạt động có đúng không.

Ở bước này, khi test các anh/chị cần xây dựng kịch bản test như 1 user để tiến hành viết code.
Có một số công cụ thường được sử dụng ở bước này như:

- [Cypress](https://docs.cypress.io/guides/getting-started/installing-cypress)
- [Puppeteer](https://pptr.dev/)
- [Playwright](https://playwright.dev/docs/intro)

Một số kĩ thuật cần áp dụng trong phần này:

- Snapshot

## Thiết lập môi trường để viết test cho dự án ReactJS

- [x] Testing Runners: [Jest](https://jestjs.io/docs/cli), [Vitest](https://vitest.dev/guide/features.html), ...
- [x] Test Render: [Testing Library](https://testing-library.com/), [Enzyme](https://enzymejs.github.io/enzyme/)
- [x] E2E: Cypress, Selenium, ...

Trong phạm vi bài viết tôi sẽ demo với các công cụ sau:

1. Test Runners: vitest
2. Test Render: Testing Library
3. E2E Test Framework: Cypress

Ưu điểm vượt trội của Cypress so với các công cụ khác như Selenium,... chính là thay vì chạy bên ngoài browser và sử dụng các remote command thông qua network. Cypress làm điều ngược lại, cypress sẽ chạy trong cùng 1 vòng lặp với ứng dụng của các anh/chị.
Đặc biệt do chạy trên nền nodejs, nên cypress và nodejs tương tác với nhau một cách đồng bộ, giúp các tác vụ trở nên mượt mà hơn, và thời gian phản hồi rút ngắn tối đa.
Do Cypress được cài đặt trên môi trường local của các anh/chị, nên có thể thực hiện các tác vụ khác của automation test như: **chụp screenshots**, **record videos**, **chạy các file hệ thống**, **gọi network call**.

Các chủ đề tôi sẽ đi qua bao gồm:

1. [x] Setup vitest
2. [x] Viết Unit Test cho Function
3. [] Viết Unit Test cho Stateless React Component
4. [] Viết Integration Test cho React Component
5. [] Giới thiệu về: Mock, Stub
6. [] Setup Cypress cho E2E Test
7. [] Cấu hình gitlab CI chạy test

### Setup Vitest

```sh
npm install -D vitest
npm install -D @vitest/ui
```

**package.json**

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run"
  }
}
```

**vite.config.js**

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    environment: "happy-dom",
    globals: true,
  },
  server: {
    port: 3015,
  },
  resolve: {
    alias: [
      {
        find: "@app",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
});
```

```sh
npm run test
npm run test:ui
npm run test:run
```

**jsconfig.json** for your code editor

```json
{
  "compilerOptions": {
    "typeRoots": ["tests/types"],
    "baseUrl": ".",
    "target": "ES2020",
    // … all other compiler options

    // all paths defined here must match the configured path in `vite.config.ts`
    "paths": {
      "@app/*": ["./src/*"]
    }
  },

  "exclude": ["node_modules", "tests"],
  "include": ["."]
}
```

**tests/global.d.ts**

```ts
import * as vitest from "vitest";
declare global {
  const expect: typeof vitest.expect;
  const describe: typeof vitest.describe;
  const it: typeof vitest.it;
  const test: typeof vitest.test;
}
export {};
```

**tests/units/shared/utils.spec.js**

```js
import { generatePagers } from "@app/shared/utils";

test("generatePagers", () => {
  const testCases = [
    {
      input: { numberOfPages: 10, currentPage: 1, spaces: 5 },
      output: [1, 2, 3, 4, 5],
    },
    {
      input: { numberOfPages: 10, currentPage: 4, spaces: 5 },
      output: [1, 2, 3, 4, 5],
    },
    {
      input: { numberOfPages: 10, currentPage: 5, spaces: 5 },
      output: [3, 4, 5, 6, 7],
    },
    {
      input: { numberOfPages: 10, currentPage: 8, spaces: 5 },
      output: [6, 7, 8, 9, 10],
    },
    {
      input: { numberOfPages: 10, currentPage: 10, spaces: 5 },
      output: [6, 7, 8, 9, 10],
    },
  ].map((tc) => {
    return {
      output: tc.output,
      result: generatePagers(tc.input),
    };
  });
  expect(testCases[0].result).toEqual(testCases[0].output);
  expect(testCases[1].result).toEqual(testCases[1].output);
  expect(testCases[2].result).toEqual(testCases[2].output);
  expect(testCases[3].result).toEqual(testCases[3].output);
  expect(testCases[4].result).toEqual(testCases[4].output);
});
```

```jsx
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PaginationComponent from "../../../src/components/PaginationComponent";

/**
 * Test cases
 * 1. Number of pages <= 1 : must not render anything
 * 2. Number of pages <= 5 : always render n pages and 4 buttons:first,previous,next,last with n <=5
 * 3. Number of pages > 1 and current page = 1 : disabled first,previous, enable next,last
 * 4. Number of pages > 1 and current page > 1 && current page is not last page : enable, first, previous, next, last
 * 5. Number of pages > 1 and current page > 1 && current page is last page : enable, first, previous and disable next, last
 * 6. Number of pages > 5 and current page = 5 && pages includes: 3,4,5,6,7
 */
const onChangeCurrentPage = () => {};

describe("Test PaginationComponent", () => {
  test("TC1: Number of pages <= 1 : must not render anything", () => {
    // ARRANGE
    const props = {
      numberOfPages: 1,
      currentPage: 1,
      onChangeCurrentPage,
    };
    render(<PaginationComponent {...props} />);

    // ASSERT
    const pagination = screen.queryByLabelText("pagination");
    expect(pagination).toBeNull();
  });
  test(
    "TC2: Number of pages <= 5 : always render n pages and 4 buttons:first,previous,next,last with n <=5" +
      " \nTC3: Number of pages > 1 and current page = 1 : disabled first,previous, enable next,last",
    () => {
      // ARRANGE
      const props = {
        numberOfPages: 5,
        currentPage: 1,
        onChangeCurrentPage,
      };
      render(<PaginationComponent {...props} />);

      // ASSERT
      const pagination = screen.queryByLabelText("pagination");
      const pageItems = pagination.querySelectorAll("[data-page-item=true]");
      const firstPageItem = pagination.querySelector("[data-page-type=first]");
      const previousPageItem = pagination.querySelector(
        "[data-page-type=previous]"
      );
      const nextPageItem = pagination.querySelector("[data-page-type=next]");
      const lastPageItem = pagination.querySelector("[data-page-type=last]");
      expect(pageItems.length).toEqual(5);
      expect(firstPageItem).toBeTruthy();
      expect(firstPageItem).toHaveClass("disabled");
      expect(previousPageItem).toBeTruthy();
      expect(previousPageItem).toHaveClass("disabled");
      expect(nextPageItem).toBeTruthy();
      expect(nextPageItem).to.not.toHaveClass("disabled");
      expect(lastPageItem).toBeTruthy();
      expect(lastPageItem).to.not.toHaveClass("disabled");
    }
  );
});
```

**Vitest UI**

![image](https://user-images.githubusercontent.com/31009750/271358107-67d10d0a-de04-49db-a076-e35f5f05634e.png)

**Debug**

```json
{
  // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "name": "Debug Current Test File",
      "autoAttachChildProcesses": true,
      "skipFiles": ["<node_internals>/**", "**/node_modules/**"],
      "program": "${workspaceRoot}/node_modules/vitest/vitest.mjs",
      "args": ["run", "${relativeFile}"],
      "smartStep": true,
      "console": "integratedTerminal"
    }
  ]
}
```

![image](https://user-images.githubusercontent.com/31009750/271357687-aff9d45e-b134-40f3-8ced-ef6d75173cd2.png)

**Default vitest config**

```sh
include: **/*.{test,spec}.?(c|m)[jt]s?(x)
exclude:  **/node_modules/**, **/dist/**, **/cypress/**, **/.{idea,git,cache,output,temp}/**, **/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*
watch exclude:  **/node_modules/**, **/dist/**
```

## Tổng kết

1. Có 3 loại test: Unit Test, Integration Test, E2E Test
2. Hãy viết Unit Test cho các Util Function
3. Hãy viết Integration Test cho các Component
4. Hãy viết E2E cho các tính năng quan trọng cần kiểm tra toàn bộ flow như: đăng ký, thanh toán, mua hàng, ...
5. Khẩu quyết: "Viết nhiều Integration Test, không cần snapshot test. Viết một ít unit test, một ít E2E Test"

> Viết test nhằm 1 mục đích duy nhất - tăng sự đảm bảo của codebase. Hỗ trợ regression test, giúp các anh/chị mạnh dạn thay đổi/refactor code.
