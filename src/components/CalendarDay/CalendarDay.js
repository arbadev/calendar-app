import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import EventItem from '../EventCalendarItem';

import styles from './CalendarDay.module.scss';

const RENDER_ROWS = 2;

const CalendarDay = ({ day }) => {
  const {
    dayOfMonth, isToday, isSameMonth, isWeekend,
  } = day;
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
    </div>
  );
};

CalendarDay.propTypes = {
  day: PropTypes.object,
};

export default CalendarDay;
