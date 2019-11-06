const API_KEY = '994f16e16a8f3af80dc35377e2d0a137';

const fetchForecast = () => fetch(
  'http://api.openweathermap.org/data/2.5/forecast?id=3797895&APPID=994f16e16a8f3af80dc35377e2d0a137',
)
  .then((res) => res.json())
  .then((res) => res);

const promiseWrapper = (promise) => {
  let status = 'pending';
  let result = null;

  const suspender = promise.then(
    (res) => {
      status = 'success';
      result = res;
    },
    (err) => {
      status = 'error';
      result = err;
    },
  );

  return {
    read() {
      if (status === 'pending') {
        throw suspender;
      } else if (status === 'error') {
        throw result;
      }
      return result;
    },
  };
};

// eslint-disable-next-line import/prefer-default-export
export const forecastResource = () => ({
  forecast: promiseWrapper(fetchForecast()),
});
