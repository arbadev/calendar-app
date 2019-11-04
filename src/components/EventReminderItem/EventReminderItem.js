import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import ActionButton from '../../Atoms/ActionButton';
import { ReactComponent as Edit } from '../../assets/img/edit.svg';
import { ReactComponent as Delete } from '../../assets/img/delete.svg';
import NoteLabel from '../../Atoms/NoteLabel';
import styles from './EventReminderItem.module.scss';

const EventReminderItem = ({ event }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseHover = () => {
    setIsHovering(!isHovering);
  };

  return (
    <li
      className={styles.eventReminderItem}
      onMouseEnter={handleMouseHover}
      onMouseLeave={handleMouseHover}
    >
      <div className={styles.eventReminderItem__noteWrapper}>
        <NoteLabel
          color={event.label}
          styles={{ height: '1rem', width: '1rem', marginTop: '0.3rem' }}
        />
        <p>{event.note}</p>
      </div>
      <div className={styles.eventReminderItem__infoWrapper}>
        <p className={styles.eventReminderItem__note}>{moment(event.startDate).calendar()}</p>
        <p className={styles.eventReminderItem__note}>{event.city}</p>
        <NoteLabel color={event.label} styles={{ height: '1rem', width: '1rem' }} />
      </div>

      <div className={styles.eventReminderItem__actions}>
        {isHovering && (
          <ActionButton>
            <Edit />
          </ActionButton>
        )}

        {isHovering && (
          <ActionButton>
            <Delete />
          </ActionButton>
        )}
      </div>
    </li>
  );
};

EventReminderItem.propTypes = {
  event: PropTypes.object,
};

export default EventReminderItem;
