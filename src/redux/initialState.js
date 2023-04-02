import { storage } from '../core/utils';
import { defaultStyles, defaultTitle } from '../constants';

const deafultState = {
  title: defaultTitle,
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyles: defaultStyles,
};

const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
});

// eslint-disable-next-line import/prefer-default-export
export const initialState = storage('excel-state') ? normalize(storage('excel-state')) : deafultState;
