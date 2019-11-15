import React, { useState, useEffect, Suspense } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { forecastResource } from '../../api/forecastApi';
import NoteLabel from '../../atoms/NoteLabel';
import ActionButton from '../../atoms/ActionButton';
import ForecastItem from '../../atoms/ForecastItem';
import { ReactComponent as Edit } from '../../assets/img/edit.svg';
import { ReactComponent as Delete } from '../../assets/img/delete.svg';

import styles from './EventReminderItem.module.scss';

const EventReminderItem = ({ event, onEdit, onDelete }) => {
  const [isHovering, setIsHovering] = useState(false);
  let fr;
  useEffect(() => {
    console.log('eeey', event);

    fr = forecastResource();
  }, [event]);

  useEffect(() => {
    console.log('corri una vez', event);
  }, []);

  return (
    <li
      className={styles.eventReminderItem}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className={styles.eventReminderItem__noteWrapper}>
        <NoteLabel
          color={event.label.color}
          styles={{ height: '1rem', width: '1rem', marginTop: '0.3rem' }}
        />
        <p>{event.note}</p>
      </div>
      <div className={styles.eventReminderItem__infoWrapper}>
        <p className={styles.eventReminderItem__note}>
          {moment(event.startDate).calendar()}
        </p>
        <p className={styles.eventReminderItem__note}>
          {event && event.city ? event.city.value.name : '*'}
        </p>

        <Suspense
          fallback={
            <p className={styles.eventReminderItem__note}>fetching...</p>
          }
        >
          <ForecastItem forecastResource={fr} />
          {/* <NoteLabel color={event.label.color} styles={{ height: '1rem', width: '1rem' }} /> */}
        </Suspense>
      </div>

      <div className={styles.eventReminderItem__actions}>
        {isHovering && (
          <ActionButton onClick={() => onEdit(event)}>
            <Edit />
          </ActionButton>
        )}

        {isHovering && (
          <ActionButton onClick={() => onDelete(event)}>
            <Delete />
          </ActionButton>
        )}
      </div>
    </li>
  );
};

EventReminderItem.propTypes = {
  event: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func
};

export default EventReminderItem;
