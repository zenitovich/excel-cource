/* eslint-disable class-methods-use-this */
import Page from '../core/Page';
import $ from '../core/dom';

export default class Dashboard extends Page {
  getRoot() {
    return $.create('div', 'db').html(`
        <div class="db__header">
                <h1>Excel Db</h1>
            </div>
            <div class="db__new">
                <div class="db__view">
                    <a href="#" class="db__create">New Table</a>
                </div>
            </div>
            <div class="db__table db__view">
                <div class="db__list-header">
                    <span>Name</span>
                    <span>Openning Date</span>
                </div>
                <ul class="db__list">
                    <li class="db__record">
                        <a href="#">Table № 1</a>
                        <strong>05.03.2023</strong>
                    </li>
                    <li class="db__record">
                        <a href="#">Table № 2</a>
                        <strong>05.03.2023</strong>
                    </li>
                </ul>
            </div>`);
  }
}
