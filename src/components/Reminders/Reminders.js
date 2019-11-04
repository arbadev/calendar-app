import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useReminderForm from '../../hooks/useReminderForm';

import styles from './Reminders.module.scss';

const Reminders = ({ events }) => {
  const { inputs, handleInputChange, setInitialState } = useReminderForm();
  const [showForm, setshowForm] = useState(false);

  useEffect(() => {
    console.log('inputs', inputs);
  }, [inputs]);

  const addNote = () => {
    setshowForm(true);
  };
  const discardNote = () => {
    console.log('Discard');
    setshowForm(false);
    setInitialState();
  };

  const submitNote = () => {
    console.log(`Note: ${inputs.note} City: ${inputs.city}`);
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    submitNote();
  };

  return (
    <div className={styles.Reminders}>
      <div className={styles.Reminders__actions}>
        <button type="button" onClick={addNote}>
          Add
        </button>
        <button type="button"> Delete All </button>
      </div>
      {showForm && (
        <form className={styles.Reminders__form} onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="note"
              onChange={handleInputChange}
              value={inputs.note}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="city"
              onChange={handleInputChange}
              value={inputs.city}
              required
            />
          </div>
          <div>
            <input
              type="text"
              name="label"
              onChange={handleInputChange}
              value={inputs.label}
              required
            />
          </div>
          <button type="submit">Add</button>
          <button type="button" onClick={discardNote}>
            Discard
          </button>
        </form>
      )}
      <ul className={styles.Reminders__list}>
        {events.map((e) => (
          <li>{`${e.label} --- ${e.note}`}</li>
        ))}
      </ul>
    </div>
  );
};

Reminders.propTypes = {
  events: PropTypes.array,
};

export default Reminders;
