// import { Excel } from './components/excel/Excel';
// import { Header } from './components/header/Header';
// import { Toolbar } from './components/toolbar/Toolbar';
// import { Formula } from './components/formula/Formula';
// import { Table } from './components/table/Table';
import './scss/index.scss';
// import createStore from './core/createStore';
// import rootReducer from './redux/rootReducer';
// import { debounce, storage } from './core/utils';
// import { initialState } from './redux/initialState';

import Router from './core/routes/Router';
import DashboardPage from './pages/DashboardPage';
import ExcelPage from './pages/ExcelPage';

// const store = createStore(rootReducer, initialState);

// const stateListener = debounce((state) => {
//   console.log('app State', state);
//   storage('excel-state', state);
// }, 300);

// store.subscribe(stateListener);

// const excel = new Excel('#app', {
//   components: [Header, Toolbar, Formula, Table],
//   store,
// });

// excel.render();

// eslint-disable-next-line no-new
new Router('#app', {
  dashboard: DashboardPage,
  excel: ExcelPage,
});
