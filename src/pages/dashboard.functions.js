import { storage } from '../core/utils';

/* eslint-disable no-unused-vars */
function toHTML(key) {
  const model = storage(key);
  const id = key.split(':')[1];
  return `
    <li class="db__record">
      <a href="#excel/${id}">${model.title}</a>
      <strong>
        ${new Date(model.openedDate).toLocaleDateString()}
        ${new Date(model.openedDate).toLocaleTimeString()}
      </strong>
    </li>
  `;
}

// excel:12312
// excel:1232112
function getAllKeys() {
  const keys = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    console.log(key);
    if (!key.includes('excel')) {
      return;
    }
    keys.push(key);
  }
  // eslint-disable-next-line consistent-return
  return keys;
}

export default function createRecordsTable() {
  getAllKeys();
  const keys = getAllKeys();

  if (!keys.length) {
    return '<p>Вы пока не создали ни одной таблицы</p>';
  }

  return `
    <div class="db__list-header">
      <span>Название</span>
      <span>Дата открытия</span>
    </div>

    <ul class="db__list">
      ${keys.map(toHTML).join('')}
    </ul>
  `;
}
