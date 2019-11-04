/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

import styles from './NoteLabel.module.scss';

const NoteLabel = (props) => {
  console.log('props', props);

  // eslint-disable-next-line react/jsx-props-no-spreading
  const computedStyles = { ...props.styles, backgroundColor: props.color };

  console.log('computedStyles', computedStyles);

  return <span style={computedStyles} className={styles.noteLabel} />;
};

export default NoteLabel;
