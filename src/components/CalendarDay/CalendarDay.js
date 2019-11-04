/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Modal from 'react-modal';

import ActionButton from '../../Atoms/ActionButton';
import { ReactComponent as Today } from '../../assets/img/today.svg';

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
    background: 'rgba(50, 50, 50, 0.5)',
  },
};

Modal.setAppElement('body');

const CalendarDay = ({ day }) => {
  const {
    dayOfMonth, isToday, isSameMonth, isWeekend,
  } = day;

  const [open, setOpen] = useState(false);
  // useEffect(() => {
  // });

  useEffect(() => {
    console.log(open);
  }, [open]);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    console.log('HEETRETET');

    setOpen(false);
  };

  const events = [
    {
      id: 2,
      startDate: '2019-11-03T04:20:07.520Z',
      endDate: '2019-11-03T04:20:07.520Z',
      note: 'string string string string string string string',
      label: '#ca3e47',
      isMultiDayEvent: false,
    },
    {
      id: 3,
      startDate: '2019-11-03T07:20:07.520Z',
      endDate: '2019-11-03T07:20:07.520Z',
      note: 'string string string string',
      label: '#ca3e47',
      isMultiDayEvent: false,
    },
    {
      id: 4,
      startDate: '2019-11-03T07:20:07.520Z',
      endDate: '2019-11-03T07:20:07.520Z',
      note: 'string string string string',
      label: '#ca3e47',
      isMultiDayEvent: false,
    },
    {
      id: 5,
      startDate: '2019-11-03T07:20:07.520Z',
      endDate: '2019-11-03T07:20:07.520Z',
      note: 'string string string string',
      label: '#ca3e47',
      isMultiDayEvent: false,
    },
  ];

  const boxClass = classNames(styles.calendarDay, { [styles.calendarDayWeekend]: isWeekend });
  const dayClass = classNames(
    styles.calendarDay__day,
    { [styles.calendarDay__dayToday]: isToday },
    { [styles.calendarDay__dayAnotherMonth]: !isSameMonth },
  );

  return (
    <div className={boxClass}>
      <div className={styles.calendarDay__dayContent}>
        <ActionButton onClick={openModal}>
          <Today />
        </ActionButton>
        <p className={dayClass}>{dayOfMonth}</p>
      </div>
      <div className={styles.calendarDay__events}>
        {events.map((e, i) => {
          if (i < RENDER_ROWS) {
            return <EventItem event={e} key={e.id} />;
          }
          return <></>;
        })}
        <p className={styles.calendarDay__extras}>
          {events.length - 2}
          {' '}
more ...
        </p>
      </div>

      <Modal isOpen={open} onRequestClose={closeModal} style={BASE_MODAL_STYLES}>
        <Reminders events={events} />
      </Modal>
    </div>
  );
};

CalendarDay.propTypes = {
  day: PropTypes.object,
};

export default CalendarDay;
