export default class TableSelection {
  static className = 'selected';

  constructor() {
    this.group = [];
    this.current = 0;
  }

  select($el) {
    this.clear();
    $el.focus().addClass(TableSelection.className);
    this.group.push($el);
    this.current = $el;
  }

  clear() {
    this.group.forEach(($el) => { $el.removeClass(TableSelection.className); });
    this.group = [];
  }

  // eslint-disable-next-line class-methods-use-this
  selectGroup($group = []) {
    this.clear();

    this.group = $group;
    this.group.forEach(($el) => $el.addClass(TableSelection.className));
  }

  applyStyle(style) {
    this.group.forEach(($el) => $el.css(style));
  }
}
