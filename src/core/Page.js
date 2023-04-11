/* eslint-disable class-methods-use-this */
export default class Page {
  constructor(params) {
    this.params = params;
  }

  // возвращает корневой элемент который можно зааппендить в какую нибудь ноду
  getRoot() {
    throw new Error('Method "getRoot should be implemented');
  }

  // этот хук нужен чтобы понимать когда страница зарендерилась и ее шаблон готов к инициализации
  afterRender() {

  }

  destroy() {

  }
}
