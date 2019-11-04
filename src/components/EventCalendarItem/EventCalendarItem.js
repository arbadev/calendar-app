import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';
import NoteLabel from '../../Atoms/NoteLabel';
import styles from './EventCalendarItem.module.scss';

const EventCalendarItem = ({ event }) => (
  <div className={styles.EventCalendarItem}>
    <NoteLabel color={event.label.color} styles={{ margin: '0 0 -0.3rem 0.75rem' }} />
    <p className={styles.EventCalendarItem__note}>{event.note}</p>
  </div>
);

EventCalendarItem.propTypes = {
  event: PropTypes.object,
};

export default EventCalendarItem;
