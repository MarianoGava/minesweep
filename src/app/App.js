/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Layout from 'components/layout/Layout';
import ScoresPage from 'pages/scores/Scores';
import Setup from 'pages/setup/Setup';
import GameBoard from 'pages/board/Board';
import store from 'app/store';

import styles from './app.module.scss';

function App() {
  return (
    <div className={styles.app}>
      <Provider store={store}>
        <Router>
          <Layout>
            <Switch>
              <Route exact path="/">
                <Setup />
              </Route>
              <Route path="/board">
                <GameBoard />
              </Route>
              <Route path="/scores">
                <ScoresPage />
              </Route>
            </Switch>
          </Layout>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
