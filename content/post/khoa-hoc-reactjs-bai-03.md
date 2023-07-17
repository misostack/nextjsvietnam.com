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

#### Bước số 3. Xây dựng chi tiết, bắt đầu từ các component nhỏ nhất.

Nguyên tắc là xây dựng các component nhỏ độc lập, nhận input và trả ra output nếu cần.
Các component lớn hơn, có thể có trạng thái riêng và là tổ hợp chứa nhiều component nhỏ hơn.

#### Bước số 4. Tích hợp toàn bộ các component lại thành 1 ứng dụng hoàn chỉnh

Đây là bước cuối cùng, lắp ráp lại kết quả của các bước trên, nhằm tạo ra 1 ứng dụng hoàn chỉnh cho người dùng.
