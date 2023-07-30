---
title: "Nestjs Cheatsheet Sequelize Examples"
type: "post"
date: 2023-07-24T13:19:47+07:00
description: "Nestjs Cheatsheet Sequelize Examples"
keywords: ["Nestjs Cheatsheet Sequelize Examples"]
categories: ["nestjs-examples"]
tags: ["sequelize"]
image: "https://user-images.githubusercontent.com/31009750/255499723-15c52207-17a0-4666-b3cd-40630af681f0.png"
---

The example code will be placed [here](https://github.com/misostack/nestjs-tutorial-2023/tree/example-sequellize)

The following topics will be covered in this post.

1. [x] Mapping data types
2. [x] Database constraints
3. [ ] Relationship or Associations
4. [ ] Indexing
5. [ ] Data migrations
6. [ ] Sub queries
7. [ ] Transactions
8. [ ] Real world issues

The following database engines will be covered in this post.

1. [x] MYSQL
2. [ ] PostgreSQL

## Mapping data types

### Mapping data types for MYSQL in Sequelize

```ts
import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";

// Refs : https://sequelize.org/docs/v6/core-concepts/model-basics

export const ExampleTableName = "examples";

@Table({
  tableName: ExampleTableName,
  timestamps: true,
})
export class Example extends Model {
  // primary key, auto increment
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER.UNSIGNED, // INTEGER
  })
  id?: number;

  // boolean
  @Column({
    type: DataType.BOOLEAN, // TINYINT(1)
    allowNull: false,
    defaultValue: true,
  })
  flag: boolean;

  // strings
  @Column({
    type: DataType.STRING(75), // varchar(75)
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.STRING, // varchar(255)
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.TEXT, //  TEXT
    allowNull: true,
    defaultValue: "",
  })
  content: string;

  @Column({
    type: DataType.BLOB,
    allowNull: true,
    defaultValue: "",
  })
  image: string;

  // numbers
  @Column({
    type: DataType.INTEGER({ length: 2 }),
  })
  rate: number;

  // If your number is greater than > 9,007,199,254,740,992
  @Column({
    type: DataType.BIGINT,
    allowNull: false,
  })
  aBigIntNumber: BigInt;

  @Column({
    type: DataType.FLOAT(12, 3),
  })
  aFloat: number;

  // http://software-product-development.blogspot.com/2008/07/net-double-vs-decimal.html
  // Double: not suitable for exactly number
  @Column({
    type: DataType.DOUBLE(24, 3),
  })
  aDouble: number;

  // Decimal: suitable for exactly number: financial data
  @Column({
    type: DataType.DECIMAL(24, 3),
  })
  aDecimal: number;

  // unsigned number
  @Column({
    type: DataType.INTEGER.UNSIGNED,
  })
  population: number;

  @Column({
    type: DataType.INTEGER.UNSIGNED.ZEROFILL,
  })
  orderId: string;

  // date time
  @Column({
    type: DataType.DATEONLY,
  })
  birthDay: Date;

  @Column({
    type: DataType.DATE,
    allowNull: true,
    defaultValue: DataType.NOW,
  })
  myDate: Date;

  // TIME(fsp)	A time. Format: hh:mm:ss. The supported range is from '-838:59:59' to '838:59:59'
  @Column({
    type: DataType.TIME,
    allowNull: false,
  })
  zodiacHour: string;

  // YEAR    "A year in four-digit format. Values allowed in four-digit format: 1901 to 2155, and 0000.
  // Not Support

  // Enum: but should not use, everytime you need to add/remove enum value, must run migration
  @Column({
    type: DataType.ENUM,
    values: ["active", "inactive", "pending"],
  })
  status: string;

  @Column({
    type: DataType.JSON,
    allowNull: true,
    defaultValue: {},
  })
  settings: Object;
}
```

### Example data types for MYSQL in Sequelize Migration

```ts
"use strict";

import { ExampleTableName } from "src/pet/models/example.model";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable(ExampleTableName, {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("NOW"),
      },
      flag: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      title: {
        type: Sequelize.STRING(75),
        allowNull: false,
      },
      description: {
        type: Sequelize.STRING, // 255
        allowNull: false,
      },
      content: {
        type: Sequelize.TEXT,
        allowNull: true,
        defaultValue: "",
      },
      image: {
        type: Sequelize.BLOB,
        allowNull: true,
        default: "",
      },
      rate: {
        type: Sequelize.INTEGER({ length: 2 }),
      },
      aBigIntNumber: {
        type: Sequelize.BIGINT,
      },
      aFloat: {
        type: Sequelize.FLOAT(12, 3),
      },
      aDouble: {
        type: Sequelize.DOUBLE(24, 3),
      },
      aDecimal: {
        type: Sequelize.DECIMAL(24, 3),
      },
      population: {
        type: Sequelize.INTEGER.UNSIGNED,
      },
      orderId: {
        type: Sequelize.INTEGER.UNSIGNED.ZEROFILL,
      },
      birthDay: {
        type: Sequelize.DATEONLY,
      },
      myDate: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.NOW,
      },
      zodiacHour: {
        type: Sequelize.TIME,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        values: ["active", "inactive", "pending"],
      },
      settings: {
        type: Sequelize.JSON,
        allowNull: true,
        defaultValue: {},
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable(ExampleTableName);
  },
};
```

> Output

![image](https://user-images.githubusercontent.com/31009750/257042168-1da81aed-c15b-41fc-9339-8d68b722d2a7.png)
![image](https://user-images.githubusercontent.com/31009750/257042193-7bb53236-e5d3-40b1-84f5-49e4822a26f7.png)

### Relationship or Association for MYSQL in Sequelize

![image](https://user-images.githubusercontent.com/31009750/257051023-088fc7d3-92c1-443b-8003-add2d6ac9ea8.png)
![image](https://user-images.githubusercontent.com/31009750/257051069-7a6384cd-2978-433f-8514-4f73264a09dd.png)

#### One to One Example for MYSQL in Sequelize

- User - UserSetting

#### One to Many Example for MYSQL in Sequelize

- User - LoginHistory

#### Many to Many Example for MYSQL in Sequelize

- Pet - PetCategory
- Pet - PetAttribute

Many-to-Many relationship can't be model directly, in this case, we will use concept "Associative entity"(Junction)

Then it becomes

- Pet - Pet_PetCategory - PetCategory
- Pet - Pet_PetAttribute - PetAttribute

In sequelize, by default Pet_PetCategory will become "PetPetCategory"
