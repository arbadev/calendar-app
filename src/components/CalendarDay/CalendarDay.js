import React from 'react';
import PropTypes from 'prop-types';

import styles from './CalendarDay.module.scss';

const CalendarDay = ({ day }) => (
  <div className={styles.calendarDay}>{`Day ${day.dayOfMonth}`}</div>
);

CalendarDay.propTypes = {
  day: PropTypes.object,
};

export default CalendarDay;
