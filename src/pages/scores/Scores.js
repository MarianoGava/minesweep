import React from 'react';
import { useLocalStorage } from '@rehooks/local-storage';
import styles from './scores.module.scss';

const ScoresPage = () => {
  const [scoreList] = useLocalStorage('scoresArray', []);

  return (
    <div>
      <h1>Scores Board</h1>
      <table className={styles.table}>
        <thead className={styles.tableHeader}>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>GridSize</th>
            <th>Total Mines</th>
            <th>Duration (sec)</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          {scoreList.map((game, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <tr key={`tr-${i}`}>
              <td>{game.name}</td>
              <td>{game.status}</td>
              <td>{`${game.totalRows}x${game.totalColumns}`}</td>
              <td>{game.totalMines}</td>
              <td>{game.timeSpent}</td>
              <td>{game.startTime}</td>
              <td>{game.endTime}</td>
              <td>{game.level}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScoresPage;
