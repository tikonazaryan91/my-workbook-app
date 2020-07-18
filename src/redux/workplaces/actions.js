import * as actionTypes from "./types";
import database from "../../configs/firebase";

export const addWorkplaceSuccess = (workplace) => {
  return {
    type: actionTypes.SAVE_WORKPLACE_SUCCESS,
    payload: workplace,
  };
};

export const addWorkplaceFailer = (error) => {
  return {
    type: actionTypes.SAVE_WORKPLACE_FAILER,
    error: error,
  };
};

export const addWorkplaceStart = () => {
  return {
    type: actionTypes.SAVE_WORKPLACE_START,
  };
};

export const saveWorkplace = (workplace, employeeId) => {
  return (dispatch) => {
    dispatch(addWorkplaceStart());

    const data = {
      company: workplace.company,
      country: workplace.country,
      startDate: workplace.startDate.toISOString(),
      endDate: workplace.endDate.toISOString(),
    };
    const id = workplace.id ? workplace.id : workplace.company;

    database
      .ref(`employee-workplaces/${employeeId}/${id}`)
      .set(data)
      .then(() => {
        dispatch(closeAddEdit());

        dispatch(
          addWorkplaceSuccess({
            ...data,
            id: id,
          })
        );
      })
      .catch((error) => {
        dispatch(addWorkplaceFailer(error));
      });
  };
};

export const fetchWorkplacesSuccess = (workplaces) => {
  return {
    type: actionTypes.FETCH_WORKPLACE_SUCCESS,
    payload: workplaces,
  };
};

export const fetchWorkplacesFail = (error) => {
  return {
    type: actionTypes.FETCH_WORKPLACE_FAILER,
    error: error,
  };
};

export const fetchWorkplacesStart = () => {
  return {
    type: actionTypes.FETCH_WORKPLACE_START,
  };
};

export const fetchWorkplaces = (employeeId) => {
  return (dispatch) => {
    dispatch(fetchWorkplacesStart());

    database
      .ref(`employee-workplaces/${employeeId}`)
      .once("value")
      .then((snap) => {
        const data = snap.val();
        const workplaces = Object.keys(data).map((key) => ({
          ...data[key],
          id: key,
        }));
        dispatch(fetchWorkplacesSuccess(workplaces));
      })
      .catch((error) => {
        dispatch(fetchWorkplacesFail(error));
      });
  };
};

export const deleteWorkplacesSuccess = (workplace) => {
  return {
    type: actionTypes.DELETE_WORKPLACE_SUCCESS,
    payload: workplace,
  };
};

export const deleteWorkplacesFail = (error) => {
  return {
    type: actionTypes.DELETE_WORKPLACE_FAILER,
    error: error,
  };
};

export const deleteWorkplace = (workplace, employeeId) => {
  return (dispatch) => {
    database
      .ref(`employee-workplaces/${employeeId}/${workplace.id}`)
      .remove()
      .then(() => {
        dispatch(deleteWorkplacesSuccess(workplace));
      })
      .catch((error) => {
        dispatch(deleteWorkplacesFail(error));
      });
  };
};

export const showAddEdit = (workplace) => {
  return {
    type: actionTypes.SHOW_ADD_EDIT,
    payload: workplace,
  };
};

export const closeAddEdit = () => {
  return {
    type: actionTypes.CLOSE_ADD_EDIT,
  };
};

export const clearStore = () => {
  return {
    type: actionTypes.CLEAR_STORE,
  };
};
