const getMinimumIndex = (index) => (index === 0 ? index : index - 1);

const getMaxIndex = (index, max) => (index === max - 1 ? index : index + 1);

export const countAdjacentBombs = (grid, rowIndex, columnIndex, rows, cols) => {
  let bombCount = 0;

  for (let i = getMinimumIndex(rowIndex); i <= getMaxIndex(rowIndex, rows); i++) {
    for (let j = getMinimumIndex(columnIndex); j <= getMaxIndex(columnIndex, cols); j++) {
      if (grid[i][j].hasBomb) {
        bombCount += 1;
      }
    }
  }

  return bombCount;
};

export const getAdjacentCells = (grid, rowIndex, columnIndex, rows, cols) => {
  const adjacents = [];

  for (let i = getMinimumIndex(rowIndex); i <= getMaxIndex(rowIndex, rows); i++) {
    for (let j = getMinimumIndex(columnIndex); j <= getMaxIndex(columnIndex, cols); j++) {
      adjacents.push({
        indexI: i,
        indexJ: j,
        count: countAdjacentBombs(grid, i, j, rows, cols),
      });
    }
  }

  return adjacents;
};

const createCells = (rows, columns) => {
  const rowsArray = [];

  for (let i = 0; i < rows; i++) {
    const row = [];

    for (let j = 0; j < columns; j++) {
      row.push({
        wasClicked: false,
        hasBomb: false,
        hasFlag: false,
        indexI: i,
        indexJ: j,
      });
    }
    rowsArray.push(row);
  }

  return rowsArray;
};

export const createGridWithBombs = (bombsQuantity, rows, cols) => {
  const grid = createCells(rows, cols);
  let bombCounter = 0;

  // in the form is handled that bomb quantity is minor than the quantity of cells
  while (bombCounter < bombsQuantity) {
    const colIndex = Math.floor(Math.random() * cols);
    const rowIndex = Math.floor(Math.random() * rows);

    if (!grid[rowIndex][colIndex].hasBomb) {
      grid[rowIndex][colIndex].hasBomb = true;
      bombCounter += 1;
    }
  }

  return grid;
};
