---
title: "Learn Enough Oop to Be Dangerous"
type: "post"
date: 2022-10-12T16:00:15+07:00
description: "Learn Enough Oop to Be Dangerous"
keywords: ["Learn Enough Oop to Be Dangerous"]
categories: ["cheatsheet"]
tags: []
image: "/common/no-image.png"
---

## Phần 1 : OOP Basis

Về mặt khái niệm, đầu tiên chúng ta cần hiểu 1 nguyên lí cơ bản là OOP sinh ra để làm gì.

Đơn giản, OOP sinh ra để giúp chúng ta lập trình theo phương pháp thể hiện lại các sự vật, sự việc ( được gọi là Object - đối tượng )trong thế giới thực.
Và đồng thời cũng thể hiện các tính chất ( properties ) và hoạt động của các đối tượng với nhau.

![image](https://user-images.githubusercontent.com/31009750/195316367-3fed1a1a-6800-4c50-83c6-8ffa747515dc.png)

## Object ( đối tượng ) sẽ bao gồm

### 1. Các thuộc tính (properties): giúp thể hiện các đặc điểm/trạng thái của đối tượng.

Ví dụ: 1 chiếc xe Lamborghini **hiệu** Aventador S. **màu** vàng, **mẫu** xe thể thao, **động cơ** V12 6.5L **đã chạy được** 100 cây, hiện đang được rao bán với **giá** 40 tỉ đồng.

![image](https://user-images.githubusercontent.com/31009750/195302215-ecf5239e-56f3-4428-975b-a83d36ef850e.png)

Ví dụ:

```java
package javacore.net;

public class Car {
    // properties: manufacturer, model,
    String manufacture;
    String model;
    String color;
    String engine;
    int capacity;
    float vehicleKilometersTraveled;

    public Car(String manufacture, String model, String color, String engine, int capacity, float vehicleKilometersTraveled) {
        this.manufacture = manufacture;
        this.model = model;
        this.color = color;
        this.engine = engine;
        this.capacity = capacity;
        this.vehicleKilometersTraveled = vehicleKilometersTraveled;
    }
}

```

### 2. Phương thức (methods): giúp thể hiện hành vi/phản ứng của đối tượng

Trong thực tế, các đối tượng sẽ giao tiếp với các đối tượng khác trong ứng dụng.
Do đó khi định nghĩa một phương, đôi khi phương thức sẽ cần các giá trị đầu vào (params), để có thể cho ra giá trị đầu ra (return value) tương ứng.

Nguyên tắc khi thiết kế các phương thức:

1. Những phương thức tốt nhất là những phương thức không có params
2. Khi một phương thức chỉ có 1 param mang giá trị true/false, nên tách biệt thành 2 phương thức khác nhau.
3. Một phương thức có thể có nhiều params, tuy nhiên không nên vượt quá con số 3. Có thể chuyển nhiều params này thành 1 đối tượng khác.
4. Cố gắng không tạo ra side effect ( làm thay đổi 1 đối tượng khác không thuộc phạm vi của đối tượng này)

```java
package javacore.net;

public class Car {
    // properties: manufacturer, model,
    String manufacture;
    String model;
    String color;
    String engine;
    int capacity;
    float vehicleKilometersTraveled;
    double price;

    public Car(String manufacture, String model, String color, String engine, int capacity, float vehicleKilometersTraveled, double price) {
        this.manufacture = manufacture;
        this.model = model;
        this.color = color;
        this.engine = engine;
        this.capacity = capacity;
        this.vehicleKilometersTraveled = vehicleKilometersTraveled;
        this.price = price;
    }

    public void move(float kilometers) {
        this.vehicleKilometersTraveled += kilometers;
    }

    public void print() {
        String output = "";
        String lineBreak = String.format("%s\n", "*".repeat(50));
        output += lineBreak;
        output += String.format("Manufacture: %s\n", this.manufacture);
        output += String.format("Model: %s\n", this.model);
        output += String.format("Color: %s\n", this.color);
        output += String.format("Engine: %s\n", this.engine);
        output += String.format("Capacity: %s\n", this.capacity);
        output += String.format("Vehicle Kilometers Traveled: %.2f\n", this.vehicleKilometersTraveled);
        output += String.format("Price : %.2f\n", this.price);
        output += lineBreak;
        System.out.printf("%s\n", output);
    }
}

```

### 3. Để hiện thực hóa 1 đối tượng, trong lập trình chúng ta sử dụng Class

**Class**: chính là 1 bản thiết kế mẫu, trong đó bao gồm định nghĩa có các thuộc tính, phương thức mà một đối tượng thuộc về Class này. Cụ thể hơn Class là 1 tập hợp các Object. Còn Object là 1 biểu hiện cụ thể của Class

### Tổng kết

![image](https://user-images.githubusercontent.com/31009750/195331118-2e9145f7-97d2-4f1d-9176-c4b89d874096.png)

## Phần 2: OOP SOLID Principles
