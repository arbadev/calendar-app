/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Modal from 'react-modal';

import ActionButton from '../../atoms/ActionButton';
import { ReactComponent as Add } from '../../assets/img/add.svg';

import EventItem from '../EventCalendarItem';
import Reminders from '../Reminders';

import styles from './CalendarDay.module.scss';

const RENDER_ROWS = 2;

const BASE_MODAL_STYLES = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    padding: '0',
    display: 'flex',
    flexFlow: 'column wrap',
    border: 'none',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  overlay: {
    zIndex: 10,
    background: 'rgba(15, 15, 15, 0.75)',
  },
};

Modal.setAppElement('body');

const CalendarDay = ({ day }) => {
  const {
    dayOfMonth, isToday, isSameMonth, isWeekend,
  } = day;

  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const boxClass = classNames(styles.calendarDay, { [styles.calendarDayWeekend]: isWeekend });
  const dayClass = classNames(
    styles.calendarDay__day,
    { [styles.calendarDay__dayToday]: isToday },
    { [styles.calendarDay__dayAnotherMonth]: !isSameMonth },
  );

  return (
    <div className={boxClass}>
      <div className={styles.calendarDay__dayContent}>
        <ActionButton className={styles.calendarDay__action} onClick={openModal}>
          <Add />
        </ActionButton>
        <p className={dayClass}>{dayOfMonth}</p>
      </div>
      <div className={styles.calendarDay__events}>
        {day.events.map((e, i) => {
          if (i < RENDER_ROWS) {
            // eslint-disable-next-line no-underscore-dangle
            return <EventItem event={e} key={e.__id || e.id} />;
          }
          return '';
        })}
        {day.events.length > 2 ? (
          <p className={styles.calendarDay__extras}>
            {day.events.length - 2}
            {' '}
more ...
          </p>
        ) : (
          <div />
        )}
      </div>

      <Modal isOpen={open} onRequestClose={closeModal} style={BASE_MODAL_STYLES}>
        <Reminders day={day} />
      </Modal>
    </div>
  );
};

CalendarDay.propTypes = {
  day: PropTypes.object,
};

export default CalendarDay;
