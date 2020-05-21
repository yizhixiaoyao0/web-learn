
const watchMap = new Map();

function reactive(obj) {
  return new Proxy(obj, {
    get(target, property) {
      if (watchMap.current) {
        watchMap.set(target, {property: watchMap.current});
      }
      return Reflect.get(target, property);
    },
    set(target, property, value) {
      Reflect.set(target, property, value);
      if (watchMap.get(target)) {
        watchMap.get(target)[property]();
      }
    }
  })

}

function watch(effct) {
  watchMap.current = effct;
  effct();
}