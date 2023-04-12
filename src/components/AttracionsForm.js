import { useState } from "react";
import attractionService from "../services/services";
import {  useNavigate } from "react-router-dom";
import Input from "./Input";
import React from "react";

const AttracionsForm = ({ type, attraction }) => {

  const id = type === "edit" ? attraction.id : null;

  const navigate = useNavigate();

  const [inputValues, setInputValues] = useState(
    type === "edit"
      ? {
          name: attraction.attractionData.name,
          settlement: attraction.attractionData.settlement,
          address: attraction.attractionData.address,
          category: attraction.attractionData.category,
          price: attraction.attractionData.price,
          note: attraction.attractionData.note,
        }
      : {
          name: "",
          settlement: "",
          address: "",
          category: "",
          price: "",
          note: "",
        }
  );

  const [formAlertText, setFormAlertText] = useState('');
  const [formAlertType, setFormAlertType] = useState('');

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
    setInputValues({ ...inputValues, [event.target.name]: event.target.value });
  }

  const texForErrorMessages = {
    smallerThanNull: "Nem lehet kisebb, mint 0 !",
    requiredName: `Név kitöltése kötelező!`,
    requiredSettliment:`Település kitöltése kötelező!`,
    requiredAddress:`Cím kitöltése kötelező!`,
    requiredCategory:`Kategória kitöltése kötelező!`,
    requiredPrice:`Ár kitöltése kötelező!`,
    moreThan100: "Nem lehet több, mint 100 karakter !",
  };


  let validators = {
    name: {
      requiredName: isNotEmpty,
    },
    settlement: {
      requiredSettliment: isNotEmpty,
    },
    address: {
      requiredAddress: isNotEmpty,
    },
    category: {
      requiredCategory: isNotEmpty,
    },
    price: {
      requiredPrice: isNotEmpty,
      smallerThanNull: isNotNegativ,
    },
    note: {
      moreThan100Note: isNotLengthLessThan1000,
    },
  };

  const [errorMessages, setErrorMessages] = useState({
    name: "",
    settlement: "",
    address: "",
    category: "",
    price: "",
    note: "",
  });

  let isFormValid = true;

  function validator(name, value) {
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
         isFormValid = false;
      }
    }
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

  async function submitHandler(event) {
    event.preventDefault();

    for (let k in inputValues) {
      validator(k, inputValues[k]);
    }

    if (isFormValid === true) {
      if (type === "new") {
        await attractionService.addAttractions(inputValues);
        setFormAlertText('Sikeres mentés!');
        setFormAlertType('success');
      }
      if (type === "edit") {
        await attractionService.updateAttraction(id, inputValues);
        setFormAlertText('Sikeres módosítás!');
        setFormAlertType('success');
      }
      setInputValues({
        name: "",
        settlement: "",
        address: "",
        category: "",
        price: "",
        note: "",
      });
    }else{
      setInputValues(inputValues);
      return
    }
  }

  function navigateHandle(){
    navigate("/")
  }

  return (
  <>
  <div>
    <button className="btn btn-primary" onClick={navigateHandle}>Látványosságok listája</button>
  </div>
    <form onSubmit={submitHandler}>
      <Input
        name="name"
        errorMessages={errorMessages}
        onBlur={onBlurHandler}
        onChange={inputHandleChange}
        type="text"
        inputValue={inputValues["name"]}
      />
      <Input
        name="settlement"
        errorMessages={errorMessages}
        onBlur={onBlurHandler}
        onChange={inputHandleChange}
        type="text"
        inputValue={inputValues["settlement"]}
      />
      <Input
        name="address"
        errorMessages={errorMessages}
        onBlur={onBlurHandler}
        onChange={inputHandleChange}
        type="text"
        inputValue={inputValues["address"]}
      />
      <Input
        name="category"
        errorMessages={errorMessages}
        onBlur={onBlurHandler}
        onChange={inputHandleChange}
        type="select"
        options={categoryOptions}
        inputValue={inputValues["category"]}
      />
      <Input
        name="price"
        errorMessages={errorMessages}
        onBlur={onBlurHandler}
        onChange={inputHandleChange}
        type="text"
        inputValue={inputValues["price"]}
      />
      <Input
        name="note"
        errorMessages={errorMessages}
        onBlur={onBlurHandler}
        onChange={inputHandleChange}
        type="textarea"
        inputValue={inputValues["note"]}
      />
      <button className="btn btn-primary form-button">Küldés</button>
    </form>
    {formAlertText && (
        <div className={`alert mt-3 alert-${formAlertType}`} role="alert">
          {formAlertText}
        </div>
      )}
  </>
  );
};

export default AttracionsForm;
