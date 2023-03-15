/* eslint-disable class-methods-use-this */
import { ExcelComponent } from '../../core/ExcelComponent';
import createTable from './table.template';
import resizeHandler from './table.resize';
import shouldResize from './table.functions';
import TableSelection from './TableSelection';

// eslint-disable-next-line import/prefer-default-export
export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  toHTML() {
    return createTable(20);
  }

  // проверь тут ошибка последняя строчка инита не функция!!! так же смотри dom tabSel EC tabtem
  init() {
    super.init();
    this.selection = new TableSelection();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }
}
