---
title: "Khóa học NestJS - Bài 01 - Lộ trình các bài học về NestJS Framework"
type: "post"
date: 2023-05-19T22:00:00+07:00
description: "Giáo án tự học NestJS cho người mới bắt đầu"
keywords: ["nestjs", "dto", "validation"]
categories: ["nestjs-tutorial"]
tags: ["nestjs"]
image: "https://user-images.githubusercontent.com/31009750/181449337-70081a76-5a01-4229-805e-39ed0ded6b5b.png"
---

**Note**: Toàn bộ mã nguồn của khóa học này đều được công khai trên github tại [NestJS Tutorial 2023](//github.com/misostack/nestjs-tutorial-2023)

Trước khi bắt đầu nội dung chi tiết của khóa học này, tôi sẽ liệt kê một số câu hỏi thường gặp, cũng như câu trả lời của nó.

## Lời nói đầu

### Câu hỏi số 1 : Tại sao khóa học này xuất hiện?

> ### Câu trả lời là "Niềm tự hào dân tộc".

Phần lớn tài liệu dành cho lập trình viên được viết bằng "Tiếng Anh", tuy nhiên một số quốc gia như "Trung Quốc", "Nhật Bản", "Hàn Quốc", hay các nước lớn như "Pháp", "Đức" đều có những tài liệu lập trình được địa phương hóa, với rất nhiều kiến thức chuyên sâu, cũng như các chú giải/kinh nghiệm của người đi trước được truyền tải lại.

Nhận thấy được điều này, thay vì tiếp tục viết nhật kí trực tuyến (blog) bằng tiếng Anh, tôi quyết định vẫn tiếp tục chia sẻ kiến thức bằng các nội dung tiếng Việt - đồng thời sẽ dùng google translate dịch toàn bộ nội dung tiếng Việt sang tiếng Anh để chia sẻ trên medium/devto và dẫn liên kết ngược trở lại trang nhật kí này.

### Câu hỏi số 2 : Khóa học này có tốn phí?

> ### Khóa học hoàn toàn miễn phí

- Tuy nhiên bạn vẫn tốn thời gian để đọc và thực hành. Điều quan trọng nhất vẫn là tự bản thân bạn phải thực hành được những kiến thức được chia sẻ trong các bài học và biến nó thành của riêng bạn.

### Câu hỏi số 3 : Khóa học này dành cho ai?

> ### Khóa học dành cho các lập trình viên đã có hiểu biết về nodejs và typescript và expressjs.

- Nếu bạn chưa có kiến thức về nodejs và typescript, hãy tạm dừng và quay trở lại khi đã có kiến thức căn bản về 3 món vũ khí trên.

### Câu hỏi số 4 : Khóa học này gồm những gì?

> ### Khóa học bao gồm 4 phần

- Kiến thức nền tảng của framework NestJS
- Cách sử dụng các module sẵn có trong hệ sinh thái của NestJS
- Cách cấu trúc 1 dự án NestJS trong thực tế
- Chia sẻ kinh nghiệm và hỏi đáp

### Câu hỏi số 5 : Khóa học này sẽ diễn ra trong bao lâu?

> ### Thời gian khóa học kéo dài sẽ phụ thuộc vào việc tôi sẽ sắp xếp được thời gian để lên bài, cũng như số lượng người theo dõi

- Khóa học này sẽ diễn ra trong 1 thời gian dài nhất có thể.
- Mục tiêu để có được bài học chất lượng, nên mục tiêu xuất bản sẽ rơi vào khoảng 1 bài học/tuần.

### Câu hỏi số 6 : Nếu bạn muốn gửi câu hỏi, thì sẽ gửi vào đâu

- Nếu bạn có câu hỏi vui lòng cung cấp một số thông tin [theo mẫu sau](https://forms.gle/dn1BNHmwGJWeCw7f8)

[![image](https://user-images.githubusercontent.com/31009750/246770149-f019c2c1-c641-4598-b5ae-e7ccb90edd3a.png)](https://forms.gle/dn1BNHmwGJWeCw7f8)

## Lộ trình chi tiết

### Bài 2 - Pet Website

- [Chi tiết yêu cầu](https://docs.google.com/document/d/1_WRHoaIVnI2-8RLRah2P6pP-ZbaBfRHStVvCBF3v5xw/edit?usp=sharing)

> Yêu cầu:

- Xây dựng website tìm kiếm thông tin về thú cưng ( chó/mèo ), phân loại thông tin theo chủng loại, đặc điểm sinh học của các giống chó/mèo.
- Thông tin chính : có kèm hình ảnh về thú cưng, mô tả cơ bản, link video nếu có
- Thống kê lượt xem
- Có tính năng vote cho từng thú cưng: like ( tự do vote - mỗi lượt truy cập vote 1 lần )
- Được phép chia sẻ thông tin thú cưng lên mạng xã hội ( facebook )

1. Day 1 : Setup Project - MVC Architecture
2. Day 2 : Controller & Data Validation
3. Day 3 : Model & Migrations & Seeds
4. Day 4 : Service & Dependency Injection
5. Day 5 : Upload File
6. Day 6 : Secure your Application
7. Day 7 : Logging
8. Day 8 : Queue, Scheduling
9. Day 9 : Caching
10. Day 10 : Deployment

### Bài 3 - Pet API

> Về mặt tính năng là tương tự - tuy nhiên thay vì xây dựng 1 trang web, hãy xây dựng API và áp dụng 1 số kĩ thuật có sẵn trong NestJS

1. Day 1 : REST API - Layer Architecture
2. Day 2 : Authentication & Authorization
3. Day 3 : Store your file with AWS S3
4. Day 4 : Data Validation
5. Day 5 : API Doc
6. Day 6 : Testing
7. Day 7 : Mongodb
8. Day 8 : GraphQL
9. Day 9 : Microservices
10. Day 10 : Deployment
