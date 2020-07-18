import React, { forwardRef } from "react";
import "./Input.css";

const Input = forwardRef(
  ({ invalid, label, placeholder, type = "text", ...rest }, ref) => {
    return (
      <div className="main-input">
        {label && <label className="main-label">{label}</label>}
        <input
          placeholder={placeholder}
          type={type}
          className={`input-element ${invalid ? " input-invalid" : ""}`}
          ref={ref}
          {...rest}
        />
      </div>
    );
  }
);

export default React.memo(Input);
