/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

import styles from './ForecastItem.module.scss';

const ForecastItem = ({ forecastResource }) => {
  const value = forecastResource ? forecastResource.forecast.read() : false;
  return (
    <p className={styles.forecastItem}>{value ? value.list[0].weather[0].main : 'not found'}</p>
  );
};

export default ForecastItem;
