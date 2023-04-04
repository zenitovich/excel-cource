import ExcelComponent from '../../core/ExcelComponent';
import $ from '../../core/dom';

// eslint-disable-next-line import/prefer-default-export
export class Formula extends ExcelComponent {
  constructor($root, options) {
    super($root, {
      name: 'Formula',
      listeners: ['input', 'keydown'],
      subscribe: ['currentText'],
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
      this.$formula.text($cell.data.value);
    });

    // this.$on('table:input', ($cell) => {
    //   this.$formula.text($cell.text());
    // });

    // this.$subscribe((state) => {
    //   console.log('Formula updt', state.currentText);
    //   this.$formula.text(state.currentText);
    // });
  }

  // eslint-disable-next-line class-methods-use-this
  storeChanged({ currentText }) {
    this.$formula.text(currentText);
  }

  // eslint-disable-next-line class-methods-use-this
  onInput(event) {
    const text = $(event.target).text();
    this.$emit('formula:input', text);

    // this.$dispatch({
    //   data: {
    //     tableTitle: text,
    //   },
    // });
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
