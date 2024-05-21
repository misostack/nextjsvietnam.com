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
4. I18n - đa ngôn ngữ

Với nội dung trên, chúng ta sẽ tiếp tục với việc phân quyền và chuyển hướng, cũng như thực hành chia layout dùng chung, hiển thị màn hình chờ ( loading screen )

![image](https://gist.github.com/assets/31009750/5504676f-fb7b-46b1-aba6-3d3b8a9cd794)

Yêu cầu:

1. Đối với các trang thuộc nhóm Private chỉ có khách hàng đã đăng nhập mới có thể truy cập được.
   Trường hợp người dùng cố tình vào bằng các địa chỉ cố định, chuyển hướng người dùng sang trang đăng nhập.
2. Đối với user đã đăng nhập, khi vào lại các trang liên quan tới đăng nhập như: login,register,forget password, reset password, hãy chuyển hướng họ tới trang my-account
3. Các trang thuộc nhóm Private của khách hàng có giao diện chung, chỉ khác phần nội dung (content).
4. Các trang thuộc nhóm đăng nhập, cũng có giao diện chung, chỉ khác phần nội dung (content).
5. Toàn bộ các trang trong website đều sử dụng chung phần header, footer, khác phần nội dung chính (main content)

## Phân quyền và chuyển hướng

Trong bài này, chúng ta sẽ giả lập rằng sau khi khách hàng đăng nhập xong, các thông tin sẽ được lưu lại trên cookie.

Do đó chúng ta sẽ cài đặt logic như sau:

- Nếu user truy cập vào các trang thuộc nhóm private => kiểm tra cookie này có tồn tại hay không, nếu có cho phép user truy cập, ngược lại thì chuyển hướng user sang trang login

Trong NextJS chúng ta có thể làm như sau:

1. Chuyển hướng người dùng trong trang sử dụng **redirect** function

Đầu tiên tôi sẽ tạo lần lượt các trang bổ sung như sau: login, register, forgot-password, reset-password.

Để nhóm các trang này trong một group trong folder, nextjs hỗ trợ chúng ta tạo folder với cú pháp (folderName) , khi dùng cú pháp này folder được tạo ra sẽ không được tính vào cây thư mục khi nextjs route thực hiện mapping giữa segment và cấu trúc thư mục.

![image](https://gist.github.com/assets/31009750/a5eaef32-cef7-4c06-8701-517abc4921be)

```ts
// shared/auth.ts

import { AppCookie, AppRoute } from "@/shared/constant";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const runUserGuard = () => {
  const cookieStore = cookies();
  if (!cookieStore.has(AppCookie.UserToken)) {
    return false;
  }
  try {
    const userCookie = cookieStore.get(AppCookie.UserToken);
    if (userCookie) {
      const user = JSON.parse(userCookie.value);
      return true;
    }
  } catch (error) {}
  return redirect(AppRoute.Login);
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

## Tạo layout dùng chung

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

## Loading Screen

Trong một trang web có quá nhiều block không cần thiết phải hiện thị ngay. Như ví dụ bên dưới, thì thông tin khi khách hàng vừa truy cập vào cần thấy ngay thông thường sẽ là header, main content (top products). Còn phần random products có thể hiển thị sau.

![image](https://gist.github.com/assets/31009750/34e5e0b7-2cd2-4c2a-8e3b-656fbe0b4271)

Với một trang web thông thường chúng ta sẽ sử dụng AJAX để lazy load phần này.
Ngay trong NextJS, chỉ cần với cú pháp đơn giản, ta có ngay kết quả như trên.

Dưới đây là cơ chế của nextjs

![image](https://gist.github.com/assets/31009750/b2e916b4-edd0-40a1-9514-8518a1dc0e23)

1. Đầu tiên khi client request lên server, lúc này theo trình tự server sẽ generate html từ page component
2. Nếu trong page có các component được gói trong tag Suspend, thì được chuyển đổi để load sau với javascript
3. Khi trang web được tải xuống thì tài nguyên html sẽ được tải xuống trước, trong lúc đó javascript cùng được tải đồng thời (sẽ có đoạn mã kiểm soát phần tải các component cần stream ). Khi các script này được thực thi thì quá trình stream data diễn ra, trước đó nextjs sẽ tự động tạo ra các placeholder có nội dung mà bạn đã define trong Loading Component. Sau khi dữ liệu sẵn sàng, toàn bộ component của bạn sẽ xuất hiện trên giao diện.
4. Trong lúc stream diễn ra, bạn hoàn toàn vẫn tương tác được với trang web, đây chính là điểm mấu chốt của công nghệ này.

Lợi ích:

- Thời gian tải trang nhanh
- Hiển thị nội dung các cùng chờ thân thiện với user

Nào cũng xem code

> src/components/SlowComponent.tsx

```ts
const wait = (timeout: number) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      fetch("https://jsonplaceholder.typicode.com/todos/1")
        .then((res) => res.json())
        .then((data) => resolve(data));
    }, timeout);
  });
};
export const SlowComponent = async () => {
  const data: any = await wait(5000);

  return (
    <>
      <p>{JSON.stringify(data)}</p>
    </>
  );
};
```

> src/app/page.tsx

```ts
import { SlowComponent } from "@/components/SlowComponent";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <main className="container-xl mx-auto p-4">
      <h1>Home Page</h1>
      <p>Links to other pages with a tag</p>
      <ul>
        <li>
          <a href="/products">Products</a>
        </li>
        <li>
          <a href="/products/mouse-pad-nextjsvietnam">
            Mouse Pad NextJSVietNam
          </a>
        </li>
        <li>
          <a href="/cart">Cart</a>
        </li>
        <li>
          <a href="/order">Order</a>
        </li>
        <li>
          <a href="/my-account">My Account</a>
        </li>
        <li>
          <a href="/my-account/orders">My orders</a>
        </li>
        <li>
          <a href="/my-account/orders/1">My order detail</a>
        </li>
      </ul>
      <p>Links to other pages with Link tag</p>
      <ul>
        <li>
          <Link href="/products">Products</Link>
        </li>
      </ul>
      <h2>Slow Component</h2>
      <Suspense fallback={<Loading />}>
        <SlowComponent></SlowComponent>
      </Suspense>
    </main>
  );
}
```

## I18n - Đa ngôn ngữ

Thông thường khi làm việc với React, để làm website đa ngôn ngữ chúng ta hay sử dụng https://react.i18next.com/ giúp việc setup trở nên dễ dàng.

Còn trong nextjs thì chúng ta làm thế nào, khá đơn giản, các bạn nhớ quy tắc về cấu trúc thư mục chứ. Lúc này chúng ta chỉ cần tạo cấu trúc thư mục tương ứng

```
[lang]
  page.tsx
  dictionaries.ts
  dictionaries
    en.json
    vi.json
```

```json
{
  "products": {
    "cart": "Add to Cart"
  }
}
```

```ts
import "server-only";

const dictionaries = {
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  nl: () => import("./dictionaries/vi.json").then((module) => module.default),
};

export const getDictionary = async (locale) => dictionaries[locale]();
```

```tsx
import { getDictionary } from "./dictionaries";

export default async function Page({ params: { lang } }) {
  const dict = await getDictionary(lang); // en
  return <button>{dict.products.cart}</button>; // Add to Cart
}
```

Nhưng trong thực tế việc sử dụng [next-intl](https://next-intl-docs.vercel.app/) vẫn dễ dàng và có nhiều lợi ích hơn.

```sh
npm install next-intl --save
```

```mjs
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      // Basic redirect
      {
        // redirect to default language
        source: "/",
        destination: "/vi",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
```

Cấu trúc cây thư mục như sau

```
next.config.mjs
src
  app
    [locale]
      global.css
      layout.tsx
      loading.tsx
      page.tsx
  middleware.ts
  i18n.ts
  components
  layouts
    Footer.tsx
messages
  en.json
  vi.json
```

```json
{
  "layout": {
    "headerTitle": "NextJS Tutorial 2024"
  }
}
```

Đầu tiên các anh/chị cần move các file sau vào thư mục mới [locale] :

- global.css
- layout.tsx
- loading.tsx
- page.tsx

```tsx
// layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

export const metadata: Metadata = {
  title: "NextJS Tutorial 2024",
  description: "NextJS courses",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages({
    locale: locale,
  });
  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

Tạo file i18n.ts

```ts
import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";

// Can be imported from a shared config
const locales = ["en", "vi"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) notFound();

  return {
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

Cập nhật middleware

```ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authMiddleware } from "./app/middlewares/auth.middleware";
import { AppCookie, ProtectedRoutes } from "./shared/constant";
import _db from "../_db";
import createIntlMiddleware from "next-intl/middleware";
import { redirect } from "next/dist/server/api-utils";

// This function can be marked `async` if using `await` inside

export default async function middleware(req: NextRequest) {
  const [, locale, ...segments] = req.nextUrl.pathname.split("/");
  const path = req.nextUrl.pathname;

  // other middlewares
  if (locale != null) {
    console.log("[Middleware Demo] : " + req.url);

    if (ProtectedRoutes.some((route) => path.startsWith(route))) {
      // apply auth middleware
      const redirectResponse = authMiddleware(req);
      if (redirectResponse) {
        return redirectResponse;
      }
    }
  }

  // next-intl middleware
  const handleI18nRouting = createIntlMiddleware({
    locales: ["en", "vi"],
    defaultLocale: "en",
    localePrefix: "always",
  });
  const response = handleI18nRouting(req);

  // fake login
  if (path == `/${locale}`) {
    response.cookies.set(AppCookie.UserToken, _db.tokens[0].token);
  }

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    // Paths for internationalization
    // "/",
    "/(en|vi)/:path*",
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

Sử dụng thử

```tsx
// src/app/[locale]/page.tsx
import { SlowComponent } from "@/components/SlowComponent";
import Link from "next/link";
import { Suspense } from "react";
import Loading from "./loading";
import { useTranslations } from "next-intl";
import { Footer } from "@/layouts/Footer";

export default function Home() {
  const t = useTranslations("layout");

  return (
    <>
      <header className="container-xl mx-auto p-4">
        <h1>{t("headerTitle")}</h1>
      </header>
      <main className="container-xl mx-auto p-4">
        <h1>Home Page</h1>
        <p>Links to other pages with a tag</p>
        <ul>
          <li>
            <a href="/products">Products</a>
          </li>
          <li>
            <a href="/products/mouse-pad-nextjsvietnam">
              Mouse Pad NextJSVietNam
            </a>
          </li>
          <li>
            <a href="/cart">Cart</a>
          </li>
          <li>
            <a href="/order">Order</a>
          </li>
          <li>
            <a href="/my-account">My Account</a>
          </li>
          <li>
            <a href="/my-account/orders">My orders</a>
          </li>
          <li>
            <a href="/my-account/orders/1">My order detail</a>
          </li>
        </ul>
        <p>Links to other pages with Link tag</p>
        <ul>
          <li>
            <Link href="/products">Products</Link>
          </li>
        </ul>
        <h2>Slow Component</h2>
        <Suspense fallback={<Loading />}>
          <SlowComponent></SlowComponent>
        </Suspense>
      </main>
      <Footer></Footer>
    </>
  );
}
```

Chuyển ngôn ngữ

```tsx
// layouts/Footer
"use client";

import { useRouter } from "next/navigation";

export const Footer = () => {
  const router = useRouter();

  const switchLanguage = (language: string) => {
    router.push(language);
  };
  return (
    <footer>
      <div>
        <button onClick={() => switchLanguage("en")}>English</button>
        <button onClick={() => switchLanguage("vi")}>Vietnamese</button>
      </div>
    </footer>
  );
};
```

## References

- [Next Intl Getting start](https://next-intl-docs.vercel.app/docs/getting-started/app-router/with-i18n-routing)
- [Navigation Strategy for next-intl](https://next-intl-docs.vercel.app/docs/routing/navigation#shared-pathnames)
