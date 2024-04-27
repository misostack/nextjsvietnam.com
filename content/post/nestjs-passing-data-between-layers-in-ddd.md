---
title: "Nestjs Passing Data Between Layers in Domain Driven Design"
type: "post"
date: 2024-04-27T14:31:26+07:00
description: "In Domain Driven Design, passing data between layers is one of the most important parts of your design, the dto/models will be use should belongs to which layer?"
keywords: ["nestjs", "dto", "validation"]
categories: ["nestjs", "frameworks"]
tags: ["nestjs"]
image: "https://user-images.githubusercontent.com/31009750/181449337-70081a76-5a01-4229-805e-39ed0ded6b5b.png"
---

We determined that we will have 3 layers: Presentation(Controller), Service, Data Layer(Repository). And the flow is:

- Controllers will inject Services to use
- Services will inject Repository to use.

So when passing data between layers, the dto/models will be use should belongs to which layers.

## Top-Down Approach (1st Option)

![image](https://gist.github.com/assets/31009750/716805a9-8ba0-4479-8f59-3039e560fbb3)

### Controllers Layer:

- Responsibility: Handle incoming HTTP requests, delegate business logic to services.
- Data Transfer: Interact with DTOs provided by services for transferring data between the client and the server.
- Dependency: Depend on services for handling business logic. Remain unaware of entities.

### Services Layer:

- Responsibility: Contain business logic, orchestrate data flow, and interact with repositories.
- Data Transfer: Map DTOs to entities before passing them to the repository layer, and vice versa. Provide DTOs to controllers for data exchange.
- Dependency: Depend on repositories for data access and storage operations.

### Repositories Layer:

- Responsibility: Handle data access and storage operations, interact directly with the database, and manage entities.
- Data Transfer: Operate directly with entities without any knowledge of DTOs or higher-level business logic.
- Dependency: Independent of higher-level layers, operates directly with the database.

### User Module Sample

> User Controller

```ts
import { Controller, Get, Post, Body } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDTO, UserDTO } from "./dto/user.dto";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers(): Promise<UserDTO[]> {
    return this.userService.getUsers();
  }

  @Post()
  async createUser(@Body() createUserDTO: CreateUserDTO): Promise<UserDTO> {
    return this.userService.createUser(createUserDTO);
  }
}
```

> User Service

```ts
import { Injectable, BadRequestException } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { UserEntity } from "./user.entity";
import { CreateUserDTO, UserDTO } from "./dto/user.dto";
import { validate } from "class-validator";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUsers(): Promise<UserDTO[]> {
    const users: UserEntity[] = await this.userRepository.findAll();
    return users.map((user) => this.mapEntityToDTO(user));
  }

  async createUser(createUserDTO: CreateUserDTO): Promise<UserDTO> {
    // Perform data validation using class-validator
    const errors = await validate(createUserDTO);
    if (errors.length > 0) {
      throw new BadRequestException(errors);
    }
    // Additional business logic for creating a user
    const userEntity: UserEntity = this.mapDTOToEntity(createUserDTO);
    const createdUser: UserEntity = await this.userRepository.create(
      userEntity
    );
    return this.mapEntityToDTO(createdUser);
  }

  // Additional methods and business logic can be added here

  private mapDTOToEntity(dto: CreateUserDTO): UserEntity {
    // Map DTO to entity
  }

  private mapEntityToDTO(entity: UserEntity): UserDTO {
    // Map entity to DTO
  }
}
```

> User Repository

```ts
import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {
  async findAll(): Promise<UserEntity[]> {
    // Retrieve users from the database
  }

  async create(user: UserEntity): Promise<UserEntity> {
    // Save user to the database
  }
}
```

### Pros:

1. **Clear Separation of Concerns**: The top-down approach enforces a clear separation of concerns, with controllers handling HTTP request/response logic, services containing business logic, and repositories managing data access/storage operations.
2. **Modularity**: Each layer has a specific responsibility, making it easier to understand and maintain the codebase. Changes in one layer typically have minimal impact on others.
3. **Scalability**: The layered architecture facilitates scalability, as new features or changes can be implemented within specific layers without affecting the overall structure.
4. **Testability**: The separation of concerns makes it easier to write unit tests for each layer independently, improving overall test coverage and code quality.
5. **Flexibility**: By defining clear interfaces between layers, developers can easily swap out implementations or refactor code within a layer without affecting other parts of the application.

### Cons:

1. **Increased Complexity**: Managing the interactions between layers, especially in larger applications with complex business logic, can introduce complexity and make the code harder to maintain.
2. **Performance Overhead**: Passing data between layers, especially when using DTOs or performing excessive data transformation, can incur performance overhead, impacting application performance.
3. **Potential for Duplication**: In some cases, similar logic may be duplicated across layers, leading to code duplication and maintenance overhead.
4. **Dependency Management**: Managing dependencies between layers, especially when dealing with circular dependencies or complex data flows, can be challenging and require careful design.
5. **Over-Abstraction**: Overly strict layering or excessive abstraction can lead to over-engineering and make the codebase harder to understand for new developers.

Overall, while the top-down approach provides clear benefits in terms of separation of concerns, modularity, and testability, it also comes with challenges related to complexity, performance, and dependency management. It's essential to strike a balance and carefully design the interactions between layers to ensure a maintainable and scalable architecture.

## Bottom-Up Approach (2nd Option)

![image](https://gist.github.com/assets/31009750/9facbc53-23cb-4bcb-952a-9852b657a502)

### Bottom-Up Approach Concepts:

**Repositories Layer:**

- **Foundation Layer**: The repository layer forms the foundation of the application. It is responsible for handling data access and storage operations, directly interacting with the database and managing entities.
- **Interaction with Database**: Repositories interact directly with the database, executing queries and managing transactions to retrieve, create, update, and delete data.
- **Awareness of DTOs**: Repositories may be aware of DTOs, utilizing them for data manipulation and storage operations.

**Services Layer:**

- **Built upon Repositories**: The service layer is built upon the foundation provided by the repository layer. It contains business logic and orchestrates data flow within the application.
- **Mapping DTOs to Entities**: Services may handle DTO-to-entity mapping, but they are not required to do so if repositories are aware of DTOs.
- **Business Logic**: Services encapsulate business logic, performing operations such as validation, transformation, and coordination of data between different parts of the application.

**Controllers Layer:**

- **Dependency on Services**: Controllers depend on the service layer for handling HTTP requests and delegating business logic.
- **HTTP Request Handling**: Controllers handle incoming HTTP requests, utilizing DTOs defined at the controller layer to transfer data between the client and the server.
- **Delegation to Services**: Controllers delegate the execution of business logic to services, maintaining a separation of concerns and promoting modularity.

### User Module Sample

```ts
// UserEntity.ts
export class UserEntity {
  id: number;
  name: string;
  email: string;

  constructor(id: number, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}

// UserDTO.ts
export class UserDTO {
  name: string;
  email: string;
}

// UserRepository.ts
import { Injectable } from "@nestjs/common";
import { UserEntity } from "./UserEntity";
import { UserDTO } from "./UserDTO";

@Injectable()
export class UserRepository {
  async createUser(userData: UserDTO): Promise<UserEntity> {
    // Save user data to the database and return the created user entity
    const createdUser = new UserEntity(1, userData.name, userData.email); // Simulated creation
    return createdUser;
  }
}

// UserService.ts
import { Injectable } from "@nestjs/common";
import { UserRepository } from "./UserRepository";
import { UserEntity } from "./UserEntity";
import { UserDTO } from "./UserDTO";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(userData: UserDTO): Promise<UserEntity> {
    // Additional business logic
    return this.userRepository.createUser(userData);
  }
}

// UserController.ts
import { Controller, Post, Body } from "@nestjs/common";
import { UserService } from "./UserService";
import { UserDTO } from "./UserDTO";
import { UserEntity } from "./UserEntity";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() userData: UserDTO): Promise<UserEntity> {
    return this.userService.createUser(userData);
  }
}
```

### Pros:

1. **Reduced Duplication**: By allowing lower-level components (e.g., repositories) to be more aware and responsible, duplication of code and logic can be reduced. This can lead to cleaner and more maintainable code.

2. **Simplified Interactions**: With lower-level components handling more responsibility, interactions between layers may become simpler and more streamlined. This can improve overall code readability and understandability.

3. **Flexibility in Mapping**: Since repositories may be aware of DTOs, there is flexibility in how data is mapped between layers. This can provide more options for handling data transformation and manipulation.

### Cons:

1. **Tighter Coupling**: Allowing lower-level components to be more aware of higher-level concepts (e.g., DTOs) can lead to tighter coupling between layers. Changes in one layer may have a greater impact on other layers, potentially reducing modularity.

2. **Potential Complexity**: With more responsibility distributed to lower-level components, the overall complexity of the system may increase. Managing interactions and dependencies between layers may become more challenging, especially in larger applications.

3. **Risk of Over-Engineering**: Allowing repositories to be aware of DTOs and handle more responsibility may lead to over-engineering if not carefully managed. Developers may be tempted to introduce unnecessary complexity or functionality into lower-level components, leading to bloated code.

4. **Limited Flexibility in Mapping**: While repositories may be aware of DTOs, this approach may limit flexibility in how data is mapped between layers. If DTOs change frequently or need to be transformed differently in different contexts, repositories may become less adaptable.

## Hybrid Approach

![image](https://gist.github.com/assets/31009750/e2117950-46b8-4f37-bc32-b056b4b2118e)

### Controllers Layer

#### Responsibilities:

- Handle incoming HTTP requests and respond to the client.
- Utilize DTOs (Data Transfer Objects) to validate and structure incoming data from the client.

#### Key Features:

- **Decorators and Routing**: Use decorators to define routes, extract request data, and apply middleware, keeping the controllers clean and focused on their routing responsibilities.
- **Error Handling**: Implement exception filters to catch and handle errors from the business logic, ensuring responses are user-friendly.

### Services Layer

#### Responsibilities:

- Contain and manage the core business logic of the application.
- Orchestrate data flow between the presentation and data layers, ensuring that business rules are adhered to and data integrity is maintained.

#### Key Features:

- **Framework Agnosticism**: Services should be designed to be as independent of the web framework as possible, which enhances testability and reusability.
- **Dependency Injection**: Utilize NestJS's powerful dependency injection container to manage service dependencies, promoting loose coupling and modular architecture.

### Repositories Layer

#### Responsibilities:

- Handle data persistence and retrieval operations directly with the database.
- Execute queries, manage transactions, and perform data transformations.

#### Key Features:

- **Entity Management**: Repositories typically work with entities rather than DTOs, ensuring that the data layer remains focused on data persistence and operations.
- **Custom Repository Classes**: For complex queries or database interactions, extend the basic repository functionality provided by the ORM to create custom repository classes.

### Overall Design Considerations

- **Modularity**: Promote a modular approach where each module encapsulates a certain business domain, thus enhancing maintainability and scalability.
- **Testing**: Each layer can be independently tested. Controllers can be tested using end-to-end tests, services can be unit tested, and repositories can be tested using integration tests with the database.

### Code samples

```ts
// src/user/entities/user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string; // In a real-world application, you would hash this value before storage

  @Column()
  email: string;

  @Column({ default: true })
  isActive: boolean;
}
```

```ts
// src/user/repositories/user.repository.ts
import { EntityRepository, Repository } from "typeorm";
import { User } from "../entities/user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // Additional queries and methods specific to the user data can be placed here
}
```

```ts
// src/user/services/user.service.ts
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User | undefined> {
    return this.userRepository.findOne(id);
  }

  async findByUsername(username: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { username } });
  }

  async create(userData: User): Promise<User> {
    return this.userRepository.save(userData);
  }

  async update(id: number, userData: Partial<User>): Promise<User> {
    await this.userRepository.update(id, userData);
    return this.userRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
```

```ts
// src/user/controllers/user.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { UserService } from "../services/user.service";
import { User } from "../entities/user.entity";

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<User> {
    return this.userService.findOne(id);
  }

  @Post()
  async create(@Body() userData: User): Promise<User> {
    return this.userService.create(userData);
  }

  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() userData: Partial<User>
  ): Promise<User> {
    return this.userService.update(id, userData);
  }

  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
```

### Pros

1. **Separation of Concerns**

   - Ensures each layer focuses on specific responsibilities, simplifying maintenance and extension of the application.

2. **Scalability**

   - Individual layers can scale based on specific needs, aiding efficient resource utilization.

3. **Reusability**

   - Business logic in the services layer can be reused across different parts of the application, enhancing code efficiency.

4. **Testability**

   - Independent testing of layers streamlines test case writing and debugging.

5. **Modularity**

   - Enhances application organization through modular encapsulation of components, aligned with NestJS's architecture.

6. **Flexibility in Data Management**
   - The repository layer's focus on data handling allows easy modifications to persistence logic without impacting other layers.

### Cons

1. **Complexity in Setup**

   - Initial setup can be complex and might be daunting for new developers.

2. **Overhead**

   - Additional code and abstraction layers can lead to unnecessary complexity in smaller projects.

3. **Dependency Management**

   - Managing dependencies across multiple layers can be challenging, especially in large projects.

4. **Potential for Redundant Abstractions**

   - Data may need to be mapped and transformed across layers multiple times, potentially reducing performance.

5. **Learning Curve**

   - NestJS’s advanced features such as Dependency Injection, Modules, and Decorators can have a steep learning curve.

6. **Database-Driven Design Constraints**
   - Tight coupling of entities to the database schema can sometimes limit the implementation flexibility for certain business logic.

This structured approach is ideal for medium to large-scale applications but may be excessive for smaller projects. It is crucial to assess the project's specific needs to determine the most suitable architecture.

## Conclusion

- Feel free to design your approach to adapt with your business requirements and your teams.

Code fun ^^.
