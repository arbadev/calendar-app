import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import ActionButton from '../../atoms/ActionButton';
import { ReactComponent as Edit } from '../../assets/img/edit.svg';
import { ReactComponent as Delete } from '../../assets/img/delete.svg';
import NoteLabel from '../../atoms/NoteLabel';
import styles from './EventReminderItem.module.scss';

const EventReminderItem = ({ event, onEdit, onDelete }) => {
  const [isHovering, setIsHovering] = useState(false);

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
        <p className={styles.eventReminderItem__note}>{moment(event.startDate).calendar()}</p>
        <p className={styles.eventReminderItem__note}>
          {event.city ? event.city.value.name : 'No city'}
        </p>
        <NoteLabel color={event.label.color} styles={{ height: '1rem', width: '1rem' }} />
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
  onDelete: PropTypes.func,
};

export default EventReminderItem;
