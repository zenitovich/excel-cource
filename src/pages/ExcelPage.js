import Page from '../core/Page';
import { Excel } from '../components/excel/Excel';
import { Header } from '../components/header/Header';
import { Toolbar } from '../components/toolbar/Toolbar';
import { Formula } from '../components/formula/Formula';
import { Table } from '../components/table/Table';
import createStore from '../core/createStore';
import rootReducer from '../redux/rootReducer';
import { debounce, storage } from '../core/utils';
import normalizeInitialState from '../redux/initialState';

function storageName(param) {
  return `excel:${param}`;
}

export default class ExcelPage extends Page {
  // eslint-disable-next-line class-methods-use-this
  getRoot() {
    const params = this.params ? this.params : Date.now().toString();

    const state = storage(storageName(params));
    const initialState = normalizeInitialState(state);

    const store = createStore(rootReducer, initialState);

    // eslint-disable-next-line no-shadow
    const stateListener = debounce((state) => {
      storage(storageName(params), state);
    }, 300);

    store.subscribe(stateListener);

    this.excel = new Excel({
      components: [Header, Toolbar, Formula, Table],
      store,
    });

    return this.excel.getRoot();
  }

  afterRender() {
    this.excel.init();
  }

  destroy() {
    this.excel.destroy();
  }
}
