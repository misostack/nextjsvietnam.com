---
title: "Khoá học NextJS Bài 03 - Advanced Routing"
type: "post"
date: 2024-05-20T08:51:24+07:00
description: "Nội dung chính trong bài này sẽ về phân quyền, chuyển hướng, layout, loading screen"
keywords: ["nextjs tutorial", "nextjs routing"]
categories: ["nextjs-tutorial"]
tags: ["nextjs"]
image: "https://user-images.githubusercontent.com/31009750/246866968-e42afc31-8eea-44e8-ba86-629918f50401.png"
---

**Note**: Toàn bộ mã nguồn của khóa học này đều được công khai trên github tại [Nextjs Tutorial 2024](https://github.com/nextjsvietnam/nextjs-tutorial-2024/tree/tutorial/lession-03)

Các nội dung chính trong bài học lần này:

1. Phân quyền và chuyển hướng
2. Tạo layout dùng chung
3. Loading Screen

Với nội dung trên, chúng ta sẽ tiếp tục với việc phân quyền và chuyển hướng, cũng như thực hành chia layout dùng chung, hiển thị màn hình chờ ( loading screen )

![image](https://gist.github.com/assets/31009750/5504676f-fb7b-46b1-aba6-3d3b8a9cd794)

Yêu cầu:

1. Đối với các trang thuộc nhóm Private chỉ có khách hàng đã đăng nhập mới có thể truy cập được.
   Trường hợp người dùng cố tình vào bằng các địa chỉ cố định, chuyển hướng người dùng sang trang đăng nhập.
2. Đối với user đã đăng nhập, khi vào lại các trang liên quan tới đăng nhập như: login,register,forget password, reset password, hãy chuyển hướng họ tới trang my-account
3. Các trang thuộc nhóm Private của khách hàng có giao diện chung, chỉ khác phần nội dung (content).
4. Các trang thuộc nhóm đăng nhập, cũng có giao diện chung, chỉ khác phần nội dung (content).
5. Toàn bộ các trang trong website đều sử dụng chung phần header, footer, khác phần nội dung chính (main content)

Trong bài này, chúng ta sẽ giả lập rằng sau khi khách hàng đăng nhập xong, các thông tin sẽ được lưu lại trên cookie session.

Do đó chúng ta sẽ cài đặt logic như sau:

- Nếu user truy cập vào các trang thuộc nhóm private => kiểm tra cookie này có tồn tại hay không, nếu có cho phép user truy cập, ngược lại thì chuyển hướng user sang trang login

Trong NextJS chúng ta có thể làm như sau:

1. Chuyển hướng người dùng trong trang sử dụng **redirect** function

Đầu tiên tôi sẽ tạo lần lượt các trang bổ sung như sau: login, register, forgot-password, reset-password.

Để nhóm các trang này trong một group trong folder, nextjs hỗ trợ chúng ta tạo folder với cú pháp (folderName) , khi dùng cú pháp này folder được tạo ra sẽ không được tính vào cây thư mục khi nextjs route thực hiện mapping giữa segment và cấu trúc thư mục.

![image](https://gist.github.com/assets/31009750/a5eaef32-cef7-4c06-8701-517abc4921be)

```ts
// shared/helpers.ts
import { COOKIE_PREFIX } from "./constant";

export const setCookie = (cname: string, cvalue: string, exdays: number) => {
  if (exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();

    document.cookie =
      `${COOKIE_PREFIX}_${cname}` + "=" + cvalue + ";" + expires + ";path=/";
  } else {
    document.cookie = `${COOKIE_PREFIX}_${cname}` + "=" + cvalue + ";path=/";
  }
};

export const getCookie = (cname: string) => {
  let name = `${COOKIE_PREFIX}_${cname}` + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const deleteCookie = (cname: string) => {
  let name = `${COOKIE_PREFIX}_${cname}` + "=";
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
```

```ts
// shared/auth.ts

import { redirect } from "next/navigation";
import { getCookie } from "./helper";
import { AppRoute, CookieName } from "./constant";

export const runUserGuard = () => {
  let err = null;
  try {
    const userCookie = getCookie(CookieName.UserCookie);
    if (userCookie) {
      const user = JSON.parse(userCookie);
      return true;
    }
  } catch (err) {
    err = err;
  }
  if (err) {
    alert(err);
  }
  redirect(AppRoute.Login);
};
```

```tsx
// my-account/page.tsx
import { runUserGuard } from "@/shared/auth";

export default function MyAccount() {
  // run user Guard
  runUserGuard();

  return (
    <main className="container-xl mx-auto p-4">
      <h1>My Account</h1>
    </main>
  );
}
```

Các bạn hãy áp dụng cho các trang còn lại.
...

Nhưng nếu tôi có hơn 10 trang như vậy thì sao, còn cách nào khác không?

1. Nhóm các trang thuộc my account chung 1 nhóm sử dụng chung layout

```
my-account
    page.tsx
    layout.tsx
    orders
        page.tsx
        [id]
            page.tsx
```

Do đó, chúng ta cần điều chỉnh lại đường dẫn của mình.

![image](https://gist.github.com/assets/31009750/bbc6c22e-68d4-4407-a4c9-587528ca0c2a)

Nhưng nếu có nhiều hơn 1 nhóm như vậy, liệu chúng ta có cách nào không?

2. Sử dụng middleware

![image](https://gist.github.com/assets/31009750/b4dda3c1-5497-425f-9da4-b1b478597a6f)

```ts
import AuthService from "@/service/auth.service";
import { AppCookie, AppRoute } from "@/shared/constant";
import { NextRequest, NextResponse } from "next/server";

export const authMiddleware = (req: NextRequest) => {
  // middleware/auth.ts

  const token = req.cookies.get(AppCookie.UserToken);
  const authService = new AuthService();
  const userToken = token?.name ? authService.verifyToken(token?.value) : null;

  // Assuming you have some function to verify the token
  if (!token || !userToken) {
    return NextResponse.redirect(new URL(AppRoute.Login, req.url));
  }

  return NextResponse.next();
};
```

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authMiddleware } from "./app/middlewares/auth.middleware";
import { ProtectedRoutes } from "./shared/constant";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  console.log("[Middleware Demo] : " + req.url);

  const path = req.nextUrl.pathname;
  if (ProtectedRoutes.some((route) => path.startsWith(route))) {
    // apply auth middleware
    const redirectResponse = authMiddleware(req);
    if (redirectResponse) {
      return redirectResponse;
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: "/((?!_next/static|_next/image|favicon.ico).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!_next/static|_next/image|favicon.ico).*)",
      has: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },

    {
      source: "/((?!_next/static|_next/image|favicon.ico).*)",
      has: [{ type: "header", key: "x-present" }],
      missing: [{ type: "header", key: "x-missing", value: "prefetch" }],
    },
  ],
};
```

```ts
export const ProtectedRoutes = ["/my-account"];
```

Giờ chúng ta sẽ giả sử nếu user truy cập trang chủ, xem như đã login thành công.
Để kiểm thử auth middleware này.

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authMiddleware } from "./app/middlewares/auth.middleware";
import { AppCookie, ProtectedRoutes } from "./shared/constant";
import _db from "../_db";

// This function can be marked `async` if using `await` inside
export function middleware(req: NextRequest) {
  console.log("[Middleware Demo] : " + req.url);

  const path = req.nextUrl.pathname;

  // fake login
  if (path == "/") {
    const response = NextResponse.next();
    response.cookies.set(AppCookie.UserToken, _db.tokens[0].token);
    return response;
  }

  // ...

  return NextResponse.next();
}

// ...
```

![image](https://gist.github.com/assets/31009750/6e56425c-4743-4c81-917a-212004e10a2a)
