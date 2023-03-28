import { TABLE_RESIZE } from './types';

// тут хранятся action creators функции которые создают необходимые объекты экшнов для редакции
// action creator
// eslint-disable-next-line import/prefer-default-export
export function tableResize(data) {
  return {
    type: TABLE_RESIZE,
    data,
  };
}
