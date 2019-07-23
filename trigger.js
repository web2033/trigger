/* 
Recommended to use polyfill for IntersectionObserver (include it before trigger.js):

<script crossorigin="anonymous" src="https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver"></script>

https://caniuse.com/#feat=intersectionobserver / July 13, 2019 - support 87.85%
*/

function trigger(params = {}) {
  const defaultInstanceSettings = {
    targets: false, // required, @string with one or several targets separated by comma
    init() {}, // optionally, run a @fn on a node before attaching observer to it
    action() {}, // required, @fn
    root: null, // ancestor of the target. Defaults to the browser viewport if not specified or if null.
    mt: '0px',
    mr: '0px',
    mb: '0px',
    ml: '0px',
    margin: false, // if set, then "mt, mr, mb, ml" are ignored
    t: Number.MIN_VALUE // threshold, almost 0 but greater, "intersectionRatio>=threshold" works right
  };

  function replaceObjectProps(o1, o2) {
    const o = Object.assign({}, o1); // cloning an object
    for (let p in o1) o[p] = o2.hasOwnProperty(p) ? o2[p] : o1[p];
    return o;
  }

  const instance = replaceObjectProps(defaultInstanceSettings, params);

  if (!params.targets || !params.action) {
    console.error('Trigger must have "targets & action" args');
    return;
  }

  /* targets */
  const nodes = document.querySelectorAll(instance.targets);

  /* root */
  let root = instance.root;
  if (root !== null) {
    // check if "root" is a parent of "targets"
    root = document.querySelector(root);
    nodes.forEach(node => {
      if (!root.contains(node)) {
        console.error('"root" must be a parent for all "targets"!');
        return;
      }
    });
  }

  /* rootMargin */
  const rootMargin = instance.margin
    ? instance.margin
    : `${instance.mt} ${instance.mr} ${instance.mb} ${instance.ml}`;

  /* threshold */
  // Make sure that it is in a range from "Number.MIN_VALUE" to "1"
  if (instance.t <= 0) instance.t = Number.MIN_VALUE;
  if (instance.t > 1) instance.t = 1;
  const threshold = instance.t;

  /* Working with targets */
  nodes.forEach(node => {
    let targetIndexInStore = trigger.counter; // connect each node with its observer in store
    instance.init(node); // hook to perform some initial actions
    trigger.observer[trigger.counter] = new IntersectionObserver(
      entry => {
        if (entry[0].intersectionRatio >= threshold) {
          // Triggered! What should we do?
          instance.action(node);
          trigger.observer[targetIndexInStore].disconnect();
        }
      },
      {
        // io options
        root,
        rootMargin,
        threshold
      }
    );
    trigger.observer[trigger.counter].observe(node);
    trigger.counter++;
  });
}

trigger.observer = []; // store for observers
trigger.counter = 0; // keeping track of observers being added to the store

export default trigger;
