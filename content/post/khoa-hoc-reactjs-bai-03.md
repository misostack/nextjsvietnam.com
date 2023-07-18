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

#### Event Handler trong ReactJS

```jsx
<a
  href="https://nextjsvietnam.com"
  className="btn btn-primary"
  onClick={(e) => {
    e.preventDefault();
    alert(`You're going to redirect to ${e.target.href}`);
  }}
>
  Event Handler
</a>
```

#### Props

> Trong ReactJS, các component thường sử dụng props để giao tiếp với nhau. Các component cha thường sẽ truyền dữ liệu cho các component con thông qua props. Ngoài ra props còn bao gồm cả các thuộc tính HTML, các giá trị trong Javascript như: objects, arrays, kể cả functions.

```jsx
import { useState } from "react";
import enviroment from "./shared/environment";

const Counter = ({ number, children, ...props }) => {
  return (
    <>
      <a {...props}>
        Counter Name:{children}
        <br />
        Value: {number}
      </a>
    </>
  );
};

const Lession003 = () => {
  const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <>
      {values.map((v, index) => (
        <Counter key={index} number={v} className="btn btn-primary">
          Counter {index + 1}
        </Counter>
      ))}
    </>
  );
};

export default Lession003;
```

Có 3 điểm cần lưu ý ở đây khi sử dụng props:

1. Tất cả các thuộc tính được truyền vào dạng attribute của 1 tag/component đều được gộp vào props. Tuy nhiên hãy sử dụng spread operator để chọn ra các thuộc tính chắc chắn có, điều này giúp editor dễ dàng hỗ trợ anh/chị trong quá trình code.
2. Trong ví dụ trên anh/chị sẽ thấy sự xuất hiện của **chidren**, từ khoá này mang ý nghĩa phần content bên trong 2 thẻ đóng mở của component sẽ được gán vào prop có key là **children**.
3. Props là readonly, không bao giờ được cố gắng thay đổi value của props (immutable). Luôn sử dụng state bên dưới khi cần một loại biến để thay đổi giá trị mỗi lần user tương tác.

Một lưu ý, khi render 1 list trong ReactJS, ta sẽ thấy lỗi sau xuất hiện trên console.

![image](https://user-images.githubusercontent.com/31009750/253806885-a6677a9d-8787-4e55-8109-6d127052ea0e.png)

Nguyên nhân là trong thiết kế của ReactJS, nhằm tối ưu hoá việc render, update DOM, khi render 1 list item, việc gán một key unique cho từng phần tử thuộc mảng, sẽ giúp ReactJS tối ưu được việc render khi một item được thêm/xoá/cập nhật.

#### State

> Bản chất chính là bộ nhớ của component, thể hiện trạng thái hiện tại của component và sẽ biến đổi khi người dùng tương tác với component

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
4. Nếu state là một object, cần lưu ý, giá trị mới của state phải tạo thành 1 object mới, thì React mới nhận biết được state đã thay đổi mà render lại (do object trong javascript luôn được tham chiếu tới 1 địa chỉ cố định lúc khởi tạo và trong quá trình thay đổi giá trị, địa chỉ tham chiếu này vẫn không đổi).

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

Giải thích: Trong 1 sự kiện , khi diễn ra việc cập nhật state, ReactJS sẽ gom các cập nhật này và thực hiện 1 lần, lúc này state counter sẽ là 1 giá trị cố định trong mỗi event cập nhật, do đó dù các event update state trước đó là +1,+2 được thực hiện nhưng tại bước số +3, giá trị counter vẫn được lấy từ giá trị ban đầu, do đó kết quả sẽ như ta đã thấy.
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

Nếu thay vì sử dụng giá trị state trực tiếp trong component, và cập nhật state sử dụng callback function như bên dứoi

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
          setCounter((counter) => counter + 2);
          setCounter((counter) => counter + 4);
          setCounter2((counter2) => counter2 + 3);
        }}
      >
        Increase counter
      </button>
    </>
  );
};

export default Lession003;
```

Kết quả nhận được đúng như những gì được mô tả.

![image](https://user-images.githubusercontent.com/31009750/253738818-448d77fe-f25f-4bae-a0a9-b0ec5f8a5078.png)

Tiếp tục thử nghiệm với setTimeOut,

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
          setCounter((counter) => counter + 2);
          setCounter((counter) => counter + 4);
          setTimeout(() => {
            setCounter((counter) => counter + 6);
          }, 0);
          setCounter2((counter2) => counter2 + 3);
        }}
      >
        Increase counter
      </button>
    </>
  );
};

export default Lession003;
```

Kết quả ta có 2 lần render, vì lần cập nhật state counter + 6 diễn ra trong 1 tiến trình khác.

![image](https://user-images.githubusercontent.com/31009750/253738943-b6630f8f-dc06-4755-a0d8-2cfa12e5ea98.png)

Cùng thử nghiệm với object cho statestate

```jsx
import { useState } from "react";
import enviroment from "./shared/environment";

const Lession003 = () => {
  const [stateObject, setStateObject] = useState({
    a: {
      b: {
        c: 1,
      },
    },
  });
  console.log("Before render, stateObject.a.b.c:", stateObject.a.b.c);
  return (
    <>
      <h2>State and Event</h2>
      <h3>StateObject: {JSON.stringify(stateObject)}</h3>
      <button
        type="button"
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          setStateObject((obj) => {
            console.log(obj.a.b.c, "obj === stateObject", obj === stateObject);
            obj.a.b.c += 1;
            return obj;
          });
        }}
      >
        Increase counter
      </button>
    </>
  );
};

export default Lession003;
```

Kết quả, dù ta thấy value c có thay đổi nhưng thực tế trên UI vẫn không hề render lại.

![image](https://user-images.githubusercontent.com/31009750/253748442-c7c9b1f3-a71b-48e8-9377-7fa9a0a65f1f.png)

Do đó việc mutate trực tiếp object và kết quả sau khi đổi vẫn tham chiếu tới cùng 1 object, sẽ khiến React Component không nhận biết được sẽ phải render lại, do nó thực hiện phép so sánh giữa 2 object với nhau.
Vì vậy, việc bắt buộc là anh/chị không được thay đổi trực tiếp object này, mà nên tạo 1 object bao gồm các gía trị của object cũ được trộn với giá trị mới đã thay đổi.

```jsx
import { useState } from "react";
import enviroment from "./shared/environment";

const Lession003 = () => {
  const [stateObject, setStateObject] = useState({
    a: {
      b: {
        c: 1,
      },
    },
  });
  console.log("Before render, stateObject.a.b.c:", stateObject.a.b.c);
  return (
    <>
      <h2>State and Event</h2>
      <h3>StateObject: {JSON.stringify(stateObject)}</h3>
      <button
        type="button"
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          setStateObject((obj) => {
            console.log(obj.a.b.c, "obj === stateObject", obj === stateObject);
            return {
              ...obj,
              a: {
                b: {
                  c: obj.a.b.c + 1,
                },
              },
            };
          });
        }}
      >
        Increase counter
      </button>
    </>
  );
};

export default Lession003;
```

![image](https://user-images.githubusercontent.com/31009750/253748682-a14a9340-d363-4063-aee4-e3c2457c04c7.png)

Lúc này cả trên UI, lẫn console, giá trị của c đều được cập nhật tương ứng.

> Làm thế nào để lấy được giá trị của form input

```jsx
import { useState } from "react";

const Lession003 = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useState([]);

  return (
    <>
      <h2>State Array</h2>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Item name
        </label>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name"
        />
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          setItems((items) => {
            return [...items, input];
          });
        }}
      >
        Add new item
      </button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default Lession003;
```

![image](https://user-images.githubusercontent.com/31009750/253852462-a2dbe6dc-e78a-486a-a47b-7c45952bf739.png)

Như vậy ta có thể thấy rằng bằng cách sử dụng state, và event onChange, các anh/chị sẽ có thể đồng bộ được user input và state của input này. Nhờ vào cơ chế của ReactJS mà trong hình các anh/chị chỉ thấy phần được render lại chính là nội dung của input chứ ko phải toàn bộ, điều này giúp cho ứng dụng trở nên mượt mà là vậy.

> Cùng thử với state dạng array

```jsx
<button
  type="button"
  className="btn btn-primary"
  onClick={(e) => {
    e.preventDefault();
    setItems((items) => {
      return [...items, input];
    });
  }}
>
  Add new item
</button>
```

Qua các ví dụ trên chúng ta đúc kết được như sau:

![image](https://user-images.githubusercontent.com/31009750/253850183-5e54ca43-42e9-444a-8f06-6eeba6261bab.png)

> Tuy nhiên cách viết trên, làm đoạn code trông khá là phức tạp và khó bảo trì. Các anh/chị có thể sử dụng thư viên immer để vẫn đảm bảo tính immutable của state nhưng khi viết code thì trông như đang mutate vậy.

```sh
npm install use-immer --save
```

```jsx
import { useState } from "react";
import { useImmer } from "use-immer";

const Lession003 = () => {
  const [input, setInput] = useState("");
  const [items, setItems] = useImmer([]);

  return (
    <>
      <h2>State Array</h2>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">
          Item name
        </label>
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder="name"
        />
      </div>
      <button
        type="button"
        className="btn btn-primary"
        onClick={(e) => {
          e.preventDefault();
          setItems((items) => {
            items.push(input);
          });
        }}
      >
        Add new item
      </button>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </>
  );
};

export default Lession003;
```

Đoạn code mới này trông clean hơn hẳn đúng không nào.

#### Quá trình một ReactJS Component render sẽ diễn tiến như sau:

> ### Trigger -> Render -> Commit

**Trigger:**

- Khi ứng dụng khởi tạo tại bước này ReactJS sẽ nhúng ứng dụng vào DOM node root, và thực hiện gọi phương thức **render** của các component.
- Re-render: mỗi khi component cập nhật state của nó, thì bản thân nó sẽ render lại, điều này dẫn đến việc các children components của nó cũng sẽ render lại.

**Render**:

- Như đã đề cập ở trên, khi ứng dụng khởi tạo, React sẽ gọi root component thực hiện render.
- Đối với các lần tiếp theo, React sẽ thực gọi các function component có state update trigger việc render này.

**Commit**:

- Khi ứng dụng khởi tạo, sau khi component root render thành công, React lúc này sẽ append toàn bộ DOM nodes được tạo vào cây DOM.
- Đối với các lần tiếp theo, React sẽ thực hiện so sánh và chỉ cập nhật cây DOM nếu thực sự có thay đổi.

Vậy là các anh/chị đã có 1 cái nhìn tổng quan về state,props trong ReactJS và cách mà ReactJS render lại các component khi state thay đổi.

### Thực hành xây dựng ứng dụng quản lí liên kết

#### Yêu cầu của ứng dụng

Trong ứng dụng thực tế, chúng ta cần giải quyết nhiều câu hỏi hóc búa hơn. Trong phạm vi bài học này, chúng ta cùng tìm cách trả lời các câu hỏi sau.

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

### Các bước chính:

1. Phân tích và chia nhỏ các cần component
2. Thiết kế cấu trúc dữ liệu
3. Xây dựng chi tiết, bắt đầu từ các component nhỏ nhất.
4. Tích hợp toàn bộ các component lại thành 1 ứng dụng hoàn chỉnh

#### Bước 1: Phân tích và chia nhỏ các cần component

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

#### Bước 2 : Thiết kế cấu trúc dữ liệu

Chính là trạng thái của dữ liệu từ lúc bắt đầu, trong lúc hoạt động, cho đến khi kết thúc.
Điều này cực kì quan trọng, vì ứng dụng ngoài yêu cầu phải tương tác với người dùng, thì nhiệm vụ chính của nó là thể hiện các trạng thái hiện tại của dữ liệu: ban đầu, sau khi biến đổi, khi kết thúc.

Trong phần này tôi sẽ hướng dẫn xây dựng cấu trúc dữ liệu cho ví dụ minh họa trong bài học này. Các anh chị có thể đọc thêm về cách xây dựng và lựa chọn cấu trúc dữ liệu cho state tại [bài viết này](https://nextjsvietnam.com/post/manage-your-reactjs-state-the-right-way/).

Sau một số bước phân tích, anh/chị sẽ có được 1 sơ đồ mô tả tóm tắt các props và states của các component trong ứng dụng trên như sau.

![image](https://user-images.githubusercontent.com/31009750/253876828-38aa00a5-56f3-4f1b-9a62-2428ea4bfaac.png)

Sau khi có cái nhìn tổng quan về cấu trúc dữ liệu của các component. Lúc này các anh/chị cần thiết kế luồng dữ liệu giữa các component trong ứng dụng.

![image](https://user-images.githubusercontent.com/31009750/253907170-192c1260-1bdf-4f43-b200-457ac65d972d.png)

Sau khi phân tích xong, các anh/chị đã có thể tiến hành bước tiếp theo là implementation.

#### Bước số 3. Xây dựng chi tiết, bắt đầu từ các component nhỏ nhất.

Nguyên tắc là xây dựng các component nhỏ độc lập, nhận input và trả ra output nếu cần.
Các component lớn hơn, có thể có trạng thái riêng và là tổ hợp chứa nhiều component nhỏ hơn.

##### 3.1. Xây dựng LinkFormComponent

- LinkFormComponent sẽ là một modal, trong đó chứa form add/edit 1 liên kết.
- Khi người dùng bấm cancel, modal sẽ đóng, dữ liệu đã nhập cần phải được xóa, để lần sau khi mở lại, form nhập liệu sẽ luôn ở trạng thái mới.
- Khi người dùng bấm save, dữ liệu cần được kiểm tra (validate) - ở đây chỉ cần kiểm tra link phải là dạng liên kết là được.
- Sau khi dữ liệu hợp lệ, dữ liệu sẽ được truyền ngược trở lại component cha là "LinkManagementContainer" để cập nhật state và render lại list link được hiển thị, link mới được cập nhật sẽ được hiển thị trên cùng.

Cùng xem xét cách show 1 modal trong bootstrap

```html
<div class="modal" tabindex="-1">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
```

Để điều khiển modal này ẩn hiện các anh/chị cần dùng đoạn javascript như sau

```js
const myModal = new bootstrap.Modal(document.getElementById("myModal"), {
  backdrop: true,
  focus: true,
  keyboard: true,
});
// open modal
myModal.show();
// close modal
myModal.close();
```

Trong bước này, chúng ta có 3 hướng xử lý:

**1. Hướng thứ 1: tạo 1 component duy nhất, nhận prop là link để phân biệt 2 trường hợp: add và edit.**

- Để sử dụng được modal theo như doc của bootstrap, lúc này các anh/chị cần tìm cách khởi tạo được modal bằng cách truyền DOM Element của Modal chứa LinkForm.
- Và modal sau khi khởi tạo xong, cũng không cần thiết phải trigger việc render lại.

ReactJS có giới thiệu cho các anh/chị 1 hook **useRef** để áp dụng trong trường hợp này.

```jsx
import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import LinkFormComponent from "./components/LinkFormComponent";
import enviroment from "./shared/environment";
import { Modal } from "bootstrap";

function App() {
  const linkFormComponentModalInstance = useRef(null);
  const linkFormComponentModal = useRef(null);
  const [editLink, setEditLink] = useState(null);
  const onNewLink = (e) => {
    e.preventDefault();
    if (!linkFormComponentModalInstance.current) {
      console.log("new modal", linkFormComponentModalInstance.current);
      linkFormComponentModalInstance.current = new Modal(
        linkFormComponentModal.current,
        {
          backdrop: true,
          focus: true,
          keyboard: true,
        }
      );
      linkFormComponentModalInstance.current.show();
      console.log("created modal", linkFormComponentModalInstance.current);
      return;
    }
    console.log("existing modal", linkFormComponentModalInstance.current);
    linkFormComponentModalInstance.current.show();
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="https://nextjsvietnam.com/themes/2022/src/assets/images/logo.png"
              alt="Bootstrap"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  {enviroment.APP_NAME}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="mt-4">
        <div className="card">
          <div className="card-header text-bg-primary">
            <h3 className="card-title">Links</h3>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" onClick={onNewLink}>
                New Link
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className="mt-4">
        <div className="container">
          <p className="text-center">
            Copyright@JSBase - {enviroment.APP_VERSION} - {enviroment.MODE}
          </p>
        </div>
      </footer>
      <LinkFormComponent
        id="LinkFormComponent"
        className="modal"
        tabIndex="-1"
        ref={linkFormComponentModal}
        link={editLink}
      ></LinkFormComponent>
    </>
  );
}

export default App;
```

Tuy nhiên khi sử dụng ref cho function component, ReactJS sẽ hiện thị ra lỗi bên dưới.

```sh
react-dom.development.js:86 Warning: Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?
```

Lí do là ref chỉ xài được cho các native HTML Element, trường hợp anh/chị muốn sử dụng cho ReactComponent cần làm theo cú pháp sau. Do đó anh/chị cần refactor lại đoạn code trên 1 chút.

> App.jsx

```jsx
import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import LinkFormComponent from "./components/LinkFormComponent";
import enviroment from "./shared/environment";
import { Modal } from "bootstrap";

function App() {
  const linkFormComponentModalInstance = useRef(null);
  const linkFormComponentModal = useRef(null);
  const [editLink, setEditLink] = useState(null);
  const onNewLink = (e) => {
    e.preventDefault();
    if (!linkFormComponentModalInstance.current) {
      console.log("new modal", linkFormComponentModalInstance.current);
      linkFormComponentModalInstance.current = new Modal(
        linkFormComponentModal.current,
        {
          backdrop: true,
          focus: true,
          keyboard: true,
        }
      );
      linkFormComponentModalInstance.current.show();
      console.log("created modal", linkFormComponentModalInstance.current);
      return;
    }
    console.log("existing modal", linkFormComponentModalInstance.current);
    linkFormComponentModalInstance.current.show();
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="https://nextjsvietnam.com/themes/2022/src/assets/images/logo.png"
              alt="Bootstrap"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  {enviroment.APP_NAME}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="mt-4">
        <div className="card">
          <div className="card-header text-bg-primary">
            <h3 className="card-title">Links</h3>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" onClick={onNewLink}>
                New Link
              </button>
            </div>
          </div>
        </div>
      </main>
      <footer className="mt-4">
        <div className="container">
          <p className="text-center">
            Copyright@JSBase - {enviroment.APP_VERSION} - {enviroment.MODE}
          </p>
        </div>
      </footer>
      <LinkFormComponent
        ref={linkFormComponentModal}
        link={editLink}
      ></LinkFormComponent>
    </>
  );
}

export default App;
```

> src\components\LinkFormComponent.jsx

```jsx
import { forwardRef } from "react";

const LinkFormComponent = forwardRef(({ link, ...props }, ref) => {
  return (
    <div id="LinkFormComponent" className="modal" tabIndex="-1" ref={ref}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{link ? "Edit Link" : "Add Link"}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="name@example.com"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="exampleFormControlTextarea1"
                className="form-label"
              >
                Example textarea
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

LinkFormComponent.displayName = "LinkFormComponent";

export default LinkFormComponent;
```

Tuy nhiên, anh/chị cần điều chỉnh một chút vì LinkFormComponent sẽ xài chung cho cả hai trường hợp

```jsx
import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import LinkFormComponent from "./components/LinkFormComponent";
import enviroment from "./shared/environment";
import { Modal } from "bootstrap";
import { useImmer } from "use-immer";

export const LINK_TYPE = {
  LINK: "link",
  YOUTUBE: "youtube",
  IMAGE: "image",
};

function App() {
  const linkFormComponentModalInstance = useRef(null);
  const linkFormComponentModal = useRef(null);
  const [editLink, setEditLink] = useState(null);
  const [links, setLinks] = useImmer([
    {
      id: 1,
      link: "https://nextjsvietnam.com",
      title: "https://nextjsvietnam.com",
      type: LINK_TYPE.LINK,
    },
  ]);

  const openModal = () => {
    if (!linkFormComponentModalInstance.current) {
      console.log("new modal", linkFormComponentModalInstance.current);
      linkFormComponentModalInstance.current = new Modal(
        linkFormComponentModal.current,
        {
          backdrop: true,
          focus: true,
          keyboard: true,
        }
      );
      linkFormComponentModalInstance.current.show();
      console.log("created modal", linkFormComponentModalInstance.current);
      // handler event close
      linkFormComponentModal.current.addEventListener("hide.bs.modal", () => {
        // reset state
        setEditLink(null);
      });
      return;
    }
    console.log("existing modal", linkFormComponentModalInstance.current);
    linkFormComponentModalInstance.current.show();
  };

  const onNewLink = (e) => {
    e.preventDefault();
    openModal();
  };

  const onEditLink = (link) => {
    // set editLink
    setEditLink(link);
    // open modal
    openModal();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="https://nextjsvietnam.com/themes/2022/src/assets/images/logo.png"
              alt="Bootstrap"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  {enviroment.APP_NAME}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="mt-4">
        <div className="card">
          <div className="card-header text-bg-primary">
            <h3 className="card-title">Links</h3>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" onClick={onNewLink}>
                New Link
              </button>
            </div>
            <div>
              {links.map((link) => (
                <div key={link.id}>
                  <h4>{link.title}</h4>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => {
                      onEditLink(link);
                    }}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="mt-4">
        <div className="container">
          <p className="text-center">
            Copyright@JSBase - {enviroment.APP_VERSION} - {enviroment.MODE}
          </p>
        </div>
      </footer>
      <LinkFormComponent
        ref={linkFormComponentModal}
        link={editLink}
      ></LinkFormComponent>
    </>
  );
}

export default App;
```

> Truyền lại newLinkData cho LinkManagementContainer

Cách thông thường nhất trong ReactJS là các anh/chị sẽ truyền 1 function trong component cha nhận param là newLinkData và cập nhật lại state tại component cha.

> App.jsx

```jsx
import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import LinkFormComponent from "./components/LinkFormComponent";
import enviroment from "./shared/environment";
import { Modal } from "bootstrap";
import { useImmer } from "use-immer";
import PaginationComponent from "./components/PaginationComponent";

export const LINK_TYPE = {
  LINK: "link",
  YOUTUBE: "youtube",
  IMAGE: "image",
};

function App() {
  const linkFormComponentModalInstance = useRef(null);
  const linkFormComponentModal = useRef(null);
  const [editLink, setEditLink] = useState(null);
  const [links, setLinks] = useImmer([
    {
      id: 1,
      link: "https://nextjsvietnam.com",
      title: "https://nextjsvietnam.com",
      type: LINK_TYPE.LINK,
      publishedDate: new Date(),
    },
  ]);
  const [paginator, setPaginator] = useImmer({
    currentPage: 1,
    numberOfPages: 10,
    rowsPerPage: 5,
    numberOfItems: 50,
  });

  const openModal = () => {
    if (!linkFormComponentModalInstance.current) {
      console.log("new modal", linkFormComponentModalInstance.current);
      linkFormComponentModalInstance.current = new Modal(
        linkFormComponentModal.current,
        {
          backdrop: true,
          focus: true,
          keyboard: true,
        }
      );
      linkFormComponentModalInstance.current.show();
      console.log("created modal", linkFormComponentModalInstance.current);
      // handler event close
      linkFormComponentModal.current.addEventListener("hide.bs.modal", () => {
        // reset state
        setEditLink(null);
      });
      return;
    }
    console.log("existing modal", linkFormComponentModalInstance.current);
    linkFormComponentModalInstance.current.show();
  };

  const closeModal = () => {
    if (linkFormComponentModalInstance.current) {
      linkFormComponentModalInstance.current.hide();
    }
  };

  const onNewLink = (e) => {
    e.preventDefault();
    openModal();
  };

  const onEditLink = (link) => {
    // set editLink
    setEditLink(link);
    // open modal
    openModal();
  };

  const onSaveLink = (data) => {
    const link = structuredClone(data);
    // new link has no id
    // existed link has id
    if (link && !link.id) {
      setLinks((linkList) => {
        Reflect.set(link, "id", Date.now());
        Reflect.set(link, "publishedDate", new Date());
        linkList.push(link);
      });
      // close modal
      closeModal();
      return;
    }
    // otherwise edit mode
    if (link && link.id) {
      setLinks((linkList) => {
        Reflect.set(link, "publishedDate", new Date());
        const editLinkIndex = linkList.findIndex((l) => l.id === link.id);
        linkList[editLinkIndex] = link;
      });
      // close modal
      closeModal();
      return;
    }
  };
  const onChangeCurrentPage = (newCurrentPage) => {
    setPaginator((p) => {
      p.currentPage = newCurrentPage;
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="https://nextjsvietnam.com/themes/2022/src/assets/images/logo.png"
              alt="Bootstrap"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  {enviroment.APP_NAME}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="mt-4">
        <div className="card">
          <div className="card-header text-bg-primary">
            <h3 className="card-title">Links</h3>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" onClick={onNewLink}>
                New Link
              </button>
            </div>
            <div>
              {links.map((link) => (
                <div key={link.id}>
                  <h4>
                    <a rel="noreferrer" target="_blank" href={link.link}>
                      {link.title}
                    </a>
                  </h4>
                  <span>
                    {link.publishedDate && link.publishedDate.toISOString()}
                  </span>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => {
                      onEditLink(link);
                    }}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
            <PaginationComponent
              numberOfPages={paginator.numberOfPages}
              currentPage={paginator.currentPage}
              onChangeCurrentPage={onChangeCurrentPage}
            />
          </div>
        </div>
      </main>
      <footer className="mt-4">
        <div className="container">
          <p className="text-center">
            Copyright@JSBase - {enviroment.APP_VERSION} - {enviroment.MODE}
          </p>
        </div>
      </footer>
      <LinkFormComponent
        ref={linkFormComponentModal}
        link={editLink}
        onSaveLink={onSaveLink}
      ></LinkFormComponent>
    </>
  );
}

export default App;
```

> src\components\LinkFormComponent.jsx

```jsx
import { forwardRef, useEffect } from "react";
import { useImmer } from "use-immer";

const LinkFormComponent = forwardRef(({ link, onSaveLink, ...props }, ref) => {
  const [formData, setFormData] = useImmer({
    link: "",
    title: "",
  });
  // ref handler event
  useEffect(() => {
    if (ref) {
      ref.current.addEventListener("hide.bs.modal", () => {
        // reset state
        setFormData({ link: "", title: "" });
      });
    }
  }, [ref]);
  // watch change for link
  useEffect(() => {
    if (link) {
      setFormData(() => {
        return link;
      });
    }
  }, [link]);
  // watch change for fields
  const onFieldChange = (e) => {
    setFormData((v) => {
      v[e.target.name] = e.target.value;
    });
  };
  const onSaveChanges = () => {
    onSaveLink(formData);
    // close modal
  };

  return (
    <div id="LinkFormComponent" className="modal" tabIndex="-1" ref={ref}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{link ? "Edit Link" : "Add Link"}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            {JSON.stringify(link)}
            {JSON.stringify(formData)}
            <div className="mb-3">
              <label className="form-label">Link</label>
              <input
                type="link"
                name="link"
                className="form-control"
                value={formData.link}
                onChange={onFieldChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={onFieldChange}
              />
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onSaveChanges}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

LinkFormComponent.displayName = "LinkFormComponent";

export default LinkFormComponent;
```

**2. Hướng thứ 2: tạo 2 component riêng biệt, mỗi trường hợp là một component.**

**3. Hướng thứ 3: tạo component modal, trong component modal thì gắn thêm LinkFormComponent và áp dụng hướng thứ 1 nhất, nhận prop là link để phân biệt 2 trường hợp.**

##### 3.2. Xây dựng PaginationComponent

```jsx
const PaginationComponent = ({
  numberOfPages,
  currentPage,
  onChangeCurrentPage,
  ...props
}) => {
  const spaces = 5; // 5 page links
  const isDisabledPrevious = currentPage === 1;
  const isDisabledNext = currentPage === numberOfPages;
  const pages = [];
  let start = currentPage < spaces ? 1 : currentPage - Math.floor(spaces / 2);
  let end = start + spaces - 1;
  if (end > numberOfPages) {
    end = numberOfPages;
    start = numberOfPages - spaces + 1;
  }
  for (let index = start; index <= end; index++) {
    pages.push(index);
  }

  return (
    <>
      {pages}
      {pages.length > 1 && (
        <nav>
          <ul className="pagination">
            <li
              className={
                isDisabledPrevious ? "page-item disabled" : "page-item"
              }
            >
              <a
                style={{
                  cursor: "pointer",
                }}
                className="page-link"
                onClick={() => onChangeCurrentPage(1)}
              >
                First
              </a>
            </li>
            <li
              className={
                isDisabledPrevious ? "page-item disabled" : "page-item"
              }
            >
              <a
                style={{
                  cursor: "pointer",
                }}
                className="page-link"
                onClick={() => onChangeCurrentPage(currentPage - 1)}
              >
                Previous
              </a>
            </li>
            {pages.map((p) => (
              <li key={p}>
                <a
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => onChangeCurrentPage(p)}
                  className={
                    p === currentPage ? "page-link active" : "page-link"
                  }
                >
                  {p}
                </a>
              </li>
            ))}
            <li className={isDisabledNext ? "page-item disabled" : "page-item"}>
              <a
                style={{
                  cursor: "pointer",
                }}
                className="page-link"
                onClick={() => onChangeCurrentPage(currentPage + 1)}
              >
                Next
              </a>
            </li>
            <li className={isDisabledNext ? "page-item disabled" : "page-item"}>
              <a
                style={{
                  cursor: "pointer",
                }}
                className="page-link"
                onClick={() => onChangeCurrentPage(numberOfPages)}
              >
                Last
              </a>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
};

PaginationComponent.displayName = "PaginationComponent";

export default PaginationComponent;
```

Dùng thử

```jsx
import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import LinkFormComponent from "./components/LinkFormComponent";
import enviroment from "./shared/environment";
import { Modal } from "bootstrap";
import { useImmer } from "use-immer";
import PaginationComponent from "./components/PaginationComponent";

export const LINK_TYPE = {
  LINK: "link",
  YOUTUBE: "youtube",
  IMAGE: "image",
};

function App() {
  const linkFormComponentModalInstance = useRef(null);
  const linkFormComponentModal = useRef(null);
  const [editLink, setEditLink] = useState(null);
  const [links, setLinks] = useImmer([
    {
      id: 1,
      link: "https://nextjsvietnam.com",
      title: "https://nextjsvietnam.com",
      type: LINK_TYPE.LINK,
    },
  ]);
  const [paginator, setPaginator] = useImmer({
    currentPage: 1,
    numberOfPages: 10,
    rowsPerPage: 5,
    numberOfItems: 50,
  });

  const openModal = () => {
    if (!linkFormComponentModalInstance.current) {
      console.log("new modal", linkFormComponentModalInstance.current);
      linkFormComponentModalInstance.current = new Modal(
        linkFormComponentModal.current,
        {
          backdrop: true,
          focus: true,
          keyboard: true,
        }
      );
      linkFormComponentModalInstance.current.show();
      console.log("created modal", linkFormComponentModalInstance.current);
      // handler event close
      linkFormComponentModal.current.addEventListener("hide.bs.modal", () => {
        // reset state
        setEditLink(null);
      });
      return;
    }
    console.log("existing modal", linkFormComponentModalInstance.current);
    linkFormComponentModalInstance.current.show();
  };

  const onNewLink = (e) => {
    e.preventDefault();
    openModal();
  };

  const onEditLink = (link) => {
    // set editLink
    setEditLink(link);
    // open modal
    openModal();
  };

  const onChangeCurrentPage = (newCurrentPage) => {
    setPaginator((p) => {
      p.currentPage = newCurrentPage;
    });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            <img
              src="https://nextjsvietnam.com/themes/2022/src/assets/images/logo.png"
              alt="Bootstrap"
            />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  {enviroment.APP_NAME}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main className="mt-4">
        <div className="card">
          <div className="card-header text-bg-primary">
            <h3 className="card-title">Links</h3>
          </div>
          <div className="card-body">
            <div className="d-flex justify-content-end">
              <button className="btn btn-primary" onClick={onNewLink}>
                New Link
              </button>
            </div>
            <div>
              {links.map((link) => (
                <div key={link.id}>
                  <h4>{link.title}</h4>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => {
                      onEditLink(link);
                    }}
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
            <PaginationComponent
              numberOfPages={paginator.numberOfPages}
              currentPage={paginator.currentPage}
              onChangeCurrentPage={onChangeCurrentPage}
            />
          </div>
        </div>
      </main>
      <footer className="mt-4">
        <div className="container">
          <p className="text-center">
            Copyright@JSBase - {enviroment.APP_VERSION} - {enviroment.MODE}
          </p>
        </div>
      </footer>
      <LinkFormComponent
        ref={linkFormComponentModal}
        link={editLink}
      ></LinkFormComponent>
    </>
  );
}

export default App;
```

![image](https://user-images.githubusercontent.com/31009750/253977033-46fb6d62-a7c0-46a1-9933-c81715c8596b.png)

##### 3.3. Xây dựng LinkDetailComponent

```jsx
import { LINK_TYPE } from "../App";

const TextLink = ({ link, ...props }) => {
  return (
    <a href="#" className="d-flex gap-2 align-items-center" {...props}>
      <i className="bi bi-link fs-3"></i>
      {link}
    </a>
  );
};

const YoutubeLink = ({ link }) => {
  let v = "";
  if (link.includes("watch")) {
    v = new URL(link).searchParams.get("v");
  }
  let src = link.includes("embed")
    ? link
    : `https://www.youtube.com/embed/${v}?feature=oembed`;
  return (
    <>
      <div className="embed-responsive ratio ratio-16x9">
        <iframe className="embed-responsive-item" src={src}></iframe>
      </div>
    </>
  );
};

const ImageLink = ({ link }) => {
  return (
    <div>
      <img src={link} class="rounded img-thumbnail"></img>
    </div>
  );
};

const LinkDetailComponent = ({ link, ...props }) => {
  const linkTypeBadge = {
    [LINK_TYPE.LINK]: "text-bg-primary",
    [LINK_TYPE.IMAGE]: "text-bg-warning",
    [LINK_TYPE.YOUTUBE]: "text-bg-danger",
  };
  return (
    <>
      <div className="card my-4">
        <div className="card-title d-flex justify-content-between border-bottom p-3">
          <div className="d-flex justify-content-between gap-4">
            <span className={"btn " + linkTypeBadge[link.type]}>
              {link.type}
            </span>
            <h5 className="m-0 lh-lg">{link.title}</h5>
          </div>
          <div className="btn text-bg-warning align-middle">
            {link.publishedDate.toISOString()}
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col">
              {link.type === LINK_TYPE.LINK && <TextLink link={link.link} />}
              {link.type === LINK_TYPE.YOUTUBE && (
                <YoutubeLink link={link.link} />
              )}
              {link.type === LINK_TYPE.IMAGE && <ImageLink link={link.link} />}
            </div>
            <div className="col d-flex justify-content-between flex-column">
              {[LINK_TYPE.YOUTUBE, LINK_TYPE.IMAGE].includes(link.type) && (
                <TextLink
                  link={link.link}
                  className={
                    "d-flex gap-2 align-items-center justify-content-end"
                  }
                />
              )}
              <div className="d-flex gap-2 justify-content-end align-self-end">
                <button
                  className="btn btn-warning"
                  style={{ width: "120px", height: "40px" }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger"
                  style={{ width: "120px", height: "40px" }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

LinkDetailComponent.displayName = "LinkDetailComponent";

export default LinkDetailComponent;
```

#### Bước số 4. Tích hợp toàn bộ các component lại thành 1 ứng dụng hoàn chỉnh

Đây là bước cuối cùng, lắp ráp lại kết quả của các bước trên, nhằm tạo ra 1 ứng dụng hoàn chỉnh cho người dùng.
