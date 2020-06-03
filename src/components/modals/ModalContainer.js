import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateShowModal } from 'components/mineBoard/sliceBoard';
import Modal from 'components/modals/ModalComponent';

const ModalContainer = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const gameOver = useSelector((state) => state.gameData.gameOver);
  const showModal = useSelector((state) => state.gameData.showModal);

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(updateShowModal(false));
    history.push('/scores');
  };

  return <Modal show={showModal} handleClick={handleClick} won={!gameOver} />;
};

export default ModalContainer;
