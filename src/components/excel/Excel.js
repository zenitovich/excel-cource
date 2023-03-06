import { $ } from '../../core/dom';

// eslint-disable-next-line import/prefer-default-export
export class Excel {
  constructor(selector, options) {
    this.$el = document.querySelector(selector);
    this.components = options.components || [];
  }

  getRoot() {
    const $root = $.create('div', 'excel');

    this.components.forEach((Component) => {
      const $el = $.create('div', Component.className);
      const component = new Component($el);
      $el.innerHTML = component.toHTML();
      $root.append($el);
    });

    return $root;
  }

  // render говорит нам о том, что мы что то складываем в шаблон
  render() {
    this.$el.append(this.getRoot());
  }
}
