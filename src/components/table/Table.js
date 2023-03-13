/* eslint-disable class-methods-use-this */
import { $ } from '../../core/dom';
import { ExcelComponent } from '../../core/ExcelComponent';
import createTable from './table.template';

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

  // какая то ошибка потом решу еще смотри файл дом джс
  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      // closest ищет ближайшего родителя по параметрам
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      console.log(coords);
      document.onmousemove = (e) => {
        const delta = Math.floor(e.pageX - coords.right);
        console.log(delta);
      };
    }
  }
}
