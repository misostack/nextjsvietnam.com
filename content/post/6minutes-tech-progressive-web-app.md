---
title: "6minutes Tech Progressive Web App"
type: "post"
date: 2024-05-15T10:02:21+07:00
description: "Progressive Web Apps (PWAs) are web apps built and enhanced with modern APIs to deliver enhanced capabilities, reliability, and installability while reaching anyone, anywhere, on any device, all with a single codebase."
keywords: ["6minutes Tech Progressive Web App"]
categories: ["cheatsheet", "6minutes-tech"]
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

### Progressive enhancement

- Progressive Enhancement is a pattern that lets us write code that runs everywhere, starting from standard HTML, CSS, and JavaScript, and adding layers of capabilities on top of that with proper fallbacks when an API is not available.

- Using @supports, check for browser support of a CSS feature, and apply rules based on the result. This applies to both CSS properties and values; if a property is supported and a value is not, it will fail, as will an unsupported property. JavaScript code can access this through the CSSSupportsRule.

```css
@supports (display: grid) {
  body {
    color: blue;
  }
}
```

```js
let myRules = document.styleSheets[0].cssRules;
console.log(myRules[0]); // a CSSSupportsRule representing the feature query.
```

- To ship modern JavaScript, you can use the module/nomodule pattern to provide more robust features with a smaller payload to more modern browsers and a fallback experience to older browsers.

**Avoid device detection**

You should directly test for feature support instead of making support assumptions based on the User-Agent string.

Why?:

- User-agent strings have never been truly reliable
- For example, desktop site redirects on mobile browsers are often as simple as spoofing a desktop user-agent string

### Content first

- Another principle of designing for the web is: start with your content first. For example, a real-time stock ticker with a graph of a stock's prices is, at its core, a table of stocks with their price over some time, maybe with a link to refresh the site.

**Intrinsic design**:

- Mobile as a focusing constraint for user experience.
- Emphasizing content and core functionality in the design process.
- Progressively enhancing with advanced functionality where available.

### Web performance

Having a great experience for users is mandatory; it will lead to more conversions in every possible way:

- Understand the key user-centric metrics available.
- Set goals for every metric.
- Measure our PWA.
- Improve our metrics by applying techniques and best practices statically in our code or server.
- Measure again.
- Improve the experience to each user, live, based on the user's context.

> Core Web Vitals

- Loading—represented by Largest Contentful Paint (LCP).
- Interactivity—represented by Interaction to Next Paint (INP).
- Visual Stability—represented by Cumulative Layout Shift (CLS).

## App Design

Materials

1. Icons

- Home screen (iOS, iPadOS, Android).
- App Launcher (macOS, Android).
- Start Menu or App Menu (Windows, ChromeOS, Linux).
- Dock, TaskBar, or Multi-task panels (all operating systems).

2. Theming your app

- Theme color: defines the color of the window's title bar on the desktop and the color of the status bar on mobile devices. Using a meta tag, you can have options for different schemes, such as dark or light mode and they will be used based on the user's preference.
- Background color: defines the color of the window before the app and its CSS are loaded.
- Accent color: defines the color of built-in browser components, such as form controls.

3. Display modes

- Fullscreen: suitable for immersive experiences, such as games, VR, or AR experiences. It's currently only available on Android devices, and it hides the status bar and the navigation bar, giving your PWA 100% of the screen for your content. On desktop and iPadOS, fullscreen PWAs are not supported; however, you can use the Fullscreen API from within your PWA to display your app fullscreen at a user's request.
- Standalone: The most common option for a Progressive Web App, standalone mode displays your PWA in an OS-standard window without any browser navigation UI. On mobile devices, a standalone PWA experience will create a standard screen that keeps the status bar visible, so the user can still see notifications, time, and battery level. It often does not have any browser-controlled menu like desktop standalone experiences may include.
- Minimal User Interface: This mode is available for Progressive Web Apps on Android and desktop operating systems.

```css
/* It targets only the app used within the browser */
@media (display-mode: browser) {
}
/* It targets only the app used with a system icon in standalone mode */
@media (display-mode: standalone) {
}
/* It targets only the app used with a system icon in all mode */
@media (display-mode: standalone),
  (display-mode: fullscreen),
  (display-mode: minimal-ui) {
}
```

### The app experience

#### User selection

- Content is generally selectable with a mouse or pointer, or a press and hold touch gesture. While helpful for content, it doesn't provide the best experience for navigation items, menus, and buttons within your PWA

```css
.unselectable {
  user-select: none;
}
```

#### Accent color

```css
selector {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
}
```

#### Disable Pull to refresh

```css
body {
  overscroll-behavior-y: contain;
}
```

#### Safe Area

- https://developer.mozilla.org/en-US/docs/Web/CSS/env

Some devices do not have unobstructed rectangular screens; instead, their screen may be a different shape, like a circle, or have portions of the screen that can't be used, like the iPhone 13's notch

```css
header {
  position: fixed;
  left: env(titlebar-area-x);
  top: env(titlebar-area-y);
  width: env(titlebar-area-width);
  height: env(titlebar-area-height);
}

main {
  margin-top: env(titlebar-area-height);
}
```

## Assets and Data

### App components

- HTML for content and initial page rendering.
- JavaScript for logic, including the ability to run WebAssembly modules (compiled code) and render 2D and 3D hardware-optimized graphics.
- CSS for layout, styling, and animations.
- Images in web formats, such as PNG, JPEG, WebP, and SVG.
- Videos in web formats, such as MPEG-4 and WebM.
- Web fonts.
- Data in JSON or other formats.

### Platform-specific apps vs. PWA

- When you install a platform-specific app you are typically downloading a package that includes all the app's assets: code, images, fonts, videos, and so on. Therefore, all these resources are available, from your device storage, even when the app is offline.

- The PWA approach enhances the traditional web experience by making some or all the assets available client-side as with platform-specific apps. Therefore, when you open a PWA, the initial rendering can be as instantaneous as a platform app because the assets are available without going to the network

# Practice

```sh
npm create @vite-pwa/pwa@latest
```

Structure

- index.html
- app.js
- style.css
- sw.js
- manifest.json
- favicon.png
- icon.png

Install

![image](https://gist.github.com/assets/31009750/fad1ac16-e485-4faa-9747-56044d9efa3d)

Then your app

![image](https://gist.github.com/assets/31009750/6b087abf-76f1-44af-8926-3a7dc7a4f297)

Code sample at [https://github.com/nextjsvietnam/6minutes-tech-pwa/tree/main]

```html
<!DOCTYPE html>
<html lang="vi-VN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Favorite Links</title>
    <link rel="stylesheet" href="style.css" />
    <link rel="manifest" href="6minutes-tech-pwa.json" />
    <link rel="icon" href="favicon-32x32.png" />
  </head>
  <body>
    <h1>Favorite Links</h1>
    <form>
      <fieldset>
        <legend>Enter your favorite link</legend>
        <p>
          <label for="link">Link</label>
          <input type="text" id="link" required />
        </p>
      </fieldset>
      <p>
        <button type="submit">Save</button>
      </p>
    </form>
    <section id="favorite-links">
      <h2>Links</h2>
      <ul>
        <li><a href="#">Link1</a></li>
        <li><a href="#">Link2</a></li>
        <li><a href="#">Link3</a></li>
        <li><a href="#">Link4</a></li>
        <li><a href="#">Link5</a></li>
      </ul>
    </section>
  </body>
  <script src="app.js" defer></script>
  <script>
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("sw.js").then(
        (registration) => {
          console.log("Service worker registration successful:", registration);
        },
        (error) => {
          console.error(`Service worker registration failed: ${error}`);
        }
      );
    } else {
      console.error("Service workers are not supported.");
    }
  </script>
  <button id="install" hidden>Install</button>
</html>
```

```json
{
  "name": "6 minutes tech PWA",
  "description": "First Progressive Web Application: Favorite Links",
  "short_name": "6MT-PWA",
  "start_url": "",
  "display": "standalone",
  "orientation": "portrait",
  "theme_color": "rgb(140 196 61)",
  "background_color": "green",
  "icons": [
    {
      "src": "windows11/SmallTile.scale-100.png",
      "sizes": "71x71"
    },
    {
      "src": "windows11/SmallTile.scale-125.png",
      "sizes": "89x89"
    },
    {
      "src": "windows11/SmallTile.scale-150.png",
      "sizes": "107x107"
    },
    {
      "src": "windows11/SmallTile.scale-200.png",
      "sizes": "142x142"
    },
    {
      "src": "windows11/SmallTile.scale-400.png",
      "sizes": "284x284"
    },
    {
      "src": "windows11/Square150x150Logo.scale-100.png",
      "sizes": "150x150"
    },
    {
      "src": "windows11/Square150x150Logo.scale-125.png",
      "sizes": "188x188"
    },
    {
      "src": "windows11/Square150x150Logo.scale-150.png",
      "sizes": "225x225"
    },
    {
      "src": "windows11/Square150x150Logo.scale-200.png",
      "sizes": "300x300"
    },
    {
      "src": "windows11/Square150x150Logo.scale-400.png",
      "sizes": "600x600"
    },
    {
      "src": "windows11/Wide310x150Logo.scale-100.png",
      "sizes": "310x150"
    },
    {
      "src": "windows11/Wide310x150Logo.scale-125.png",
      "sizes": "388x188"
    },
    {
      "src": "windows11/Wide310x150Logo.scale-150.png",
      "sizes": "465x225"
    },
    {
      "src": "windows11/Wide310x150Logo.scale-200.png",
      "sizes": "620x300"
    },
    {
      "src": "windows11/Wide310x150Logo.scale-400.png",
      "sizes": "1240x600"
    },
    {
      "src": "windows11/LargeTile.scale-100.png",
      "sizes": "310x310"
    },
    {
      "src": "windows11/LargeTile.scale-125.png",
      "sizes": "388x388"
    },
    {
      "src": "windows11/LargeTile.scale-150.png",
      "sizes": "465x465"
    },
    {
      "src": "windows11/LargeTile.scale-200.png",
      "sizes": "620x620"
    },
    {
      "src": "windows11/LargeTile.scale-400.png",
      "sizes": "1240x1240"
    },
    {
      "src": "windows11/Square44x44Logo.scale-100.png",
      "sizes": "44x44"
    },
    {
      "src": "windows11/Square44x44Logo.scale-125.png",
      "sizes": "55x55"
    },
    {
      "src": "windows11/Square44x44Logo.scale-150.png",
      "sizes": "66x66"
    },
    {
      "src": "windows11/Square44x44Logo.scale-200.png",
      "sizes": "88x88"
    },
    {
      "src": "windows11/Square44x44Logo.scale-400.png",
      "sizes": "176x176"
    },
    {
      "src": "windows11/StoreLogo.scale-100.png",
      "sizes": "50x50"
    },
    {
      "src": "windows11/StoreLogo.scale-125.png",
      "sizes": "63x63"
    },
    {
      "src": "windows11/StoreLogo.scale-150.png",
      "sizes": "75x75"
    },
    {
      "src": "windows11/StoreLogo.scale-200.png",
      "sizes": "100x100"
    },
    {
      "src": "windows11/StoreLogo.scale-400.png",
      "sizes": "200x200"
    },
    {
      "src": "windows11/SplashScreen.scale-100.png",
      "sizes": "620x300"
    },
    {
      "src": "windows11/SplashScreen.scale-125.png",
      "sizes": "775x375"
    },
    {
      "src": "windows11/SplashScreen.scale-150.png",
      "sizes": "930x450"
    },
    {
      "src": "windows11/SplashScreen.scale-200.png",
      "sizes": "1240x600"
    },
    {
      "src": "windows11/SplashScreen.scale-400.png",
      "sizes": "2480x1200"
    },
    {
      "src": "windows11/Square44x44Logo.targetsize-16.png",
      "sizes": "16x16"
    },
    {
      "src": "windows11/Square44x44Logo.targetsize-20.png",
      "sizes": "20x20"
    },
    {
      "src": "windows11/Square44x44Logo.targetsize-24.png",
      "sizes": "24x24"
    },
    {
      "src": "windows11/Square44x44Logo.targetsize-30.png",
      "sizes": "30x30"
    },
    {
      "src": "windows11/Square44x44Logo.targetsize-32.png",
      "sizes": "32x32"
    },
    {
      "src": "windows11/Square44x44Logo.targetsize-36.png",
      "sizes": "36x36"
    },
    {
      "src": "windows11/Square44x44Logo.targetsize-40.png",
      "sizes": "40x40"
    },
    {
      "src": "windows11/Square44x44Logo.targetsize-44.png",
      "sizes": "44x44"
    },
    {
      "src": "windows11/Square44x44Logo.targetsize-48.png",
      "sizes": "48x48"
    },
    {
      "src": "windows11/Square44x44Logo.targetsize-60.png",
      "sizes": "60x60"
    },
    {
      "src": "windows11/Square44x44Logo.targetsize-64.png",
      "sizes": "64x64"
    },
    {
      "src": "windows11/Square44x44Logo.targetsize-72.png",
      "sizes": "72x72"
    },
    {
      "src": "windows11/Square44x44Logo.targetsize-80.png",
      "sizes": "80x80"
    },
    {
      "src": "windows11/Square44x44Logo.targetsize-96.png",
      "sizes": "96x96"
    },
    {
      "src": "windows11/Square44x44Logo.targetsize-256.png",
      "sizes": "256x256"
    },
    {
      "src": "windows11/Square44x44Logo.altform-unplated_targetsize-16.png",
      "sizes": "16x16"
    },
    {
      "src": "windows11/Square44x44Logo.altform-unplated_targetsize-20.png",
      "sizes": "20x20"
    },
    {
      "src": "windows11/Square44x44Logo.altform-unplated_targetsize-24.png",
      "sizes": "24x24"
    },
    {
      "src": "windows11/Square44x44Logo.altform-unplated_targetsize-30.png",
      "sizes": "30x30"
    },
    {
      "src": "windows11/Square44x44Logo.altform-unplated_targetsize-32.png",
      "sizes": "32x32"
    },
    {
      "src": "windows11/Square44x44Logo.altform-unplated_targetsize-36.png",
      "sizes": "36x36"
    },
    {
      "src": "windows11/Square44x44Logo.altform-unplated_targetsize-40.png",
      "sizes": "40x40"
    },
    {
      "src": "windows11/Square44x44Logo.altform-unplated_targetsize-44.png",
      "sizes": "44x44"
    },
    {
      "src": "windows11/Square44x44Logo.altform-unplated_targetsize-48.png",
      "sizes": "48x48"
    },
    {
      "src": "windows11/Square44x44Logo.altform-unplated_targetsize-60.png",
      "sizes": "60x60"
    },
    {
      "src": "windows11/Square44x44Logo.altform-unplated_targetsize-64.png",
      "sizes": "64x64"
    },
    {
      "src": "windows11/Square44x44Logo.altform-unplated_targetsize-72.png",
      "sizes": "72x72"
    },
    {
      "src": "windows11/Square44x44Logo.altform-unplated_targetsize-80.png",
      "sizes": "80x80"
    },
    {
      "src": "windows11/Square44x44Logo.altform-unplated_targetsize-96.png",
      "sizes": "96x96"
    },
    {
      "src": "windows11/Square44x44Logo.altform-unplated_targetsize-256.png",
      "sizes": "256x256"
    },
    {
      "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png",
      "sizes": "16x16"
    },
    {
      "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png",
      "sizes": "20x20"
    },
    {
      "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png",
      "sizes": "24x24"
    },
    {
      "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png",
      "sizes": "30x30"
    },
    {
      "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png",
      "sizes": "32x32"
    },
    {
      "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png",
      "sizes": "36x36"
    },
    {
      "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png",
      "sizes": "40x40"
    },
    {
      "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png",
      "sizes": "44x44"
    },
    {
      "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png",
      "sizes": "48x48"
    },
    {
      "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png",
      "sizes": "60x60"
    },
    {
      "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png",
      "sizes": "64x64"
    },
    {
      "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png",
      "sizes": "72x72"
    },
    {
      "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png",
      "sizes": "80x80"
    },
    {
      "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png",
      "sizes": "96x96"
    },
    {
      "src": "windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png",
      "sizes": "256x256"
    },
    {
      "src": "android/android-launchericon-512-512.png",
      "sizes": "512x512"
    },
    {
      "src": "android/android-launchericon-192-192.png",
      "sizes": "192x192"
    },
    {
      "src": "android/android-launchericon-144-144.png",
      "sizes": "144x144"
    },
    {
      "src": "android/android-launchericon-96-96.png",
      "sizes": "96x96"
    },
    {
      "src": "android/android-launchericon-72-72.png",
      "sizes": "72x72"
    },
    {
      "src": "android/android-launchericon-48-48.png",
      "sizes": "48x48"
    },
    {
      "src": "ios/16.png",
      "sizes": "16x16"
    },
    {
      "src": "ios/20.png",
      "sizes": "20x20"
    },
    {
      "src": "ios/29.png",
      "sizes": "29x29"
    },
    {
      "src": "ios/32.png",
      "sizes": "32x32"
    },
    {
      "src": "ios/40.png",
      "sizes": "40x40"
    },
    {
      "src": "ios/50.png",
      "sizes": "50x50"
    },
    {
      "src": "ios/57.png",
      "sizes": "57x57"
    },
    {
      "src": "ios/58.png",
      "sizes": "58x58"
    },
    {
      "src": "ios/60.png",
      "sizes": "60x60"
    },
    {
      "src": "ios/64.png",
      "sizes": "64x64"
    },
    {
      "src": "ios/72.png",
      "sizes": "72x72"
    },
    {
      "src": "ios/76.png",
      "sizes": "76x76"
    },
    {
      "src": "ios/80.png",
      "sizes": "80x80"
    },
    {
      "src": "ios/87.png",
      "sizes": "87x87"
    },
    {
      "src": "ios/100.png",
      "sizes": "100x100"
    },
    {
      "src": "ios/114.png",
      "sizes": "114x114"
    },
    {
      "src": "ios/120.png",
      "sizes": "120x120"
    },
    {
      "src": "ios/128.png",
      "sizes": "128x128"
    },
    {
      "src": "ios/144.png",
      "sizes": "144x144"
    },
    {
      "src": "ios/152.png",
      "sizes": "152x152"
    },
    {
      "src": "ios/167.png",
      "sizes": "167x167"
    },
    {
      "src": "ios/180.png",
      "sizes": "180x180"
    },
    {
      "src": "ios/192.png",
      "sizes": "192x192"
    },
    {
      "src": "ios/256.png",
      "sizes": "256x256"
    },
    {
      "src": "ios/512.png",
      "sizes": "512x512"
    },
    {
      "src": "ios/1024.png",
      "sizes": "1024x1024"
    }
  ]
}
```

```js
// sw.js
// The version of the cache.
const VERSION = "v1.240515001";

// The name of the cache
const CACHE_NAME = `6minutes-tech-pwa-${VERSION}`;

// The static resources that the app needs to function.
// Dynamically determine the base path depending on where the app is hosted.
const getBasePath = () => {
  if (
    location.hostname === "localhost" ||
    location.hostname === "127.0.0.1" ||
    location.hostname === ""
  ) {
    return "/"; // No base path for localhost
  }
  return "/6minutes-tech-pwa/"; // Adjust the base path for GitHub Pages or other environments
};

// Base path for the hosted app
const BASE_PATH = getBasePath();
console.log(location.hostname, BASE_PATH);
const APP_STATIC_RESOURCES = [
  `${BASE_PATH}index.html`,
  `${BASE_PATH}app.js`,
  `${BASE_PATH}style.css`,
  `${BASE_PATH}6minutes-tech-pwa.json`,
  `${BASE_PATH}favicon-32x32.png`,

  // Windows 11 Icons
  `${BASE_PATH}windows11/SmallTile.scale-100.png`,
  `${BASE_PATH}windows11/SmallTile.scale-125.png`,
  `${BASE_PATH}windows11/SmallTile.scale-150.png`,
  `${BASE_PATH}windows11/SmallTile.scale-200.png`,
  `${BASE_PATH}windows11/SmallTile.scale-400.png`,
  `${BASE_PATH}windows11/Square150x150Logo.scale-100.png`,
  `${BASE_PATH}windows11/Square150x150Logo.scale-125.png`,
  `${BASE_PATH}windows11/Square150x150Logo.scale-150.png`,
  `${BASE_PATH}windows11/Square150x150Logo.scale-200.png`,
  `${BASE_PATH}windows11/Square150x150Logo.scale-400.png`,
  `${BASE_PATH}windows11/Wide310x150Logo.scale-100.png`,
  `${BASE_PATH}windows11/Wide310x150Logo.scale-125.png`,
  `${BASE_PATH}windows11/Wide310x150Logo.scale-150.png`,
  `${BASE_PATH}windows11/Wide310x150Logo.scale-200.png`,
  `${BASE_PATH}windows11/Wide310x150Logo.scale-400.png`,
  `${BASE_PATH}windows11/LargeTile.scale-100.png`,
  `${BASE_PATH}windows11/LargeTile.scale-125.png`,
  `${BASE_PATH}windows11/LargeTile.scale-150.png`,
  `${BASE_PATH}windows11/LargeTile.scale-200.png`,
  `${BASE_PATH}windows11/LargeTile.scale-400.png`,
  `${BASE_PATH}windows11/Square44x44Logo.scale-100.png`,
  `${BASE_PATH}windows11/Square44x44Logo.scale-125.png`,
  `${BASE_PATH}windows11/Square44x44Logo.scale-150.png`,
  `${BASE_PATH}windows11/Square44x44Logo.scale-200.png`,
  `${BASE_PATH}windows11/Square44x44Logo.scale-400.png`,
  `${BASE_PATH}windows11/StoreLogo.scale-100.png`,
  `${BASE_PATH}windows11/StoreLogo.scale-125.png`,
  `${BASE_PATH}windows11/StoreLogo.scale-150.png`,
  `${BASE_PATH}windows11/StoreLogo.scale-200.png`,
  `${BASE_PATH}windows11/StoreLogo.scale-400.png`,
  `${BASE_PATH}windows11/SplashScreen.scale-100.png`,
  `${BASE_PATH}windows11/SplashScreen.scale-125.png`,
  `${BASE_PATH}windows11/SplashScreen.scale-150.png`,
  `${BASE_PATH}windows11/SplashScreen.scale-200.png`,
  `${BASE_PATH}windows11/SplashScreen.scale-400.png`,
  `${BASE_PATH}windows11/Square44x44Logo.targetsize-16.png`,
  `${BASE_PATH}windows11/Square44x44Logo.targetsize-20.png`,
  `${BASE_PATH}windows11/Square44x44Logo.targetsize-24.png`,
  `${BASE_PATH}windows11/Square44x44Logo.targetsize-30.png`,
  `${BASE_PATH}windows11/Square44x44Logo.targetsize-32.png`,
  `${BASE_PATH}windows11/Square44x44Logo.targetsize-36.png`,
  `${BASE_PATH}windows11/Square44x44Logo.targetsize-40.png`,
  `${BASE_PATH}windows11/Square44x44Logo.targetsize-44.png`,
  `${BASE_PATH}windows11/Square44x44Logo.targetsize-48.png`,
  `${BASE_PATH}windows11/Square44x44Logo.targetsize-60.png`,
  `${BASE_PATH}windows11/Square44x44Logo.targetsize-64.png`,
  `${BASE_PATH}windows11/Square44x44Logo.targetsize-72.png`,
  `${BASE_PATH}windows11/Square44x44Logo.targetsize-80.png`,
  `${BASE_PATH}windows11/Square44x44Logo.targetsize-96.png`,
  `${BASE_PATH}windows11/Square44x44Logo.targetsize-256.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-unplated_targetsize-16.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-unplated_targetsize-20.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-unplated_targetsize-24.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-unplated_targetsize-30.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-unplated_targetsize-32.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-unplated_targetsize-36.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-unplated_targetsize-40.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-unplated_targetsize-44.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-unplated_targetsize-48.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-unplated_targetsize-60.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-unplated_targetsize-64.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-unplated_targetsize-72.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-unplated_targetsize-80.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-unplated_targetsize-96.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-unplated_targetsize-256.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-lightunplated_targetsize-16.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-lightunplated_targetsize-20.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-lightunplated_targetsize-24.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-lightunplated_targetsize-30.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-lightunplated_targetsize-32.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-lightunplated_targetsize-36.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-lightunplated_targetsize-40.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-lightunplated_targetsize-44.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-lightunplated_targetsize-48.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-lightunplated_targetsize-60.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-lightunplated_targetsize-64.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-lightunplated_targetsize-72.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-lightunplated_targetsize-80.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-lightunplated_targetsize-96.png`,
  `${BASE_PATH}windows11/Square44x44Logo.altform-lightunplated_targetsize-256.png`,

  // Android Icons
  `${BASE_PATH}android/android-launchericon-512-512.png`,
  `${BASE_PATH}android/android-launchericon-192-192.png`,
  `${BASE_PATH}android/android-launchericon-144-144.png`,
  `${BASE_PATH}android/android-launchericon-96-96.png`,
  `${BASE_PATH}android/android-launchericon-72-72.png`,
  `${BASE_PATH}android/android-launchericon-48-48.png`,

  // iOS Icons
  `${BASE_PATH}ios/16.png`,
  `${BASE_PATH}ios/20.png`,
  `${BASE_PATH}ios/29.png`,
  `${BASE_PATH}ios/32.png`,
  `${BASE_PATH}ios/40.png`,
  `${BASE_PATH}ios/50.png`,
  `${BASE_PATH}ios/57.png`,
  `${BASE_PATH}ios/58.png`,
  `${BASE_PATH}ios/60.png`,
  `${BASE_PATH}ios/64.png`,
  `${BASE_PATH}ios/72.png`,
  `${BASE_PATH}ios/76.png`,
  `${BASE_PATH}ios/80.png`,
  `${BASE_PATH}ios/87.png`,
  `${BASE_PATH}ios/100.png`,
  `${BASE_PATH}ios/114.png`,
  `${BASE_PATH}ios/120.png`,
  `${BASE_PATH}ios/128.png`,
  `${BASE_PATH}ios/144.png`,
  `${BASE_PATH}ios/152.png`,
  `${BASE_PATH}ios/167.png`,
  `${BASE_PATH}ios/180.png`,
  `${BASE_PATH}ios/192.png`,
  `${BASE_PATH}ios/256.png`,
  `${BASE_PATH}ios/512.png`,
  `${BASE_PATH}ios/1024.png`,
];

// On install, cache the static resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll(APP_STATIC_RESOURCES);
    })()
  );
});

// delete old caches on activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      const names = await caches.keys();
      await Promise.all(
        names.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
      await clients.claim();
    })()
  );
});

// On fetch, use cache first, then network as a fallback
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // As a single page app, direct app to always go to cached home page.
  //   if (event.request.mode === "navigate") {
  //     event.respondWith(caches.match("/"));
  //     return;
  //   }

  // Ignore non-HTTP/HTTPS schemes like 'chrome-extension'
  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return;
  }

  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        return (
          response ||
          fetch(event.request).then((response) => {
            return caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, response.clone());
              return response;
            });
          })
        );
      })
      .catch(() => {
        return caches.match(`${BASE_PATH}index.html`);
      })
  );
});
```

```js
// app.js
console.log("6 minutes tech pwa");

let installPrompt = null;
const installButton = document.querySelector("#install");

window.addEventListener("beforeinstallprompt", async (event) => {
  const relatedApps = await navigator.getInstalledRelatedApps();

  // Search for a specific installed platform-specific app
  const psApp = relatedApps.find((app) => app.id === "com.example.myapp");

  if (psApp) {
    event.preventDefault();
    // Update UI as appropriate
  }

  event.preventDefault();
  installPrompt = event;
  installButton.removeAttribute("hidden");
});

installButton.addEventListener("click", async () => {
  if (!installPrompt) {
    return;
  }
  const result = await installPrompt.prompt();
  console.log(`Install prompt was: ${result.outcome}`);
  disableInAppInstallPrompt();
});

function disableInAppInstallPrompt() {
  installPrompt = null;
  installButton.setAttribute("hidden", "");
}

window.addEventListener("appinstalled", () => {
  disableInAppInstallPrompt();
});

function disableInAppInstallPrompt() {
  installPrompt = null;
  installButton.setAttribute("hidden", "");
}
```

## References

- [Demo](https://nextjsvietnam.github.io/6minutes-tech-pwa/)
- [Learn PWA](https://web.dev/learn/pwa)
- [More resource](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/How_to/Trigger_install_prompt)
- [PWA Icons Generate](https://www.pwabuilder.com/imageGenerator)
- [How to install PWA](https://www.leadmonk.io/blog/how-to-install-pwa-version-of-leadmonk)

## Bad and good news for this technology

- [apple-ends-support-for-pwas-in-eu-and-reversed-its-decision/](https://www.solita.fi/blogs/apple-ends-support-for-pwas-in-eu-and-reversed-its-decision/)
