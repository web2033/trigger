## Wrapper for Intersection Observer API

> Easy way to lazy-load images, trigger animation or run javascript function.

```sh
npm i @web2033/trigger
```

```js
import trigger from '@web2033/trigger';
```

#### Options and their defaults:

```js
trigger ({
    targets: false, // required @string; selector, the same as for querySelectorAll(selector)
    action() {}, // required @fn; accepts "node" as an argument, triggered once per node
    init() {}, // optionally, run a @fn on a node before attaching observer to it
    root: null, // ancestor of the target. Defaults to the browser viewport if not specified or if null.
    mt: '0px', // margin-top
    mr: '0px', // margin-right
    mb: '0px', // margin-bottom
    ml: '0px', // margin-left
    margin: false, // shorthand for margins above; if set, then "mt, mr, mb, ml" are ignored
    t: Number.MIN_VALUE // threshold, between 0 and 1
  });
```

#### Example: lazy-load images

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

#### Example: Trigger animation when element enters viewport (anime.js in this case)

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

**CDN (min)** https://web2033.com/cdn/js/trigger/trigger.min.js

**API Docs:** https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API

**Polyfill:** https://github.com/w3c/IntersectionObserver/tree/master/polyfill

---

[MIT License](license.md) | © 2019 | [Eugene Kopich](https://eugenekopich.com)