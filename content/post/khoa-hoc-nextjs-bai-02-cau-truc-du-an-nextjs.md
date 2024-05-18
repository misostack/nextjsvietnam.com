---
title: "Khoá học NextJS 2024 - Bài 02: Cấu trúc dự án NextJS"
type: "post"
date: 2024-05-18T09:05:19+07:00
description: "Trong bài này, chúng ta sẽ tìm hiểu cấu trúc của 1 dự án NextJS và học cách setup môi trường phát triển trên máy"
keywords: ["nextjs", "nextjs-beginner"]
categories: ["nextjs-tutorial"]
tags: ["nextjs"]
image: "https://user-images.githubusercontent.com/31009750/246866968-e42afc31-8eea-44e8-ba86-629918f50401.png"
---

**Note**: Toàn bộ mã nguồn của khóa học này đều được công khai trên github tại [Nextjs Tutorial 2024](https://github.com/nextjsvietnam/nextjs-tutorial-2024/tree/tutorial/lession-02)

Các nội dung chính trong bài học lần này:

1. Khởi tạo dự án NextJS
2. So sánh cấu trúc của 1 trang web với cấu trúc của một dự án NextJS
3. Tạo cấu trúc thư mục cơ bản nhất cho một dự án NextJS
4. Cài đặt và cấu hình VSCode cho dự án NextJS
5. Triển khai dự án đầu tiên của bạn lên server

## Khởi tạo dự án NextJS

Có 2 cách để tạo 1 dự án NextJS

- Cách 1: Automatic Installation
- Cách 2: Manual Installation

Thông thường chúng ta sẽ chọn cách 1 để tiết kiệm thời gian, cách 2 dành cho các bạn có kiến thức chuyên sâu hơn, và thường sử dụng khi cần chuyển đổi 1 dự án SPA đang viết bằng ReactJS sang Server Side Render sử dụng NextJS.

### Cách 1: Automatic Installation

```sh
npx create-next-app@latest [your-project-name]
```

![image](https://gist.github.com/assets/31009750/510de0e3-ae6e-4ea6-9279-316c88da6be6)

Sau khi cài đặt xong, chúng ta sẽ đi qua cấu trúc cơ bản nhất của NextJS

![image](https://gist.github.com/assets/31009750/5af5a77c-9f21-4109-9627-30fa3102db9e)

Cùng chạy dự án với câu lệnh có sẵn trong package.json

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
```

```sh
npm run dev
```

Giao diện lần đầu sau khi chạy lệnh trên

![image](https://gist.github.com/assets/31009750/a0001f8a-c6c9-4437-afc9-e1dfb267e6fc)

Vậy là bạn đã đi được 1/4 quãng đường của bài học này.
Sẽ có rất nhiều câu hỏi như, thế với cấu trúc thư mục ban đầu như vậy, thì chúng ta khai báo trang mới như thế nào, code reactjs hoạt động ra sao, các tài nguyên khác như hình ảnh, css sẽ để ở đâu, gọi api để lấy data và hiển thị ra trang web bằng cách nào,...

Để dễ tiếp cận, chúng ta bắt đầu từ cấu trúc của 1 trang web truyền thống với cây thư mục như sau.

![image](https://gist.github.com/assets/31009750/b2c6f64e-4cec-4135-b2fc-f5626adf8557)

Nào cùng phân tích cấu trúc website bán hàng đơn giản phía trên như sau.

Chúng ta sẽ có lần lượt các trang như sau:

1. Home: Trang chủ hiển thị các sản phẩm mới nhất, hot, đang khuyến mãi
2. Products: hiển thị toàn bộ sản phẩm của shop, có hỗ trợ tìm kiếm phân loại theo một số tiêu chí: giá, danh mục sản phẩm, mã sản phẩm. Hỗ trợ sắp xếp theo giá, lượt mua, ...
3. Product Detail: hiển thị chi tiết sản phẩm bao gồm: hình ảnh, giá, thông tin sản phẩm, nút mua hàng, ...
4. Cart: giỏ hàng, hiển thị các sản phẩm đang trong giỏ hàng của khách
5. Order: trang xác nhận thông tin đặt hàng của khách
6. My Account: trang thông tin cá nhân của khách, hỗ trợ cập nhật thông tin giao hàng, thông tin đặt hàng
7. My Orders: hiển thị danh sách các đơn hàng đã đặt
8. Order Details: hiển thị chi tiết thông tin của 1 đơn hàng.

Khá là nhiều phải không các bạn. Như vậy để xây dựng 1 trang web như trên chúng ta sẽ có các yêu cầu như sau khi cấu trúc 1 dự án:

1. Global styles: màu sắc, kích cỡ, font chữ chung của toàn bộ trang web,
2. Assets: hình ảnh, css, javascript, ...
3. Shared Components: các thành phần dùng chung cho trang web từ nhỏ đến lớn. Ví dụ: header, footer, form elements, buttons, ...
4. Route: đường dẫn tương ứng tới các trang
5. Fetching Data: lấy dữ liệu từ server
6. Rendering: phần tạo nội dụng html của từng trang dưạ trên dữ liệu
7. Authentication: phần đăng nhập, nhằm chặn các user không được phép truy cập vào nội dung không phải của mình, ví dụ như my account, my orders,...

Trong nextjs, không có 1 cú pháp cụ thể giúp chúng ta khai báo route và trang tương ứng. Mà bản thân nextjs sẽ cung cấp route tự suy diễn theo cấu trúc cây như sau:

Đây là hình gốc trên trang chủ:

![image](https://gist.github.com/assets/31009750/6bfa4e96-ecf1-4f4c-a5ab-2b5f44fc37f5)

Còn đây là cấu trúc website của chúng ta:

![image](https://gist.github.com/assets/31009750/b2c6f64e-4cec-4135-b2fc-f5626adf8557)

Cấu trúc đường dẫn (URL) của một trang web:

![image](https://gist.github.com/assets/31009750/949f2331-f3f3-4fb7-9ff7-12e80887b0a4)

Vậy thì nextjs tự suy diễn theo cấu trúc nào, về cơ bản nó sẽ dựa trên cấu trúc của URL của 1 trang web và cấu trúc thư mục tương ứng.

![image](https://gist.github.com/assets/31009750/2dbf5f4c-ff77-46fe-a9fd-9ea25fe435b2)

> \[slug\] chính xác là thư mục

Kết hợp với quy ước đặt tên của nextjs bên dưới

![image](https://gist.github.com/assets/31009750/d36882f0-253d-468e-ab39-7f90da4bf02a)

Chúng ta cùng xây dựng cấu trúc thư mục của dự án như sau:

> src/app/global.css : tập tin chứa global css của chúng ta, trong ví dụ này chúng ta sử dụng tailwind

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

> layout.tsx: thì đây là component được sử dụng làm layout chung cho các component con

```tsx
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NextJS Tutorial 2024",
  description: "NextJS courses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

> page.tsx: Đây là tập tin sẽ tương ứng với route segment

```tsx
export default function Home() {
  return (
    <main className="container-xl mx-auto p-4">
      <h1>Home Page</h1>
    </main>
  );
}
```

Theo quy tắc định sẵn, chúng ta lần lượt tạo route cho các page sau:

Để đơn giản tất cả các đường dẫn bên dưới mặc định sẽ nằm trong thư mục src/app

1. Home : page.tsx
2. Products: `products/page.tsx`
3. Product Details: products/[slug].tsx
4. Cart: cart/page.tsx
5. Order: order/page.tsx
6. My Account: my-account/page.tsx
7. My Orders: my-orders/page.tsx
8. My Order Details: my-orders/[id]/page.tsx

Các bạn hãy dừng lại và thực hành thử.

```sh
mkdir -p products products/[slug] cart order my-account my-orders my-orders/[id]
```

Vậy sau khi tạo xong cấu trúc thư mục và tập tin thì viết code như thế nào để hiện thị trang web.
Đơn giản các chỉ export 1 component default trong tập tin tương ứng. Lưu ý nên đặt tên component theo trang để dễ quản lí.

```tsx
export default function Products() {
  return (
    <main className="container-xl mx-auto p-4">
      <h1>Products</h1>
    </main>
  );
}
```

Cùng tạo link tới các trang bạn đã tạo nào. Chúng ta có 2 cách sử dụng thẻ a hoặc Link Component của NextJS.

```tsx
import Link from "next/link";

export default function Products() {
  return (
    <main className="container-xl mx-auto p-4">
      <h1>Products</h1>
      <ul>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <>
            <li>
              <Link href={`/products/${i}`}>Product {i}</Link>
            </li>
          </>
        ))}
      </ul>
    </main>
  );
}
```

Cùng so sánh sự khác biệt của 2 cách

{{< iframe "https://www.youtube.com/embed/wopG9mM0Qe8?si=pwu9xtq3SJc18BD0" >}}

Có vẻ khá ổn rồi đấy, tuy nhiên [slug] và [id] thì xử lý thế nào.

> Dynamic Segments are passed as the params prop to layout, page, route, and generateMetadata function

Ồ thì ra các segment có dạng này sẽ được truyền vào params prop của component: layout, page, route, generateMetadata function.

Cùng thử

```tsx
import Link from "next/link";

type ProductDetailProps = {
  params: {
    slug: string;
  };
};

// let's fake a function to find product detail by slug/id
const PRODUCTS = [
  {
    id: 1,
    slug: "mouse-pad-nextjsvietnam",
    name: "Mouse Pad NextJSVietNam",
    price: 15,
    currency: "USD",
    image:
      "https://gist.github.com/assets/31009750/06f69548-c14b-47d0-b650-7af3a023b750",
  },
];

const findProductBySlugOrId = (value: string) => {
  // find by id first
  let product = null;
  try {
    const id: number = parseInt(value);
    product = PRODUCTS.find((p) => p.id == id);
    if (product) {
      return product;
    }
    // otherwise find by slug
    product = PRODUCTS.find((p) => p.slug === value.toLowerCase());
  } catch (error) {
    console.log(error);
  }

  return product;
};

export default function ProductDetail({ params }: ProductDetailProps) {
  const { slug } = params;
  const product = findProductBySlugOrId(slug);
  let content = <></>;
  if (!product) {
    content = (
      <>
        <h1>Product not found!</h1>
        <p>
          Please go back to <Link href="/products">product list</Link>
        </p>
      </>
    );
  } else {
    content = (
      <>
        <h1>Product Detail</h1>
        <p>Name: {product.name}</p>
        <p>
          Price: {product.price} {product.currency}
        </p>
        <p>
          <img src={product.image} alt={product.name} />
        </p>
      </>
    );
  }
  return <main className="container-xl mx-auto p-4">{content}</main>;
}
```

Hãy thử truy cập 3 đường link sau:

1. http://localhost:3000/products/mouse-pad-nextjsvietnam => có sản phẩm hiển thị
2. http://localhost:3000/products/1 => có sản phẩm hiển thị ( giống sp của link 1)
3. http://localhost:3000/products/5 => sản phẩm không tìm thấy

Hãy áp dụng tiếp với [id] của my order details nhé

> URL : http://localhost:3000/my-orders/1

```tsx
type OrderProps = {
  params: {
    id: string;
  };
};
const PRODUCTS = [
  {
    id: 1,
    slug: "mouse-pad-nextjsvietnam",
    name: "Mouse Pad NextJSVietNam",
    price: 15,
    currency: "USD",
    image:
      "https://gist.github.com/assets/31009750/06f69548-c14b-47d0-b650-7af3a023b750",
  },
];

const ORDERS = [
  { id: 1, items: [{ id: 1, product: PRODUCTS[0], quality: 5 }] },
];

const findOrderById = (orderId: string) => {
  return ORDERS.find((order) => order.id === parseInt(orderId));
};

export default function MyOrderDetail({ params }: OrderProps) {
  const { id } = params;
  const order = findOrderById(id);
  return (
    <main className="container-xl mx-auto p-4">
      <h1>Order</h1>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Image</th>
            <th>Quality</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {order?.items.map((item) => (
            <tr>
              <td>{item.product.name}</td>
              <td>
                <img src={item.product.image} width={150} height={"auto"} />
              </td>
              <td>{item.quality}</td>
              <td>
                {item.quality * item.product.price} {item.product.currency}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
```
