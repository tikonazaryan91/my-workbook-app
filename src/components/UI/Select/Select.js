import React, { forwardRef } from "react";
import "./Select.css";

const Select = forwardRef(
  ({ invalid, label, options, placeholder, defaultValue, ...rest }, ref) => {
    return (
      <div className="main-input">
        <label className="main-label">{label}</label>
        <select
          {...rest}
          placeholder={placeholder}
          defaultValue={defaultValue}
          className={`input-element ${invalid ? " input-invalid" : ""}`}
          ref={ref}
        >
          {options.map((option) => (
            <option key={option.name} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
);

export default React.memo(Select);
