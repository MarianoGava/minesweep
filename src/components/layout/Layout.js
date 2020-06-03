import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ModalContainer from 'components/modals/ModalContainer';
import cx from 'classnames';
import { FaBomb } from 'react-icons/fa';
import styles from './Layout.module.scss';

function Layout({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.navContainer}>
        <nav className={styles.nav}>
          <ul>
            <li>
              <span className={styles.logo}>
                <FaBomb />
                Minesweep
              </span>
            </li>
            <li>
              <Link className={cx(styles.link, styles.link1)} to="/">
                Setup
              </Link>
            </li>
            <li>
              <Link className={cx(styles.link, styles.link2)} to="/board">
                Board
              </Link>
            </li>
            <li>
              <Link className={cx(styles.link, styles.link3)} to="/scores">
                Scores
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles.contentWrapper}>{children}</div>
      <ModalContainer />
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Layout;
