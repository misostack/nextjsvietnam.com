---
title: "Manage Your Reactjs State the Right Way"
type: "post"
date: 2022-10-05T14:31:27+07:00
description: "Để dễ dàng nắm bắt được các phương pháp khi làm việc với state, chúng ta sẽ đi qua lần lượt các trường hợp sau"
keywords: [reactjs", "reactjs state management"]
categories: ["frameworks"]
tags: ["reactjs"]
image: "/common/no-image.png"
---

Các khái niệm cần nắm trước khi đọc bài viết này:

1. Khái niệm cơ bản về React State
2. Khái niệm cơ bản về React Hook

Về mặt định nghĩa, thì State trong ReactJS là 1 Javascript Object phản ánh phần dữ liệu của component và có thể bị thay đổi giá trị do các tác nhân trong ứng dụng ( người dùng, web worker, web socket, ...)

Trong phạm vi của bài viết này, toàn bộ ví dụ sẽ được viết theo dạng functional và react hooks.

Khi ứng dụng càng lớn, hoặc trong cùng 1 màn hình lại có rất nhiều tính năng và chúng lại có liên quan mật thiết với nhau. Thì việc thiết kế và tổ chức cấu trúc dữ liệu cho state là điều tối quan trọng.

Để dễ dàng nắm bắt được các phương pháp khi làm việc với state, chúng ta sẽ đi qua lần lượt các trường hợp sau:

1. Internal UI states: phần state được sử dụng để hiển thị hoặc thay đổi về mặt giao diện người dùng như disabled, đổi màu sắc, hiển thị thông báo thành công/lỗi
2. Interal data states: phần state được sử dụng để chứa dữ liệu chính hiển thị cho người dùng
3. Shared UI states: phần state chung được sử dụng thay đổi về mặt UI ở toàn bộ ứng dụng hoặc các cụm màn hình chung
4. Shared data states: phần state được sử dụng để chứa các dữ liệu chung của toàn bộ ứng dụng hoặc 1 cụm các màn hình chung

## Internal UI states

Về loại này chúng ta có thể đi qua các ví dụ cụ thể như sau:

1. On-Off buttons: Giả sử chúng ta có 6 bóng đèn, mỗi bóng đều có công tắc , và ngoài ra còn 1 công tắc điện tổng. Yêu cầu: xây dựng màn hình hiển thị 6 bóng đèn với các công tắc tương ứng. Mặc định ban đầu: toàn bộ các bóng đèn và công tắc điện tổng đều tắt.

Đối với loại này, có các điểm sau cần lưu ý:

- State dành cho trạng thái của công tắc điện tổng
- State dành cho trạng thái của từng bóng đèn

2. React to Input State: Ứng dụng react state để tạo form validate dữ liệu. Yêu cầu:

- Form thu thập thông tin khách hàng: họ tên, email, số điện thoại
- Highlight các field sai format
- Disabled nút submit nếu dữ liệu không hợp lệ
- Disabled toàn bộ form trong thời gian chờ đợi form được submit thành công
- Hiển thị thông báo lỗi nếu có lỗi sau khi submit
- Hiển thị thông báo thành công nếu submit được chấp nhận

Đối với loại này, có các điểm sau cần lưu ý:

- State dành cho input values
- State dành cho trạng thái của các input, của form
- State dành cho trạng thái submit
- State dành cho thông báo lỗi/thành công
