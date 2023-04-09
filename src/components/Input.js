import React from "react";

const Input = ({ name, type, onChange, options, inputValue }) => {
  console.log(inputValue[name]);
  let inputField;

  if (type === "select") {
    inputField = (
      <div>
        <select
          value={inputValue[name]}
          className={"form-select"}
          onChange={onChange}
          name={name}
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
        className="form-control"
        rows="3"
      />
    );
  } else {
    inputField = (
      <input
        onChange={onChange}
        className="form-control"
        value={inputValue[name]}
        type={type}
        name={name}
        placeholder=""
      />
    );
  }

  return (
    <div>
      <label htmlFor={name} className="form-label">
        {name}
      </label>
      {inputField}
    </div>
  );
};

export default Input;
