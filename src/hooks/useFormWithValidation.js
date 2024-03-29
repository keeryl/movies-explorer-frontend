import React, { useState, useCallback } from 'react';
import { validate } from 'react-email-validator';

const useFormWithValidation = () => {

  const [formValues, setFormValues] = useState({
    userName: '',
    userEmail: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    userName: {
      required: false,
      format: false,
    },
    userEmail: {
      required: false,
      isEmail: false,
    },
    password: {
      required: false,
    }
  });

  const validators = {
    userName: {
      required: (value) => value === '',
      format: (value) => !/^[а-яёa-z -]+$/i.test(value),
    },
    userEmail: {
      required: (value) => value === '',
      isEmail: (value) => !validate(value),
    },
    password: {
      required: (value) => value === '',
    }
  };

  const handleInputChange = useCallback((e) => {
    const { value, name } = e.target;
    validateInput(name, value);
    setFormValues((prevState) => ({ ...prevState, [name]:value }));
  }, [setFormValues]);

  const validateInput = (inputName, inputValue) => {
    const ValidationRes = Object.keys(validators[inputName]).map(
      errorKey => {
        const errorResult = validators[inputName][errorKey](inputValue);
        return { [errorKey]: errorResult };
      }
    ).reduce((acc, el) => ({ ...acc, ...el }), {});

    setErrors((prevState) => ({
      ...prevState,
      [inputName]: ValidationRes,
    }));

  }

  const resetForm = () => {
    setFormValues({
      userName: '',
      userEmail: '',
      password: '',
    });

    setErrors({
      userName: {
        required: false,
        format: false,
      },
      userEmail: {
        required: false,
        isEmail: false,
      },
      password: {
        required: false,
      }
    });
  }

  return [ formValues, setFormValues, errors, handleInputChange, resetForm ];

}

export default useFormWithValidation;
