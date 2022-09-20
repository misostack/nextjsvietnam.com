---
title: "Npm Cheatsheet"
type: "post"
date: 2022-09-20T17:09:13+07:00
description: "Npm Cheatsheet"
keywords: ["Npm Cheatsheet"]
categories: ["cheatsheet"]
tags: []
image: "/common/no-image.png"
---

## Basic commands

**Global**

### list global installed packages

```bash
npm list -g
```

### list global installed packages without their dependencies

```bash
npm list -g --depth=0
```

### check a specific global package

```bash
npm list -g express
```

### install global packages

```bash
npm install -g <package_name>
```

### check outdated global packages

```bash
npm outdated -g --depth=0
```

### update global package

```bash
npm update -g <package_name>
```

### uninstall global package

```bash
npm uninstall -g <package_name>
```

**Local**

### list local installed packages

```bash
npm list
```

### list local installed packages without their dependencies

```bash
npm list --depth=0
```

### check a specific local package

```bash
npm list express
```

### install local package and save to package.json

```bash
npm install -S <package_name>
```

### check outdated local package

```bash
npm outdated --depth=0
```

### update local package and save to package.json

```bash
npm update -S <package_name>
```

### uninstall local package and save to package.json

```bash
npm uninstall -S <package_name>
```
