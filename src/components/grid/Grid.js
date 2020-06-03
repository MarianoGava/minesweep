/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useLocalStorage } from '@rehooks/local-storage';
import { useDispatch, useSelector } from 'react-redux';
import Cell from 'components/grid/Cell';
import isEmpty from 'lodash/isEmpty';
import { createGridWithBombs, countAdjacentBombs, getAdjacentCells } from 'utils/gridUtils';
import {
  setCell,
  setNewGrid,
  openAdjacent,
  decrementCellToUncover,
  updateFlag,
} from 'components/grid/sliceGrid';
import { setGame, setGameOver } from 'components/mineBoard/sliceBoard';
import { getCurrentTime } from 'utils/dateUtils';
import styles from './grid.module.scss';

const Grid = () => {
  const minesFlagged = useSelector((state) => state.gridData.minesFlagged);
  const dispatch = useDispatch();
  const [grid, setGrid] = useState([[]]);
  const [gameConfig] = useLocalStorage('gameConfig', {
    rows: 10,
    columns: 10,
    totalMines: 10,
    name: 'guest',
    difficulty: '-',
  });

  const { rows, columns, totalMines } = gameConfig;

  useEffect(() => {
    // After the component is rendered it will create the a grid and save it to the Redux store
    const gridCreated = createGridWithBombs(totalMines, rows, columns);
    dispatch(
      setNewGrid({
        grid: gridCreated,
        ...gameConfig,
      })
    );
    dispatch(
      setGame({
        ...gameConfig,
        startTime: getCurrentTime(),
      })
    );
    // It is using state to render the grid, so in this way it don't re-renders in each cell click
    setGrid(gridCreated);
  }, []);

  const handleClick = (e, cell) => {
    e.preventDefault();

    if (cell.wasClicked || cell.hasFlag) {
      return;
    }

    if (cell.hasBomb) {
      dispatch(setGameOver());
      return;
    }

    const count = countAdjacentBombs(grid, cell.indexI, cell.indexJ, rows, columns);

    if (count === 0) {
      const adjacents = getAdjacentCells(grid, cell.indexI, cell.indexJ, rows, columns);
      adjacents.map((adjacent) => dispatch(openAdjacent({ ...adjacent })));
    } else {
      dispatch(decrementCellToUncover());
    }

    dispatch(
      setCell({
        ...cell,
        wasClicked: true,
        number: count,
      })
    );
  };

  const handleRightClick = (e, cell) => {
    e.preventDefault();

    if (
      e.type === 'contextmenu' &&
      !cell.wasClicked &&
      (totalMines - minesFlagged > 0 || cell.hasFlag)
    ) {
      dispatch(
        updateFlag({
          ...cell,
          hasFlag: !cell.hasFlag,
        })
      );
    }
  };

  return (
    <div>
      <div className="row center-xs">
        <div className={styles.gridContainer}>
          {!isEmpty(grid[0]) &&
            grid.map((row, i) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <div key={`row-${i}`} className={styles.row}>
                  {row.map((cell) => (
                    <Cell
                      key={`${cell.indexI}${cell.indexJj}`}
                      indexI={cell.indexI}
                      indexJ={cell.indexJ}
                      handleRightClick={handleRightClick}
                      handleClick={handleClick}
                    />
                  ))}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Grid;
