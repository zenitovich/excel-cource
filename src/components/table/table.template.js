/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
const CODES = {
  A: 65,
  Z: 90,
};

function craeteCell() {
  return `
    <div class="cell" contenteditable="">B2</div>`;
}

function createCol(col) {
  return `
    <div class="column">${col}</div> `;
}

function createRow(content) {
  return `
    <div class="row">
        <div class="row-info"></div>
        <div class="row-data">${content}</div>
    </div>`;
}

export default function createTable(rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A + 1;
  const rows = [];

  const cols = new Array(colsCount)
    .fill('')
    .map((el, index) => String.fromCharCode(CODES.A + index))
    .map((el) => createCol(el))
    .join('');

  console.log(cols);

  rows.push(createRow(cols));

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow());
  }

  return rows.join('');
}
