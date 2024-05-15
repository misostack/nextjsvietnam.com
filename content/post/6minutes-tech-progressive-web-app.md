---
title: "6minutes Tech Progressive Web App"
type: "post"
date: 2024-05-15T10:02:21+07:00
description: ""
keywords: ["6minutes Tech Progressive Web App"]
categories: ["cheatsheet"]
tags: []
image: "/common/no-image.png"
---

First of all my approach is, we will list all the keywords that we heard or see when someone talk about Progressive Web App (PWA) : offline, installable app, manifest, service workers, mobile first, responsive design, web performance

**All the PWAs are at their core**:

- Modern websites
- Installability
- All its assets are same as on the web, but it load fast when online and available when offline
- Service workers are a fundamental part of a PWA. They enable fast loading(regardless of network), offline access, push notifications, and other capacities
- Caching: Cache Storage API to download, store, delete and update assets on device. Then these assets can be served on the device without needing a network request
- Serving: with service worker's fetch event, you can intercept network requests and serve a response using different techniques
- Workbox: a set of modules that simplify common service worker interactions such as routing/caching.
- Offline Data: Storage management such as: IndexedDB, Cache, Storage Manager, Persistent Storage, and Content Indexing.
- Web App Manifest: a JSON defines how PWA should be treated as a installed app, included look and feel, basic behavior within the operating system
- Installation Prompt: For sites that pass the PWA install criteria, the browser triggers an event to prompt the user to install it, you can use this event to customize your prompt and invite users to install your app.

So enough keywords, right. Let's dive in details.

The PWA is an app so it should have those basic elements:

- Icon on the home screen, app launcher, launchpad, or start menu
- It appears when you search for apps on the device
- It opens a standalone window, wholly separated from a browser's user interface.
- It has access to higher levels of integration with the OS, for example, URL handling or title bar customization.
- It works offline

![image](https://gist.github.com/assets/31009750/04199bb4-bc87-46f5-a642-248b8c8dc8a6)

## Case studies

- Hulu, a video streaming service in the USA, created a Progressive Web App version of their experience to replace their desktop apps which had poor user reviews and poor usage.
- JD.ID, an e-commerce platform in Indonesia providing delivery services for many products, wanted to expand its online presence by focusing on performance and a network-independent solid experience for their PWA.
- Clipchamp is an in-browser, desktop-class online video editor that empowers anyone to tell stories worth sharing through video.
- Corel Corporation's Gravit Designer is a powerful, desktop-class vector design tool that serves tens of thousands of daily active users demanding rich, affordable, accessible vector illustration software.

## Core Progressive Web App checklist

- Start fast, stay fast
- Works in any browser
- Responsive to any screen size
- Provides a custom offline page

Challenges:

- Cross-browser compatibility
- Awareness of PWAs
- Compatibility: Desktop and laptops, Mobile devices, Other devices(smart tvs, smartwatches, cars)

### Design Principle

1. Responsive Design

- Responsive web design introduces three technical ingredients: Fluid grids, Flexible media, Media queries

2. The mobile user myth

- We all assume that the responsive design will be for different experience: small, medium, large based on devices: mobile, tablet, desktop. Small screens had touch abilities, large screens didn't.

None of this is true.

- For instance, on desktop many users can keep a narrow window with the feed at one side of the screen while working, and assuming they are on a mobile because the available width would be wrong.

3. Mini mode

- 200px x 100px

Where should you get started?

#### Everything first

Mobile first, content first, offline first?
The answer is yes, everything first.

> Mobile first force you to focus

Mobile devices require software development teams to focus on the most **important data** and **actions** in an application. There simply isn't room in a 320 by 480-pixel screen for extraneous, unnecessary elements.
So when a team designs **Mobile first**, the result is an experience focused on the key tasks users want to accomplish without detours and interface debris that litter today's desktop-accessed websites.

**Design principles:**

- Focus each view of your website on only the essential tasks a user wants to accomplish there, and don't add more stuff to the idea just because they have more screen real estate.

- Responsive Web Design: the "gradient of different experiences."

## References

- [Learn PWA](https://web.dev/learn/pwa)
