import createToolbar from './toolbar.template';
import $ from '../../core/dom';
import ExcelStateComponent from '../../core/ExcelStateComponent';
import { defaultStyles } from '../../constants';

// eslint-disable-next-line import/prefer-default-export
export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    });
  }

  prepare() {
    this.initState(defaultStyles);
  }

  // eslint-disable-next-line class-methods-use-this
  get template() {
    return createToolbar(this.state);
  }

  // eslint-disable-next-line class-methods-use-this
  toHTML() {
    return this.template;
  }

  // eslint-disable-next-line class-methods-use-this
  storeChanged(changes) {
    this.setState(changes.currentStyles);
  }

  // eslint-disable-next-line class-methods-use-this
  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      this.$emit('toolbar:applyStyle', value);
    }
  }
}
