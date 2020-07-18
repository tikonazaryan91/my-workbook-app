import React from "react";
import "./Button.css";

const Button = ({ disabled, btnType, onClick, children, ...rest }) => (
  <button
    disabled={disabled}
    className={["main-button", btnType].join(" ")}
    onClick={onClick}
    {...rest}
  >
    {children}
  </button>
);

export default React.memo(Button);
