---
title: "Java Tutorial Day 01 - Hello World!"
type: "post"
date: 2024-05-02T09:04:38+07:00
description: "Java Tutorial Day 01"
keywords: ["Java Tutorial Day 01"]
categories: ["java"]
tags: ["java"]
image: "https://gist.github.com/assets/31009750/eb25bb12-ca2c-4f67-88eb-4f472e74711c"
---

**Goals**

1. [x] Install multiple version java in your local
2. [x] Introduction of Java IDE
3. [x] Run Hello World Example

## Install multiple version java in your local

To manage multiple Java versions on macOS, you can use a version manager like jEnv or SDKMAN!. Here's how to set up each:

### SDKMAN

```sh
curl -s "https://get.sdkman.io" | bash
```

```sh
sdk list java
sdk install java 11.0.2-open
sdk install java 17.0.2-open
```

- https://sdkman.io/jdks

```sh
sdk list java | grep oracle
sdk install java 22-oracle
sdk use java 22-oracle
sdk default java 22-oracle
```

## Reference

- [jEnv](https://www.jenv.be/)
- [sdkman](https://sdkman.io/install)
