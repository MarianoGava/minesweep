import React, { useState } from 'react';
import { writeStorage } from '@rehooks/local-storage';
import { useHistory } from 'react-router-dom';
import { useForm, ErrorMessage } from 'react-hook-form';
import styles from './form.module.scss';

const Form = () => {
  const history = useHistory();
  const [formRows, setFormRows] = useState(10);
  const [formColumns, setFormColumns] = useState(10);
  const [minesNumber, setMinesNumber] = useState(10);
  const [selectOption, setSelectOption] = useState('-');
  const { register, handleSubmit, errors, clearError } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  const onSubmit = (values) => {
    writeStorage('gameConfig', { ...values });
    history.push('/board');
  };

  const onSelect = (event) => {
    setSelectOption(event.target.value);
    clearError();
    switch (event.target.value) {
      case 'easy':
        setFormRows(7);
        setFormColumns(7);
        setMinesNumber(10);
        break;
      case 'medium':
        setFormRows(12);
        setFormColumns(12);
        setMinesNumber(25);
        break;
      case 'hard':
        setFormRows(20);
        setFormColumns(20);
        setMinesNumber(80);
        break;
      default:
        break;
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <p>Hi, please complete the fileds below with your preferences:</p>

      <div className="row">
        <div className={`col-xs-12 col-md-6 ${styles.row}`}>
          <label htmlFor="name" className={styles.label}>
            Enter your name:
          </label>
          <input
            defaultValue=""
            name="name"
            type="text"
            ref={register({
              required: 'A name is required',
              maxLength: {
                value: 50,
                message: 'The name can only contain 50 characters',
              },
            })}
          />
          <ErrorMessage errors={errors} name="name">
            {({ message }) => <span className={styles.error}>{message}</span>}
          </ErrorMessage>
        </div>

        <div className={`col-xs-12 col-md-6 ${styles.row}`}>
          <label htmlFor="rows" className={styles.label}>
            Rows ( 3 - 50 ):
          </label>

          <input
            disabled={selectOption !== '-'}
            value={formRows}
            onChange={(e) => setFormRows(e.target.value)}
            name="rows"
            type="number"
            ref={register({
              required: 'A number of rows is required',
              min: {
                value: 3,
                message: 'Minimun allowed value is 3',
              },
              max: {
                value: 50,
                message: 'Maximun allowed is 50',
              },
            })}
          />
          <ErrorMessage errors={errors} name="rows">
            {({ message }) => <span className={styles.error}>{message}</span>}
          </ErrorMessage>
        </div>
      </div>

      <div className="row">
        <div className={`col-xs-12 col-md-6 ${styles.row}`}>
          <label htmlFor="columns" className={styles.label}>
            Columns ( 3 - 50 ):
          </label>
          <input
            disabled={selectOption !== '-'}
            value={formColumns}
            onChange={(e) => setFormColumns(e.target.value)}
            name="columns"
            type="number"
            ref={register({
              required: 'A number of columns is required',
              min: {
                value: 3,
                message: 'Minimun allowed value is 3',
              },
              max: {
                value: 50,
                message: 'Maximun allowed is 50',
              },
            })}
          />
          <ErrorMessage errors={errors} name="columns">
            {({ message }) => <span className={styles.error}>{message}</span>}
          </ErrorMessage>
        </div>

        <div className={`col-xs-12 col-md-6 ${styles.row}`}>
          <label htmlFor="totalMines" className={styles.label}>
            Number of mines:
          </label>
          <input
            disabled={selectOption !== '-'}
            value={minesNumber}
            onChange={(e) => setMinesNumber(e.target.value)}
            name="totalMines"
            type="number"
            ref={register({
              required: 'A number of mines is required',
              min: {
                value: 1,
                message: 'Minimun of one mine is required',
              },
              max: {
                value: formRows * formColumns - 1,
                message: `Maximun allowed for mines is ${formRows * formColumns - 1}`,
              },
            })}
          />
          <ErrorMessage errors={errors} name="totalMines">
            {({ message }) => <span className={styles.error}>{message}</span>}
          </ErrorMessage>
        </div>
      </div>

      <div className="row">
        <div className={`col-xs-12 col-md-6 ${styles.row}`}>
          <label htmlFor="level" className={styles.label}>
            Or, you can select a predefined level:{' '}
          </label>
          <select
            className={styles.select}
            value={selectOption}
            name="level"
            onChange={onSelect}
            ref={register}
          >
            <option value="-">-</option>
            <option value="easy">easy</option>
            <option value="medium">medium</option>
            <option value="hard">hard</option>
          </select>
        </div>
      </div>

      <div className={`row center-xs ${styles.submitBtn}`}>
        <button type="submit" className="btn btn-primary btn-large">
          Play
        </button>
      </div>
    </form>
  );
};

export default Form;
