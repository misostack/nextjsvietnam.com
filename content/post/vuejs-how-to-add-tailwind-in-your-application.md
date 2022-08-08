---
title: "Vuejs How to Add TailwindCSS in Your Application"
type: "post"
date: 2022-08-05T20:07:21+07:00
description: "Tailwind CSS is the only framework that I've seen scale on large teams. It’s easy to customize, adapts to any design, and the build size is tiny "
keywords: ["vuejs"]
categories: ["frameworks"]
tags: ["vuejs", "tailwindcss"]
image: "https://user-images.githubusercontent.com/31009750/183083369-7c2d85de-bc3a-4c91-b88a-f85297d8e2c0.png"
---

- [x] Install tailwindcss's dependency packages
- [x] Configure your template paths tailwind.config.js
- [x] Add Sass Support

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

**tailwind.config.cjs**

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

```bash
npm add -D sass
```

**src/assets/scss/global.scss**

```scss
/* Fonts */
@import url("https://fonts.googleapis.com/css2?family=Merriweather:wght@400;700&display=swap");
@import url("https://fonts.googleapis.com/icon?family=Material+Icons");

/* Tailwind base */
@tailwind base;
@tailwind components;
@tailwind utilities;

h1,
h2,
h3,
h4,
h5,
h6 {
  @apply font-bold;
  font-family: "Merriweather", serif;
}

h6 {
  @apply text-xs;
}
h5 {
  @apply text-xs;
}
h4 {
  @apply text-sm;
}
h3 {
  @apply text-base;
}
h2 {
  @apply text-2xl;
}
h1 {
  @apply text-3xl;
}

.clearfix:after {
  clear: both;
  content: ".";
  display: block;
  width: 0px;
  height: 0px;
}
```

**Using it**

```ts
import { createApp } from "vue";
import "./assets/scss/global.scss";
import App from "./App.vue";

createApp(App).mount("#app");
```
