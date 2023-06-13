---
title: "Domain Driven Design trong 30 giây"
type: "post"
date: 2023-06-12T13:47:24+07:00
description: "Cùng tìm hiểu Domain Driven Design trong 30 giây"
keywords: ["Domain Driven Design in 30 Seconds"]
categories: ["systemdesign"]
tags: ["strategic design"]
image: "/common/no-image.png"
---

Trong một mô hình thiết kế phần mềm truyền thống, khi chúng ta nhận 1 dự án, việc đầu tiên là phân tích các nghiệp vụ từ yêu cầu phần mềm, thu thập dữ liệu, và bắt đầu bằng việc thiết kế cơ sở dữ liệu, sau đó mới phân tách thành các chức năng cho các thành viên trong dự án để làm việc.

Đôi khi chúng ta sẽ nhận thấy rằng, trong mã nguồn, phần logic nghiệp vụ, đôi khi xen kẽ chung với cả phần giao diện người dùng hay thậm chí có cả kết nối database trong đó.

Một ví dụ điển hình của việc xây dựng hệ thống theo kiến trúc cổ xưa

```js
const express = require("express");
const User = require("models/user");
const router = new express.Router();

router.post("/auth/login", auth, rbac, async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).send({ message: "FIELD_MISSING" });
    }
    let user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.render(200).send({ user, token });
  } catch (e) {
    res.status(500).send({ message: e.message });
  }
});
```

Trong ví dụ trên, có thể thấy, tại tầng điều khiển (Controller), Model được gọi trực tiếp, còn phần logic nghiệp vụ (Business) được nhúng thẳng vào trong Model.

Vậy làm như thế này, đúng hay sai. Kết quả là chúng ta vẫn có phần mềm chạy đúng, kịp thời hạn giao sản phẩm. Tuy nhiên về mặt mở rộng và bảo trì, thực sự là một dấu hỏi lớn.

Chính vì lẽ đó, mà Domain Driven Design xuất hiện.

## Domain Driven Design (DDD)

Domain driven design là một phương pháp các quy tắc thiết kế phần mềm, tiếp cận theo hướng mô hình hóa các business domain (lĩnh vực nghiệp vụ) đến từ các chuyên gia trong lĩnh vực.

Để dễ hình dung, khi chúng ta xây dựng một phần mềm quản lí bệnh viện, rõ ràng để làm tốt phần mềm này chúng ta phải hiểu về các nghiệp vụ trong bệnh viện. Và đương nhiên lúc này cần sự kết hợp giúp đỡ của những chuyên gia trong ngành này (bác sĩ, dược sĩ, y tá, quản lí bệnh viện). Mục tiêu cho ra được yêu cầu phần mềm, các chi tiết trong từng nghiệp vụ cụ thể.

Do vậy cần 1 ngôn ngữ chung để trao đổi giữa kĩ sư phát triển phần mềm và chuyên gia - Ubiquitous language:

- Ngôn ngữ được sử dụng trong cả kĩ thuật lẫn nghiệp vụ
- Được phản ánh trong code
- Được phản ánh trong tất cả các tính năng của hệ thống

Với DDD, ý tưởng chính là phân chia hệ thống phức tạp dựa trên các domain của nó. Tuy nhiên, đôi khi một số domain lại chồng chéo lên nhau và đối với những đối tượng khác nhau thì domain tương ứng cũng khác. Ví dụ như việc xuất hóa đơn, đối với từng đối tượng nghiệp vụ xuất hóa đơn thì lại có cách xử lí khác nhau. Do đó cần phải bóc tách 1 domain lớn thành các subdomain nhỏ hơn độc lập và không phụ thuộc lẫn nhau(bằng cách chúng ta sẽ tạo ra 1 lớp trung gian - Anti-Corruption Layer).
Và việc bóc tách này cần phải thiết lập mới giới hạn cụ thể (bounded context).

- Các domain phải độc lập
- Được kết nối với nhau thông qua Anti-Corruption Layer
- Độc lập về database
- Phù hợp để áp dụng cho microservice

## Những thành phần cơ bản

### 1. Entity

- Các thực thể cần được mô hình hóa trong hệ thống phần mềm. Ví dụ như trong phần mềm quản lí nội dung (CMS), sẽ bao gồm các thực thể như sau: User, Page, Post, Comment
- Chứa lifecycle: creation và deletion
- Nên chứa các logic của riêng nó thay vì thiết kế theo anemic model

![image](https://user-images.githubusercontent.com/31009750/245348213-835e3ef3-8063-4ddf-b0e8-9588b3a5cbc3.png)

**Domain Model**:

- Một đối tượng được mô hình hóa trong Domain Model bao gồm cả hành vi và dữ liệu của nó.
- Các đối tượng được thiết kế để làm việc với các logic từ phức tạp đến đơn giản.
- Công việc của Domain Model là tạo ra 1 mạng lưới liên kết các Object này cùng làm việc với nhau, trong đó mỗi Object đều đại diện cho 1 cá thể mang ý nghĩa riêng biệt.

**Anemic model**:

- Một đối tượng (object) được mô hình hóa với các thuộc tính của nó
- Tuy nhiên ngoài các phương thức getter/setter, chúng ko hoặc ít có các phương thức mô tả hành vi của object.
- Theo nguyên lí thiết kế này, không được đặt bất cứ domain logic nào vào domain object.
- Có 1 tập hợp các service sẽ phản ánh các logic này, thực hiện việc tính toán, cập nhật các object model với kết quả tương ứng.
- Các service này tồn tại dựa trên các domain model và sử dụng chúng làm dữ liệu.

#### Example of anti-pattern Anemic model

```ts
import { v4 as uuid } from 'uuid';

class User {
  private readonly id: string;
  private name: string;
  private email: string;
  private password: string;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(name: string, email: string, password: string) {
    this.id = uuid();
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  public getId(): string {
    return this.id;
  }

  public getName(): string {
    return this.name;
  }

  public setName(name: string): void {
    this.name = name;
    this.updatedAt = new Date();
  }

  public getEmail(): string {
    return this.email;
  }

  public setEmail(email: string): void {
    this.email = email;
    this.updatedAt = new Date();
  }

  public getPassword(): string {
    return this.password;
  }

  public setPassword(password: string): void {
    this.password = password;
    this.updatedAt = new Date();
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

}

export default User;

import { UserRepository } from '../repositories/UserRepository';
import { EmailService } from '../services/EmailService';

class UserService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService
  ) {}

  public createUser(name: string, email: string, password: string): User {
    const user = new User(name, email, password);
    this.userRepository.save(user);

    // Send email verification
    this.sendEmailVerification(user);
    return user;
  }

  public sendEmailVerification(user:User): void {
    // Add email verification logic here...
    return this.emailService.sendEmailVerification(user);
  }

  public promoteToAdmin(user:User): void {
    // Add logic to promote user to admin role...
    console.log(`${user.name} promoted to admin`);
  }

  public deactivateAccount(user:User): void {
    // Add logic to deactivate user account...
    console.log(`Account deactivated for ${user.name}`);
  }

  public updateUser(userId: string, name: string, email: string): User {
    const user = this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    user.updateProfile(name, email);
    this.userRepository.save(user);

    return user;
  }

  public deleteUser(userId: string): void {
    const user = this.userRepository.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    this.deactivateAccount();
    this.userRepository.delete(user);
  }
```

#### Domain Model

```ts
// User.ts

import { v4 as uuid } from "uuid";

class User {
  // ...

  public changePassword(newPassword: string): void {
    // Add password validation logic here...
    this.password = newPassword;
    this.updatedAt = new Date();
  }

  public promoteToAdmin(): void {
    // Add logic to promote user to admin role...
    console.log(`${this.name} promoted to admin`);
  }

  public deactivateAccount(): void {
    // Add logic to deactivate user account...
    console.log(`Account deactivated for ${this.name}`);
  }

  // ...
}

// EmailService.ts

class EmailService {
  public sendEmailVerification(email: string): void {
    // Implement the email sending logic here...
    console.log(`Email verification sent to ${email}`);
  }
}

import { UserRepository } from "../repositories/UserRepository";
import { EmailService } from "../services/EmailService";

class UserService {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService
  ) {}

  public createUser(name: string, email: string, password: string): User {
    const user = new User(name, email, password);
    this.userRepository.save(user);

    // Send email verification
    this.emailService.sendEmailVerification(user.email);

    return user;
  }

  public updateUser(userId: string, name: string, email: string): User {
    const user = this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.updateProfile(name, email);
    this.userRepository.save(user);

    return user;
  }

  public deleteUser(userId: string): void {
    const user = this.userRepository.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    user.deactivateAccount();
    this.userRepository.delete(user);
  }
}
```

### 2. Value Objects (VOs)

- Một đối tượng tự định nghĩa mà trong nó không tồn tại một ID cụ thể. Ví dụ: 1 user có Address bao gồm: street, streetNumber, postcode và city. Khi giá trị này thay đổi ta sẽ có 1 value object mới.

```ts
class Address {
  street: String,
  streetNumber: String;
  postCode: Number;
  city: String;
}
```

- VO phải là giá trị bất biến(immutable), do đó khi 1 trong khác thuộc tính của nó thay đổi đồng nghĩa với việc ta cần tạo ra 1 object mới

```ts
const newAddress = new Address("Tràng Tiền", "1", 70000, "Hà Nội");
```

- Được sử dụng để tối ưu performance, không tồn tại trong 1 bảng dữ liệu của riêng nó mà thường là 1 phần của các entity.

Ví dụ: Thay vì

```ts
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  faculty: string;
}
```

Ta sẽ có

```ts
import { Column } from "typeorm";

export class Name {
  @Column()
  first: string;

  @Column()
  last: string;
}

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Name } from "./Name";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column(() => Name)
  name: Name;

  @Column()
  isActive: boolean;
}

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Name } from "./Name";

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: string;

  @Column(() => Name)
  name: Name;

  @Column()
  salary: number;
}
```

Cấu trúc db

```ts
+-------------+--------------+----------------------------+
|                          user                           |
+-------------+--------------+----------------------------+
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| nameFirst   | varchar(255) |                            |
| nameLast    | varchar(255) |                            |
| isActive    | boolean      |                            |
+-------------+--------------+----------------------------+

+-------------+--------------+----------------------------+
|                        employee                         |
+-------------+--------------+----------------------------+
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| nameFirst   | varchar(255) |                            |
| nameLast    | varchar(255) |                            |
| salary      | int(11)      |                            |
+-------------+--------------+----------------------------+

+-------------+--------------+----------------------------+
|                         student                         |
+-------------+--------------+----------------------------+
| id          | int(11)      | PRIMARY KEY AUTO_INCREMENT |
| nameFirst   | varchar(255) |                            |
| nameLast    | varchar(255) |                            |
| faculty     | varchar(255) |                            |
+-------------+--------------+----------------------------+
```

## Sample code structure

```css
src
├── modules
│   ├── users
│   │   ├── domain
│   │   │   ├── models
│   │   │   │   ├── User.ts
│   │   │   ├── repositories
│   │   │   │   └── UserRepository.ts
│   │   │   ├── services
│   │   │   │   └── UserService.ts
│   │   │   └── value-objects
│   │   │       └── Address.ts
│   │   ├── infrastructure
│   │   │   ├── database
│   │   │   │   └── UserRepositoryImpl.ts
│   │   │   └── job-queue
│   │   │       ├── JobQueueService.ts
│   │   │       └── JobHandlers.ts
│   │   └── application
│   │       ├── dtos
│   │       │   ├── CreateUserDto.ts
│   │       │   └── UpdateUserDto.ts
│   │       ├── interfaces
│   │       │   └── IUserService.ts
│   │       └── UserAppService.ts
├── shared
│   ├── job-queue
│   │   └── IJobQueueService.ts
│   └── logger
│       └── Logger.ts
├── config
│   └── database.ts
└── index.ts

```

### 3. Bounded Context and Aggregates

#### 3.1. Bounded Context

- Một domain cụ thể luôn có 1 giới hạn nhất định, giới hạn ở đây là cả về mặt chức năng và business logic. Ví dụ khi bạn xây dựng 1 phần mềm quản lí nội bộ cho 1 công ty, sẽ bao gồm các chức năng của : phòng nhân sự, phòng kế toán, phòng IT, ban lãnh đội. Mỗi 1 domain như vậy sẽ có các giới hạn cụ thể về mặt chức năng, hành vi. Các entity tồn tại trong nó cũng vậy, sẽ phải nằm trong các giới hạn của domain mà nó thể hiện.

#### 3.2. Aggregate

- Và chắc chắn rằng mối quan hệ giữa các entity tồn tại trong hệ thống có thể là đơn giản hoặc phức tạp (phụ thuộc và có mối liên kết với nhiều entity khác nhau).
- Nhằm tránh đi sự phức tạp có thể xảy ra, phương pháp này chỉ ra rằng chúng ta cần 1 Aggregate root ( 1 cụm(cluster) các domain objects được xem như 1 đơn vị ).
- Ví dụ dễ thấy nhất là Order và OrderItem và Customer. Việc truy cập lúc này sẽ dựa vào rootAggregate là Order

```ts
// Order.ts
import { OrderId } from "./OrderId";
import { Customer } from "./Customer";
import { OrderItem } from "./OrderItem";

class Order {
  private id: OrderId;
  private customer: Customer;
  private items: OrderItem[];

  constructor(id: OrderId, customer: Customer, items: OrderItem[]) {
    this.id = id;
    this.customer = customer;
    this.items = items;
  }

  // Getters and setters for the properties

  public addItem(item: OrderItem): void {
    // Validate item and apply any business rules
    this.items.push(item);
  }

  public removeItem(item: OrderItem): void {
    // Remove the item from the items collection
  }

  // Other domain-specific methods and behaviors
}

export { Order };
// OrderItem.ts
class OrderItem {
  private id: string;
  private product: string;
  private quantity: number;
  private price: number;

  constructor(id: string, product: string, quantity: number, price: number) {
    this.id = id;
    this.product = product;
    this.quantity = quantity;
    this.price = price;
  }

  // Getters and setters for the properties

  // Other domain-specific methods and behaviors
}

// OrderId.ts
class OrderId {
  private id: string;

  constructor(id: string) {
    this.id = id;
  }

  // Getters and setters for the id property

  // Override toString() method to return the id value

  // Override equals() method to compare two OrderId objects
}

export { OrderId };

export { OrderItem };
// Customer.ts
class Customer {
  private id: string;
  private name: string;

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  // Getters and setters for the properties

  // Other domain-specific methods and behaviors
}

export { Customer };
```

## Tham khảo

- https://learn.microsoft.com/en-us/archive/msdn-magazine/2009/february/best-practice-an-introduction-to-domain-driven-design
- https://medium.com/microtica/the-concept-of-domain-driven-design-explained-3184c0fd7c3f
