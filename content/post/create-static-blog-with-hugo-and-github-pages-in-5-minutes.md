---
title: "Create Static Blog With Hugo and Github Pages in 5 Minutes"
type: "post"
date: 2022-06-21T15:43:50+07:00
description: "Create Static Blog With Hugo and Github Pages in 5 Minutes"
keywords: ["Create Static Blog With Hugo and Github Pages in 5 Minutes"]
categories: ["cheatsheet"]
tags: ["hugo"]
image: "/common/no-image.png"
---

## Todo

### [x] Download hugo releases for windows 10

- https://gohugo.io/getting-started/installing/
- Extract and copy hugo.exe to your HUGO_PATH
- Add your HUGO_PATH to environment path. Window Icon + 'env' => Edit System Variables

Eg: C:/softwares/hugo

![image](https://user-images.githubusercontent.com/31009750/174746924-deab0f6a-bef5-4241-b5ad-f615a6e30120.png)
Open system environment variable
![image](https://user-images.githubusercontent.com/31009750/174747049-c0669277-1a70-4d75-828e-3e532919c9df.png)
Add new hugo path
![image](https://user-images.githubusercontent.com/31009750/174747136-5b20623d-ff18-4c7a-915e-128337ef2f52.png)
Add hugo path to path
![image](https://user-images.githubusercontent.com/31009750/174747330-c11e93a5-d303-49e6-90cb-df9a03b31824.png)
Test

```bash
hugo --help
```

### [x] Create new hugo site

```bash
hugo new site blog.jsguru.net --force
```

### [x] Setup gh-pages for hugo

https://github.com/marketplace/actions/hugo-setup

.github\workflows\gh-pages.yml

```yml
name: GitHub Pages

on:
  push:
    branches:
      - main # Set a branch to deploy
  pull_request:

jobs:
  deploy:
    runs-on: ubuntu-20.04
    concurrency:
      group: ${{ github.workflow }}-${{ github.ref }}
    steps:
      - uses: actions/checkout@v3
        with:
          submodules: true # Fetch Hugo themes (true OR recursive)
          fetch-depth: 0 # Fetch all history for .GitInfo and .Lastmod

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: "0.91.2"
          # extended: true

      - name: Build
        run: hugo --minify

      - name: Deploy
        uses: peaceiris/actions-gh-pages@v3
        if: ${{ github.ref == 'refs/heads/main' }}
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
```

### [x] Add your github page

![image](https://user-images.githubusercontent.com/31009750/174761832-efdb48f3-9a7c-4ce3-8283-5312d28a7bca.png)

### [x] Config DNS

![image](https://user-images.githubusercontent.com/31009750/174761637-4baeff74-14da-4715-9751-25b2210694e0.png)

### [x] Add new post

```bash
hugo new [archtype]/[post-name].md "Post title"
# archtype === 'post'

hugo new post/hello.md "hello"
```
