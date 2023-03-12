import { ExcelComponent } from '../../core/ExcelComponent';
import createTable from './table.template';

// eslint-disable-next-line import/prefer-default-export
export class Table extends ExcelComponent {
  static className = 'excel__table';

  // eslint-disable-next-line class-methods-use-this
  toHTML() {
    return createTable(20);
  }
}
