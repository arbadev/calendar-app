// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import moment from 'moment';

const initialState = (day) => ({
  note: '',
  city: '',
  label: '',
  time: moment(day.date),
});

const useForm = (day) => {
  const [inputs, setInputs] = useState(initialState(day));

  const handleInputChange = (event) => {
    if (event && event.persist) event.persist();

    const key = event.name || event.target.name;
    const value = event && event.event && Array.isArray(event.event)
      ? event.event[0]
      : event.value || event.target.value;

    setInputs((prevInputs) => ({ ...prevInputs, [key]: value }));
  };

  const setInitialState = () => setInputs(initialState(day));
  const setFormState = (state) => setInputs(state);

  return {
    handleInputChange,
    inputs,
    setInitialState,
    setFormState,
  };
};
export default useForm;
