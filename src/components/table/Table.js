/* eslint-disable class-methods-use-this */
import { ExcelComponent } from '../../core/ExcelComponent';
import createTable from './table.template';
import resizeHandler from './table.resize';
import { shouldResize, isCell } from './table.functions';
import TableSelection from './TableSelection';
import { $ } from '../../core/dom';
import { range } from '../../core/utils';

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

  // вспомогательный метод, вызывающийся пред инит
  prepare() {
    this.selection = new TableSelection();
  }

  // проверь тут ошибка последняя строчка инита не функция!!! так же смотри dom tabSel EC tabtem
  init() {
    super.init();
    const $cell = this.$root.find('[data-id="0:0"]');
    this.selection.select($cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey === true) {
        const target = $target.id(true);
        const current = this.selection.current.id(true);

        // eslint-disable-next-line no-unused-vars, no-use-before-define
        const cols = range(current.col, target.col);
        // eslint-disable-next-line no-use-before-define
        const rows = range(current.row, target.row);
        console.log('Cols', cols);
        console.log('rows', rows);

        const ids = cols.reduce((acc, col) => {
          rows.forEach((row) => acc.push(`${row}:${col}`));
          return acc;
        }, []);

        const $cells = ids.map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }
}
