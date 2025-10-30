export class EventEmitter {
  #listeners = new Map();

  subscribe(event, listener) {
    if (!this.#listeners.has(event)) {
      this.#listeners.set(event, [])
    }

    const listeners = this.#listeners.get(event);
    if (listeners.includes(listener)) return;

    listeners.push(listener)
  }

  unSubscribe(event, listener) {
    if (!this.#listeners.has(event)) return;

    const listeners = this.#listeners.get(event)

    const listenerIndex = listeners.indexOf(listener);
    if (listenerIndex === -1) return;

    listeners.splice(listenerIndex, 1);

    if (listeners.length === 0) {
      this.#listeners.delete(event)
    }
  }

  notify(event, data) {
    const listeners = this.#listeners.get(event) || [];
    const allListeners = this.#listeners.get('*') || [];

    if (!listeners?.length && !allListeners?.length) return;

    for (const listener of [...listeners, ...allListeners]) {
      listener.update(data);
    }
  }

  clear() {
    this.#listeners.clear()
  }
}
