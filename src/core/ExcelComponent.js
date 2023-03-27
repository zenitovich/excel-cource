// eslint-disable-next-line import/no-unresolved
import { DomListener } from '@core/DomListener';

// eslint-disable-next-line import/prefer-default-export
export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;
    this.store = options.store;
    this.unsubscribers = [];
    this.storeSub = null;

    this.prepare();
  }

  // Настраиваем наш компонент до init
  // eslint-disable-next-line class-methods-use-this
  prepare() {}

  // eslint-disable-next-line class-methods-use-this
  toHTML() {
    return '';
  }

  // уведомляем слушателей про событие event
  $emit(event, ...args) {
    this.emitter.emit(event, ...args);
  }

  // подписываемся на событие event
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn);
    this.unsubscribers.push(unsub);
  }

  $dispatch(action) {
    this.store.dispatch(action);
  }

  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn);
  }

  // Инициализиурем компонент, добавляем DOM слушателей
  init() {
    this.initDOMListeners();
  }

  // Удаляем компонент, чистим слушшателей
  destroy() {
    this.removeDOMListeners();
    this.unsubscribers.forEach((unsub) => unsub());
    this.storeSub.unsubscribe();
  }
}
