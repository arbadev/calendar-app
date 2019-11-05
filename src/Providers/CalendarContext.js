/* eslint-disable react/prop-types */
import React, { useEffect, useReducer, createContext } from 'react';
import useCalendar from 'react-use-calendar';
import moment from 'moment';
// import TokenGenerator from 'uuid-token-generator';

// const tokgen = new TokenGenerator();

const CalendarContext = createContext();

const CalendarProvider = ({ children }) => {
  const [calendarState, calendarActions] = useCalendar(null, {});
  // const [events, setEvents] = useState({});

  const reducer = (events, action) => {
    switch (action.type) {
      case 'add': {
        console.log('add from reducer', action.payload);
        const { dayKey, ...reminder } = action.payload;
        const getReminderValue = (array, r) => {
          // eslint-disable-next-line no-underscore-dangle
          const index = array.findIndex((e) => e.__id === r.__id);
          if (index > -1) {
            // eslint-disable-next-line no-param-reassign
            array[index] = r;
            return array;
          }
          return array.push(r);
        };

        const value = events[dayKey] && Array.isArray(events[dayKey])
          ? getReminderValue(events[dayKey], reminder)
          : [reminder];

        return {
          ...events,
          [dayKey]: value,
        };
      }
      case 'remove': {
        console.log('remove from reducer', action.payload);
        const { dayKey, ...reminder } = action.payload;
        const value = events[dayKey] && Array.isArray(events[dayKey])
          ? // eslint-disable-next-line no-underscore-dangle
          events[dayKey].filter((e) => e.__id !== reminder.__id)
          : [];
        return {
          ...events,
          [dayKey]: value,
        };
      }
      case 'set_state': {
        return action.payload;
      }
      default:
        throw new Error('No match');
    }
  };

  const [events, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    const data = localStorage.getItem('events');
    if (data) {
      console.log('if data', data);

      dispatch({ type: 'set_state', payload: JSON.parse(data) });
    }
  }, []);

  useEffect(() => {
    console.log('Events cambio', events);

    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    console.log('calendarState', calendarState);
  }, [calendarState]);

  const addReminder = (reminder) => {
    console.log('addReminder', reminder);
    const { startDate } = reminder;
    const dayKey = moment(startDate).format('L');

    dispatch({ type: 'add', payload: { ...reminder, dayKey } });
    console.log('day key', dayKey);
  };

  const deleteReminder = (reminder) => {
    console.log('deleteReminder', reminder);
    const { startDate } = reminder;
    const dayKey = moment(startDate).format('L');

    dispatch({ type: 'remove', payload: { ...reminder, dayKey } });
  };

  const calendarWithEvents = calendarState.weeks.map((week) => week.map((day) => {
    const dayKey = moment(day.date).format('L');
    return {
      ...day,
      events: events[dayKey] && Array.isArray(events[dayKey]) ? events[dayKey] : [],
    };
  }));

  console.table('calendarWithEvents', calendarWithEvents);

  return (
    <CalendarContext.Provider
      value={{
        calendarState,
        calendarActions,
        addReminder,
        deleteReminder,
        calendarWithEvents,
      }}
    >
      {children}
    </CalendarContext.Provider>
  );
};

export { CalendarContext, CalendarProvider };
