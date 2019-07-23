# Wrapper for Intersection Observer API

```js
trigger ({
    targets: false, // required, @string with one or several targets separated by comma
    init() {}, // optionally, run a @fn on a node before attaching observer to it
    action() {}, // required, @fn
    root: null, // ancestor of the target. Defaults to the browser viewport if not specified or if null.
    mt: '0px',
    mr: '0px',
    mb: '0px',
    ml: '0px',
    margin: false, // if set, then "mt, mr, mb, ml" are ignored
    t: Number.MIN_VALUE // threshold, between 0 and 1
  });
```

### Example: lazy-load images

```html
<img data-src="https://web2033.com/cdn/jpg/w/fashion/62-1080w.jpg" alt="">
```

```js
trigger({
  targets: 'img',
  margin: '20%',
  action(node) {
    node.src = node.dataset.src;
  }
});
```

### Example: Run animation when element is visible (anime.js in this case)

```js
/* Triggers for reveal animation */
trigger({
  targets: 'img',
  t: 0.5,
  mb: '-10%',
  init(node) {
    anime.set(node, {
      translateX: 200,
      opacity: 0
    });
  },
  action(node) {
    anime({
      targets: node,
      duration: 1000,
      translateX: 0,
      easing: 'easeOutQuint',
      opacity: {
        value: 1,
        easing: 'linear'
      }
    });
  }
});
```