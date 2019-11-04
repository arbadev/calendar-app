import React, { useState } from 'react';

const INITIAL_STATE = {
  note: '',
  city: '',
  label: '',
};

const useForm = () => {
  const [inputs, setInputs] = useState(INITIAL_STATE);

  const handleInputChange = (event) => {
    event.persist();
    setInputs((prevInputs) => ({ ...prevInputs, [event.target.name]: event.target.value }));
  };

  const setInitialState = () => setInputs(INITIAL_STATE);

  return {
    handleInputChange,
    inputs,
    setInitialState,
  };
};
export default useForm;
