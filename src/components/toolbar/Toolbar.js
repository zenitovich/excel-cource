import { ExcelComponent } from '../../core/ExcelComponent';

// eslint-disable-next-line import/prefer-default-export
export class Toolbar extends ExcelComponent {
  static className = 'excel__toolbar';

  constructor($root) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
    });
  }

  // eslint-disable-next-line class-methods-use-this
  toHTML() {
    return `
    <div class="button">
    <span class="material-icons">format_align_left</span>
</div><div class="button">
    <span class="material-icons">format_align_center</span>
</div><div class="button">
    <span class="material-icons">format_align_right</span>
</div><div class="button">
    <span class="material-icons">format_bold</span>
</div><div class="button">
    <span class="material-icons">format_italic</span>
</div><div class="button">
    <span class="material-icons">format_underline</span>
</div>`;
  }

  // eslint-disable-next-line class-methods-use-this
  onClick(event) {
    console.log(event.target);
  }
}
