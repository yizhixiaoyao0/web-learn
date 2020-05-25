// 函子

class Container {
  constructor(value){
    this._value = value;
  }

  map(fn) {
    return new Container(fn(this._value));
  }
}

// new Container(5)
//   .map(x => x + 1)
//   .map(x => x * x)

class Container {
  constructor(value){
    this._value = value;
  }

  static of(value) {
    return new Container(value);
  }

  map(fn) {
    return isNothing ? new Container(null) : new Container(fn(this._value));
  }

  isNothing() {
    return this._value === undefined || this._value === null;
  }
}