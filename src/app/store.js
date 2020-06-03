import { configureStore } from '@reduxjs/toolkit';
import gridReducer from 'components/grid/sliceGrid';
import gameReducer from 'components/mineBoard/sliceBoard';

export default configureStore({
  reducer: {
    gridData: gridReducer,
    gameData: gameReducer,
  },
});
