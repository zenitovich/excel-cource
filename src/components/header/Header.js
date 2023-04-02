import ExcelComponent from '../../core/ExcelComponent';
import { changeTitle } from '../../redux/actions';
import $ from '../../core/dom';
import { defaultTitle } from '../../constants';

// eslint-disable-next-line import/prefer-default-export
export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options,
    });
  }

  static className = 'excel__header';

  // init() {
  //   const initState = this.store.getState();
  //   this.changeTitle(initState.tableTitle);
  //   this.$subscribe((state) => this.changeTitle(state.tableTitle));
  // }

  // changeTitle(title) {
  //   const input = this.$root.find('input');
  //   input.$el.setAttribute('value', title);
  // }

  // eslint-disable-next-line class-methods-use-this
  toHTML() {
    const title = this.store.getState().title || defaultTitle;
    return `
    <input type="text" class="input" value="${title}">
    <div>
        <div class="button">
            <span class="material-icons">delete</span>
        </div>
        <div class="button">
            <span class="material-icons">exit_to_app</span>
        </div>
    </div>`;
  }

  onInput(event) {
    const $target = $(event.target);
    this.$dispatch(changeTitle($target.text()));
  }
}
