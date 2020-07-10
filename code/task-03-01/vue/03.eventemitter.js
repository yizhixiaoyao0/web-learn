class EventEmitter {

  constructor() {
    this.subs = Object.create(null);
  }

  $on(eventType, handler) {
    this.subs[eventType] = this.subs[eventType] || [];
    this.subs[eventType].push(handler)
  }

  $emit(eventType) {
    if (this.subs[eventType]) {
      this.subs[eventType].forEach(handle => {
        handle();
      });
    }
  }
}