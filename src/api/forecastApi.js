const API_KEY = '994f16e16a8f3af80dc35377e2d0a137';

const fetchForecast = cityId =>
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&APPID=${API_KEY}`
  )
    .then(res => res.json())
    .then(res => {
      return res;
    });

const promiseWrapper = promise => {
  let status = 'pending';
  let result = null;

  const suspender = promise.then(
    res => {
      status = 'success';
      result = res;
    },
    err => {
      status = 'error';
      result = err;
    }
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      }
      return result;
    }
  };
};

// eslint-disable-next-line import/prefer-default-export
export const forecastResource = cityId => {
  const forecastPromise = cityId
    ? fetchForecast(cityId)
    : new Promise((resolve, reject) => {
        resolve();
      });

  return { forecast: promiseWrapper(forecastPromise) };
};
