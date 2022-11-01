---
title: "Javascript Numeric Precision Issue"
type: "post"
date: 2022-07-20T11:47:31+07:00
description: "0.3 - 0.1 = 0.19999999999999998 (ảo chưa)"
keywords: ["Javascript Numeric Precision Issue"]
categories: ["cheatsheet"]
tags: []
image: "/common/no-image.png"
---

> Bạn đã bao giờ gặp trường hợp như này chưa?

```js
let a = 0.1;
let b = 0.3;

let c = a - b;
let d = a * b;
let e = b / a;
let f = 0.2 * a;
```

> Here you are

```js
// c -0.19999999999999998
// d 0.03
// e 2.9999999999999996
// f 0.020000000000000004
```

Nguyên nhân là vì floating-point trong Javascript được biểu diễn dưới dạng **phân số nhị phân** (cơ số 2). Rất tiếc, hầu hết các phân số thập phân không thể được biểu diễn chính xác dưới dạng phân số nhị phân

Các số dấu phẩy động thập phân mà bạn nhập chỉ gần đúng với các số dấu phẩy động nhị phân thực sự được lưu trữ trong máy. Nói như vậy, bạn sẽ thấy rằng số học dấu phẩy động **KHÔNG chính xác 100%**

## Các lưu ý khi làm việc với số thập phân trong javascript

1. Nên làm tròn số
2. Dữ liệu trả về nên gói thành string trong JSON
3. Phần thập phần trong javascript tối đa là 12 số
4. Lưu ý khi làm việc với số lớn nê dùng BigInt

## Javascript is so smart !!!

```js
const d = new Date("1985-13-29");
console.log(d);

// and we got
// Fri Mar 01 1985 07:00:00 GMT+0700 (Indochina Time)
```

Note: in java you have the same result

```java
package javacore.net;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class Main {
    public static void main(String[] args) {
        // JavaThePillars.run();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd", Locale.ENGLISH);
        try {
            String dateInString = "1985-13-31";
            Date date = formatter.parse(dateInString);
            System.out.printf(date.toString());
        } catch (ParseException ex) {
            System.out.printf(ex.toString());
        }


    }
}

// Fri Jan 31 00:00:00 ICT 1986
```

Nhưng méo có đúng với Python đâu nha

```py
import datetime

date_time_str = '1985-02-28'
date_time_obj = datetime.datetime.strptime(date_time_str, '%Y-%m-%d')

print('Date:', date_time_obj.date())

date_time_str = '1985-02-29'
date_time_obj = datetime.datetime.strptime(date_time_str, '%Y-%m-%d')

print('Date:', date_time_obj.date())
# => ăn chửi ngay
```

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	v := "Thu, 02/29/11, 10:47PM"
	l := "Mon, 01/02/06, 03:04PM"
	tt, e := time.Parse(l, v)
	fmt.Println(tt)
	fmt.Println(e)
}

```

And how about C#

```c#
// Online C# Editor for free
// Write, Edit and Run your C# code using C# Online Compiler

using System;
using System.Globalization;

public class HelloWorld
{
    public static void Main(string[] args)
    {
        Console.WriteLine ("Hello Mono World");
        string dateString = "02-29-85";

        // It throws Argument null exception
        DateTime parsedDate;
        DateTime.TryParseExact(dateString, "MM-dd-yy", null,
                                      DateTimeStyles.None, out parsedDate);
        Console.WriteLine(parsedDate.ToString());
    }
}

// Ăn đấm luôn nhé

// Hello Mono World01/01/0001 00:00:00
```
