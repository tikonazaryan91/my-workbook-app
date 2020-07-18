import React from "react";
import "./Modal.css";
import Backdrop from "../Backdrop";

const Modal = ({ show, children, modalClosed }) => {
  return (
    <>
      <Backdrop show={show} clicked={modalClosed} />
      <div
        className="modal"
        style={{
          transform: show ? "translateY(0)" : "translateY(-100vh)",
          opacity: show ? "1" : "0",
        }}
      >
        {show && children}
      </div>
    </>
  );
};

export default React.memo(Modal);
