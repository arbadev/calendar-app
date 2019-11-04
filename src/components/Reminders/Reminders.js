/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import chroma from 'chroma-js';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

import { CalendarContext } from '../../Providers/CalendarContext';
import useReminderForm from '../../hooks/useReminderForm';
import EventReminderItem from '../EventReminderItem';
import ActionButton from '../../Atoms/ActionButton';
import { ReactComponent as Add } from '../../assets/img/add.svg';
import { ReactComponent as DeleteAll } from '../../assets/img/delete_all.svg';
import cities from '../../assets/cities.json';

import styles from './Reminders.module.scss';

const colorOptions = [
  { label: 'Orange', value: '#f3a683', color: '#f3a683' },
  { label: 'Yellow', value: '#f7d794', color: '#f7d794' },
  { label: 'Blue', value: '#778beb', color: '#778beb' },
  { label: 'Orangered', value: '#e77f67', color: '#e77f67' },
  { label: 'Red', value: '#cf6a87', color: '#cf6a87' },
  { label: 'Cyan', value: '#63cdda', color: '#63cdda' },
];

const computedCitiesOptions = cities.map((c) => ({ value: c, label: c.name, color: '#313131' }));

const dot = (color = '#ccc') => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const customStyles = {
  control: (styles) => ({
    ...styles,
    backgroundColor: 'white',
    width: '12rem',
    height: 28,
    minHeight: 28,
  }),
  option: (styles, {
    data, isDisabled, isFocused, isSelected,
  }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? null
        : isSelected
          ? data.color
          : isFocused
            ? color.alpha(0.1).css()
            : null,
      color: isDisabled
        ? '#ccc'
        : isSelected
          ? chroma.contrast(color, 'white') > 2
            ? 'white'
            : 'black'
          : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled && (isSelected ? data.color : color.alpha(0.3).css()),
      },
    };
  },
  placeholder: (styles) => ({
    ...styles,
    paddingBottom: 5,
  }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  indicatorsContainer: (styles) => ({ ...styles, display: 'none' }),
  indicatorSeparator: (styles) => ({ ...styles, display: 'none' }),
};

const Reminders = ({ day }) => {
  const [, calendarActions] = useContext(CalendarContext);
  const { inputs, handleInputChange, setInitialState } = useReminderForm();
  const [showForm, setshowForm] = useState(false);

  useEffect(() => {
    // console.log('inputs', inputs);
  }, [inputs]);

  const addReminder = () => {
    setshowForm(true);
  };
  const discardReminder = () => {
    console.log('Discard');
    setshowForm(false);
    setInitialState();
  };

  const submitReminder = () => {
    const {
      time, note, city, label,
    } = inputs;

    const reminder = {
      startDate: moment(time).toDate(),
      endDate: moment(time)
        .add(1, 'hours')
        .toDate(),
      note,
      city,
      label,
    };

    console.log('reminder:', reminder);

    calendarActions.addEvent(reminder);
  };

  const handleSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }
    submitReminder();
  };

  const proccessDropdownEvent = (event, key) => {
    const parsedEvent = {
      event: [event],
      name: key,
    };

    handleInputChange(parsedEvent);
  };

  const proccessTimePickerEvent = (event) => {
    // eslint-disable-next-line no-underscore-dangle
    const time = event ? event._d : new Date();
    const date = moment(
      `${moment(day.date).format('YYYY-MM-DD')} ${moment(time).format('LTS')}`,
    ).format();
    const parsedEvent = {
      ...event,
      name: 'time',
      value: date,
    };

    handleInputChange(parsedEvent);
  };

  return (
    <div className={styles.Reminders}>
      <div className={styles.Reminders__actions}>
        <ActionButton onClick={addReminder}>
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
            placeholder="Write a reminder..."
            onChange={handleInputChange}
            value={inputs.note}
            required
            maxLength="30"
          />
          <div className={styles.Reminders__form___items}>
            <TimePicker
              // clearIcon={null}
              name="time"
              onChange={proccessTimePickerEvent}
              placeholder="select time"
              // value={inputs.time}
            />
            <Select
              value={inputs.city}
              onChange={(e) => proccessDropdownEvent(e, 'city')}
              options={computedCitiesOptions}
              placeholder="select city"
              styles={customStyles}
              isSearchable
            />
            <Select
              value={inputs.label}
              onChange={(e) => proccessDropdownEvent(e, 'label')}
              options={colorOptions}
              placeholder="select label"
              styles={customStyles}
              isSearchable
            />
          </div>
          <div className={styles.Reminders__form__actions}>
            <button type="submit" className={styles.Reminders__action}>
              Post
            </button>
            <button type="button" className={styles.Reminders__action} onClick={discardReminder}>
              Discard
            </button>
          </div>
        </form>
      )}
      <ul className={styles.Reminders__list}>
        {day.events.map((e) => (
          <EventReminderItem event={e} key={e.id} />
        ))}
      </ul>
    </div>
  );
};

Reminders.propTypes = {
  day: PropTypes.object,
};

export default Reminders;
