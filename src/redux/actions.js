import { CHANGE_TEXT, CHANGE_STYLES, TABLE_RESIZE } from './types';

// тут хранятся action creators функции которые создают необходимые объекты экшнов для редакции
// action creator
// eslint-disable-next-line import/prefer-default-export
export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  };
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data,
  };
}

export function changeStyles(data) {
  return {
    type: CHANGE_STYLES,
    data,
  };
}
