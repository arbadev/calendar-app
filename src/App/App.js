import React from 'react';

import { CalendarProvider } from '../Providers/CalendarContext';
import Calendar from '../components/Calendar';

import './App.scss';

function App() {
  return (
    <div className="App" id="app">
      <CalendarProvider>
        <Calendar />
      </CalendarProvider>
    </div>
  );
}

export default App;
