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

  findAll(selector) {
    return this.$el.querySelectorAll(selector);
  }

  // метод кейс перебирает все ключи в объекте и создает массив
  css(styles = {}) {
    Object.keys(styles)
      .forEach((key) => {
      // eslint-disable-next-line no-unused-expressions
        this.$el.style[key] = styles[key];
      });
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

// eslint-disable-next-line import/prefer-default-export
export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return $(el);
};
