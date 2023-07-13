---
title: "Khóa học ReactJS - Bài 02 - Làm quen với ReactJS qua các khái niệm"
type: "post"
date: 2023-07-02T20:08:16+07:00
description: "Tạo dự án ReactJS với vite, tìm hiểu cách sử dụng biến môi trường, khái niệm về component và 1 số cú pháp của JSX"
keywords: ["reactjs", "reactjs-beginner"]
categories: ["reactjs-tutorial"]
tags: ["reactjs"]
image: "https://user-images.githubusercontent.com/31009750/246856332-ece36caa-82ef-4a4f-86d9-9dad4a108929.png"
---

**Note**: Toàn bộ mã nguồn của khóa học này đều được công khai trên github tại [ReactJS Tutorial 2023](https://github.com/misostack/reactjs-tutorial-2023/tree/lession02)

## Bài 02

1. Tạo dự án mới với vite
2. Sử dụng Env Variables
3. Rendering: Khái niệm về component, JSX

### Tạo dự án mới với vite

- [Tham khảo](https://vitejs.dev/guide/)

```sh
npm create vite@latest reactjs-tutorial-2023 -- --template react
```

Ngoài react ra vite còn hỗ trợ 1 số template khác khi tạo dự án như: vanilla, vanilla-ts, vue, vue-ts, react, react-ts, react-swc, react-swc-ts, preact, preact-ts, lit, lit-ts, svelte, svelte-ts.

Khi khởi tạo dự án bằng vite, anh chị sẽ có 3 command được thiết lập sẵn.

```sh
npm run dev # run development mode - chế độ phát triển (chạy trên máy mình)
npm run build # build production - chế độ build (phiên bản sẽ được triển khai trên môi trường thật)
npm run preview # view production build ( xem thử bản build )
```

Tuy nhiên khi chạy ở chế độ phát triển (dev), vite sẽ tự động chọn port cho chúng ta, khá bất tiện. Do đó tôi xin hướng dẫn 1 cách phổ biến để cố định port này.

> vite.config.js

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3015,
  },
});
```

Sau khi điều chỉnh xong, khi ở chế độ nhà phát triển, trang web sẽ chạy tại cổng 3015.
Ngoài ra còn 1 số config khác, anh chị có thể xem và thử [tại đây](https://vitejs.dev/config/build-options.html)

## Sử dụng Env Variables

Khi phát triển 1 dự án ReactJS, đôi khi giữa các môi trường khác nhau, chúng ta cần sử dụng những biến khác nhau. Chẳng hạn: API Endpoint, App Name, và một số biến khác tùy thuộc dự án.
Để làm điều này, vite cung cấp cho các anh chị một lựa chọn là sử dụng .env file để thiết lập các biến mình mong muốn, và sử dụng được chúng trong code js. Lưu ý các biến này sẽ được vite sử dụng khi bắt đầu chạy server dev( chế độ phát triển) hoặc khi tiến hành build ( chế độ production )

Về thứ tự ưu tiên của vite khi có nhiều file môi trường khác nhau, anh chị có thể tham khảo bên dưới

```sh
.env                # ưu tiên cao nhất, trong mọi môi trường
.env.local          # ưu tiên cao thứ 2, trong mọi môi trường, thường bị add vào gitginore rồi
.env.[mode]         # ưu tiên cao thứ 3, và theo môi trường cụ thể
.env.[mode].local   # ưu tiên cao thứ 4, và theo môi trường cụ thể, thường bị add vào gitginore rồi
```

Do có nhiều môi trường, nhưng về bản chất chúng ta chỉ cần thiết lập 1 file .env mẫu, ở mỗi môi trường khác nhau, chúng ta chỉ việc copy và thay đổi cho phù hợp là được.

Đầu tiên, tạo 1 file .env mẫu

> .env.template

```sh
VITE_APP_VERSION=1.23
VITE_APP_NAME=ReactJS Tutorial 2023
```

**Lưu ý quan trọng là các biến khai báo phải bắt đầu với prefix là VITE\_ thì vite mới nhận được và cho anh chị sử dụng**

Copy cho 2 môi trường : development, production

```sh
cp .env.template .env.development
cp .env.template .env.production
```

> .env.development

```sh
VITE_APP_VERSION=1.23
VITE_APP_NAME=ReactJS Tutorial 2023(Localhost)
```

Sử dụng trong code

```js
import.meta.env.VITE_[ANYTHING];
```

```js
// src\shared\environment.js
const enviroment = {
  APP_NAME: import.meta.env.VITE_APP_NAME,
  APP_VERSION: import.meta.env.VITE_APP_VERSION,
  MODE: import.meta.env.MODE,
};

export default enviroment;

// src\App.jsx
import "./App.css";
import enviroment from "./shared/environment";

function App() {
  return (
    <>
      <header>
        <h1>{enviroment.APP_NAME}</h1>
      </header>
      <main>Content</main>
      <footer>
        Copyright@JSBase - {enviroment.APP_VERSION} - {enviroment.MODE}
      </footer>
    </>
  );
}

export default App;
```

Còn bước nhỏ, nhưng khá quan trọng là nên điều chỉnh lại file .gitignore, nhằm tránh việc commit các file .env môi trường khác nhau

> .gitignore

```sh
# enviroment
.env.*
!.env.template
```

Chạy thử chế độ phát triển ta sẽ có

```sh
npm run dev
```

![image](https://user-images.githubusercontent.com/31009750/250349748-7707095a-ab11-41de-86b3-987580b5967a.png)

### Rendering

#### Components

Bản chất của ReactJS app là các anh chị sẽ thiết kế và tổ hợp các component lại. Vậy component bản chất là gì.

![image](https://user-images.githubusercontent.com/31009750/250351107-f9625126-9cd6-46c8-8588-cadf48209588.png)

```jsx
function MyButton() {
  return <button>I'm a button</button>;
}
```

Bản chất của component là 1 function return 1 ReactElement, có 2 cách để tạo ra ReactElement:

- Sử dụng React.createElement
- Sử dụng JSX

Nếu không dùng ReactJS, hãy xem xét đoạn code bên dưới, cách chúng ta tạo 1 thẻ h1 với nội dung là ReactJS Tutorial 2023.

```js
const root = document.querySelector("#root");
const heading = document.createElement("h1");
heading.innerText = "ReactJS Tutorial 2023";
root.append(heading);
```

```js
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const heading = React.createElement("h1", {}, "ReactJS Tutorial 2023");
ReactDOM.createRoot(document.getElementById("root")).render(heading);
```

Tuy nhiên để đơn giản ReactJS đã hỗ trợ chúng ta 1 syntax khác gọi là "JSX", cho phép các anh chị có thể viết HTML Element trong Javascript mà ko cần tới createElement/appendChild.
JSX sẽ tự động chuyển đổi HTML tags into react elements.

Phiên bản JSX

```jsx
import "./App.css";

function App() {
  return (
    <>
      <h1>ReactJS Tutorial 2023</h1>
    </>
  );
}

export default App;
```

Tuy nhiên sẽ có một số khác biệt giữa JSX và HTML, các anh chị có thể sử dụng [công cụ chuyển đổi HTML sang JSX](https://transform.tools/html-to-jsx) này để tìm hiểu thêm. Ở đây tôi sẽ liệt kê một số điểm chính cần lưu ý khi sử dụng JSX.

#### JSX

1. JSX bắt buộc sử dụng thẻ đóng (close tags) - <br/> thay vì chỉ <br>
2. Một component không thể return nhiều JSX
3. Sử dụng className thay vì class
4. Inline style là 1 object
5. Hiển thị data và hỗ trợ Javascript Expression
6. Nếu data là array, React sẽ coi như mỗi phần tử trong mảng là 1 element, và render chúng theo thứ tự. Do đó nếu data của bạn là object, lẽ dĩ nhiên React sẽ không chấp nhận và nó sẽ báo lỗi.
7. Render 1 danh sách
8. Render có điều kiện
9. Event handlers

**Valid**

```jsx
import "./App.css";
import enviroment from "./shared/environment";

function Hello() {
  return (
    <li>
      <strong>Hello</strong>
    </li>
  );
}

function App() {
  const aString = "aString";
  const aBoolean = true;
  const aNumber = 0.3;
  const anObject = {};
  const anArray = ["green", "red", "yellow"];
  const anArrayElements = [<Hello key="1" />, <Hello key="2" />];
  for (let index = 3; index <= 10; index++) {
    anArrayElements.push(<Hello key={index} />);
  }
  return (
    <>
      <h1>ReactJS Tutorial 2023</h1>
      <header>
        <h1>{enviroment.APP_NAME}</h1>
      </header>
      <main>
        <h2>JSX</h2>
        <br />
        <h3
          className="success"
          style={{
            fontSize: "2rem",
          }}
        >
          Inline style and Class
        </h3>
        <p>aString: {aString}</p>
        <p>aBoolean: {aBoolean}</p>
        <p>aNumber: {aNumber}</p>
        <p>An Array: {anArray}</p>
        <p>An Object: {JSON.stringify(anObject)}</p>
        <p>
          {anArray.length > 3 ? (
            <strong>Long list</strong>
          ) : (
            <strong>Short list</strong>
          )}
        </p>
        <div>
          An Array Of Elements: <ul>{anArrayElements}</ul>
        </div>
        <ol style={{ listStyleType: "\\1F44" }}>
          {anArrayElements.map((item) => item)}
        </ol>
        <button
          onClick={() => {
            alert("This button has been clicked!");
          }}
        >
          On click event handler
        </button>
      </main>
      <footer>
        Copyright@JSBase - {enviroment.APP_VERSION} - {enviroment.MODE}
      </footer>
    </>
  );
}

export default App;
```

**Invalid**

```jsx
<p>An Object: {anObject}</p>
```

```jsx
import "./App.css";
import enviroment from "./shared/environment";

function App() {
  return (
    <>
      <h1>ReactJS Tutorial 2023</h1>
      <header>
        <h1>{enviroment.APP_NAME}</h1>
      </header>
      <main>
        <h2>JSX</h2>
        <br />
      </main>
      <footer>
        Copyright@JSBase - {enviroment.APP_VERSION} - {enviroment.MODE}
      </footer>
    </>
  );
}

export default App;
```

- [Tham khảo](https://react.dev/learn#)
