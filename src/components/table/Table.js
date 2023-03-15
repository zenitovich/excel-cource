/* eslint-disable class-methods-use-this */
import { ExcelComponent } from '../../core/ExcelComponent';
import createTable from './table.template';
import resizeHandler from './table.resize';
import shouldResize from './table.functions';

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

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(this.$root, event);
    }
  }
}
