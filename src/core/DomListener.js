import { capitalize } from './utils';

// input => onInput
function getMethodName(eventName) {
  return `on${capitalize(eventName)}`;
}

// eslint-disable-next-line import/prefer-default-export
export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error('No $root provided for DomListener');
    }

    this.$root = $root;
    this.listeners = listeners;
  }

  initDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(`Method ${method} is not implemented in ${this.name || ''} Component`);
      }
      this[method] = this[method].bind(this);
      // то же самое что и addEvenetListener
      this.$root.on(listener, this[method]);
    });
  }

  removeDOMListeners() {
    this.listeners.forEach((listener) => {
      const method = getMethodName(listener);
      console.log('removeDOM', method);
      this.$root.off(listener, this[method]);
    });
  }
}
