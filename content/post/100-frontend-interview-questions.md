---
title: "100 Frontend Interview Questions"
type: "post"
date: 2023-05-30T09:26:04+07:00
description: "100 Frontend Interview Questions from beginner to professional"
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

Answer

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=yes"
/>
```

## CSS Questions

### What is Box Model?

> All HTML elements can be considered as boxes.

- The CSS box model is essentially a box that wraps around every HTML element. It consists of: margins, borders, padding, and the actual content

### CSS Units?

> How many kind of css units?

- Two kind : absolute and relative

**Absolute**: cm, px, pt, pc
**Relative**: em, rem, vh, vw, %

### Using math with CSS

Question:

![image](https://user-images.githubusercontent.com/31009750/241859639-e5dee5cf-6e1b-4246-8db9-b6ac236e2300.png)

Answered:

```css
#divParent{
position:relative;
background:green;
height:60px;
}
#div1 {
  position: absolute;
  left: 50px;
  border: 1px solid black;
  background-color: yellow;
  padding: 5px 0;
}
#div2 {
  position: absolute;
  top:30px;
  left: 50px;
  width: calc(100% - 100px);
  border: 1px solid black;
  background-color: yellow;
  padding: 5px 0;
}
</style>
```

```css
/* Use calc() to calculate the width of a <div> element: */
#div1 {
  position: absolute;
  width: calc(100% - 100px);
  border: 1px solid black;
  background-color: yellow;
  padding: 5px;
}

/* Use min() to set the width of #div1 to whichever value is smallest, 50% or 300px:*/

#div1 {
  background-color: yellow;
  height: 100px;
  width: min(50%, 300px);
}
```

### Flex vs Grid

#### Flex question

![image](https://user-images.githubusercontent.com/31009750/241841631-a3febd61-07af-451c-9a6d-0de1c0821429.png)

- Question: https://jsfiddle.net/misostack/a0b9thcu/
- Answer: https://jsfiddle.net/misostack/a0b9thcu/31/

#### Grid question

![image](https://user-images.githubusercontent.com/31009750/241855055-715f5284-e409-44a6-b3a0-90d09fc650b6.png)

- Question: https://jsfiddle.net/misostack/bw2uncj7/
- Answer: https://jsfiddle.net/misostack/bw2uncj7/57/

### CSS Transition

Question: https://jsfiddle.net/misostack/qa5d4rkh/

We have a demo about transition like this, but it doesn't look smooth.
So why does it happened and how can we fix it?

Answer: https://jsfiddle.net/misostack/qa5d4rkh/26/

```css
.div-width {
  width: 100px;
  height: 100px;
  background: red;
  margin-bottom: 20px;
  transition: width 2s;
}

.div-width:hover {
  width: 300px;
}

.div-height {
  width: 100px;
  overflow: hidden;
  background: green;
  transform: scaleY(0.1);
  transform-origin: top;
  color: green;
  transition: transform 2s ease-out;
}

.div-height:hover {
  max-height: 400px;
  color: black;
  transform: scaleY(1);
}
```

### Javascript questions

### Vue2 questions

> Memory Leak

- List the most common cause of memory leaks in Vue.js apps and how they can be solved ?

> Memory leaks in Vue.js applications often come from using third-party libraries that create their own instances and/or manipulate the DOM. The v-if directive and the Vue Router destroy Vue component instances; however, cleaning up after any third party library should be done manually in the beforeDestroy() lifecycle hook.

> Vue slot and slot scoped

#### Watcher

> Question

- https://codesandbox.io/s/vue2-interview-questions-9g6szm?file=/src/components/Watcher.vue

- Can you explain what's happened when user search any value?
- How can we improve this?

> Answer:

- https://codesandbox.io/s/vue2-interview-answers-eni7ql?file=/src/components/Watcher.vue

### Another list of Vue questions:

- https://gist.github.com/misostack/4d7be67d23655f70cc927b07fe58c84a

### Another list of JS & Typescript questions:

- https://gist.github.com/misostack/0683e129a2cae6d05ca125b84b1e0002
- https://gist.github.com/misostack/697ae8274dc201d80ac0416210694492

## Performance questions

1. How are many ways to add script tag into a html page?

![image](https://gist.github.com/assets/31009750/2c09bb84-2109-4254-9d4a-b5ec5d95a8e0)
