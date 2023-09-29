---
title: "ReactJS Cheatsheet"
type: "post"
date: 2023-09-28T22:53:54+07:00
description: "All in one reactjs cheatsheet"
keywords: ["reactjs"]
categories: ["reactjs"]
tags: ["reactjs"]
image: "https://user-images.githubusercontent.com/31009750/246856332-ece36caa-82ef-4a4f-86d9-9dad4a108929.png"
---

## How to support import alias in vite?

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3015,
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: fileURLToPath(new URL("./src", import.meta.url)),
      },
    ],
  },
});
```

Then you can use something like this

```js
import "@/App.css";
import enviroment from "@/shared/environment";
import LinkManagementContainer from "@/containers/LinkManagementContainer";
```

But it is not enough, you also your editor understand it. Please create a file named "jsconfig.json" and copy the following content.

```json
{
  "compilerOptions": {
    "jsx": "react-jsx", // suport jsx file
    "target": "ES2020",
    // … all other compiler options

    // all paths defined here must match the configured path in `vite.config.ts`
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```
