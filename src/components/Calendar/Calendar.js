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

  const getMonthYearLabel = (s) => `${s.month.toUpperCase()}  ${s.year}`;

  console.log('STATE', state);
  console.log('ACTIONS', actions);

  return (
    <div className={styles.calendar}>
      <div className={styles.header}>
        <div className={styles.header__date}>{getMonthYearLabel(state)}</div>
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
        {state.weeks.map((week) => week.map((day) => <CalendarDay day={day} />))}
      </div>
    </div>
  );
};

export default Calendar;

/*

   <table>
        <thead>
          <tr>
            <td
              colSpan={5}
              style={{
                textAlign: 'center',
              }}
            >
              <strong>
                {' '}
                {state.month}
                {' '}
-
                {state.year}
                {' '}
              </strong>
              {' '}
            </td>
            {' '}
            <td
              colSpan={2}
              style={{
                textAlign: 'right',
              }}
            >
              <button onClick={() => actions.getPrevMonth()}>{'<'}</button>
              <button onClick={() => actions.setDate(new Date())}> today </button>
              <button onClick={() => actions.getNextMonth()}>{'>'}</button>
              {' '}
            </td>
            {' '}
          </tr>
          {' '}
          <tr>
            {' '}
            {state.days.map((day) => (
              <th key={day}>
                {' '}
                {day}
                {' '}
              </th>
            ))}
            {' '}
          </tr>
          {' '}
        </thead>
        {' '}
        <tbody>
          {' '}
          {state.weeks.map((week, index) => (
            <tr key={index}>
              {' '}
              {week.map((day) => (
                <td
                  key={day.dayOfMonth}
                  style={{
                    textAlign: 'center',
                    backgroundColor: day.isToday ? '#ff0' : '#fff',
                  }}
                >
                  {' '}
                  {day.dayOfMonth}
                  {' '}
                </td>
              ))}
              {' '}
            </tr>
          ))}
          {' '}
        </tbody>
        {' '}
      </table>
      {' '}
*/
