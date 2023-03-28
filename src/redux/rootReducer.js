import { TABLE_RESIZE } from './types';

// eslint-disable-next-line func-names, no-unused-vars
export default function (state, action) {
  let prevState;
  let field;
  console.log(action);
  switch (action.type) {
    case TABLE_RESIZE:
      field = action.data.type === 'col' ? 'colState' : 'rowState';
      prevState = state[field] || {};
      prevState[action.data.id] = action.data.value;
      return { ...state, [field]: prevState };
    default: return state;
  }
}
