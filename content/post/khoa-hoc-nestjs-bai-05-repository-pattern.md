---
title: "Khóa học NestJS Bài 05 - Repository Pattern"
type: "post"
date: 2023-07-06T21:46:31+07:00
description: "Cùng tìm hiểu về Repository Pattern trong NestJS"
keywords: ["nestjs", "nestjs-mvc", "nestjs-tutorial"]
categories: ["nestjs-tutorial"]
tags: ["nestjs", "nestjs-pet-website"]
image: "https://user-images.githubusercontent.com/31009750/181449337-70081a76-5a01-4229-805e-39ed0ded6b5b.png"
---

- [Lession 05 Source Code](https://github.com/misostack/nestjs-tutorial-2023/tree/lession05)

## Bài 05

1. Giới thiệu sơ qua về repository pattern
2. Giới thiệu về dependency injection trong NestJS
3. Refactor code PetCategory áp dụng repository pattern

### Giới thiệu sơ qua về repository pattern

Trong bài trước, các anh chị có thể thấy sơ đồ sau trong mô hình MVC

![image](https://user-images.githubusercontent.com/31009750/255315727-b8a19417-ca4f-4791-9158-e62a1bbe41ee.png)

Controller sử dụng trực tiếp Model của ORM để thực hiện truy vấn vào cơ sở dữ liệu.
Thiết kế này sẽ bộc lộ các điểm yếu sau:

1. Khả năng tái sử dụng của các câu truy vấn : do nó nằm trực tiếp trong controller, do đó việc tái sử dụng và chia sẻ giữa các controller khác nhau gần như là không thể.
2. Tăng độ phức tạp của controller, càng nhiều câu query phức tạp, controller càng phình lên.
3. Việc thực hiện Unit Test trở lên khó khăn, do phần truy vấn cơ cở dữ liệu trộn lận vào code của controller

Để giải quyết vấn đề này, các anh/chị nên phân chia code thành các layer khác nhau. Mục đích là giúp tăng khả năng mở rộng và bảo trì của dự án.

Chính vì lẽ đó Repository Pattern được áp dụng. Theo định nghĩa

> Repository là một lớp được sinh ra để làm nhiệm vụ thực hiện truy vấn vào cơ sở dữ liệu.

Chính vì đặc điểm trên, nó chỉ thực hiện 1 nhiệm vụ duy nhất là truy vấn vào cở sở dữ liệu. Các câu query phức tạp sẽ được đóng gói trong lớp này. Kết quả là 3 vấn đề được đề cập ở trên sẽ được giải quyết triệt để.

Các anh/chị có thể đọc thêm về Repository trong bài viết về [Domain Driven Design](https://nextjsvietnam.com/post/domain-driven-design-trong-30-giay/) này.

Tới đây, cùng áp dụng định nghĩa trên để thực hành với NestJS.
Trong bài trước, Model được chúng trực tiếp trong Controller như sau

```ts
const petCategories = await PetCategory.findAll();
await PetCategory.destroy({ where: { id } });
const newPetCategory = await PetCategory.create({ ...object });
const petCategory = await PetCategory.findByPk(id);
await petCategory.update(object);
```

```ts
// src\pet\repositories\pet-category.repository.ts
import { Injectable } from "@nestjs/common";
import { PetCategory } from "../models/pet-category.model";

@Injectable()
export class PetCategoryRepository {
  findAll() {
    return PetCategory.findAll();
  }
}
```

```ts
// src/pet/pet.module.ts

import { Module } from "@nestjs/common";
import { PetController } from "./controllers/pet.controller";
import { ManagePetController } from "./controllers/admin/manage-pet.controller";
import { ManagePetCategoryController } from "./controllers/admin/manage-pet-category.controller";
import { ManagePetAttributeController } from "./controllers/admin/manage-pet-attribute.controller";
import { NestjsFormDataModule } from "nestjs-form-data";
import { PetCategoryRepository } from "./repositories/pet-category.repository";
@Module({
  imports: [NestjsFormDataModule],
  controllers: [
    PetController,
    ManagePetController,
    ManagePetCategoryController,
    ManagePetAttributeController,
  ],
  // registered providers
  providers: [PetCategoryRepository],
})
export class PetModule {}
```

```ts
@Controller("admin/pet-categories")
export class ManagePetCategoryController {
  constructor(private petCategoryRepository: PetCategoryRepository) {}
  @Get("")
  @Render("pet/admin/manage-pet-category/list")
  async getList() {
    const petCategories = await this.petCategoryRepository.findAll();
    return {
      petCategories,
    };
  }
  // ...
}
```

### Giới thiệu sơ qua về dependency injection

Lưu ý trong 3 đoạn code minh hoạt trên, để sử dụng được repository, có thể thấy, các anh/chị cần làm 3 việc:

- Khai báo repository là dạng được Injectable
- Khai báo repository cho danh sách Providers của module
- Inject repository vào constructor của controller muốn sử dụng

Nếu các anh/chị còn lạ lẫm với các khái niệm trên, hãy tìm hiểu chi tiết hơn trong bài viết về [NestJS Provider](https://nextjsvietnam.com/post/nestjs-provider/).

Hiểu đơn giản, là khi muốn sử dụng 1 class trong module, thay vì các anh/chị phải tự động khởi tạo mỗi lần sử dụng, điều này vô tình sẽ gây ra việc khởi tạo class này quá nhiều lần không cần thiết. Cũng như việc viết code sẽ trở nên khá rối rắm.

Thay vào đó, nếu áp dụng **Dependency Injection** pattern, các anh/chị dễ dàng giải quyết được vấn đề này. Ví dụ về cách mà dependency injection giải quyết được vấn đề trên.

```ts
import "reflect-metadata";
import { injectable, inject, container } from "tsyringe";

type ID = string | number;
interface Repository<T> {
  findOne(id: ID): T;
}
interface CrudService<Model> {
  findOne(id: ID): Model;
}

class User {
  id!: ID;
  firstName!: string;
  lastName!: string;
  constructor(payload: Partial<User>) {
    Object.assign(this, payload);
  }
}

class Role {
  id!: ID;
  name!: string;
  permissions: string[] = [];
  constructor(payload: Partial<Role>) {
    Object.assign(this, payload);
  }
}

class UserRepository implements Repository<User> {
  findOne(id: ID): User {
    const user = new User({
      id,
      firstName: "Typescript",
      lastName: "Master Class",
    });
    return user;
  }
}

class RoleRepository implements Repository<Role> {
  findOne(id: ID): Role {
    const role = new Role({
      id,
      name: "Admin",
      permissions: ["CreateUser", "EditUser", "RetrieveUser", "DeleteUser"],
    });
    return role;
  }
}

abstract class BaseService<M, R extends Repository<M>>
  implements CrudService<M>
{
  constructor(private repository: R) {}
  findOne(id: ID): M {
    return this.repository.findOne(id);
  }
}

@injectable()
class UserService extends BaseService<User, UserRepository> {
  constructor(
    @inject(UserRepository.name) userRepository: UserRepository,
    @inject(RoleRepository.name) private roleRepository: RoleRepository
  ) {
    super(userRepository);
  }

  retrievePermission(user: User) {
    return this.roleRepository.findOne(user.id);
  }
}

const main = () => {
  container.register("UserRepository", {
    useClass: UserRepository,
  });
  container.register("RoleRepository", {
    useClass: RoleRepository,
  });
  const userService = container.resolve(UserService);
  const user = userService.findOne(1);
  const permissions = userService.retrievePermission(user);
  console.log(user, permissions);
};

main();
```

Trong đoạn code minh họa trên, các anh/chị có thể thấy rõ, service sẽ phụ thuộc vào repository. Tuy nhiên việc khởi tạo repository sẽ được delegate. Để hiểu rõ hơn về pattern này các anh/chị có thể tìm hiểu chi tiết qua bài viết [Learn Enough Oop to Be Dangerous](https://nextjsvietnam.com/post/learn-enough-oop-to-be-dangerous/)

Như vậy, có thể thấy khi làm việc với NestJS, việc tạo ra 1 class và nhúng vào 1 class khác để sử dụng khá là đơn giản đúng không nào.

Ngoài cách tạo repository một cách chủ động như trên, trong hệ sinh thái nestjs, các anh/chị có thể sử dụng cách sau. Sử dụng chính model làm repository

> Tạo provider sử dụng custom token và useValue

Nguyên nhân là repository này sẽ sử dụng các static method của model. Nên việc khởi tạo dependency này sẽ sử dụng chính Model làm giá trị.

```ts
import { PetCategory } from "../models/pet-category.model";

export const PetCategoryInjectionKey = "Pet_Category";
export const PetCategoryProvider = {
  provide: PetCategoryInjectionKey,
  useValue: PetCategory,
};
```

```ts
// src/pet/pet.module.ts

import { Module } from "@nestjs/common";
import { PetController } from "./controllers/pet.controller";
import { ManagePetController } from "./controllers/admin/manage-pet.controller";
import { ManagePetCategoryController } from "./controllers/admin/manage-pet-category.controller";
import { ManagePetAttributeController } from "./controllers/admin/manage-pet-attribute.controller";
import { NestjsFormDataModule } from "nestjs-form-data";
import { PetCategoryRepository } from "./repositories/pet-category.repository";
import { PetCategoryProvider } from "./providers/pet-category.provider";
@Module({
  imports: [NestjsFormDataModule],
  controllers: [
    PetController,
    ManagePetController,
    ManagePetCategoryController,
    ManagePetAttributeController,
  ],
  providers: [PetCategoryRepository, PetCategoryProvider],
})
export class PetModule {}
```

```ts
import { PetCategoryInjectionKey } from './../../providers/pet-category.provider';
import {
  Body,
  Controller,
  Get,
  Render,
  Inject,
} from '@nestjs/common';
@Controller('admin/pet-categories')
export class ManagePetCategoryController {
  constructor(
    @Inject(PetCategoryInjectionKey)
    private defaultPetCategoryRepository: typeof PetCategory,
  ) {}
  @Get('')
  @Render('pet/admin/manage-pet-category/list')
  async getList() {
    const petCategories = await this.defaultPetCategoryRepository.findAll();
    return {
      petCategories,
    };
  }
```

Tuy nhiên, cách số 2 này không giải quyết được trọn vẹn vấn đề như cách số 1, mặc dù có vẻ như xuất hiện thêm 1 class repository khi sử dụng trong controller. Nhưng việc viết query vẫn sẽ nằm trọn vẹn trong controller.
Tuy rằng trông có vẻ controller và model sẽ độc lập hơn, nhưng bản chất vấn đề vẫn không được giải quyết.
Do đó khi áp dụng trong dự án thực tế, các anh/chị nên chọn cách số 1, vì sẽ có nhiều trường hợp cần việc các query phức tạp, thay vì chỉ CRUD.

### Refactor code cho ứng dụng Pet Website
