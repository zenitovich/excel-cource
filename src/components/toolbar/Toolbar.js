import createToolbar from './toolbar.template';
import $ from '../../core/dom';
import ExcelStateComponent from '../../core/ExcelStateComponent';

// eslint-disable-next-line import/prefer-default-export
export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar';

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options,
    });
  }

  prepare() {
    const initialState = {
      textAlign: 'left',
      fontWeight: 'normal',
      fontStyle: 'normal',
      textDecoration: 'none',
    };
    this.initState(initialState);
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
  onClick(event) {
    const $target = $(event.target);
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value);
      const key = Object.keys(value)[0];
      this.setState({ [key]: value[key] });
      console.log(this.state);
    }
  }
}
