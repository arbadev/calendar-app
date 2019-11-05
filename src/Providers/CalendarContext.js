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
      dispatch({ type: 'set_state', payload: JSON.parse(data) });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addReminder = (reminder) => {
    const { startDate } = reminder;
    const dayKey = moment(startDate).format('L');

    dispatch({ type: 'add', payload: { ...reminder, dayKey } });
  };

  const deleteReminder = (reminder) => {
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
