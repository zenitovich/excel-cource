export default function createStore(rootReducer, initialState = {}) {
  // инишиал стейт это изначальное состояние приложения например дефолтные высота и ширина итд
  // приватные переменные, редюсер это функция возвращающая новый стейт инит, экшн тайп по умолч
  let state = rootReducer({ ...initialState }, { type: '__INIT__' });
  let listeners = [];

  return {
    // публичные переменные
    subscribe(fn) {
      listeners.push(fn);
      return {
        unsubscribe() {
          listeners = listeners.filter((l) => l !== fn);
        },
      };
    },

    dispatch(action) {
      // экшн это то что с помощбю чего UI уведомляет стор что что то нужно изменить
      // редюсер принимает старый стейт(состояние) и экшн и возвращает новый стейт
      state = rootReducer(state, action);
      listeners.forEach((listener) => listener(state));
    },

    getState() {
      return state;
    },
  };
}
