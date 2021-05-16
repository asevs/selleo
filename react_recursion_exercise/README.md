# React Exercise - Recursion
This is a template app for React Exercise.

## How to start the application
Just run `npm start`. App will be available at `localhost:3000`.

## Instructions
Write a React component, that receives array of React Component classes (e.g. "One", "Two", "Three") as prop, then **recursively** renders HTML with those components:
```html
<One>
  <Two>
    <Three>
    </Three>
  </Two>
</One>
```

Let the produced html be as followed:

```html
<div class='box'>
  One
  <div class='box'>
    Two
    <div class='box'>
      Three
    </div>
  </div>
</div>
```

Files that should be edited:
- src/recursion/Recursion.js
- src/recursion/RecursiveComponent.js

Do not edit any other files.
