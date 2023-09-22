---
title: "The Difference Between Monolithic and Microservices Architecture"
type: "post"
date: 2023-09-22T15:52:14+07:00
description: "Microservice architecture (MSA) is an approach to building software systems that decomposes business domain models into smaller, consistent, bounded-contexts implemented by services"
keywords: ["microservice-architecture"]
categories: ["microservice-architecture"]
tags: []
image: "https://user-images.githubusercontent.com/31009750/269891173-f10b1b6b-ea34-4e23-91b6-db9e995d6bff.png"
---

## Monolith advantages and drawbacks

A monolithic architecture is a traditional software development model that uses one code base to perform multiple business functions.

![image](https://user-images.githubusercontent.com/31009750/269900308-36dcbcff-58fa-42a8-92c2-a7f12a40b012.png)

![image](https://user-images.githubusercontent.com/31009750/269910251-e138f576-ca5d-4773-9209-a6ca914ab4ea.png)

### Advantages of Monolithic Architecture

1. Simplicity of development : all source code is located in one place which can be quickly understood.

2. Simplicity of debugging : The debugging process is simple because all code is located in one place. You can easily follow the flow of a request and find an issue.

3. Simplicity of testing : You test only one service without any dependencies. Everything is usually clear.

4. Simplicity of deployment : Only one deployment unit (e.g. jar file) should be deployed. There are no dependencies. In cases when UI is packaged with backend code you do not have any breaking changes. Everything exists and changes in one place.

5. Simplicity of application evolution: Basically, the application does not have any limitation from a business logic perspective. If you need some data for new feature, it is already there.

6. Cross-cutting concerns and customizations are used only once: You should take care of cross-cutting concerns only once. For instance, security, logging, exception handling, monitoring, choosing and setting up tomcat parameters, setup of data source connection pool, etc.

7. Simplicity in onboarding new team members: The source code is located in one place. New team members can easily debug some functional flow and to get familiar with the application.

8. Low cost in the early stages of the application: All source code is located in one place, packaged in a single deployment unit, and deployed. What can be easier? There is no overhead neither in infrastructure cost nor development cost.

9. The main function of the application is to be profitable: As a result, it is important to quickly implement some POC (Proof of Concept) solutions to verify the application in the real world. Also, it is important to bring customers to the system. Improvements can be implemented in the future.

10. The requirements are usually unclear at the early stages of development: It is hard to create meaningful architecture when the requirements are unclear. Real customers can define the business needs after some of the functionality already works.

### Drawbacks of Monolithic Architecture

1. Slow speed of development: The simplest disadvantage relates to CI/CD pipeline. Even a small change in source code, you may wait for a lot of time (e.g. 1 hour) for your pipeline to succeed.

2. High code coupling: Of course, you can keep a clear service structure inside your repository. However, as practice shows, eventually, you will end up with a spaghetti code in at least a few places.

3. Code ownership cannot be used: The system is growing. The logical step is to split responsibilities between several teams.

4. Testing becomes harder: Even a small change can negatively affect the system. As a result, the regression for full monolithic service is required.

5. Performance issues: Potentially, you can scale the whole monolithic service in cases of performance issues. But what to do with the database? The single database is used for all services. You can start to optimize your database queries or use read replicas. However, there is a limit to this type of optimization.

6. The cost of infrastructure: In cases of performance issues, you should scale the whole monolithic service.

7. Legacy technologies: Imagine that you have the application written on Java 8. How much time is it required to migrate the whole monolith with multiple services.

8. Lack of flexibility: Using Monolithic Architecture you are tight to the technologies that are used inside your monolith.

9. Problems with deployment: Even a small change requires the redeployment of the whole monolith.

## Microservices advantages and drawbacks

![image](https://user-images.githubusercontent.com/31009750/269925780-4fdd34ba-4d75-4156-9377-ccf18c01f5e5.png)

![image](https://user-images.githubusercontent.com/31009750/269927486-8467b46d-b334-4f70-8028-843e8dcf82ee.png)

### Microservice Advantages

1. Self-Contained, lower costs and increase efficient: Each service has its own instances. So when you need to scale up for specific service, the cost compare to monolithic architecture is actually lower.

2. Greater Agility and Flexibility in Development process: each team develop their service autonomous and dependence, so they can select the appropriate tech stack and deployment flow.

3. Enhance new technology stacks

4. High costs at early stage, but easy for upgrading and maintenance.

5. Development, Debugging, Testing each service become more easier

### Microservice Drawbacks

1. Increase Development Time

2. Difficult in Global Testing and Debugging

3. Dependency on Devops

4. High Complexity

5. Increase Network Traffic

6. Limited Reuse of Code

7. Problems with deployment

8. Have all properties of a distributed system.

### Challenges

1. Design for Faults
2. Design with Dependencies in Mind
3. Design with the Domain in Mind
4. Design with Promises in Mind
5. Distributed Systems Management

## Technology Solution for microservices

## References

- https://www.oreilly.com/content/microservices-for-java-developers/
- https://aws.amazon.com/compare/the-difference-between-monolithic-and-microservices-architecture/
- https://www.atlassian.com/microservices/microservices-architecture/microservices-vs-monolith
