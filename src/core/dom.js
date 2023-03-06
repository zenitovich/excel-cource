// специальная утилита, позволяющая лучше взаимодействовать с DOM-деревом типа как jquery
class Dom {
//   constructor() {

//   }
}

// eslint-disable-next-line import/prefer-default-export
export function $() {
  return new Dom();
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName);
  if (classes) {
    el.classList.add(classes);
  }
  return el;
};
