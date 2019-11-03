import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';

import styles from './EventCalendarItem.module.scss';

const EventCalendarItem = ({ event }) => (
  <div className={styles.EventCalendarItem}>
    <span style={{ backgroundColor: event.label }} className={styles.EventCalendarItem__label} />
    <p className={styles.EventCalendarItem__note}>{event.note}</p>
  </div>
);

EventCalendarItem.propTypes = {
  event: PropTypes.object,
};

export default EventCalendarItem;
