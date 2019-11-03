import React from 'react';
import PropTypes from 'prop-types';

import EventItem from '../EventCalendarItem';

import styles from './CalendarDay.module.scss';

const CalendarDay = ({ day }) => {
  const { dayOfMonth } = day;
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
  ];
  return (
    <div className={styles.calendarDay}>
      <p className={styles.calendarDay__day}>{dayOfMonth}</p>
      <div className={styles.calendarDay__events}>
        {events.map((e) => (
          <EventItem event={e} key={e.id} />
        ))}
      </div>
    </div>
  );
};

CalendarDay.propTypes = {
  day: PropTypes.object,
};

export default CalendarDay;
