import React from 'react';
import Grid from 'components/grid/Grid';
import MineBoard from 'components/mineBoard/MineBoard';

const GameBoard = () => {
  return (
    <section>
      <MineBoard />
      <Grid />
    </section>
  );
};

export default GameBoard;
