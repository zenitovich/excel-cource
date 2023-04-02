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

export function isEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return JSON.stringify(a) === JSON.stringify(b);
  }
  return a === b;
}

export default function camelToDashCase(str) {
  return str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
}

// eslint-disable-next-line no-unused-vars
export function toInlineStyles(styles = {}) {
  return Object.keys(styles)
    .map((key) => `${camelToDashCase(key)}: ${styles[key]}`)
    .join(';');
}

export function debounce(fn, wait) {
  let timeout;
  // eslint-disable-next-line func-names
  return function (...args) {
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
