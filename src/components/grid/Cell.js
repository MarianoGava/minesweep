import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { GiLandMine } from 'react-icons/gi';
import cx from 'classnames';
import styles from './cell.module.scss';

const Cell = ({ indexI, indexJ, handleRightClick, handleClick }) => {
  const cell = useSelector((state) => state.gridData.grid[indexI][indexJ]);

  const cellContent = cell.wasClicked
    ? cell.number > 0 && cell.number
    : cell.hasFlag && <GiLandMine />;

  return (
    <button
      className={cx(styles.cell, { [styles.cellClicked]: cell.wasClicked })}
      type="button"
      onClick={(e) => handleClick(e, cell)}
      onContextMenu={(e) => handleRightClick(e, cell)}
    >
      {cellContent}
    </button>
  );
};

Cell.propTypes = {
  indexI: PropTypes.number.isRequired,
  indexJ: PropTypes.number.isRequired,
  handleRightClick: PropTypes.func.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Cell;
