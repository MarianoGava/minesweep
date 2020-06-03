import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentTime, formatTime } from 'utils/dateUtils';
import { writeStorage, useLocalStorage } from '@rehooks/local-storage';
import { compare } from 'utils/sortingUtils';
import { updateShowModal } from 'components/mineBoard/sliceBoard';

const MineBoard = () => {
  const dispatch = useDispatch();
  const [scoresArray] = useLocalStorage('scoresArray', []);
  const cellsToUncover = useSelector((state) => state.gridData.cellsToUncover);
  const minesFlagged = useSelector((state) => state.gridData.minesFlagged);
  const totalMines = useSelector((state) => state.gridData.totalMines);
  const gameData = useSelector((state) => state.gameData);

  useEffect(() => {
    if (!gameData.gameOver && cellsToUncover) {
      return;
    }

    function saveGame(stateData) {
      const endTime = getCurrentTime();
      const timeSpent = Math.round((endTime.getTime() - stateData.startTime.getTime()) / 1000);
      scoresArray.push({
        timeSpent,
        totalRows: stateData.totalRows,
        totalColumns: stateData.totalColumns,
        name: stateData.name,
        startTime: formatTime(stateData.startTime),
        endTime: formatTime(getCurrentTime()),
        level: stateData.level,
        totalMines: stateData.totalMines,
        status: stateData.gameOver ? 'lose' : 'win',
      });
      writeStorage('scoresArray', scoresArray.sort(compare));
    }

    dispatch(updateShowModal(true));
    saveGame({
      ...gameData,
      totalMines,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameData.gameOver, cellsToUncover]); // should trigger useEffect only for changes in these props

  return (
    <div className="row center-xs">
      <h3 className="col-xs-12">User: {gameData.name}</h3>
      <h3 className="col-xs-12">Remaining mines: {totalMines - minesFlagged}</h3>
    </div>
  );
};

export default MineBoard;
