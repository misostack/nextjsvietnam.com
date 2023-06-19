---
title: "Reactjs Use Reducer the Right Way"
type: "post"
date: 2022-10-08T23:11:52+07:00
description: "In this article, we will learn how to extract state logic into reducer"
keywords: ["reactjs", "reactjs reducer"]
categories: ["reactjs"]
tags: ["reactjs"]
image: "https://user-images.githubusercontent.com/31009750/246856332-ece36caa-82ef-4a4f-86d9-9dad4a108929.png"
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

## Tips to write reducers well

### 1. Reducers must be pure

> Giống như state update, reducers chạy trong quá trình rendering ( actions được cho vào hàng đợi cho đến lần render tiếp theo). Do đó:

1. Không nên send requests
2. Không nên schedule timeouts
3. Thực hiện side effects ( hoạt động ảnh hưởng tới các component bên ngoài )
4. Cập nhật các objects và array mà ko biến đổi nó (mutate)

### 2. Writing concise reducers with Immer

> Immer support us to write reducers in a mutating style

```js
mport {useImmerReducer} from 'use-immer';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

function tasksReducer(draft, action) {
  switch (action.type) {
    case 'added': {
      draft.push({
        id: action.id,
        text: action.text,
        done: false,
      });
      break;
    }
    case 'changed': {
      const index = draft.findIndex((t) => t.id === action.task.id);
      draft[index] = action.task;
      break;
    }
    case 'deleted': {
      return draft.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];

```
