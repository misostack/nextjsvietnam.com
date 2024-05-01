---
title: "Flexbox and Real World Examples"
type: "post"
date: 2024-05-01T20:59:44+07:00
description: "Flexbox is a powerful CSS layout mode that allows for the efficient arrangement of items within a container, even when their size is unknown or dynamic"
keywords: ["css", "tailwindcss"]
categories: ["cheatsheet"]
tags: ["css", "tailwindcss"]
image: "https://gist.github.com/assets/31009750/e0be3d15-d891-4630-9946-d313eb8cbc16"
---

Flexbox is a powerful CSS layout mode that allows for the efficient arrangement of items within a container, even when their size is unknown or dynamic. Flexbox makes it easy to align elements, distribute space, and handle various alignment challenges that were tricky with older CSS properties.

## Key Concepts of Flexbox

- **Flex Container**: The element that you apply display: flex or display: inline-flex to becomes the flex container. Its direct children become flex items.
- **Flex Items**: Elements inside the flex container that can be automatically laid out using flex properties.
- **Main Axis and Cross Axis**: The main axis is defined by the flex-direction property, which can be row (default) or column. The cross axis is perpendicular to the main axis.
- **Justify Content**: **Aligns items along the main axis** and can be set to flex-start, flex-end, center, space-between, space-around, or space-evenly.
- **Align Items**: **Aligns items on the cross axis** and can be set to flex-start, flex-end, center, baseline, or stretch.
- **Flex Grow, Flex Shrink, and Flex Basis**: Control the **sizing of items within a flex container**. flex-grow defines the ability for an item to grow if necessary, flex-shrink deals with how items shrink when there isn't enough space, and flex-basis sets the initial size of an item.

### Examples Using Tailwind CSS

#### Example 1: Basic Flexbox Layout

```html
<div class="flex justify-center items-center">
  <div class="p-4 bg-blue-500 text-white">Item 1</div>
  <div class="p-4 bg-red-500 text-white">Item 2</div>
  <div class="p-4 bg-green-500 text-white">Item 3</div>
</div>
```

This layout centers items both vertically and horizontally inside a flex container.

#### Example 2: Responsive Flexbox Grid

```html
<div class="flex flex-wrap -m-2">
  <div class="p-2 w-1/2 md:w-1/3 lg:w-1/4">
    <div class="bg-blue-500 text-white p-4">Box 1</div>
  </div>
  <div class="p-2 w-1/2 md:w-1/3 lg:w-1/4">
    <div class="bg-red-500 text-white p-4">Box 2</div>
  </div>
  <div class="p-2 w-full md:w-1/3 lg:w-1/4">
    <div class="bg-green-500 text-white p-4">Box 3</div>
  </div>
</div>
```

This example demonstrates a responsive grid where items wrap and resize based on the viewport size.

#### Example 3: Vertical Navigation Bar

```html
<div class="flex flex-col h-screen bg-gray-800 text-white">
  <div class="p-4">Home</div>
  <div class="p-4">Profile</div>
  <div class="p-4">Settings</div>
</div>
```

Creates a full-height vertical navigation bar with flex items stacked in a column.

Let's dive deeper into the concepts of **flex-grow, flex-shrink, and flex-basis** in the context of Flexbox, and how you can utilize them with Tailwind CSS

### Flex-grow

- **flex-grow** is a property that controls **how much a flex item will grow relative to the rest of the flex items** in the flex container when positive free space is distributed. By **default**, **flex items do not grow**; flex-grow is set to 0.

- Tailwind CSS Usage: Use flex-grow, grow-0 (no growth), grow (default is 1), or grow-[value] to control growth.

```html
<div class="flex">
  <div class="bg-blue-500 text-white p-4 grow">This grows</div>
  <div class="bg-red-500 text-white p-4">Does not grow</div>
</div>
```

In this example, the first div with a blue background will grow to take up any remaining space in the container, while the red one will not grow.

### Flex-shrink

- **flex-shrink determines how a flex item will shrink relative to the rest of the flex items** in the container **when there isn't enough space available**. By **default**, flex items can shrink (**flex-shrink is set to 1**).

- Tailwind CSS Usage: Use flex-shrink, shrink-0 (prevent shrinking), shrink (default is 1), or shrink-[value] for more specific control.

```html
<div class="flex w-64">
  <div class="bg-blue-500 text-white p-4 shrink">Shrink if necessary</div>
  <div class="bg-red-500 text-white p-4 shrink-0">Does not shrink</div>
</div>
```

Here, the first div will shrink if needed to prevent overflow, while the second div with the red background will maintain its size.

### Flex-basis

- **flex-basis sets the initial size of a flex item before the remaining space is distributed according to flex-grow or flex-shrink**. It can be a **length**, a **percentage**, or the keyword auto, which sizes it based on the item's content size.

- Tailwind CSS Usage: Tailwind doesn't directly offer flex-basis utilities, but you can use width (w-) utilities to set a base size.

```html
<div class="flex">
  <div class="bg-blue-500 text-white p-4 w-1/3">Base size 1/3</div>
  <div class="bg-red-500 text-white p-4 flex-grow">Grows to fill space</div>
</div>
```

In this layout, the first div has a flex-basis of one-third of the container's width set by w-1/3. The second div will take up the remaining space because it's set to grow.

## Real world examples and patterns

### Example 1: Create a login page

- Requirements: your layout should have the **header** and **footer** at **their natural height**, while the **main content area expands as needed to fill the rest of the screen's height**.

```html
<div className="flex flex-col min-h-screen">
  <header className="p-4">Header</header>
  <main className="flex justify-center grow">
    <div className="container p-4">{props.children}</div>
  </main>
  <footer className="flex justify-center">
    <div className="container p-4">Footer</div>
  </footer>
</div>
```

![image](https://gist.github.com/assets/31009750/2123d1e4-c059-457b-b599-d85f0c76f733)

This is the use case when you need this pattern. So we call this pattern is **"MainContentGrow"**

![image](https://gist.github.com/assets/31009750/ff43ac90-05a2-4742-95ae-7b2b8b5f0344)
