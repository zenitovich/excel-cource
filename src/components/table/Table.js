/* eslint-disable class-methods-use-this */
import { ExcelComponent } from '../../core/ExcelComponent';
import createTable from './table.template';
import resizeHandler from './table.resize';
import {
  shouldResize, isCell, matrix, nextSelector,
} from './table.functions';
import TableSelection from './TableSelection';
import { $ } from '../../core/dom';

// eslint-disable-next-line import/prefer-default-export
export class Table extends ExcelComponent {
  static className = 'excel__table';

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
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
    this.selectCell($cell);

    this.$on('formula:input', (text) => {
      this.selection.current.text(text);
    });

    this.$on('formula: done', () => {
      this.selection.current.focus();
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey === true) {
        const $cells = matrix($target, this.selection.current)
          .map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selection.select($target);
      }
    }
  }

  onKeydown(event) {
    const keys = ['Enter', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowDown', 'ArrowUp'];
    const { key } = event;
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault();
      const id = this.selection.current.id(true);
      // eslint-disable-next-line no-undef, no-use-before-define
      const $next = this.$root.find(nextSelector(key, id));
      this.selectCell($next);
    }
  }

  onInput(event) {
    this.$emit('table:input', $(event.target));
  }
}
