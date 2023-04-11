import React from "react";

const Input = ({ name, type, onChange, options, inputValue, onBlur, errorMessages}) => {
 
  let inputField;

  if (type === "select") {
    inputField = (
      <div>
        <select
          value={inputValue[name]}
          className={`form-select ${errorMessages[name]!== '' ? 'danger': ''}`}
          onChange={onChange}
          name={name}
          onBlur={onBlur}
        >
          {options.map((option) => (
            <option value={option.value} key={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
    );
  } else if (type === "textarea") {
    inputField = (
      <textarea
        value={inputValue[name]}
        onChange={onChange}
        name={name}
        className={`form-control ${errorMessages[name]!== '' ? 'danger': ''}`}
        rows="3"
        onBlur={onBlur}
      />
    );
  } else {
    inputField = (
      <input
        onChange={onChange}
        className={`form-control ${errorMessages[name]!== '' ? 'danger': ''}`}
        value={inputValue[name]}
        type={type}
        name={name}
        placeholder=""
        onBlur={onBlur}
      />
    );
  }

  return (
    <div>
      <label htmlFor={name} className = {`form-label`} >
        {name}
      </label>
      {inputField}
      <div className="text-danger">
       {errorMessages[name]}
      </div>
    </div>
  );
};

export default Input;
