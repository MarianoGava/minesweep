// eslint-disable-next-line import/prefer-default-export
export const compare = (rowA, rowB) => {
  // first it compares for status: "win", "lose"
  if (rowA.status < rowB.status) {
    return 1;
  }
  if (rowA.status > rowB.status) {
    return -1;
  }

  // after it compares for grid (difficulty)
  if (rowA.totalRows * rowA.totalRows < rowB.totalRows * rowB.totalRows) {
    return 1;
  }
  if (rowA.totalRows * rowA.totalRows > rowB.totalRows * rowB.totalRows) {
    return -1;
  }

  // after it compares for quantity of mines in that grid
  if (rowA.totalMines < rowB.totalMines) {
    return 1;
  }
  if (rowA.totalMines > rowB.totalMines) {
    return -1;
  }

  // and last it compares for time spent
  if (rowA.timeSpent < rowB.timeSpent) {
    return -1;
  }
  if (rowA.timeSpent > rowB.timeSpent) {
    return 1;
  }

  return 0;
};
