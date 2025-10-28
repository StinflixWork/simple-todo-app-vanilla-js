export class EventManager {
  #listeners = [];

  subscribe(listener) {
    const isExist = this.#listeners.includes(listener)
    if (isExist) {
      return console.log('Listener already exists');
    }

    this.#listeners.push(listener);
  }

  unSubscribe(listener) {
    const listenerIndex = this.#listeners.indexOf(listener);
    if (listenerIndex === -1) {
      return console.log('Nonexistent listener');
    }

    this.#listeners.splice(listenerIndex, 1);
  }

  notify(data) {
    for (const listener of this.#listeners) {
      listener.update(data);
    }
  }
}
