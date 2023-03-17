// eslint-disable-next-line import/no-unresolved
import { DomListener } from '@core/DomListener';

// eslint-disable-next-line import/prefer-default-export
export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name || '';
    this.emitter = options.emitter;

    this.prepare();
  }

  // eslint-disable-next-line class-methods-use-this
  prepare() {}

  // eslint-disable-next-line class-methods-use-this
  toHTML() {
    return '';
  }

  init() {
    this.initDOMListeners();
  }

  destroy() {
    this.removeDOMListeners();
  }
}
