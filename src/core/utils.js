export function capitalize(string) {
  if (typeof string !== 'string') {
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function range(start, end) {
  if (start > end) {
    // eslint-disable-next-line no-param-reassign
    [end, start] = [start, end];
  }
  return new Array(end - start + 1)
    .fill('')
    .map((_, index) => start + index);
}

// eslint-disable-next-line consistent-return
export function storage(key, data = null) {
  if (!data) {
    return JSON.parse(localStorage.getItem(key));
  }
  localStorage.setItem(key, JSON.stringify(data));
}
