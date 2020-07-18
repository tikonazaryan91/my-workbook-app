import React from "react";
import { Link } from "react-router-dom";
import Button from "../../UI/Button";
import { contactsConstantByOrder } from "../../../utils/constants";
import "./Employee.css";

const Employee = ({ employee }) => {
  return (
    <div className="main-home-content">
      <div className="main-home-content-user">
        <Button btnType="go">
          <Link to={`/employee/${employee.id}`}>Go to employee page</Link>
        </Button>
      </div>
      <div className="main-contact">
        {contactsConstantByOrder.map((contactConstant) => (
          <span key={contactConstant}>{employee[contactConstant]}</span>
        ))}
      </div>
    </div>
  );
};

export default Employee;
