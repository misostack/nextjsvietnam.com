---
title: "Khóa học ReactJS - Bài 01 - Lộ trình các bài học về ReactJS"
type: "post"
date: 2023-05-19T22:00:00+07:00
description: "Giáo án tự học ReactJS cho người mới bắt đầu"
keywords: ["reactjs", "reactjs-beginner"]
categories: ["reactjs-tutorial"]
tags: ["reactjs"]
image: "https://user-images.githubusercontent.com/31009750/246856332-ece36caa-82ef-4a4f-86d9-9dad4a108929.png"
---

**Note**: Toàn bộ mã nguồn của khóa học này đều được công khai trên github tại [ReactJS Tutorial 2023](https://github.com/misostack/reactjs-tutorial-2023/tree/lession02)

## Bài 02

1. Tạo dự án mới với vite
2. Sử dụng Env Variables
3. Rendering

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

- [Tham khảo](https://react.dev/learn#)
