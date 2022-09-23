---
title: "Rest Api Design Checklist"
type: "post"
date: 2022-09-23T14:33:24+07:00
description: "Things to think when designing, testing, and releasing your API"
keywords: ["rest api", "rest api principles"]
categories: ["cheatsheet"]
tags: []
image: "/common/no-image.png"
---

## REST API là gì?

- API : Application programming interface
- REST : Representational state transfer

**Giải thích theo thuật ngữ chuyên môn thì**

REST API là một loạt các quy tắc được đặt ra khi thiết kế và lập trình cho các ứng dụng, nhằm mục đích thống nhất các thể hiện của trạng thái được truyền tải trong những ứng dụng này.

**Còn nếu tiếp cận theo hướng ví dụ thực tế**

Trong thực tế, bạn có một ứng dụng quản lí trạng thái bật/tắt của các bóng đèn trong nhà. Thì trạng thái của từng bóng đèn sẽ được lưu lại và cho phép người dùng biết được trạng thái của bóng đèn hiện tại.

Khi xây dựng ứng dụng này, sẽ có 3 phần: ứng dụng phía người dùng, ứng dụng kết nối và xử lý các yêu cầu của người dùng, ứng dụng điều khiển bóng đèn trực tiếp.

Cơ chế hoạt động chính là : khi người dùng tương tác với ứng dụng( có thể là trang web/ mobile app ) thì nó sẽ gửi yêu cầu lên ứng dụng quản kết nối và xử lý yêu cầu, để ứng dụng trung gian này tương tác với ứng dụng xử lý việc bật/tắt của bóng đèn tương ứng. Đồng thời cho phép người dùng biết được trạng thái hiện tại của từng bóng đèn.

> Chính vì điều đó REST API được ra đời, nó là các nguyên tắc thiết kế dữ liệu truyền tải giữa các ứng dụng

**Vậy các quy tắc đó là gì, chúng ta sẽ tiếp tục tìm hiểu chi tiết bên dưới đây.**

### REST design principles

Điều đầu tiên, thì API chính là 1 phương thức cho phép các ứng dụng hoặc dịch vụ yêu cầu truy cập được **resource** từ những ứng dụng/dịch vụ khác. Do đó việc tuân thủ các quy tắc là cực kì cần thiết. Có 6 nguyên tắc chính bên dưới đây:

#### 1. Uniform interface

Điều này mang ý nghĩa là, bất kì yêu cầu truy cập vào cùng một **resource** thì định dạng của dữ liệu nhận được phải tương tự. Có nghĩa là mỗi resource cần có 1 định danh cụ thể (URI).

Ví dụ: Ứng dụng quản lí thông tin khách hàng, mỗi khách hàng sẽ có 1 mã định dang riêng. Trong trường hợp này khi thiết kế REST API, cần phải đảm bảo tính nhất quán của URI. Cụ thể như sau.
Để truy cập thông tin khách hàng, 1 ứng dụng sẽ gửi yêu cầu vào URI bên dưới

```js
/customers/20220923C1

// JSON response

{
    "id": "20220923C1",
    "name": "Nguyễn Bin",
    "email": "contact@nextjsvietnam.com",
    "phoneNumber": "0937123456"
}
```

#### 2. Client-server decoupling

Trong thiết kế REST-API, ứng dụng client và server phải hoàn toàn độc lập với nhau.

Điều này nghĩa là, ứng dụng client(máy khách) chỉ cần biết thông tin về URI của resource là hoàn toàn có thể tương tác với server để truy cập dữ liệu. Cũng như, phía server không thể thay đổi ứng dụng khách, mà chỉ có thể gửi trả lại dữ liệu khi client yêu cầu.

Do đó REST API còn bổ sung thêm vào việc thiết kế các phương thức giúp cho:

- HTTP verbs: GET, POST, PUT, PATCH, DELETE, OPTIONS

Ngoài ra, chúng ta còn có 1 số tiêu chí để phân loại mức độ của RESTful API đã thiết kế

1. Level 0 : 1 URI, toàn bộ operations sử dụng POST requests.
2. Level 1 : Mỗi resource sẽ có URI riêng
3. Level 2 : Sử dụng HTTP methods để định nghĩa operations cho từng URI
4. Level 3 : Sử dụng hypermedia (HATEOAS) để link tới các resource có liên quan được lồng ghép trong resource hiện tại

> HATEOAS : Hypertext as the Engine of Application State

#### 3. Statelessness

Điều này nghĩa là khi client gửi 1 request lên phía server để yêu cầu thông tin, thì trong nội hàm request đó đã bao gồm đầy đủ các thông tin cần thiết để thực thi.

Lí do là các http requests độc lập với nhau, do đó việc giữ trạng thái giữa các request là không khả thi. Do đó, mỗi request cần chứa đầy đủ các thông tin mà nó cần. Ví dụ giữ thông tin xác thực quyền truy cập resource ( access token )

Nói cách khác, bên phía server không cần thiết phải lưu trữ session của client để kiểm tra mỗi lần có request từ phía client.

Ngoài ra nếu đảm bảo tính statelessness, thì khi scale ngang (horizontal scale), thì bất kì server nào cũng có thể phục vụ được request này.

#### 4. Cacheability

Mục đích hỗ trợ ứng dụng có thể scale được, resource nên được cache lại ở phía client side/ server side. Đặc biệt phía server, đối với các resource có thể được cached thì response cần chứa thêm thông tin đánh dấu resource này được cache và cache trong bao lâu.

#### 5. Layered system architecture

Đôi khi trong thực tế, client và server ko giao tiếp trực tiếp với nhau mà thông qua 1 trung gian khác. Do đó khi thiết kế, cần lưu ý client/server cần biết chắc chắn rằng nó sẽ giao tiếp trực tiếp hay thông qua trung gian.

Ví dụ: Ta có ứng dụng quản lí bật/tắt bóng đèn ở trên. Thực tế client ko giao tiếp trực tiếp với ứng dụng bật/tắt bóng đèn mà thông qua 1 ứng dụng trung gian( giao tiếp với app mobile và ứng dụng quản lí bật/tắt bóng đèn)

#### 6. Code on demand (optional).

Thông thường REST API chỉ trả về dữ liệu của resource. Đôi khi response chứa cả code có thể thực thi được.

## REST Api Design Checklist

Bên dưới đây là checklist tham khảo khi bạn thiết kế 1 ứng dụng RESTful Api

1. [ ] Idempotent methods: GET, HEAD, PUT, DELETE, OPTIONS and TRACE. "the side-effects of N > 0 identical requests is the same as for a single request". Nghĩa là không trigger thay đổi resource khi sử dụng các method trên. Ví dụ: GET /customers/1 luôn là thông tin customer/404 cho N request
2. [ ] Authentication
3. [ ] 201 Created : status được response khi 1 request tạo ra 1 resource mới thành công
4. [ ] 202 Status : status được response khi 1 request hợp lệ và được thực thi, nhưng chưa hoàn thành ngay. Ví dụ: send email
5. [ ] 4xx Status: Client Error (something wrong)
6. [ ] 5xx Status: Server Side Error (something broken)
7. [ ] 410 Gone : resource đã tồn tại ở URL này nhưng hiện tại ko còn. Ví dụ: resource bị deleted, archived, hoặc expired time(download link)
8. [ ] Expect: 100-continue. Ví dụ: phía app chuẩn bị upload 1 file có kích cỡ lớn, có thể sử dụng meta này + độ lớn của file + loại file để server kiểm tra trước xem liệu loại file/độ lớn có hợp lệ không thay vì gửi lên toàn bộ nội dung file rồi mới kiểm tra.
9. [ ] Connection Keep-Alive: Cấu hình để thông số này là hợp lí nhất, vì nếu maintain nhiều connection, sẽ dẫn đến vấn đề lớn về mặt performance
10. [ ] HTTP Compression : Để tăng network performance, chúng ta có thể nén body ở cả phía client lẫn server. response bodies (Accept-Encoding: gzip) and for request bodies (Content-Encoding: gzip)
11. [ ] HTTP Caching: Cache-Control header
12. [ ] Cache Validation: Last-Modified or ETag headers của response
13. [ ] Conditional Modifications
14. [ ] Absolute Redirects: Đối với các 201, 301, 302, 303, 307 response codes, trong header nên chứa Location để hỗ trợ redirect
15. [ ] Canonical URLs: đối với các resource có nhiều URL, sử dụng 1 phương thức cố định để chỉ định đau là URL gốc. Ví dụ: link sản phẩm: products/1 và products/web-chuan-seo-mau-001
16. [ ] Chunked Transfer Encoding: sử dụng Transfer-Encoding: Chunked, nếu content có kích thước lớn để stream dữ liệu cho client
17. [ ] Error Handling in Chunked Transfer Encoding : suy nghĩ về việc handle lỗi khi stream data, vì khi bắt đầu stream response, chúng ta ko thể thay đổi http status code. Tuy nhiên có thể sử dụng Content-Type để làm điều này.
18. [ ] X-HTTP-Method-Override: Một số http clients ko hỗ trợ gì khác ngoài POST/GET, có thể dùng cách này để bypass
19. [ ] URL Length : Nếu API support filter, lưu ý đảm bảo URL ko vượt quá 2000 kí tự
20. [ ] Statelessness
21. [ ] Content Negotiation : hỗ trợ response ở nhiều format thông qua Accept-Headers hoặc URLs khác nhau
22. [ ] URI Template: tạo ra template mẫu cho URI, đảm bảo tính nhất quán trong ứng dụng. [Tham khảo tại](https://www.rfc-editor.org/rfc/rfc6570)
23. [ ] Design for Intent: Đừng chỉ forward toàn bộ business object đang lưu trữ phía server về client side. Luôn nhớ rằng cần design các API theo ý nghĩa của nó và thỏa mãn use-cases trong thực tế.
24. [ ] Versioning : Ví dụ: /v1 tương ứng với phiên bản 1 của API
25. [ ] Authorization : Cần đảm bảo API luôn kiểm tra quyền hạn của user khi truy cập vào các tài nguyên
26. [ ] Bulk Operations: Đôi lúc thay vì gửi quá nhiều request thì gửi 1 bulk operations sẽ giảm tải rất nhiều thời gian chờ đợi cho phía client.
27. [ ] Pagination : Đảm bảo API của bạn hỗ trợ pagination 1 cách nhất quán, tránh việc hiển thị quá nhiều thông tin dư thừa trên client hoặc dữ liệu quá nhiều ko thể tải hết.
28. [ ] Unicode : luôn lưu ý, cũng cần hỗ trợ cả unicode. Ví dụ: customers/search/Sơn
29. [ ] Error Logging: luôn chắc rằng bạn cần áp dụng log các lỗi cần thiết. Đặc biệt nên phân biệt lỗi client và server. Có thể chia làm 2 file log riêng.
30. [ ] Content Types : support các dạng content type phổ biến
31. [ ] HATEOAS : liên kết tới các resource liên quan
32. [ ] Date/time: lưu ý cần cung cấp cả thông tin timezone đối với dữ liệu dạng date/time
33. [ ] SSL : nên xài SSL cho cả client lẫn server
34. [ ] Cross-site Request Forgery (CSRF)
35. [ ] Throttling: Đôi khi client side request quá nhiều vào 1 endpoint trong 1 thời điểm. Ví dụ: gửi request search liên tục khi người dùng gõ. Áp dụng API request limits - 503 cùng với Retry-After header để đảm bảo API vẫn hoạt động tốt.
36. [ ] Subtle Denial of Service: Kĩ thuật Throttling có thể chống quá tải cơ bản, tuy nhiên khi gặp các vấn đề liên quan đến Dos attack, cần đảm bảo hãy sử dụng các công cụ tương ứng.
37. [ ] Connection Keep-Alive
38. [ ] 401 before Authorization: sử dụng Authorization khi cần thiết
39. [ ] Documentation : làm ơn hãy ghi tài liệu hướng dẫn sử dụng API. Tiêu biểu như : swagger
40. [ ] Design with a Customer!: kiếm người xài nha bạn
41. [ ] Feedback : bình tĩnh nhận feedback
42. [ ] Automated Testing: viết khi có thể, nó sẽ giúp bạn tiết kiệm rất nhiều thời gian

## Thông tin tham khảo

- [General](https://www.ibm.com/cloud/learn/rest-apis#toc-what-is-a--MEwTVhOV)
- [Refs](https://mathieu.fenniak.net/the-api-checklist/)
- [Best Practice](https://learn.microsoft.com/en-us/azure/architecture/best-practices/api-design)
- [Maturity Model](https://martinfowler.com/articles/richardsonMaturityModel.html)
