import { storage } from '../core/utils';
import { defaultStyles } from '../constants';

const deafultState = {
  rowState: {},
  colState: {},
  dataState: {},
  currentText: '',
  currentStyles: defaultStyles,
};

// eslint-disable-next-line import/prefer-default-export
export const initialState = storage('excel-state') ? storage('excel-state') : deafultState;
