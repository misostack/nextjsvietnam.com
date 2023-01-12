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

1. **S**ingle Responsibility

> A class should only have one responsibility. Furthermore, it should only have one reason to change

**Benefits**

- Testing - class have only one responsility wil have far fewer test cases
- Lower coupling - less funtionality in single class wil have fewer dependencies
- Organization - smaller, well-organized classes are easier to search than monolith ones

Example:

```ts
class UserService {
  findOne() {}
  find() {}
  updateOne() {}
  deleteOne() {}
}

// violation
class BadUserService {
  findOne() {}
  find() {}
  updateOne() {}
  deleteOne() {}
  exportToPdf() {}
}

interface ExportService {
  exportToPdf();
}

// good
class UserExportService implements ExportService {
  exportToPdf() {}
}
```

2. **O**pen for Extension, Closed for Modification

> open-closed principle. Classes should be open for extension but closed for modification. In doing so, we stop ourselves

```ts
enum FurnitureGroup {
  CLASSIC,
  MODERN,
}
class Furniture {
  furnitureGroup: FurnitureGroup;
  constructor() {}
  getCollection() {}
}

// Instead of modifing the base class, we're creating new 2 class for new business rule

class ClassicFurniture extends Furniture {
  constructor() {
    this.furnitureGroup = FurnitureGroup.CLASSIC;
  }
}

class ModernFurniture extends Furniture {
  constructor() {
    this.furnitureGroup = FurnitureGroup.MODERN;
  }
}
```

3. **L**iskov Substituation Principle

> The Liskov Substitution Principle states that subclasses should be substitutable for their base classes

> if class A is a subtype of class B, we should be able to replace B with A without disrupting the behavior of our program

```ts
// if we use only one type of class to take responsibility, in theory, we will violate
// 1- single responsibility
// 2- open for extension, closed for modification
// 3- Liskov substituation
class QueueJob {
  create() {}
  run() {}
}

// So we're going to refactoring this class, we can apply 2 patterns here
// 1. Creational Pattern: AbstractFactory or Factory
// 2. Behavior Pattern: Strategy

// jobs: sendNotification:email, sms,
class NotificationQueueJob extends QueueJob {}
```

4. **I**nterface Segregation

> Larger interfaces should be split into smaller ones. By doing so, we can ensure that implementing classes only need to be concerned about the methods that are of interest to them

```ts
// instead of creating an interface that
interface Soldier {
  fire(); // only archer can fire
  shieldUp(); // only phalanx can create shieldWall
  shieldDown(); // only phalanx can create shieldWall
  attack(); // only knight/swordman/phalanx can attack
  chase(); // only knight/swordman/phalanx can attack
}

// we should segregate the large interface into smaller interfaces
class Soldier{}

interface SoldierCanFire {
  fire(); // only archer can fire
}
interface SoldierCanMakeShieldWall {
  shieldUp(); // only phalanx can create shieldWall
  shieldDown(); // only phalanx can create shieldWall
}
interface SoldierCanAttackAndChaseEnemy(){
    attack();
    chase();
}

class Archer extend Soldier implements SoldierCanFire{}
class Phalanx extend Soldier implements SoldierCanMakeShieldWall, SoldierCanAttackAndChaseEnemy{}
class Swordman extend Soldier implements SoldierCanMakeShieldWall, SoldierCanAttackAndChaseEnemy{}
class Knight extend Soldier implements SoldierCanAttackAndChaseEnemy{}
```

5. **D**ependency Inversion

> The principle of dependency inversion refers to the decoupling of software modules. This way, instead of high-level modules depending on low-level modules, both will depend on abstractions

The typical example that demonstrate the violation of this principle is the Controller-Model

```ts
class User {
  id: number;
  name: string;
  username: string;

  toModel(model: Model): Model {
    return newModelInstance(Model, this);
  }
}

class UserResponseModel {
  id: number;
  name: string;
}

class UserRepository {
  constructor(private dbInstance: DBInstance) {
    this.dbInstance = dbInstance;
  }
  findById(id: number): User {
    return this.dbInstance
      .query(`SELECT * from users where id = ${id}`)
      .toEntity(User);
  }
}

class UserController {
  constructor(private userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  findUser(id: number): UserResponseModel {
    return this.userRepository.findById(id).toModel(UserResponseModel);
  }
}

// in this case userController in application layer (high level module) depends on persistence layer ( lower level module), apply DI we will create an interface

interface IUserRepository {
  findById(id: number): User;
}
class UserRepository implements IUserRepository {
  constructor(private dbInstance: DBInstance) {
    this.dbInstance = dbInstance;
  }
  findById(id: number): User {
    return this.dbInstance
      .query(`SELECT * from users where id = ${id}`)
      .toEntity(User);
  }
}

class UserController {
  constructor(private userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  findUser(id: number): UserResponseModel {
    return this.userRepository.findById(id).toModel(UserResponseModel);
  }
}
```
