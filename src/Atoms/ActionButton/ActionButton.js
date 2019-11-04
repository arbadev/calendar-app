/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';

import styles from './ActionButton.module.scss';

const ActionButton = (props) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <button type="button" className={styles.actionButton} {...props}>
    {props.children}
  </button>
);

export default ActionButton;
