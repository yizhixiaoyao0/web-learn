let _Vue = null;

class Store {
  constructor(options) {
    const { state = {}, getters = {}, mutations = {}, actions = {} } = options;

    this.state = _Vue.observable(state);

    this.getters = Object.create(null);

    Object.keys(getters).forEach(key => {
      Object.defineProperty(this.getters, key, {
        get: () => getters[key](state)
      })
    })

    this._mutations = mutations;

    this._actions = actions;
  }

  commit(type, payload) {
    this._mutations[type](this.state, payload)
  }

  dispath(type, payload) {
    this._actions[type](this.state, payload)
  }
}

function install(Vue) {
  _Vue = vue;

  _Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        _Vue.prototype.$store = this.$options.store;
      }
    },
  });
}

export default {
  Store,
  install,
};
