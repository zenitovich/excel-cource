// специальная утилита, позволяющая лучше взаимодействовать с DOM-деревом типа как jquery
class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string'
      ? document.querySelector(selector)
      : selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html;
      return this;
    }
    return this.$el.outerHTML.trim();
  }

  text(text) {
    if (typeof text !== 'undefined') {
      this.$el.textContent = text;
      return this;
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim();
    }
    return this.$el.textContent.trim();
  }

  clear() {
    this.html('');
    return this;
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback);
  }

  // В методе аппенд ошибки быть не должно, если что то не получается, возврат сюда
  append(node) {
    if (node instanceof Dom) {
      // eslint-disable-next-line no-param-reassign
      node = node.$el;
    }
    if (Element.prototype.append) {
      this.$el.append(node);
    } else {
      this.$el.appendChild(node);
    }
    return this;
  }

  get data() {
    return this.$el.dataset;
  }

  find(selector) {
    // eslint-disable-next-line no-use-before-define
    return $(this.$el.querySelector(selector));
  }

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  getStyles(styles = []) {
    return styles.reduce((res, s) => {
      res[s] = this.$el.style[s];
      return res;
    }, {});
  }

  // метод кейс перебирает все ключи в объекте и создает массив
  css(styles = {}) {
    Object.keys(styles)
      .forEach((key) => {
      // eslint-disable-next-line no-unused-expressions
        this.$el.style[key] = styles[key];
      });
  }

  id(parse) {
    if (parse) {
      // проверка не пройдет будет возвращать строчку this.data.id
      const parsed = this.id().split(':');
      return {
        row: +parsed[0],
        col: +parsed[1],
      };
    }
    return this.data.id;
  }

  focus() {
    this.$el.focus();
    return this;
  }

  attr(name, value) {
    if (value) {
      this.$el.setAttribute(name, value);
      return this;
    }
    return this.$el.getAttribute(name);
  }

  addClass(className) {
    return this.$el.classList.add(className);
  }

  removeClass(className) {
    return this.$el.classList.remove(className);
  }

  closest(selector) {
    // eslint-disable-next-line no-use-before-define
    return $(this.$el.closest(selector));
  }

  // Встроенный метод позволяющий получить набор координат
  getCoords() {
    return this.$el.getBoundingClientRect();
  }
}

export default function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
