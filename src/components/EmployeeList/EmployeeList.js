import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchEmployee } from "../../redux/employeeList/actions";
import {
  listSelector,
  loadingSelector,
} from "../../redux/employeeList/selectors";
import { contactsConstant } from "../../utils/constants.js";
import Spinner from "../UI/Spinner";
import Employee from "./Employee";
import "./EmployeeList.css";

const EmployeeList = (props) => {
  const dispatch = useDispatch();
  const loading = useSelector(loadingSelector);
  const employeeList = useSelector(listSelector);

  useEffect(() => {
    dispatch(fetchEmployee());
  }, [dispatch]);

  return (
    <>
      {loading && <Spinner />}
      {!employeeList.length && !loading && (
        <h2>
          You haven't created any contacts.Please go to Create Contact section.
        </h2>
      )}
      {employeeList.length && (
        <div className="main-home">
          <header className="main-home-header">
            <div className="main-home-item-container" />
            <div className="main-home-header-contacts-container">
              {contactsConstant.map((contactConstant) => (
                <span key={contactConstant}>{contactConstant}</span>
              ))}
            </div>
          </header>
          {employeeList.map((employee) => (
            <Employee key={employee.id} employee={employee} />
          ))}
        </div>
      )}
    </>
  );
};

export default EmployeeList;
