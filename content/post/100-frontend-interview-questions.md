---
title: "100 Frontend Interview Questions"
type: "post"
date: 2023-05-30T09:26:04+07:00
description: "100 Fe Interview Questions"
keywords: ["fe", "fe interview", "fe interview questions"]
categories: ["cheatsheet"]
tags: []
image: "/common/no-image.png"
---

## HTML Inteview questions

### What are HTML Sematic Elements?

> A semantic element clearly describes its meaning to both the browser and the developer.

Examples of non-semantic elements:

```md
- <div>
- <span>
```

Examples of semantic elements:

```md
- <form>
- <table>
- <nav>
```

### HTML Form

#### What's happened when user submit a form

> The page will be reload and the form data will be sent to server

#### How to create a form that support to upload a file?

> We can use multipart/formdata

```html
<form enctype="multipart/form-data" method="post" name="fileinfo">
  <p>
    <label
      >File to stash:
      <input type="file" name="file" required />
    </label>
  </p>
  <p>
    <input type="submit" value="Stash the file!" />
  </p>
</form>
```

#### How to upload a file without reload the page?

- Using XMLHttpRequest(AJAX) - Eg: Axios
- Using Fetch API

#### HTML Graphic: Canvas vs SVG

**Canvas**

- A canvas is a rectangular area on an HTML page. By default, a canvas has no border and no content.
- The <canvas> element is only a container for graphics. You must use JavaScript to actually draw the graphics.
- Canvas has several methods for drawing paths, boxes, circles, text, and adding images.
- Well suited for graphic-intensive games

**SVG**

- SVG defines vector-based graphics in XML format.
- In SVG, each drawn shape is remembered as an object. If attributes of an SVG object are changed, the browser can automatically re-render the shape.
- Best suited for applications with large rendering areas (Google Maps)

#### HTML Media: Audio, Video

- Common issues when you worked with audio, video tag in browser

#### HTML APIs

> SessionStorage vs LocalStorage

**SessionStorage**

- sessionStorage is cleared when the page session ends
- page session is valid only for that particular tab

```js
// Save data to sessionStorage
sessionStorage.setItem("key", "value");

// Get saved data from sessionStorage
let data = sessionStorage.getItem("key");

// Remove saved data from sessionStorage
sessionStorage.removeItem("key");

// Remove all saved data from sessionStorage
sessionStorage.clear();
```

**Use case for sessionStorage - Saving text between refreshes**

```js
// Get the text field that we're going to track
let field = document.getElementById("field");

// See if we have an autosave value
// (this will only happen if the page is accidentally refreshed)
if (sessionStorage.getItem("autosave")) {
  // Restore the contents of the text field
  field.value = sessionStorage.getItem("autosave");
}

// Listen for changes in the text field
field.addEventListener("change", () => {
  // And save the results into the session storage object
  sessionStorage.setItem("autosave", field.value);
});
```

**LocalStorage**

- localStorage data has no expiration time
- localStorage data for a document loaded in a "private browsing" or "incognito" session is cleared when the last "private" tab is closed

```js
localStorage.setItem("myCat", "Tom");
const cat = localStorage.getItem("myCat");
localStorage.removeItem("myCat");
localStorage.clear();
```

#### What is viewport?

> The viewport is the user's visible area of a web page.

This is vnexpress on mobile, how to fix it?

![image](https://user-images.githubusercontent.com/31009750/241838304-6ef43f26-caca-42bf-8a3e-28d317d6c326.png)

#### Flex vs Grid

> Flex question

![image](https://user-images.githubusercontent.com/31009750/241841631-a3febd61-07af-451c-9a6d-0de1c0821429.png)

- Question: https://jsfiddle.net/misostack/a0b9thcu/
- Answer: https://jsfiddle.net/misostack/a0b9thcu/31/

> Grid question
