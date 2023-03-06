import { ExcelComponent } from '../../core/ExcelComponent';

// eslint-disable-next-line import/prefer-default-export
export class Formula extends ExcelComponent {
  static className = 'excel__formula';

  // eslint-disable-next-line class-methods-use-this
  toHTML() {
    return `
    <div class="info">fx</div>
    <div class="input" contenteditable="" spellcheck="false"></div>`;
  }
}
