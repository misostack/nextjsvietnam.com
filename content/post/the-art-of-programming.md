---
title: "The Art of Programming"
type: "post"
date: 2022-10-29T18:16:57+07:00
description: "Topics to be discussed are anything about concepts in programming"
keywords: ["The Art of Programming"]
categories: ["cheatsheet"]
tags: []
image: "/common/no-image.png"
---

Topics to be discussed are anything about concepts in programming

1. [x] Imperative programming vs Declarative programming
2. [x] Aspect Oriented Programming

## Imperative programming vs Declarative programming

Functional Programming is a declarative programming paradigm, in contrast to imperative programming paradigms.

**Declarative programming** is a paradigm describing **WHAT** the program does, without explicitly specifying its control flow.

**Imperative programming** is a paradigm describing **HOW** the program should do something by explicitly specifying each instruction (or statement) step by step, which mutate the program's state.

> Making a chocolate cake

**The imperative way**

- First, turn on the oven to preheat it at 180°C.
- Next, add flour, sugar, cocoa powder, baking soda and salt to a large bowl, then stir the mixture with a paddle.
- Then, add milk, vegetable oil, eggs and vanilla extract to the mixture, and mix together on medium speed until well combined.
- Distribute the cake batter evenly in a large cake pan, then bake it for approx. 30 minutes.
- Remove the pan from the oven with a pot holder, let it cool for 10 minutes.
- Finally, remove the cake from the pan with the tapping method, and frost it evenly with chocolate frosting.

**The declarative way**

- You have to preheat the oven to 180 °C.
- You have to mix dry ingredients in a bowl.
- Once dry ingredients are mixed, you have to add wet ingredients to the mixture, and mix together to form the cake batter.
- Once the oven and batter are ready, you have to put the batter in a pan, then bake it for 30 minutes.
- Once baked, you have to remove the pan from the oven and let it cool for 10 minutes.
- Finally, you have to remove the cake from the pan, and frost it.

Ready? Go!

## Aspect Oriented Programming

- Aims to increase modularity by allowing the separation of cross-cutting concerns.
- It does so by adding behavior to existing code (an advice) without modifying the code itself, instead separately specifying which code is modified via a "pointcut" specification, such as "log all function calls when the function's name begins with 'set'".

Interceptors have a set of useful capabilities which are inspired by the Aspect Oriented Programming (AOP) technique. They make it possible to:

- bind extra logic before / after method execution
- transform the result returned from a function
- transform the exception thrown from a function
- extend the basic function behavior
- completely override a function depending on specific conditions (e.g., for caching purposes)
