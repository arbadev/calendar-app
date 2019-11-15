/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from 'react';

import styles from './ForecastItem.module.scss';

const ForecastItem = ({ forecastResource, timestamp }) => {
  const response = forecastResource.forecast.read();
  const code = response ? parseInt(response.cod, 10) : 505;

  let value;
  if (code >= 400 && code < 500) {
    value = 'Forecast not found';
  } else if (code === 200) {
    // reduce to get the closest timestamp to date
    const filter = response.list.reduce((closest, current) => {
      const currentDiff = Math.abs(current.dt - timestamp);
      const closestDiff = Math.abs(closest.dt - timestamp);
      return currentDiff < closestDiff ? current : closest;
      // return Math.min(closest, diff);
    }, response.list[0]);

    value = filter.weather[0].main;
  } else {
    value = 'Error retrieving forecast';
  }

  return <p className={styles.forecastItem}>{value}</p>;
};

export default ForecastItem;
