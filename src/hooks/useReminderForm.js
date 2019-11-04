import React, { useState } from 'react';

const INITIAL_STATE = {
  note: '',
  city: '',
  label: '',
  time: new Date(),
};

const useForm = () => {
  const [inputs, setInputs] = useState(INITIAL_STATE);

  const handleInputChange = (event) => {
    if (event && event.persist) event.persist();

    console.log('event', event);

    const key = event.name || event.target.name;
    const value = event && event.event && Array.isArray(event.event)
      ? event.event[0]
      : event.value || event.target.value;

    setInputs((prevInputs) => ({ ...prevInputs, [key]: value }));
  };

  const setInitialState = () => setInputs(INITIAL_STATE);

  return {
    handleInputChange,
    inputs,
    setInitialState,
  };
};
export default useForm;
