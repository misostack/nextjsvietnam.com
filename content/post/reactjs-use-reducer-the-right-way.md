---
title: "Reactjs Use Reducer the Right Way"
type: "post"
date: 2022-10-08T23:11:52+07:00
description: "In this article, we will learn how to extract state logic into reducer"
keywords: ["reactjs", "reactjs reducer"]
categories: ["cheatsheet"]
tags: ["reactjs"]
image: "/common/no-image.png"
---

Trong các dự án thực tế, việc 1 component chứa quá nhiều code thực hiện update states thông qua việc xử lý các sự kiện tương ứng của người dùng, sẽ khiến chúng ta thực sự bị choáng ko hề nhẹ.
Do đó thay vì có 1 đống code bên trong component lần lượt setState cho từng event một, ReactJS cung cấp cho chúng ta 1 công cụ gọi là **"Reducer"**, giúp chúng ta xử lý logic cho toàn bộ state trong component này 1 một gọn gàng.

Quy chế hoạt động của reducer như sau
![Quy chế hoạt động của reducer](https://user-images.githubusercontent.com/31009750/194717624-949d740f-ec9f-4058-96b0-fe3a472ee01b.png)

Các bước để chuyển 1 state trong component vào Reducer sẽ như sau:

1. Khai báo các dispatch ( nhận và xử lý các event )
2. Khai báo các reducer ( nhận và thay đổi data )
3. Đăng ký sử dụng reducer trong component ( về bản chất chính là state, nhưng code logic được tổ chức độc lập)

Ví dụ: Xây dựng ứng dụng todolist với các chức năng: thêm, cập nhật, xóa, chuyển trạng thái từ pending sang done. Danh sách todolist được chia làm 2 cột: pending và done

```ts
import React, { useReducer, useState } from "react";
interface Todo {
  id?: number;
  text: string;
}
interface TodoAction {
  type: "add" | "update" | "delete" | "markDone" | "markPending";
  payload: Todo;
}

const initialState = {
  todos: [],
};

// define dispatch actions
const handleAddTask = (dispatch: React.Dispatch<TodoAction>, text: string) => {
  // dispatch
  dispatch({
    type: "add",
    payload: {
      text,
    },
  });
};
// define reducers
const todoReducers = (todos: Todo[], action: TodoAction) => {
  if (action.type === "add") {
    return [...todos, { id: Date.now(), text: action.payload.text }];
  }
  // default
  throw Error(`Unknown action ${action}`);
};

const AddTask = (props: { onAddTask: (text: string) => void }) => {
  const [text, setText] = useState("");
  return (
    <div className="flex justify-start">
      <input
        type="text"
        className="border p-4 leading-6 w-1/2 m-2"
        value={text}
        placeholder="Your new task"
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className="bg-blue-600 p-4 m-2"
        onClick={() => {
          props.onAddTask(text);
        }}
      >
        Add task
      </button>
    </div>
  );
};

export default function StateManagementReducer() {
  const [todos, dispatch] = useReducer(todoReducers, initialState.todos);
  return (
    <div className="container">
      <h1>StateManagementReducer</h1>
      <AddTask onAddTask={(text) => handleAddTask(dispatch, text)} />
      <div className="grid grid-cols-2">
        <div>
          {todos.map((todo) => (
            <>
              <div>{todo.text}</div>
            </>
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
}
```
