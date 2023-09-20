---
title: "Khóa học NestJS - Bài 06 Hướng dẫn viết Unit Test"
type: "post"
date: 2023-07-06T21:52:16+07:00
description: "Cùng tìm hiểu cách viết unit test và cách mà nó giúp ích cho bạn cũng như dự án"
keywords: ["nestjs", "nestjs-mvc", "nestjs-tutorial"]
categories: ["nestjs-tutorial"]
tags: ["nestjs", "nestjs-pet-website"]
image: "https://user-images.githubusercontent.com/31009750/181449337-70081a76-5a01-4229-805e-39ed0ded6b5b.png"
---

- [Lession 06 Source Code](https://github.com/misostack/nestjs-tutorial-2023/tree/lession06)

## Bài 06

1. Giới thiệu sơ qua về Unit Test
2. Cách test một service trong NestJS
3. Hướng dẫn debug unit test trong NestJS
4. Ứng dụng viết Unit Test cho PetCategory

Đầu tiên, các anh/chị có thể thấy rằng sẽ có một mối quan hệ mật thiết giữa 3 thứ trong ngành này: errors/bugs(lỗi), stress(căng thẳng), tests(kiểm tra)

![image](https://user-images.githubusercontent.com/31009750/261230050-80f15af7-6ed7-49fd-9907-6bb248aa7137.png)

1. Càng nhiều lỗi (errors/bugs) thì càng căng thẳng(stress)
2. Càng căng thẳng(stress) thì càng tạo ra nhiều lỗi(errors/bugs)
3. Càng kiểm tra nhiều(test) thì càng ít lỗi(errors/bugs) do đã phát hiện và được sửa
4. Càng ít lỗi(errors/bugs) thì càng ít cằng thẳng(stress)

Do đó, việc test nhiều/kĩ sẽ đảm bảo được các anh/chị sẽ ít căng thẳng(stress) hơn.

Tiếp theo tôi xin giới thiệu với các anh/chị nghệ thuật viết test như thế nào cho đúng. Trước tiên, tôi xin phép đi qua một khái niệm tổng quát về testing trong ngành phần mềm.

> Kim tự tháp kiểm thử phần mềm

![image](https://user-images.githubusercontent.com/31009750/261233946-8a85e14e-e153-4dd0-a22c-ced35255d20c.png)

Bao gồm tất cả các giai đoạn của vòng đời phát triển phần mềm (SDLC). Nó bắt đầu từ unit testing, đến kiểm thử tích hợp (integration testing) và kết thúc với kiểm thử chức năng ở đỉnh(e2e)

Không có sự phân bổ cố định giữa các loại kiểm thử này. Thay vào đó, bạn nên xác định những bài kiểm thử nào phù hợp nhất với nhu cầu của bạn dựa vào việc cân đối chi phí, thời gian thực hiện và tài nguyên cho từng loại kiểm thử.

Các nhà phát triển phần mềm Agile cũng sử dụng phương pháp góc phần tư kiểm thử phần mềm ( Software Testing Quadrants) để phân loại các kiểm thử theo **nghiệp vụ**(business-facing) hay **technology facing**(công nghệ) nhằm tìm ra những bất cập của sản phẩm(critique product) và hỗ trợ đội ngũ phát triển xây dựng và thay đổi ứng dụng 1 cách tự tin.

![image](https://user-images.githubusercontent.com/31009750/261236689-fd1a32e5-bd46-439f-a455-997507a259e6.png)

Vậy là chúng ta đã đi qua tổng quan về một số khái niệm cũng như phương pháp kiểm thử phần mềm. Trong phạm vi bài viết này, tôi sẽ tập trung trình bày vào 2 phần chính:

- Unit Tests

## Vậy viết Unit Test cụ thể là làm gì

Các anh/chị cố gắng ghi nhớ định nghĩa đơn giản sau đây, để phân tích và áp dụng được unit test vào trong dự án mà không tốn quá nhiều thời gian/tài nguyên.

> Unit test được áp dụng để kiểm tra logic của một đoạn code thuộc 1 phần mềm. Đôi khi trong một hệ thống, cũng có thể tình một module là 1 unit.

## Công cụ hỗ trợ viết Unit Test

Các anh/chị có 2 lựa chọn khi viết Unit Test:

- [x] Tự xây dựng 1 framework hỗ trợ viết Unit Test
- [x] Sử dụng 1 framework Unit Test có sẵn trong hệ sinh thái

Framework được xây dựng/lựa chọn cần phải đáp ứng các tiêu chí sau:

- Dễ setup và well document
- Hỗ trợ tạo test suite, gom nhóm các test case
- Hỗ trợ các util cho việc kiểm tra kết quả
- Hỗ trợ Mock/Stub
- Hỗ trợ Async
- Hỗ trợ report

Các framework Unit Test hiện tại trong hệ sinh thái NodeJS được gom thành 2 trường phái:

![NodeJS Testing Frameworks](https://github.com/misostack/typescript-examples/blob/master/images/tdd-vs-bdd.png?raw=true)

1. JestJS : support jsdom, BDD style ( support typescript )
2. Jasmine: BDD style
3. Mocha(Testing Framework) & Chai(Assertion Libs): TDD style

Trong phạm vi của bài viết này, tôi sẽ chia sẻ với các anh/chị về một số cú pháp/khái niệm khi sử dụng JestJS ( testing framework được giới thiệu chung với NestJS). Do đó mục này sẽ gồm 2 phần:

1. Tìm hiểu và thực hành 1 số khái niệm cùng với JestJS
2. Tìm hiểu và thực hành Unit Test cùng với JestJS trên nên tảng web/api được viết bằng NestJS

### Tìm hiểu và thực hành một số khái niệm cùng với JestJS

> Cùng thực hành viết unit test cho usecase "Login with email and password"

![image](https://user-images.githubusercontent.com/31009750/268600867-345ea5c2-7ad1-44ba-aef6-da6866c23a2d.png)

### Tham khảo

- https://www.guru99.com/component-testing.html - Component Testing
- https://www.onpathtesting.com/blog/what-are-agile-testing-quadrants - Agile testing quadrants
- https://circleci.com/blog/component-vs-unit-testing/ - Component vs Unit Testing
