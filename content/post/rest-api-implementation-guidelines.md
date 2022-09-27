---
title: "Rest Api Implementation Guidelines"
type: "post"
date: 2022-09-27T08:49:59+07:00
description: "This guidance describes issues that you should consider when designing a web API"
keywords: ["rest api"]
categories: ["cheatsheet"]
tags: []
image: "/common/no-image.png"
---

Các chủ đề chính sẽ đi qua trong bài viết ngày hôm nay:

- [x] Các thuật ngữ và khái niệm thường gặp khi thiết kế web API
- [x] Các vấn đề và giải pháp
- [x] Trình tự các bước khi thiết kế và lập trình web API

Cách thức trình bày của bài viết này là chúng ta sẽ bắt đầu với thứ đơn giản nhất, sau đó nâng cấp dần, và cuối cùng là hệ thống hóa lại các bước cụ thể khi thiết kế web API.

## Các thuật ngữ và khái niệm thường gặp khi thiết kế web API

**REST** : Representational state transfer - quy tắc khi thiết kế API.

**Resources** : Các đối tượng, dữ liệu, dịch vụ mà cho phép client truy cập và sử dụng.

**Identifier** : Mỗi **resource** sẽ có định danh riêng nó là **URI** để truy cập resource này và có tính duy nhất để phân biệt. Ví dụ: https://api.nextjsvietnam.com/customers/1 -> Truy cập resource customer có mã khách hàng là 1.

**Representation** : Client tương tác với server thông qua việc trao đổi các trạng thái của resource. Nhiều trang web sử dụng JSON format cho các trạng thái này. Ví dụ

```json
{
  "id": 1,
  "name": "Nguyễn Minh Sơn",
  "email": "contact@nextjsvietnam.com"
}
```

**Maturity Model** : Các tiêu chí phân loại cấp độ của REST Api

Level 0 : 1 URI, toàn bộ operations sử dụng POST requests.
Level 1 : Mỗi resource sẽ có URI riêng
Level 2 : Sử dụng HTTP methods để định nghĩa operations cho từng URI
Level 3 : Sử dụng hypermedia (HATEOAS) để link tới các resource có liên quan được lồng ghép trong resource hiện tại

Thông thường, các web api ngày nay đáp ứng được tiêu chuẩn ở cấp độ 2.

**HTTP Verbs**: GET, POST, PUT, PATCH, DELETE, OPTIONS

**Stateless Request Model** : Các request độc lập với nhau, do đó 1 request cần phải chứa đầy đủ thông tin mà server cần để xác nhận.

**Hypermedia links** : tạo liên kết với các resource liên quan

```json
{
    "order_date": "2020-15-08T09:30:00",
    "total_price": 4.99,
    "status": "open",
    "payment_date": null,
    "items": [ ... ],
    "links" : [
        { "rel": "buyer", "href": "/customers/456" },
        { "rel": "payment", "href": "/orders/123/payment" },
        { "rel": "cancellation", "href": "/orders/123/cancellation" }
    ]
}
```

**Business Entity**: đối tượng nghiệp vụ. Ví dụ : user

## Một số nguyên tắc khi thiết kế API

### Nguyên tắc số 1. Resource-oriented design

- Việc xây dựng API cần xoay quanh resources và mối quan hệ(relation) hay trật tự(hierarchy) giữa chúng nếu có.
- Sử dụng các standard methods( verbs ) cho hầu hết các operation của resource. Tuy nhiên trong 1 số trường hợp custom methods vẫn được cho phép để đáp ứng yêu cầu thực tế.
- Stateless Protocol: cần đảm bảo rằng giao tiếp giữa client và server là độc lập, cả 2 đều có vai trò riêng và rõ ràng.

Do vậy khi thiết kế 1 resource, bạn cần quan tâm các vấn đề theo thứ tự logic như sau:

**1.Resources mà API sẽ cung cấp**

/customers : collection of customers
/customers/1: customer's data ( customer with id = 1)

Điểm đặc biệt quan trọng khi thiết kế API

> **Không nên mong đợi rằng API sẽ là ánh xạ của database schema**

**2.Mối quan hệ hay trật tự giữa chúng**

/customers/1/orders: sub collection - order of customer 1

**3.Schema cho mỗi resource**

**4.Các methods (verbs) mà mỗi resource cung cấp, cố gắng sử dụng standard verbs nhiều nhất có thể cho các trường hợp thông thường như sau:**

```md
Create: POST /resources
Get: GET /resources/:id
List : GET /resources
Update: PUT/PATCH /resources/:id - PUT/PATCH /resources ( batch update )
Delete: PUT/PATCH /resources/:id - PUT/PATCH /resources ( batch delete )
```

**5.Stateless protocol**

- Ví dụ : 1 số Stateless Protocol hay sử dụng như HTTP (Hypertext Transfer Protocol), UDP (User Datagram Protocol), DNS (Domain Name System)
- WebSockets, không giống HTTP, là stateful communications protocol hoạt động thông qua TCP

**Vai trò nhiệm vụ giữa client-server**

Server : persisting data - đảm bảo tính nhất quán của dữ liệu - có thể được chia sẻ giữa các client
Client : sole responsibility and authority for maintaining the application state - tự chịu trách nhiệm và có thẩm quyền để duy trì trạng thái của ứng dụng

### Nguyên tắc số 2. Resource names

#### Resource name phải là duy nhất trong API và tuân theo format URI như sau:

- [Full URI format](https://datatracker.ietf.org/doc/html/rfc3986#appendix-A)

```md
[$scheme]//[$authority][$path]?[$query]#[$fragment]
```

Ví dụ: https://api.nextjsvietnam.com/customers?filters[id]=1&filters[id]=2#lastedOrders

#### Thành phần của resource name luôn bao gồm: collection identifiers(customers) và resource IDs(123, sku789)

Ví dụ : /customers/12

#### Resource name phải dùng dấu **/** để chia tách các segment với nhau

- Các segment của resource name không chứa dấu **/**
- Segment cuối của resource name không nên chứa dấu **/**

#### Resource names chỉ nên sử dụng các kí tự được cho phép của DNS

[Allowed DNS's characters](https://www.rfc-editor.org/rfc/rfc1123)

- Resource IDs không nên dùng các kí tự viết hoa
- Đặc biệt không nên dùng các kí tự yêu cầu [URL escape](https://docs.microfocus.com/OMi/10.62/Content/OMi/ExtGuide/ExtApps/URL_encoding.htm) hoặc các kí tự nằm ngoài bảng mã ASCII
- Nếu bắt buộc phải dùng kí tự unicode, resource name bắt buộc phải lưu ở dạng [Normalization Form C](https://unicode.org/reports/tr15/). Eg : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize

#### Resource phải expose được **name** field chứa tên của nó

- Ví dụ, trong resource customer sẽ có field customerId chính là resource ID
- Hoặc expose id do system generate làm unique ID field (uid)
- Tất cả các id field nên là **string**

### Nguyên tắc số 3. Collection identifiers

- Là danh từ và phải là số nhiều. Ví dụ: publishers
- Phải là camelCase
- Phải là các từ tiếng Anh
- Phải bắt đầu với các kí tự viết thường và nằm trong bảng ASCII - (/[a-z][a-za-z0-9]\*/). Nếu từ đó không có số nhiều, vẫn có thể dùng nguyên văn, không cần thêm "s" phía sau. Ví dụ: info, moose
- Nested collection

Thay vì users/vhugo1802/userEvents/birthday-dinner-226 nên sử dụng users/vhugo1802/events/birthday-dinner-226

### Nguyên tắc số 4. Resource ID segments

- Resource ID segment là định dang của chính nó trong collection nội tại

Ví dụ: Ta có resource như sau

> /users/789/orders/3

Thì 789 là resource ID của user, còn 3 là resource id của order

Đồng thời khi thiết kế cần lưu ý 3 trường hợp sau:

**Trường hợp 1: Resource IDs luôn được user tạo ra**

- Thì API phải document format hợp lệ.
- Luôn tuân theo [chuẩn của DNS](https://www.rfc-editor.org/rfc/rfc1034).

**Ví dụ:**

- Format cho resource ID chỉ được bao gồm : các kí chữ cái, số, gạch ngang "-"
- Kí tự đầu tiên là chữ cái, kí tự cuối cùng phải là số hoặc chữ cái.
- Luôn sử dụng chữ thường ( lowercase ), tối đa 63 kí tự

```js
(^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$).
```

**Trường hợp 2: Resource IDs luôn do hệ thống tự generate**

- Thì API phải document format hợp lệ.
- Quy định giới hạn tối đa 63 kí tự

**Trường hợp 3: Resource IDs được user tạo ra hoặc hệ thống tự generate**

- Phải tạo ra quy tắc chung cho cả 2 trường hợp tương tự như trường hợp 1 hoặc 2

Đối với cả 3 trường hợp trên phải đảm bảo rằng:

- Resource ID là bất biến sau khi đã được tạo ra

### Nguyên tắc số 5. Resource ID aliases

- Đôi khi API cần phải tạo ra các alias cho 1 số resource cụ thể. Ví dụ, users/me dùng để truy vấn thông tin của user đã xác thực.

### Nguyên tắc số 6. Full resource names

Trong đa số các trường hợp resource name được sử dụng trong cùng 1 API duy nhất. Hoặc trong 1 hoàn cảnh cụ thể.

Tuy nhiên đôi khi nếu resource liên quan lại thuộc về 1 service khác, full resource name (schemeless URI ) cần được sử dụng.

Ví dụ:

```
//api.books.nextjsvietnam.com/publishers/123/books/rest-api-design-pattern
//api.nextjsvietnam.com/users/1
```

### Nguyên tắc số 7. Resource URIs

Resource URIs sẽ phải bao gồm:

- Scheme : http hoặc https
- API Version: v1, v2, ...vN

Tại sao version không thuộc về full resource name, lí do rất đơn giản. Vì full resource name phải nhất quán giữa các version.

### Nguyên tắc số 8 (optional). Fields representing resource names

- Khi define 1 resource, thì field đầu tiên nên là "resource name", field này bắt buộc phải là "string" và gọi là _name_ và để làm resource name.

Ví dụ: Format: publishers/{publisher}/books/{book}

### Nguyên tắc số 9 (optional). Fields representing a resource's parent

### Nguyên tắc số 10 (optional). Fields representing another resource

- When referencing a resource name for a different resource
- Field names có thể sử dụng các tính từ làm prefix nếu cần thiết.
- Field names không nên sử dụng suffix name trừ trường hợp bắt buộc (crypto_key_name)

```ts
class Book {
  // The resource name of the book.
  public name: string;
  // Other fields ...
}
```

## Các vấn đề thường gặp và giải pháp

Chúng ta sẽ bắt đầu với bài toán đầu tiên, thiết kế API cho 2 chức năng sau:

- Quản lí user: thêm, cập nhật, xóa, tìm kiếm
- Đăng nhập: xác nhận tài khoản, đăng nhập 2 bước, khôi mật khẩu

![Sơ đồ chức năng](https://user-images.githubusercontent.com/31009750/191477726-a741c79f-577f-497a-88a1-0d3d87d06f6b.png)

Sơ đồ bảng dữ liệu tối giản

![Database Schema](https://user-images.githubusercontent.com/31009750/191485329-15f54413-c2af-4c61-86d8-0659cb789147.png)

### Bước 1. Phân tích các resource

> Resource: object, data hoặc service

- **users** : user service to manage user's data
- **auth** : authentication service for login, reset password, confirmed account

Confirmed user's account: activate and login

### Bước 2. Xây dựng các endpoint định nghĩa các URIs và sử dụng HTTP Verbs để đáp ứng chức năng

**2.1. Manage users**

> POST /users : tạo user

> GET /users : truy vấn thông tin của toàn bộ user

> PUT /users : cập nhật nhiều user 1 lúc ( batch update )

> DELETE /users: xóa nhiều user 1 lúc

> GET /users/:id truy vấn thông tin của 1 user cụ thể - Ví dụ : GET /users/1

> PUT/PATCH /users/:id : cập nhật 1 user cụ thể - Ví dụ : PATCH /users/1

> DELETE /users/:id xóa 1 user cụ thể - Ví dụ: DELETE /users/1

> POST /users/:id/change-password : thay đổi mật khẩu của 1 user cụ thể. Ví dụ : POST /users/1/change-password

> POST /users/:id/reset-password : gửi link reset mật khẩu của 1 user cụ thể. Ví dụ : POST /users/1/reset-password

> POST /users/:id/send-activate-link : gửi lại link kích hoạt tài khoản của 1 user cụ thể. Ví dụ : POST /users/1/send-activate-link

**2.2. Authentication**

> POST /accounts/sign-in-with-password : đăng nhập

> POST /accounts/verify-secure-code: xác thực mã bảo mật 2 lớp

> POST /accounts/resend-secure-code: yêu cầu gửi lại mã xác thực 2 lớp

> POST /accounts/reset-password/request: gửi yêu cầu khôi phục mật khẩu

> POST /accounts/reset-password: cập nhật mật khẩu mới

## Tài liệu tham khảo

- [Google API Dev](https://google.aip.dev/122)
