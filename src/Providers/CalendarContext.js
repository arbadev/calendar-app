/* eslint-disable react/prop-types */
import React, { createContext } from 'react';
import useCalendar from 'react-use-calendar';

const CalendarContext = createContext();

const CalendarProvider = ({ children }) => {
  const [calendarState, calendarActions] = useCalendar(null, {
    events: [
      {
        startDate: new Date(),
        endDate: new Date(),
        note: 'Meeting with clients',
      },
      {
        startDate: new Date(),
        endDate: new Date(),
        note: 'Vacation',
      },
    ],
  });
  return (
    <CalendarContext.Provider value={[calendarState, calendarActions]}>
      {children}
    </CalendarContext.Provider>
  );
};

export { CalendarContext, CalendarProvider };
