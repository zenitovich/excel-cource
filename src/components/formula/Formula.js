import { ExcelComponent } from '../../core/ExcelComponent';
import { $ } from '../../core/dom';

// eslint-disable-next-line import/prefer-default-export
export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      ...options,
    });
  }

  static className = 'excel__formula';

  // eslint-disable-next-line class-methods-use-this
  toHTML() {
    return `
    <div class="info">fx</div>
    <div id="formula" class="input" contenteditable="" spellcheck="false"></div>`;
  }

  init() {
    super.init();
    this.$formula = this.$root.find('#formula');

    this.$on('table:select', ($cell) => {
      this.$formula.text($cell.text());
    });

    this.$on('table:input', ($cell) => {
      this.$formula.text($cell.text());
    });
  }

  // eslint-disable-next-line class-methods-use-this
  onInput(event) {
    this.$emit('formula:input', $(event.target).text());
  }

  // eslint-disable-next-line class-methods-use-this
  onKeydown(event) {
    const keys = ['Enter', 'Tab'];
    if (keys.includes(event.key)) {
      event.preventDefault();

      this.$emit('formula: done');
    }
  }
}
