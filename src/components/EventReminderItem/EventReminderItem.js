import React from 'react';
import PropTypes from 'prop-types';
// import classNames from 'classnames';

import styles from './EventReminderItem.module.scss';

const EventReminderItem = ({ event }) => <li>{`${event.label} --- ${event.note}`}</li>;

EventReminderItem.propTypes = {
  event: PropTypes.object,
};

export default EventReminderItem;
