import React from 'react';
import PropTypes from 'prop-types';
import styles from './modal.module.scss';

const Modal = ({ show, handleClick, won }) => {
  const title = won ? 'Congratulations!' : 'You need to keep practicing';
  const message = won ? 'You win' : 'You lose';

  return (
    show && (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h3 className={styles.title}>{title}</h3>
          <h3>{message}</h3>
          <button
            type="submit"
            className={`btn btn-primary btn-large ${styles.button}`}
            onClick={handleClick}
          >
            check your score
          </button>
        </div>
      </div>
    )
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  won: PropTypes.bool,
};

Modal.defaultProps = {
  won: false,
};

export default Modal;
