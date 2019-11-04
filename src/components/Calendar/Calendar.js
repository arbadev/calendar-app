import React, { useEffect } from 'react';
import useCalendar from 'react-use-calendar';
import { ReactComponent as RightChevron } from '../../assets/img/keyboard_arrow_right.svg';
import { ReactComponent as LeftChevron } from '../../assets/img/keyboard_arrow_left.svg';
import { ReactComponent as Today } from '../../assets/img/today.svg';
import CalendarDay from '../CalendarDay';

import styles from './Calendar.module.scss';

const Calendar = (props) => {
  const [state, actions] = useCalendar(null, {
    events: [
      {
        startDate: new Date(2019, 1, 27),
        endDate: new Date(2019, 1, 27),
        note: 'Meeting with clients',
      },
      {
        startDate: new Date(2019, 1, 22),
        endDate: new Date(2019, 1, 25),
        note: 'Vacation',
      },
    ],
  });

  const getMonthYearLabel = (s) => (
    <div>
      <h1 className={styles.header__date}>
        <span>{s.month}</span>
        {' '}
        {s.year}
      </h1>
    </div>
  );

  console.log('STATE', state);
  console.log('ACTIONS', actions);

  useEffect(() => {
    actions.addEvent({
      startDate: new Date(),
      endDate: new Date(),
      note: 'string string string string',
      label: '#ca3e47',
    });
  }, []);

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <>{getMonthYearLabel(state)}</>
        <div className={styles.header__actions}>
          <button
            type="button"
            className={styles.actionButton}
            onClick={() => actions.getPrevMonth()}
          >
            <LeftChevron />
          </button>
          <button
            type="button"
            className={styles.actionButton}
            onClick={() => actions.setDate(new Date())}
          >
            <Today />
          </button>
          <button
            type="button"
            className={styles.actionButton}
            onClick={() => actions.getNextMonth()}
          >
            <RightChevron />
          </button>
        </div>
      </div>
      <div className={styles.week}>
        {state.days.map((day) => (
          <div className={styles.week__day} key={day}>
            {day}
          </div>
        ))}
      </div>
      <div className={styles.days}>
        {state.weeks.map((week) => week.map((day) => <CalendarDay day={day} key={day.dayOfYear} />))}
      </div>
    </div>
  );
};

export default Calendar;
