import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  totalRows: 0,
  totalColumns: 0,
  level: '',
  name: '',
  gameOver: false,
  showModal: false,
};

export const slice = createSlice({
  name: 'gameData',
  initialState,
  reducers: {
    setGame: (state, action) => {
      state.totalColumns = action.payload.columns;
      state.totalRows = action.payload.rows;
      state.startTime = action.payload.startTime;
      state.name = action.payload.name;
      state.level = action.payload.level;
      state.gameOver = false;
      state.showModal = false;
    },
    setGameOver: (state) => {
      state.gameOver = true;
    },
    updateShowModal: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export const { setGame, setGameOver, updateShowModal } = slice.actions;

export default slice.reducer;
