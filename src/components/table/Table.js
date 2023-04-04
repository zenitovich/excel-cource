/* eslint-disable class-methods-use-this */
import ExcelComponent from '../../core/ExcelComponent';
import createTable from './table.template';
import resizeHandler from './table.resize';
import {
  shouldResize, isCell, matrix, nextSelector,
} from './table.functions';
import TableSelection from './TableSelection';
import $ from '../../core/dom';
// импортирует все из файла как переменную actions чтобы можно было объеденить все исходники
import * as actions from '../../redux/actions';
import { defaultStyles } from '../../constants';
import parse from '../../core/parse';

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
    return createTable(20, this.store.getState());
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

    this.$on('formula:input', (value) => {
      this.selection.current
        .attr('data-value', value)
        .text(parse(value));
      this.updateTextInStore(value);
    });

    this.$on('formula: done', () => {
      this.selection.current.focus();
    });

    this.$on('toolbar:applyStyle', (value) => {
      this.selection.applyStyle(value);
      this.$dispatch(actions.applystyle({
        value,
        ids: this.selection.selectedIds,
      }));
    });
  }

  selectCell($cell) {
    this.selection.select($cell);
    this.$emit('table:select', $cell);
    const styles = $cell.getStyles(Object.keys(defaultStyles));
    console.log('styles to dispatch', styles);
    this.$dispatch(actions.changeStyles(styles));
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event);
      this.$dispatch(actions.tableResize(data));
    } catch (e) {
      console.warn('resize error', e.message);
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event);
    } else if (isCell(event)) {
      const $target = $(event.target);
      if (event.shiftKey === true) {
        const $cells = matrix($target, this.selection.current)
          .map((id) => this.$root.find(`[data-id="${id}"]`));
        this.selection.selectGroup($cells);
      } else {
        this.selectCell($target);
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

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value,
    }));
  }

  onInput(event) {
    // this.$emit('table:input', $(event.target));
    this.updateTextInStore($(event.target).text());
  }
}
