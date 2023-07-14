---
title: "Khóa học ReactJS - Bài 03 - Props và States"
type: "post"
date: 2023-07-13T21:45:10+07:00
description: "Tìm hiểu và nắm vững khái niệm về props và states. Một số pattern phổ biến trong ReactJS."
keywords: ["reactjs", "reactjs-beginner"]
categories: ["reactjs-tutorial"]
tags: ["reactjs"]
image: "https://user-images.githubusercontent.com/31009750/246856332-ece36caa-82ef-4a4f-86d9-9dad4a108929.png"
---

**Note**: Toàn bộ mã nguồn của khóa học này đều được công khai trên github tại [ReactJS Tutorial 2023](https://github.com/misostack/reactjs-tutorial-2023/tree/lession03)

Trong bài trước, các anh chị đã tìm hiểu được cấu trúc 1 ứng dụng ReactJS chính là tổ hợp các component.
Tuy nhiên, trong ứng dụng thực tế, chúng ta cần giải quyết nhiều câu hỏi hóc búa hơn. Trong phạm vi bài học này, chúng ta cùng tìm cách trả lời các câu hỏi sau.

Giả sử, các anh chị phải xây dựng 1 ứng dụng nhỏ, nhằm quản lí 1 danh sách các liên kết.
Mỗi liên kết có thể là: Link website, Hình Ảnh(png/jpg/jpeg), Link Youtube.

Ứng dụng sẽ gồm 1 màn hình duy nhất, các tác vụ thêm, sửa sẽ mở 1 modal cho phép người dùng nhập/thay đổi thông tin, sau khi lưu lại, thông tin trong danh sách sẽ được cập nhật.

Các tính năng chính của ứng dụng gồm:

- Thêm, Sửa, Xoá Link
- Hiển thị liên kết theo 3 format: website(dạng link với tiêu đề đã nhập, nếu để trống tiêu đề, sử dụng link), hình ảnh(dạng image với tiêu đề đã nhập, nếu để trống, sử dụng link), link youtube ( dạng iframe với embed link)
- Lưu trữ thông tin ứng dụng trên máy người dùng, để khi tắt ứng dụng mở lại, thông tin đã lưu vẫn còn tồn tại.

Khi thực hiện ứng dụng trên, các anh chị cần phải trả lời được các câu hỏi sau:
được các thông tin vừa nhập?

1. Làm thế nào để lấy được thông tin trong form nhập liệu của link để tiếp tục xử lý
2. Làm cách nào truyền được data từ danh sách lên modal.
3. Khi người dùng nhập mới/cập nhật thông tin của liên kết, làm thế nào để màn hình danh sách hiển thị.
4. Làm thế nào để nạp thông tin đã lưu trên ứng dụng, khi user mở lại ứng dụng.
5. Nên lưu thông tin ứng dụng trên máy user vào đâu.

Để giải quyết được bài tập này, tôi sẽ gợi ý 1 số bước mà các anh chị cần phải thực hiện như sau:

### Bước số 1. Chia nhỏ ứng dụng thành các component.

Nguyên tắc chia sẽ giống như việc cắt giao diện HTML từ file design cho trước. Từ trên xuống dưới, từ ngoài vào trong.

### Bước số 2. Xây dựng cấu trúc dữ liệu chung cho ứng dụng

Chính là trạng thái của dữ liệu từ lúc bắt đầu, trong lúc hoạt động, cho đến khi kết thúc.
Điều này cực kì quan trọng, vì ứng dụng ngoài yêu cầu phải tương tác với người dùng, thì nhiệm vụ chính của nó là thể hiện các trạng thái hiện tại của dữ liệu: ban đầu, sau khi biến đổi, khi kết thúc.

### Bước số 3. Xây dựng chi tiết, bắt đầu từ các component nhỏ nhất.

Nguyên tắc là xây dựng các component nhỏ độc lập, nhận input và trả ra output nếu cần.
Các component lớn hơn, có thể có trạng thái riêng và là tổ hợp chứa nhiều component nhỏ hơn.

### Bước số 4. Tích hợp toàn bộ các component lại thành 1 ứng dụng hoàn chỉnh

Đây là bước cuối cùng, lắp ráp lại kết quả của các bước trên, nhằm tạo ra 1 ứng dụng hoàn chỉnh cho người dùng.
