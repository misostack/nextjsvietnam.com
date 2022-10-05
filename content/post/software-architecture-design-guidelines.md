---
title: "Software Architecture Design Guidelines"
type: "post"
date: 2022-10-05T09:59:19+07:00
description: "Software Architecture Design Guidelines"
keywords: ["software architecture", "frontend architecture"]
categories: ["cheatsheet"]
tags: []
image: "/common/no-image.png"
---

Lời nói đầu, trong bất kì một hoạt động sản xuất kinh doanh nào, không chỉ ngành IT nói riêng, mà trong thực tế hoạt động của nhiều ngành nghề khác. Việc xây dựng hệ thống là cực kì quan trọng.

Trong phạm vi của bài viết này, tôi xin chia sẻ những gì đúc kết được trong quá trình xây dựng hệ thống cho các dự án với các quy mô khác nhau. Tuy rằng về mặt quy mô có khác biệt nhưng về mặt bản chất, thì các bước cần thiết để xây dựng 1 hệ thống là một.

## Trình tự thiết kế kiến trúc và phát triển 1 dự án Single Page App ( SPA ) trong thực tế

1. [x] Create a Sitemap
2. [ ] Check the design and choose a proper UI Framework. Such as: TailwindCSS(Atomic CSS Framework), Ant Design(Atomic CSS Framework included built-in ReactJS Components), Material, Bootstrap, Bulma, ...
3. [ ] Create the relevant page routes
4. [ ] Apply code clean standard
5. [ ] Breakdown design into smaller components: global styles, components
6. [ ] Create page details : collect bricks and build a fully page with fake data
7. [ ] Create page interaction : handle user's interaction
8. [ ] Integrate with API : they can be http request, websocket and they can be restful api or graphql. Should write test for your api integration ( use mocks & stubs if needed)
9. [ ] Think about the infrastructure and setup your continuous deployment process
10. [ ] Test your application
11. [ ] Write tests for your application and setup your continous integration process
12. [ ] Create blueprint for developers: overview source code architecture, component usage guidlines, developer's guidelines

## Trình tự thiết kế kiến trúc và phát triển 1 dự án API ( Resftful API ) trong thực tế

1. [ ] Brainstorm : analyze requirements and list all relevant entities
2. [ ] High level design: components and interation between them
3. [ ] Group into modules: design and breakdown the system in individual module for development
4. [ ] Details for funtionality in each module
5. [ ] Create database schema: dataset, field definitions, constraints, database schema
6. [ ] Create API contract-first approach
7. [ ] Design the global architecture: choosing between monolith and microservices
8. [ ] Design codebase architecture: for development, testing, deployment. Eg: DDD(domain driven design), Clean Architecture, Rapid (everything stay inside controller )
9. [ ] Apply clean code standard
10. [ ] Codefirst with API: create API contracts: request, response, dtos - accuracy, consistency, latency
11. [ ] Business Layer: service and external resources - write unit test (use mocks vs stubs if needed)
12. [ ] Persistence Layer: repository, database entities, data migration, adjust db depends on usecases for optimizing performance
13. [ ] Connect all layer into fully feature
14. [ ] Test your final API
15. [ ] Document your API
16. [ ] Setup your continous deployment process on your infrastructure: dev, test, uat, production
17. [ ] Setup your continous integration process on your CI infrastructure: test, coverage report, automatically report,...
18. [ ] Create blueprint for developers: overview source code architecture, code re-use guidelines, developer's guidelines

## Các kiến thức và công cụ thường sử dụng trong từng bước theo trình tự trên
