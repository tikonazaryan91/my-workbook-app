import * as types from "./types";
import database from "../../configs/firebase";
import { formatDate } from "../../utils/helperFunctions";

export const addEmployeeSuccess = (data) => {
  return {
    type: types.ADD_EMPLOYEE_SUCCESS,
    payload: data,
  };
};

export const addEmployeeFailer = (error) => {
  return {
    type: types.ADD_EMPLOYEE_FAILER,
    error: error,
  };
};

export const addEmployeeStart = () => {
  return {
    type: types.ADD_EMPLOYEE_START,
  };
};

export const addEmployee = (employee, history) => {
  return (dispatch) => {
    dispatch(addEmployeeStart());

    const key = database.ref("employees").push().getKey();
    const data = { ...employee, birthDate: formatDate(employee.birthDate) };

    database
      .ref(`employees/${key}`)
      .set(data)
      .then(() => {
        data.id = key;
        dispatch(addEmployeeSuccess(data));
        history.push("/");
      })
      .catch((error) => {
        dispatch(addEmployeeFailer(error));
      });
  };
};

export const fetchEmployeeSuccess = (contacts) => {
  return {
    type: types.FETCH_EMPLOYEE_SUCCESS,
    contacts: contacts,
  };
};

export const fetchEmployeeFail = (error) => {
  return {
    type: types.FETCH_EMPLOYEE_FAILER,
    error: error,
  };
};

export const fetchEmployeeStart = () => {
  return {
    type: types.FETCH_EMPLOYEE_START,
  };
};

export const fetchEmployee = () => {
  return (dispatch) => {
    dispatch(fetchEmployeeStart());

    database
      .ref(`employees`)
      .once("value")
      .then((snap) => {
        const data = snap.val();
        const employees = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
        dispatch(fetchEmployeeSuccess(employees));
      })
      .catch((error) => {
        dispatch(fetchEmployeeFail(error));
      });
  };
};
