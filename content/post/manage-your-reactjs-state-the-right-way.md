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

Nội dung được chia sẻ phạm vi bài viết này:

1. Các nguyên tắc khi thiết kế data structure cho state
2. Một số ví dụ cụ thể trong các dự án thực tế

## Phần 1: Các nguyên tắc khi thiết kế data structure cho state

Về mặt định nghĩa, thì State trong ReactJS là 1 Javascript Object phản ánh phần dữ liệu của component và có thể bị thay đổi giá trị do các tác nhân trong ứng dụng ( người dùng, web worker, web socket, ...)

### 1.Nhóm các state liên quan với nhau.

- Các state hay thay đổi cùng lúc. Ví dụ: tọa độ con trỏ chuột x,y
- Form data. Ví dụ: Bạn có 1 màn hình mà user có thể thêm nhiều custom field khác nhau (advanced filter chẳng hạn)

Tuy nhiên cần lưu ý, khi nhóm state thành object hoặc array, lúc cập nhật 1 field, cần nhớ bạn phải cập nhật luôn các field còn lại. Ví dụ: setPosition({...position, x: 5});

```js
// replace
const [x, setX] = useState(0);
const [y, setY] = useState(0);
// with
const [point, setPoint] = useState({ x: 0, y: 0 });
setPoint({
  ...point,
  x: 5,
});
```

### 2.Tránh việc khai báo các state mẫu thuẫn với nhau.

Ví dụ:

```js
const [isSending, setIsSending] = useState(false);
const [isSent, setIsSent] = useState(false);
setIsSending(true); // to allow showing loading modal
await callAPI();
setIsSending(false);
setIsSent(true);
```

Nó vẫn chạy, đúng chứ, tuy nhiên. Nếu như bạn quên reset lại isSending thì trạng thái lúc này sẽ vừa là isSending và isSent.
Để tránh sai suất này xảy ra và để code clean hơn. Chúng ta có thể thay đổi lại 1 chút như sau

```js
const [formStatus, setFormStatus] = useState(false);
setFormStatus("sending");
await callAPI();
setFormStatus("sent");
```

Rõ ràng là tốt hơn nhiều so với phiên bản đầu tiên. Thậm chí có thể sử dụng constant hoặc enum để khai báo các trạng thái của form.

### 3. Tránh khai báo các state dư thừa

- Những giá trị nào có thể tính toán được từ state và prop hiện tại không cần thiết phải sử dụng state để lưu trữ nó.

Ví dụ:

```js
// replace
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [fullName, setFullName] = useState("");

// with
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const fullName = firstName + " " + lastName;
```

### 4. Đừng copy lại props vào state

```js
function Message({ messageColor }) {
  const [color, setColor] = useState(messageColor);
```

Với cách init state như thế này, khi giá trị prop từ component cha được thay đổi.
Sẽ dễ gây hiểu lầm là giá trị messageColor cũng tự động đổi theo.
Để hạn chế điều này luôn sử dụng initial hoặc default làm prefix cho các prop dùng
để khởi tạo giá trị ban đầu của state

Đặc biệt

> ## Đừng copy lại props vào state

```ts
import React, { useMemo, useState } from "react";

const Message = ({ initialColor }: { initialColor: string }) => {
  const [color, setColor] = useState(initialColor);
  const className = `bg-${color}-500`;
  return (
    <>
      <h3 className={className}>Principle 3: Avoid Redundant State</h3>
      <button
        className={className}
        onClick={() => {
          color === "green" ? setColor(initialColor) : setColor("green");
        }}
      >
        Switch Color
      </button>
    </>
  );
};

export default function StateStructurePrinciples() {
  const [defaultColor, setDefaultColor] = useState("blue");
  const supportedColors = useMemo(() => {
    return ["blue", "red", "yellow", "pink"];
  }, []);
  return (
    <div className="container">
      <h1>StateStructurePrinciples</h1>
      <Message initialColor={defaultColor}></Message>
      <select
        className="px-4 py-3 rounded-full"
        onChange={(e) => setDefaultColor(e.target.value)}
      >
        {supportedColors.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
```

```js
function Message({ initialColor }) {
  const [color, setColor] = useState(initialColor);
```

```ts
import React, { useEffect, useMemo, useState } from "react";

const Message = ({ initialColor }: { initialColor: string }) => {
  const [color, setColor] = useState(initialColor);
  const className = `bg-${color}-500`;

  useEffect(() => {
    // update State when initialColor changed
    setColor(initialColor);
  }, [initialColor]);
  return (
    <>
      <h3 className={className}>Principle 3: Avoid Redundant State</h3>
      <button
        className={className}
        onClick={() => {
          color === "green" ? setColor(initialColor) : setColor("green");
        }}
      >
        Switch Color
      </button>
    </>
  );
};

export default function StateStructurePrinciples() {
  const [defaultColor, setDefaultColor] = useState("blue");
  const supportedColors = useMemo(() => {
    return ["blue", "red", "yellow", "pink"];
  }, []);
  return (
    <div className="container">
      <h1>StateStructurePrinciples</h1>
      <Message initialColor={defaultColor}></Message>
      <select
        className="px-4 py-3 rounded-full"
        onChange={(e) => setDefaultColor(e.target.value)}
      >
        {supportedColors.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
```

### 4. Tránh việc trùng lặp state

## Phần 2: Các ví dụ thực tế

Trong phạm vi của bài viết này, toàn bộ ví dụ sẽ được viết theo dạng functional và react hooks.

Khi ứng dụng càng lớn, hoặc trong cùng 1 màn hình lại có rất nhiều tính năng và chúng lại có liên quan mật thiết với nhau. Thì việc thiết kế và tổ chức cấu trúc dữ liệu cho state là điều tối quan trọng.

Để dễ dàng nắm bắt được các phương pháp khi làm việc với state, chúng ta sẽ đi qua lần lượt các trường hợp sau:

1. Internal UI states: phần state được sử dụng để hiển thị hoặc thay đổi về mặt giao diện người dùng như disabled, đổi màu sắc, hiển thị thông báo thành công/lỗi
2. Interal data states: phần state được sử dụng để chứa dữ liệu chính hiển thị cho người dùng
3. Shared UI states: phần state chung được sử dụng thay đổi về mặt UI ở toàn bộ ứng dụng hoặc các cụm màn hình chung
4. Shared data states: phần state được sử dụng để chứa các dữ liệu chung của toàn bộ ứng dụng hoặc 1 cụm các màn hình chung

## Internal UI states

Về loại này chúng ta có thể đi qua các ví dụ cụ thể như sau:

### 1. On-Off buttons

Giả sử chúng ta có 6 bóng đèn, mỗi bóng đều có công tắc , và ngoài ra còn 1 công tắc điện tổng. Yêu cầu: xây dựng màn hình hiển thị 6 bóng đèn với các công tắc tương ứng. Mặc định ban đầu: toàn bộ các bóng đèn và công tắc điện tổng đều tắt.

Đối với loại này, có các điểm sau cần lưu ý:

- State dành cho trạng thái của công tắc điện tổng
- State dành cho trạng thái của từng bóng đèn

Code sample

```ts
import React, { useState } from "react";
interface LightBulbProps {
  id: number;
  status: "on" | "off";
}
interface LightBulbStates {
  lightBulbs: LightBulbProps[];
  powerStatus: "on" | "off";
}

interface PowerSwitchProps {
  status: "on" | "off";
  switchPowerState: (status: "on" | "off") => void;
}

const PowerSwitch = (props: PowerSwitchProps) => {
  const { status, switchPowerState } = props;
  const iconName = status === "on" ? "toggle_on" : "toggle_off";
  const oppositeStatus = status === "on" ? "off" : "on";
  return (
    <button
      className="text-center"
      onClick={() => {
        switchPowerState(oppositeStatus);
      }}
    >
      <span className="material-icons-outlined md-48">{iconName}</span>
      <br />
      {status.toUpperCase()}
    </button>
  );
};

const LightBulb = (
  props: LightBulbProps & {
    switchBulbState: (id: number, status: "on" | "off") => void;
  }
) => {
  const { id, status } = props;
  const className =
    status === "on" ? "material-icons-outlined" : "material-icons";
  const oppositeStatus = status === "on" ? "off" : "on";
  return (
    <div className="text-center">
      <h2 className="m-4">{id}</h2>
      <button
        onClick={() => {
          props.switchBulbState(id, oppositeStatus);
        }}
        id={`${id}`}
        className={className}
      >
        lightbulb
      </button>
    </div>
  );
};

export default function StateManagementUserInterface() {
  const initialStates: LightBulbStates = {
    lightBulbs: [
      { id: 1, status: "off" },
      { id: 2, status: "off" },
      { id: 3, status: "off" },
      { id: 4, status: "off" },
      { id: 5, status: "off" },
      { id: 6, status: "off" },
    ],
    powerStatus: "off",
  };
  // define states
  const [lightBulbStates, setLightBulbStates] = useState(
    initialStates.lightBulbs
  );
  const [powerStatus, setPowerStatus] = useState(initialStates.powerStatus);
  // define actions
  const switchBulbState = (bulbId: number, newStatus: "on" | "off") => {
    // clone
    const targetBulbIndex = lightBulbStates.findIndex((b) => b.id === bulbId);
    const newLightBulbStates = [...lightBulbStates];
    newLightBulbStates[targetBulbIndex].status = newStatus;
    // update status
    setLightBulbStates(newLightBulbStates);
  };
  const switchPowerState = () => {
    setPowerStatus(powerStatus === "on" ? "off" : "on");
  };

  return (
    <div className="container">
      <h1>StateManagementUserInterface</h1>
      <div className="my-2">
        <PowerSwitch
          status={powerStatus}
          switchPowerState={switchPowerState}
        ></PowerSwitch>
      </div>
      <div className="grid grid-cols-6">
        {lightBulbStates.map((bulb) => (
          <LightBulb
            switchBulbState={switchBulbState}
            key={bulb.id}
            id={bulb.id}
            status={powerStatus === "off" ? "off" : bulb.status}
          />
        ))}
      </div>
    </div>
  );
}
```

### 2. React to Input State

Ứng dụng react state để tạo form validate dữ liệu. Yêu cầu:

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

Code sample

```ts
/* eslint-disable no-template-curly-in-string */
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";

import * as yup from "yup";
import useDebounce from "../helpers/hooks.helpers";

// import { debounce } from 'lodash';

const EMAIL_REGEX =
  /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

type ErrorObject = {
  [field: string]: string[];
};

const initialStates = {
  formData: {
    fullname: "",
    email: "",
  },
  formValidationObserver: {
    isValid: false,
    dirty: {},
    errorObject: {},
  },
};

type FieldName = "fullname" | "email";

function fakeAPICall<T>(res: any): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("fake api call");
      resolve(res);
    }, 300);
  });
}

yup.setLocale({
  // use constant translation keys for messages without values
  mixed: {
    default: "invalid",
    required: "required",
  },
});

/**
 * Convert yup error into an error object where the keys are the fields and the values are the errors for that field
 * @param {ValidationError} err The yup error to convert
 * @returns {ErrorObject} The error object
 */
export function yupErrorToErrorObject(err: yup.ValidationError): ErrorObject {
  const object: ErrorObject = {};

  err.inner.forEach((x) => {
    if (x.path !== undefined) {
      object[x.path] = x.errors;
    }
  });

  return object;
}

const subcribeFormSchema = yup.object().shape({
  fullname: yup.string().required().label("fullname"),
  email: yup
    .string()
    .required()
    .label("email")
    // eslint-disable-next-line no-template-curly-in-string
    .test("is_valid", "invalid", (value, context) => {
      if (value) {
        return EMAIL_REGEX.test(value);
      }
      return false;
    })
    // eslint-disable-next-line no-template-curly-in-string
    .test("is_unique", "unique", async (value, _context) => {
      if (value && EMAIL_REGEX.test(value)) {
        const isUnique = await fakeAPICall<boolean>(true);
        return isUnique;
      }
      return true;
    }),
});

export default function StateManagementFormValidation() {
  // default state
  const [formData, setFormData] = useState(initialStates.formData);
  const [formValidationObserver, setFormValidationObserver] = useState(
    initialStates.formValidationObserver
  );
  const debounceFormData = useDebounce(formData, 300);
  const [step, setStep] = useState<"default" | "thank">("default");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const classNames =
    "bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";
  // methods
  const validateData = (schema: typeof subcribeFormSchema, data: any) => {
    schema
      .validate(data, { abortEarly: false })
      .then(() => {
        setFormValidationObserver({
          ...formValidationObserver,
          isValid: true,
          errorObject: {},
        });
      })
      .catch((err: yup.ValidationError) => {
        if (err) {
          const errorObject = yupErrorToErrorObject(err);

          setFormValidationObserver({
            ...formValidationObserver,
            isValid: !err,
            errorObject,
          });
        }
      });
  };
  // Handle events
  const onBlurField = (field: string) => {
    if (!Reflect.get(formValidationObserver, field)) {
      const dirty = formValidationObserver.dirty;
      Reflect.set(dirty, field, true);
      setFormValidationObserver({
        ...formValidationObserver,
        dirty,
      });
    }
  };
  // sync input's values with its state
  const onFieldChange = (
    fieldName: FieldName,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (formData[fieldName] !== event.target.value) {
      const newFormData = {
        ...formData,
      };
      newFormData[fieldName] = event.target.value;
      setFormData(newFormData);
      setFormValidationObserver({
        ...formValidationObserver,
      });
    }
  };
  // onFormSubmit
  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (formData.email === "learnenoughtobebetter@nextjsvietnam.com") {
      return setErrorMessage("You have been registered before!");
    }
    return fakeAPICall(formData)
      .then((res: any) => {
        setSuccessMessage(`Xin chuc mung <strong>${res.fullname}</strong>, ban da dang ky thanh cong. Ban
        se som nhan duoc qua tang cua he thong!`);
        setStep("thank");
      })
      .catch((err) => {
        setErrorMessage(err);
      });
  };

  // validate data everytime formData changes
  useEffect(() => {
    validateData(subcribeFormSchema, debounceFormData);
  }, [debounceFormData]);

  return (
    <div className="container">
      <div className="flex justify-center">
        <div className="w-96 p-8 border border-gray-200 shadow">
          <h1 className="mb-4">Nhan thong bao va qua tang dinh ky</h1>
          <p className="text-gray-400 mb-4">
            Bang cach dang ky thanh vien cua cong dong NEXTJSVIETNAM
          </p>
          {step === "default" && (
            <form onSubmit={onFormSubmit}>
              <div className="mb-4 bg-red-300">{errorMessage}</div>
              <div className="mb-4">
                <input
                  value={formData.fullname}
                  type="text"
                  id="fullname"
                  className={`${classNames} ${
                    Reflect.get(formValidationObserver.dirty, "fullname") &&
                    Reflect.has(formValidationObserver.errorObject, "fullname")
                      ? "border border-red-600"
                      : "border border-gray-300"
                  }`}
                  placeholder="Your name"
                  onChange={(e) => onFieldChange("fullname", e)}
                  onBlur={(e) => onBlurField("fullname")}
                  required
                />
              </div>
              <div className="mb-4">
                <input
                  type="email"
                  value={formData.email}
                  id="email"
                  className={`${classNames} ${
                    Reflect.get(formValidationObserver.dirty, "email") &&
                    Reflect.has(formValidationObserver.errorObject, "email")
                      ? "border border-red-600"
                      : "border border-gray-300"
                  }`}
                  placeholder="Email"
                  onChange={(e) => onFieldChange("email", e)}
                  onBlur={(e) => onBlurField("email")}
                  required
                />
              </div>
              <div>
                <button
                  disabled={!formValidationObserver.isValid}
                  className="bg-red-800 hover:bg-red-600 focus:bg-red-600 text-white leading-16 py-2 block w-full disabled:opacity-50"
                >
                  Subcribe
                </button>
              </div>
            </form>
          )}
          {step === "thank" && (
            <div
              className="mb-4 bg-green-400 p-8"
              dangerouslySetInnerHTML={{
                __html: successMessage,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}
```

## Share UI states for entire application or between component's have the same ancestor

### 1. React to

## Share Data states for entire application or between component's have the same ancestor
