---
title: "Javascript Numeric Precision Issue"
type: "post"
date: 2022-07-20T11:47:31+07:00
description: "0.3 - 0.1 = 0.19999999999999998 (ảo chưa)"
keywords: ["Javascript Numeric Precision Issue"]
categories: ["cheatsheet"]
tags: []
image: "/common/no-image.png"
---

> Bạn đã bao giờ gặp trường hợp như này chưa?

```js
let a = 0.1;
let b = 0.3;

let c = a - b;
let d = a * b;
let e = b / a;
let f = 0.2 * a;
```

> Here you are

```js
// c -0.19999999999999998
// d 0.03
// e 2.9999999999999996
// f 0.020000000000000004
```

Nguyên nhân là vì floating-point trong Javascript được biểu diễn dưới dạng **phân số nhị phân** (cơ số 2). Rất tiếc, hầu hết các phân số thập phân không thể được biểu diễn chính xác dưới dạng phân số nhị phân

Các số dấu phẩy động thập phân mà bạn nhập chỉ gần đúng với các số dấu phẩy động nhị phân thực sự được lưu trữ trong máy. Nói như vậy, bạn sẽ thấy rằng số học dấu phẩy động **KHÔNG chính xác 100%**

## Các lưu ý khi làm việc với số thập phân trong javascript

1. Nên làm tròn số
2. Dữ liệu trả về nên gói thành string trong JSON
3. Phần thập phần trong javascript tối đa là 12 số
4. Lưu ý khi làm việc với số lớn nê dùng BigInt
