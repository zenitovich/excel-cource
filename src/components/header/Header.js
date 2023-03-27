import { ExcelComponent } from '../../core/ExcelComponent';

// eslint-disable-next-line import/prefer-default-export
export class Header extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Header',
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
    return `
    <input type="text" class="input" value="Новая таблица">
    <div>
        <div class="button">
            <span class="material-icons">delete</span>
        </div>
        <div class="button">
            <span class="material-icons">exit_to_app</span>
        </div>
    </div>`;
  }
}
