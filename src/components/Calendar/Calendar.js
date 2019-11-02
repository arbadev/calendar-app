import React, { useEffect } from 'react';
import useCalendar from 'react-use-calendar';
import styles from './Calendar.module.scss';

const Calendar = props => {
  const [state, actions] = useCalendar(null, {
    events: [
      {
        startDate: new Date(2019, 1, 27),
        endDate: new Date(2019, 1, 27),
        note: 'Meeting with clients'
      },
      {
        startDate: new Date(2019, 1, 22),
        endDate: new Date(2019, 1, 25),
        note: 'Vacation'
      }
    ]
  });

  console.log('STATE', state);
  console.log('ACTIONS', actions);

  return (
    <>
      <table>
        <thead>
          <tr>
            <td
              colSpan={5}
              style={{
                textAlign: 'center'
              }}
            >
              <strong>
                {' '}
                {state.month} - {state.year}{' '}
              </strong>{' '}
            </td>{' '}
            <td
              colSpan={2}
              style={{
                textAlign: 'right'
              }}
            >
              <button onClick={() => actions.getPrevMonth()}> {'<'} </button>{' '}
              <button onClick={() => actions.getNextMonth()}> {'>'} </button>{' '}
            </td>{' '}
          </tr>{' '}
          <tr>
            {' '}
            {state.days.map(day => (
              <th key={day}> {day} </th>
            ))}{' '}
          </tr>{' '}
        </thead>{' '}
        <tbody>
          {' '}
          {state.weeks.map((week, index) => (
            <tr key={index}>
              {' '}
              {week.map(day => (
                <td
                  key={day.dayOfMonth}
                  style={{
                    textAlign: 'center',
                    backgroundColor: day.isToday ? '#ff0' : '#fff'
                  }}
                >
                  {' '}
                  {day.dayOfMonth}{' '}
                </td>
              ))}{' '}
            </tr>
          ))}{' '}
        </tbody>{' '}
      </table>{' '}
    </>
  );
};

export default Calendar;
