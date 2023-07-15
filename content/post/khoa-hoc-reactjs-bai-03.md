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

## Bài 03

1. Tìm hiểu lý thuyết về props, state, hooks và minh hoạ
2. Tìm hiểu lý thuyết về cách tổ chức cấu trúc dữ liệu trong ứng dụng và minh hoạ
3. Tổng kết

Trong bài trước, các anh chị đã tìm hiểu được cấu trúc 1 ứng dụng ReactJS chính là tổ hợp các component.
Tuy nhiên, trong ứng dụng thực tế, chúng ta cần giải quyết nhiều câu hỏi hóc búa hơn. Trong phạm vi bài học này, chúng ta cùng tìm cách trả lời các câu hỏi sau.

Giả sử, các anh chị phải xây dựng 1 ứng dụng nhỏ, nhằm quản lí 1 danh sách các liên kết.
Mỗi liên kết có thể là: Link website, Hình Ảnh(png/jpg/jpeg), Link Youtube.

Ứng dụng sẽ gồm 1 màn hình duy nhất, các tác vụ thêm, sửa sẽ mở 1 modal cho phép người dùng nhập/thay đổi thông tin, sau khi lưu lại, thông tin trong danh sách sẽ được cập nhật.

**Các tính năng chính của ứng dụng gồm:**

- Thêm, Sửa, Xoá Link
- Hiển thị liên kết theo 3 format: website(dạng link với tiêu đề đã nhập, nếu để trống tiêu đề, sử dụng link), hình ảnh(dạng image với tiêu đề đã nhập, nếu để trống, sử dụng link), link youtube ( dạng iframe với embed link)
- Lưu trữ thông tin ứng dụng trên máy người dùng, để khi tắt ứng dụng mở lại, thông tin đã lưu vẫn còn tồn tại.

**Yêu cầu về giao diện như sau**

> Màn hình chính

![Màn hình chính](https://user-images.githubusercontent.com/31009750/253456804-a3f42811-9a61-438b-bd77-e5e00e128662.png)

> Modal thêm, sửa

![Modal thêm,sửa](https://user-images.githubusercontent.com/31009750/253457039-65cd0eb2-cfbd-4204-a757-c90d1fc3b834.png)

Khi thực hiện ứng dụng trên, các anh chị cần phải trả lời được các câu hỏi sau:
được các thông tin vừa nhập?

1. Làm thế nào để lấy được thông tin trong form nhập liệu của link để tiếp tục xử lý
2. Làm cách nào truyền được data từ danh sách lên modal.
3. Khi người dùng nhập mới/cập nhật thông tin của liên kết, làm thế nào để màn hình danh sách hiển thị.
4. Làm thế nào để nạp thông tin đã lưu trên ứng dụng, khi user mở lại ứng dụng.
5. Nên lưu thông tin ứng dụng trên máy user vào đâu.

Để giải quyết được bài tập này, tôi sẽ gợi ý 1 số bước mà các anh chị cần phải thực hiện như sau:

### Chia nhỏ ứng dụng thành các component

Nguyên tắc chia sẽ giống như việc cắt giao diện HTML từ file design cho trước. Từ trên xuống dưới, từ ngoài vào trong.

Tại bước này các anh/chị phải phân tích và chia nhỏ các cần component cần được xây dựng, dùng để lắp ghép cho sản phẩm cuối cùng.

1. LinkFormComponent

- Input: linkObject
- Output: linkObject

LinkFormComponent sẽ được sử dụng cho cả 2 trường hợp thêm mới/chỉnh sửa 1 liên kết (link).

2. LinkDetailComponent

- Input: linkObject

![image](https://user-images.githubusercontent.com/31009750/253543476-9facfd47-89aa-4889-9aeb-52c96ffbbc1a.png)

3. PaginationComponent

- Input: paginationObject
- Output: activePage

![image](https://user-images.githubusercontent.com/31009750/253543768-b3734491-77d9-4299-bd5b-9753dfd28876.png)

4. LinkManagementContainer

- Là component bao quát toàn bộ ứng dụng quản lí liên kết.

Sau bước này, các anh chị sẽ phần nào hình dung được khối lượng công việc cần phải làm để xây dựng ứng dụng này.

Bước tiếp theo hãy cùng tìm hiểu chi tiết về cơ chế hoạt động của ReactJS và cái khái niệm cơ bản như prop,state, hook, và cách mà ReactJS sẽ cập nhật lại giao diện sau mỗi tương tác của người dùng.

### Tìm hiểu về prop, state, hook thông qua các ví dụ

1. Thiết kế nút "New Link" và LinkFormComponent

- Cài đặt bootstrap
- Handle Event khi ấn nút "New Link" sẽ thực hiện mở Modal chưas Form nhập liệu cho liên kết mới
- Trong Form nhập liệu cho liên kết mới, yêu cầu phải nhập link, phần title nếu ngừoi dùng để trống, sử dụng chính link đã nhập để làm title.
- Khi bấm Close/Esc sẽ đóng modal. Khi mở lại Modal cho New Link, form dữ liệu phải trống.
- Khi bấm Save Changes trong màn hình chính, sẽ hiển thị dạng JSON của những link đã được thêm.

> Using bootstrap

```sh
npm install bootstrap sass --save
```

> index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>%VITE_APP_NAME% - %MODE%</title>
  </head>
  <body>
    <div id="root" class="container"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

> main.jsx

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";
// reset css
import "./index.scss";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

> index.scss

```scss
$primary: #176d16;
$danger: #ff4136;

@import "node_modules/bootstrap/scss/bootstrap";
```

> Event Handler trong ReactJS

> State : bản chất chính là bộ nhớ của component, thể hiện trạng thái hiện tại của component và sẽ biến đổi khi người dùng tương tác với component

Hãy xem xét ví dụ sau

```jsx
import enviroment from "./shared/environment";

const Lession003 = () => {
  let counter = 1;
  console.log("Before render");
  return (
    <>
      <h2>State and Event</h2>
      <h3>Counter: {counter}</h3>
      <button
        type="button"
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          console.log(`Increase counter from ${counter} to ${counter + 1}`);
          counter += 1;
          console.log("After counter increased!", counter);
        }}
      >
        Increase counter
      </button>
    </>
  );
};

export default Lession003;
```

Như ta đã thấy thì việc handler event cũng rất giống với việc handle một event trên DOM, chỉ khác 1 chút về cú pháp, là thay vì gọi function ngay lập tức, trong JSX anh/chị cần assign 1 event cho 1 function. Function này có thể là anonymous function như trong ví dụ, hoặc một function được khai báo trước đó.

```html
<button onclick="myFunction()">Click me</button>
```

Nhìn vào đoạn code trên, anh/chị sẽ nghĩ, khi biến counter thay đổi, trên màn hình lúc này, anh/chị sẽ thấy được giá trị mới của nó. Tuy nhiên hãy theo dõi console.log và kết quả của mỗi lần click vào nút Increase counter.

![image](https://user-images.githubusercontent.com/31009750/253735920-7b913847-85a2-4888-815a-505d0a130743.png)

Đáng lí kết quả nhận được theo như phỏng đoán, là sau mỗi lần counter biến đổi, console.log sẽ ghi nhận thêm 1 dòng của "Before render". Và counter trên giao diện cũng sẽ được cập nhật.

Đáp án là, React Component không có lí do để render lại, nó chỉ render lại khi và chỉ khi **state** biến đổi. Dưới đây là cú pháp để khai báo và sử dụng state trong ReactJS.

```jsx
import { useState } from "react";
import enviroment from "./shared/environment";

const Lession003 = () => {
  const [counter, setCounter] = useState(0);
  console.log("Before render, counter:", counter);
  return (
    <>
      <h2>State and Event</h2>
      <h3>Counter: {counter}</h3>
      <button
        type="button"
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          console.log(`Increase counter from ${counter} to ${counter + 1}`);
          setCounter(counter + 1);
          console.log("After counter increased!", counter);
        }}
      >
        Increase counter
      </button>
    </>
  );
};

export default Lession003;
```

![image](https://user-images.githubusercontent.com/31009750/253736315-136a0174-6b34-4d4f-af22-078c7f7d083e.png)

Sau khi viết lại đoạn code ban đầu, bằng cách sử dụng cú pháp trong React để khai báo và cập nhật state. Chúng ta nhận thấy 3 điều sau:

1. Không thể cập nhật state trực tiếp, chỉ có thể dùng hàm setState được cung cấp.
2. Khi hàm setState được gọi, giá trị của state không thay đổi ngay lập tức.
3. Sau khi Component được render lại, chúng ta mới thấy được giá trị mới của state.

Giả sử, chúng ta gọi hàm cập nhật state liên tiếp nhau thì điều gì sẽ xảy ra:

```jsx
import { useState } from "react";
import enviroment from "./shared/environment";

const Lession003 = () => {
  const [counter, setCounter] = useState(0);
  console.log("Before render, counter:", counter);
  return (
    <>
      <h2>State and Event</h2>
      <h3>Counter: {counter}</h3>
      <button
        type="button"
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          console.log(`Increase counter from ${counter} to ${counter + 1}`);
          setCounter(counter + 1);
          setCounter(counter + 2);
          setCounter(counter + 3);
          console.log("After counter increased!", counter);
        }}
      >
        Increase counter
      </button>
    </>
  );
};

export default Lession003;
```

Có lẽ là 6 hay chăng? Không kết quả là chỉ có setCounter(counter+3) được thực thi.

![image](https://user-images.githubusercontent.com/31009750/253736507-c6fa9749-1c63-4c54-8bde-82219b5baf51.png)

Giải thích: Trong 1 sự kiện , khi diễn ra việc cập nhật state, ReactJS sẽ gom các cập nhật này và thực hiện 1 lần, trong quá trình này nó sẽ tự động loại bỏ các sự kiện cập nhật state bị trùng lặp và sử dụng sự kiện cuối cùng.
Cùng test thử việc cập nhật 2 state riêng biệt trong cùng 1 event và kiểm tra xem ReactJS sẽ render bao nhiêu lần.

```jsx
import { useState } from "react";
import enviroment from "./shared/environment";

const Lession003 = () => {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(1);
  console.log("Before render, counter:", counter, "counter2:", counter2);
  return (
    <>
      <h2>State and Event</h2>
      <h3>Counter: {counter}</h3>
      <h3>Counter2: {counter2}</h3>
      <button
        type="button"
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          console.log(`Increase counter from ${counter} to ${counter + 2}`);
          console.log(`Increase counter from ${counter2} to ${counter2 + 3}`);
          setCounter(counter + 2);
          setCounter2(counter2 + 3);
        }}
      >
        Increase counter
      </button>
    </>
  );
};

export default Lession003;
```

![image](https://user-images.githubusercontent.com/31009750/253738458-3e7f09c2-0a0b-4964-b24c-443a612386f2.png)

#### Xây dựng cấu trúc dữ liệu chung cho ứng dụng

Chính là trạng thái của dữ liệu từ lúc bắt đầu, trong lúc hoạt động, cho đến khi kết thúc.
Điều này cực kì quan trọng, vì ứng dụng ngoài yêu cầu phải tương tác với người dùng, thì nhiệm vụ chính của nó là thể hiện các trạng thái hiện tại của dữ liệu: ban đầu, sau khi biến đổi, khi kết thúc.

#### Bước số 3. Xây dựng chi tiết, bắt đầu từ các component nhỏ nhất.

Nguyên tắc là xây dựng các component nhỏ độc lập, nhận input và trả ra output nếu cần.
Các component lớn hơn, có thể có trạng thái riêng và là tổ hợp chứa nhiều component nhỏ hơn.

#### Bước số 4. Tích hợp toàn bộ các component lại thành 1 ứng dụng hoàn chỉnh

Đây là bước cuối cùng, lắp ráp lại kết quả của các bước trên, nhằm tạo ra 1 ứng dụng hoàn chỉnh cho người dùng.
