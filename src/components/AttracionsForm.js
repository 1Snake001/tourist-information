import { useState } from "react";
/* import AttractionService from "../services/services"; */
import Input from "./Input";
import React from "react";

const AttracionsForm = () => {
  const [inputValue, setInputValue] = useState({
    name: "",
    settlement: "",
    address: "",
    category: "",
    price: "",
    note: "",
  });

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    settlement: "",
    address: "",
    category: "",
    price: "",
    note: "",
  });

  const texForErrorMessages = {
    smallerThanNull: "Nem lehet kisebb, mint 0 !",
    required: "Hiányzó érték !",
    moreThan100: "Nem lehet több, mint 100 karakter !",
  };

  let validators = {
    name: {
      required: isNotEmpty,
    },
    settlement: {
      required: isNotEmpty,
    },
    address: {
      required: isNotEmpty,
    },
    category: {
      required: isNotEmpty,
    },
    price: {
      required: isNotEmpty,
      smallerThanNull: isNotNegativ,
    },
    note: {
      moreThan100: isNotLengthLessThan1000,
    },
  };

  async function validator(name, value) {
    let validator = validators[name];

    setErrorMessages((previousErrors) => ({
      ...previousErrors,
      [name]: "",
    }));

    for (let v in validator) {
      if (validator[v](value)) {
        setErrorMessages((prevErr) => ({
          ...prevErr,
          [name]: texForErrorMessages[v],
        }));
      }
    }
  }

  function onBlurHandler(event) {
    validator(event.target.name, event.target.value);
  }

  function isNotEmpty(value) {
    return value === "";
  }

  function isNotLengthLessThan1000(value) {
    return value.length > 100;
  }

  function isNotNegativ(value) {
    return value < 0;
  }

  function inputHandleChange(event) {
    setInputValue({ ...inputValue, [event.target.name]: event.target.value });
  }

  const categoryOptions = [
    {
      value: "",
      text: "Válassz!",
    },
    {
      value: "múzeum",
      text: "múzeum",
    },
    {
      value: "étterem",
      text: "étterem",
    },
    {
      value: "építmény",
      text: "építmény",
    },
  ];

  let isFormValid = Object.values(errorMessages).every((v) => v === "");
  
  async function submitHandler(event) {
    event.preventDefault();

    for (let k in inputValue) {
      validator(k, inputValue[k]);
    }

    if (isFormValid === true) {
    
      setInputValue({
        name: "",
        settlement: "",
        address: "",
        category: "",
        price: "",
        note: "",
      });
    }
  }

  return (
    <form onSubmit={submitHandler}>
      <Input
        name="name"
        errorMessages={errorMessages}
        onBlur={onBlurHandler}
        onChange={inputHandleChange}
        type="text"
        inputValue={inputValue}
      />
      <Input
        name="settlement"
        errorMessages={errorMessages}
        onBlur={onBlurHandler}
        onChange={inputHandleChange}
        type="text"
        inputValue={inputValue}
      />
      <Input
        name="address"
        errorMessages={errorMessages}
        onBlur={onBlurHandler}
        onChange={inputHandleChange}
        type="text"
        inputValue={inputValue}
      />
      <Input
        name="category"
        errorMessages={errorMessages}
        onBlur={onBlurHandler}
        onChange={inputHandleChange}
        type="select"
        options={categoryOptions}
        inputValue={inputValue}
      />
      <Input
        name="price"
        errorMessages={errorMessages}
        onBlur={onBlurHandler}
        onChange={inputHandleChange}
        type="text"
        inputValue={inputValue}
      />
      <Input
        name="note"
        errorMessages={errorMessages}
        onBlur={onBlurHandler}
        onChange={inputHandleChange}
        type="textarea"
        inputValue={inputValue}
      />
      <button className="btn btn-primary">Küldés</button>
    </form>
  );
};

export default AttracionsForm;
