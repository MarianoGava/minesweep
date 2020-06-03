import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  grid: [[]],
  totalMines: 0,
  cellsToUncover: -1,
  minesFlagged: 0,
};

export const slice = createSlice({
  name: 'gridData',
  initialState,
  reducers: {
    openAdjacent: (state, action) => {
      const cell = state.grid[action.payload.indexI][action.payload.indexJ];

      if (!cell.hasFlag && !cell.wasClicked) {
        state.cellsToUncover -= 1;
      }

      cell.wasClicked = !cell.hasFlag;
      cell.number = action.payload.count;
    },
    setCell: (state, action) => {
      state.grid[action.payload.indexI][action.payload.indexJ] = action.payload;
    },
    setNewGrid: (state, action) => {
      state.grid = action.payload.grid;
      state.totalMines = action.payload.totalMines;
      state.cellsToUncover =
        action.payload.rows * action.payload.columns - action.payload.totalMines;
      state.minesFlagged = 0;
    },
    decrementCellToUncover: (state) => {
      state.cellsToUncover -= 1;
    },
    updateFlag: (state, action) => {
      state.grid[action.payload.indexI][action.payload.indexJ].hasFlag = action.payload.hasFlag;
      action.payload.hasFlag ? (state.minesFlagged += 1) : (state.minesFlagged -= 1);
    },
  },
});

export const {
  setNewGrid,
  openAdjacent,
  setCell,
  decrementCellToUncover,
  updateFlag,
} = slice.actions;

export default slice.reducer;
