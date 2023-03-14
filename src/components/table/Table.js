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

  onMousedown(event) {
    if (event.target.dataset.resize) {
      const $resizer = $(event.target);
      // closest ищет ближайшего родителя по параметрам
      const $parent = $resizer.closest('[data-type="resizable"]');
      const coords = $parent.getCoords();
      const type = $resizer.data.resize;
      const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`);

      document.onmousemove = (e) => {
        $resizer.$el.style.opacity = 1;
        if (type === 'col') {
          const delta = e.pageX - coords.right;
          const value = coords.width + delta;
          $parent.css({
            width: `${value}px`,
          });
          // eslint-disable-next-line no-return-assign, no-param-reassign
          cells.forEach((el) => el.style.width = `${value}px`);
        } else if (type === 'row') {
          const delta = e.pageY - coords.bottom;
          const value = coords.height + delta;
          $parent.css({
            height: `${value}px`,
          });
        }
      };

      document.onmouseup = () => {
        document.onmousemove = null;
        $resizer.$el.style.opacity = 0;
      };
    }
  }
}
