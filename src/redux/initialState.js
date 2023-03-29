import { storage } from '../core/utils';

const deafultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
};

// eslint-disable-next-line import/prefer-default-export
export const initialState = storage('excel-state') ? storage('excel-state') : deafultState;
