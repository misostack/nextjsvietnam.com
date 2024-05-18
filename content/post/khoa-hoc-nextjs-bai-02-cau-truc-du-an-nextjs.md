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

**Note**: Toàn bộ mã nguồn của khóa học này đều được công khai trên github tại [Nextjs Tutorial 2024](https://github.com/nextjsvietnam/nextjs-tutorial-2024)

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

![image](https://gist.github.com/assets/31009750/b4b5df9a-fa28-4d85-8884-c0d655534766)

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
