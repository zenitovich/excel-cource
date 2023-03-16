import { ExcelComponent } from '../../core/ExcelComponent';

// eslint-disable-next-line import/prefer-default-export
export class Formula extends ExcelComponent {
  constructor($root) {
    super($root, {
      name: 'Formula',
      listeners: ['input'],
    });
  }

  static className = 'excel__formula';

  // eslint-disable-next-line class-methods-use-this
  toHTML() {
    return `
    <div class="info">fx</div>
    <div class="input" contenteditable="" spellcheck="false"></div>`;
  }

  // eslint-disable-next-line class-methods-use-this
  onInput(event) {
    console.log('Formula: onInput', event.target.textContent.trim());
  }
}
