/* eslint-disable no-nested-ternary */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import chroma from 'chroma-js';
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';

import useReminderForm from '../../hooks/useReminderForm';
import EventReminderItem from '../EventReminderItem';
import ActionButton from '../../Atoms/ActionButton';
import { ReactComponent as Add } from '../../assets/img/add.svg';
import { ReactComponent as DeleteAll } from '../../assets/img/delete_all.svg';

import styles from './Reminders.module.scss';

const options = [
  { label: 'one', value: '#f3a683', color: '#f3a683' },
  { label: 'two', value: '#f7d794', color: '#f7d794' },
  { label: 'three', value: '#778beb', color: '#778beb' },
  { label: 'four', value: '#e77f67', color: '#e77f67' },
  { label: 'five', value: '#cf6a87', color: '#cf6a87' },
  { label: 'six', value: '#63cdda', color: '#63cdda' },
];

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
  // control: (base, state) => ({
  //   ...base,
  //   // background: '#023950',
  //   // match with the menu
  //   borderRadius: 5,
  //   // Overwrittes the different states of border
  //   // borderColor: state.isFocused ? 'yellow' : 'green',
  //   // Removes weird border around container
  //   // boxShadow: state.isFocused ? null : null,
  //   '&:focus': {
  //     // Overwrittes the different states of border
  //     border: 'none',
  //   },
  //   width: '10rem',
  //   height: '2rem',
  // }),
  // menu: (base) => ({
  //   ...base,
  //   // override border radius to match the box
  //   borderRadius: 0,
  //   // kill the gap
  //   marginTop: 0,
  //   // backgroundColor: 'red',
  // }),
  // menuList: (base) => ({
  //   ...base,
  //   // kill the white space on first and last option
  //   padding: 0,
  // }),
  // input: (styles) => ({ ...styles, ...dot() }),
  // placeholder: (styles) => ({ ...styles, ...dot() }),
  // singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
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
  input: (styles) => ({
    ...styles,
    // marginBottom: 15,
    // paddingTop: 15,
  }),
  placeholder: (styles) => ({
    ...styles,
    // marginBottom: 15,
    paddingBottom: 5,
  }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
  indicatorsContainer: (styles) => ({ ...styles, display: 'none' }),
  indicatorSeparator: (styles) => ({ ...styles, display: 'none' }),
};

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
      event: [event],
      name: key,
    };

    console.log('parsedEvent', parsedEvent);

    handleInputChange(parsedEvent);
  };

  const proccessTimePickerEvent = (event) => {
    console.log('event', event);
    // eslint-disable-next-line no-underscore-dangle
    const time = event ? event._d : new Date();

    // if (!event) time =

    console.log('time', time);

    const parsedEvent = {
      ...event,
      name: 'time',
      value: time,
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
              options={options}
              placeholder="select city"
              styles={customStyles}
              isSearchable
            />
            <Select
              value={inputs.label}
              onChange={(e) => proccessDropdownEvent(e, 'label')}
              options={options}
              placeholder="select label"
              styles={customStyles}
              isSearchable
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
