
const mapTag = "[object Map]";
const setTag = "[object Set]";
const arrayTag = "[object Array]";
const objectTag = "[object Object]";
const argsTag = "[object Arguments]";

const boolTag = "[object Boolean]";
const dateTag = "[object Date]";
const errorTag = "[object Error]";
const numberTag = "[object Number]";
const regexpTag = "[object RegExp]";
const stringTag = "[object String]";
const symbolTag = "[object Symbol]";

const deepTag = [mapTag, setTag, arrayTag, objectTag, argsTag];

function clone(target, map = new WeakMap()) {
  // 克隆原始类型
  if (!isObject(target)) {
    return target;
  }

  // 初始化
  const type = getType(target);
  let cloneTarget;
  if (deepTag.includes(type)) {
    cloneTarget = getInit(target, type);
  }

  // 防止循环引用
  if (map.get(target)) {
    return map.get(target);
  }
  map.set(target, cloneTarget);

  // 克隆set
  if (type === setTag) {
    target.forEach((value) => {
      cloneTarget.add(clone(value, map));
    });
    return cloneTarget;
  }

  // 克隆map
  if (type === mapTag) {
    target.forEach((value, key) => {
      cloneTarget.set(key, clone(value, map));
    });
    return cloneTarget;
  }

  cloneOtherType(target, type);

  // 克隆对象和数组
  const keys = type === arrayTag ? undefined : Object.keys(target);
  forEach(keys || target, (value, key) => {
    if (keys) {
      key = value;
    }
    cloneTarget[key] = clone(target[key], map);
  });

  return cloneTarget;
}

function getType(target) {
  return Object.prototype.toString.call(target);
}

function cloneSymbol(target) {
  return Object(Symbol.prototype.valueOf.call(target));
}

function cloneReg(target) {
  const reFlags = /\w*$/;
  const result = new target.constructor(target.source, reFlags.exec(target));
  result.lastIndex = target.lastIndex;
  return rtesult;
}

function cloneOtherType(targe, type) {
  const Ctor = targe.constructor;
  switch (type) {
    case boolTag:
    case numberTag:
    case stringTag:
    case errorTag:
    case dateTag:
      return new Ctor(targe);
    case regexpTag:
      return cloneReg(targe);
    case symbolTag:
      return cloneSymbol(targe);
    default:
      return null;
  }
}

// 自定义指令

Vue.directive("lazyload", {
  bind: function (el, binding) {
    let lazyImageObserver = new IntersectionObserver((entrys, observe) => {
      entrys.forEach((entry, index) => {
        let lazeyImage = entry.target;

        if (entry.intersectionRatio > 0) {
          lazyImage.src = binding.value;
        }

        lazyImageObserver.unobserve(lazeyImage);
      });
    });

    lazyImageObserver.observe(el);
  },
});

function all(reqs) {
  let result = [];
  let index = 0;
  let len = reqs.length;
  return new Promise((reslove, reject) => {
    if (!Array.isArray(reqs)) {
      reject(new Error("参数必须魏淑祖"));
    }
    for (let i = 0; i < len; i++) {
      Promise.resolve(reqs[i])
        .then((res) => {
          result.push(res);
          index++;
          if (index >= len - 1) {
            reslove(result);
          }
        })
        .catch((re) => {
          return reject(re);
        });
    }
  });
}

function debounce(fn, wait) {
  let timer = null;
  return function () {
    if (timer !== null) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn().apply(this, arguments)
    }, wait)
  }
}

function throttle(fn, wait) {
  let timer = 0;
  return function() {
    if (Date.now() - timer > wait) {
      timer = Date.now();
      fn.apply(this, arguments);
    }
  }
}
