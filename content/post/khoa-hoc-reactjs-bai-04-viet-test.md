---
title: "Khóa học ReactJS Bài 04 - Sử dụng vitest trong dự án React"
type: "post"
date: 2023-09-28T08:07:25+07:00
description: "Tổng hợp các công cụ và phương pháp để test tự động 1 dự án ReactJS. Minh họa với vitest và cypress"
keywords: ["Khoa Hoc Reactjs Bai 04"]
categories: ["cheatsheet"]
tags: []
image: "/common/no-image.png"
---

Đầu tiên, trước khi bắt đầu viết test, các anh/chị cần suy nghĩ xem dự án của mình sẽ test những gì. Cùng nhìn vào hình minh họa bên dưới sau:

> Kim tự tháp kiểm thử phần mềm

![image](https://user-images.githubusercontent.com/31009750/261233946-8a85e14e-e153-4dd0-a22c-ced35255d20c.png)

Do đó, việc viết test được phân vào 3 nhóm chính:

1. Unit Test
2. Integration Test
3. E2E Test ( end to end Test)

Vậy trong mỗi nhóm như vậy các anh/chị sẽ test những gì, công cụ nào có thể hỗ trợ chúng ta làm công việc này.

## Unit Test trong dự án ReactJS

> Unit Test còn được gọi là kiểm thử đơn vị, đơn vị đôi khi là 1 function hoặc cũng có thể làm 1 component, hay thậm chí là 1 module nếu xem xét ở 1 góc độ rộng hơn.

Vậy trong dự án ReactJS, các đơn vị này là gì, và các anh/chị cần test ra sao?

- [x] Test Render Component with props
- [x] Test Util Function

### 1. Test Component

Chính xác đây là cốt lõi và bản chất của các dự án ReactJS (component based system), toàn bộ ứng dụng sẽ được cấu thành từ các component nhỏ(chúng tự quản lí state, và kết hợp chúng để render thành các giao diện hiển thị cho người dùng, react lại hành vi của user khi tương tác).

Như vậy thì test component là test những gì?

- Test render - test kết quả của component(nhận props) sau đó render ra UI tương ứng.

Tại bước này ReactJS cung cấp 1 kĩ thuật gọi là "shallow rendering" giúp các anh/chị có thể test được kết quả của component mà không cần thiết phải mount(headless), giảm được rất nhiều thời gian khi chạy test.

Có nên test state change hay không? Có nhưng nó không thuộc phạm vi cần test trong khi thực hiện Unit Test

### 2. Test Util Function

Trong dự án ReactJS, chắc hẳn sẽ có những function được viết nhằm mục đích biến đổi dữ liệu trước khi được sử dụng, đây cũng được xem là 1 phần trong kiểm thử đơn vị

## Integration Test trong dự án ReactJS

Tại bước này các anh/chị sẽ kiểm tra khi các component ở bước trên có tương tác với các component khác/Api call/Hành vi của user thì nó có hoạt động đúng hay không. Và tại bước này các anh/chị cần sử dụng tới việc mounting của component để kiểm tra xem các component con có hoạt động đúng như mong đợi không.

Ở bước này, khi test các anh/chị sẽ phải áp dụng các kĩ thuật như : mock/stub để giả lập 1 số component/api call/user behavior liên quan nhằm giảm bớt thời gian chạy kiểm thử.

Như vậy có thể tổng hợp lại tại bước này các anh/chị nên test:

1. [x] Test Component with state change
2. [x] Test Component with API call
3. [x] Test Component with User Action

## E2E Test trong dự án ReactJS

Kiểm thử E2E nhằm mục đích sẽ giả lập việc user sử dụng ứng dụng, và kiểm tra xem ứng dụng có hoạt động chính xác không, và việc kiểm này sẽ kiểm tra toàn bộ ứng dụng hoạt động có đúng không.
