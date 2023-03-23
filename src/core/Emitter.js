// eslint-disable-next-line import/prefer-default-export
export class Emitter {
  constructor() {
    this.listeners = {};
  }

  // с помощью этого методы будут уведомляться слушатели, если они есть
  emit(event, ...args) {
    if (!Array.isArray(this.listeners[event])) {
      return false;
    }
    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
    return true;
  }

  // с помощью этого метода подписываемся на уведомления(добавляем нового слушателя)
  subscribe(event, fn) {
    this.listeners[event] = this.listeners[event] || [];
    this.listeners[event].push(fn);
    return () => {
      this.listeners[event] = this.listeners[event].filter((listener) => listener !== fn);
    };
  }
}
