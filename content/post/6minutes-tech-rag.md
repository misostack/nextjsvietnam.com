---
title: "6minutes Tech RAG"
type: "post"
date: 2025-08-16T21:34:58+07:00
description: "Without RAG, the LLM takes the user input and creates a response based on information it was trained on—or what it already knows. With RAG, an information retrieval component is introduced that utilizes the user input to first pull information from a new data source."
keywords: ["6minutes Tech Rag"]
categories: ["cheatsheet", "6minutes-tech"]
tags: []
image: "/common/no-image.png"
---

## LLM

Let's take a look at these 2 questions and how ChatGPT (LLM) answers those.

> 1st question: What is LLM ?

![LLM](https://gist.github.com/user-attachments/assets/f3b6059b-f5f0-4c51-b6f2-4eb61eb4adee)

![LLM](https://gist.github.com/user-attachments/assets/5fd2a28c-f282-4d52-b250-2e85d3c2bc1c)

> 2nd question: What is our company onboarding process ?

![LLM](https://gist.github.com/user-attachments/assets/55e82e5c-6b2e-42f8-ae86-fd767d23e302)

![LLM](https://gist.github.com/user-attachments/assets/d50b53e5-3575-438c-9844-356fb8181631)

What we can see is, in the 1st question, ChatGPT can answer your question, because there are answers in its knowledge base, so it just picks one them and the answer is more precised to your question.

But in the 2nd question, ChatGPT can not answer your question, because there is no information about your company and its internal process.

**So how do we support ChatGPT can answer this question?**

You must provide it with context included your company's internal process.

And that's what we call RAG (retrieval augmented generation) - provide context for LLM to allow it provides more accurate answers.

> Let's build a prompt with context

```
You are an internal chatbox.
Your name is SChat
Your mission is to answer employee's questions.
You should find answers from the information I provided you.
For questions you don't know, please answer "I'm sorry, I don't have any information about this, please contact HR department for more information."
Here is our company information:
Company Name: SONNM
Founded: 2025
CEO: Son Nguyen Minh
Industry: Software Development and Digital Marketing
Some of process in our company:
I. Onboarding Process

1.1. Pre-boarding: This phase begins after a candidate accepts a job offer and continues until their first day. It involves tasks like:
Completing necessary paperwork (e.g., tax forms, benefit enrollment).
Setting up IT access and equipment.
Sending a welcome email and providing information about the first day.
Introducing the new hire to the team and culture.
1.2. Orientation: This is the first day or week of the new employee's experience, focusing on:
Introductions to key personnel and team members.
An overview of the company's structure, mission, and values.
A tour of the workspace.
Basic information about company policies and procedures.
1.3. Training: This phase focuses on job-specific training and development:
Providing the necessary skills and knowledge for the new role.
Introducing performance metrics and expectations.
Implementing a progressive training schedule.
Utilizing mentorship or buddy systems.
1.4. Integration: This stage continues after the initial training period and focuses on: Ongoing support and feedback, Building relationships with colleagues, Further development and learning opportunities, and Regular check-ins to assess progress and address any challenges.

```

<img width="1714" height="970" alt="image" src="https://gist.github.com/user-attachments/assets/579f641c-0aa2-493b-afbf-4ef870bea8cd" />

<img width="1634" height="482" alt="image" src="https://gist.github.com/user-attachments/assets/d58f8916-d5c4-4a4b-aa86-3a3220471261" />

<img width="1826" height="340" alt="image" src="https://gist.github.com/user-attachments/assets/eefb63e7-0037-41b0-8fff-bb095248ca1b" />

## RAG

![alt text](https://docs.aws.amazon.com/images/sagemaker/latest/dg/images/jumpstart/jumpstart-fm-rag.jpg)

## References

- https://aws.amazon.com/what-is/retrieval-augmented-generation/
- https://cloud.google.com/use-cases/retrieval-augmented-generation?hl=en
- https://aws.amazon.com/blogs/machine-learning/from-concept-to-reality-navigating-the-journey-of-rag-from-proof-of-concept-to-production/
