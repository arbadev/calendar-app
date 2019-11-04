import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Dropdown from 'react-dropdown';

import useReminderForm from '../../hooks/useReminderForm';
import EventReminderItem from '../EventReminderItem';
import ActionButton from '../../Atoms/ActionButton';
import { ReactComponent as Add } from '../../assets/img/add.svg';
import { ReactComponent as DeleteAll } from '../../assets/img/delete_all.svg';

import styles from './Reminders.module.scss';
import 'react-dropdown/style.css';

const options = [
  { value: 'one', label: 'One', name: 'city' },
  { value: 'two', label: 'Two', className: 'myOptionClassName' },
  { value: 'three', label: 'Three', className: 'myOptionClassName' },
];

const defaultOption = options[0];

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

  const proccessDropdownEvent = (event, key) => {
    const parsedEvent = {
      ...event,
      name: key,
    };
    handleInputChange(parsedEvent);
  };

  return (
    <div className={styles.Reminders}>
      <div className={styles.Reminders__actions}>
        <ActionButton onClick={addNote}>
          <Add />
        </ActionButton>
        <ActionButton>
          <DeleteAll />
        </ActionButton>
      </div>
      {showForm && (
        <form className={styles.Reminders__form} onSubmit={handleSubmit}>
          <input
            className={styles.Reminders__form___note}
            type="text"
            name="note"
            placeholder="Write your reminder here..."
            onChange={handleInputChange}
            value={inputs.note}
            required
          />
          <div className={styles.Reminders__form___items}>
            <Dropdown
              className={styles.dropdown}
              menuClassName={styles.dropdown__menu}
              placeholderClassName={styles.dropdown__placeholder}
              controlClassName={styles.dropdown__control}
              options={options}
              onChange={(e) => proccessDropdownEvent(e, 'city')}
              value={inputs.city}
              placeholder="select city"
            />
            <Dropdown
              className={styles.dropdown}
              menuClassName={styles.dropdown__menu}
              placeholderClassName={styles.dropdown__placeholder}
              controlClassName={styles.dropdown__control}
              options={options}
              onChange={(e) => proccessDropdownEvent(e, 'label')}
              value={inputs.label}
              placeholder="select label"
            />
            <Dropdown
              className={styles.dropdown}
              menuClassName={styles.dropdown__menu}
              placeholderClassName={styles.dropdown__placeholder}
              controlClassName={styles.dropdown__control}
              options={options}
              name="time"
              onChange={(e) => proccessDropdownEvent(e, 'time')}
              value={inputs.time}
              placeholder="Select time"
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
          <EventReminderItem event={e} key={e.id} />
        ))}
      </ul>
    </div>
  );
};

Reminders.propTypes = {
  events: PropTypes.array,
};

export default Reminders;
