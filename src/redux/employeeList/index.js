import * as types from "./types";

const initialState = {
  employeeList: [],
  loading: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_EMPLOYEE_START:
      return {
        ...state,
        loading: true,
      };
    case types.ADD_EMPLOYEE_SUCCESS:
      const newList = state.employeeList.map((em) => ({ ...em }));
      newList.push(action.payload);

      return {
        ...state,
        loading: false,
        employeeList: newList,
      };
    case types.ADD_EMPLOYEE_FAILER:
      return {
        ...state,
        loading: false,
      };
    case types.FETCH_EMPLOYEE_START:
      return {
        ...state,
        loading: true,
      };
    case types.FETCH_EMPLOYEE_SUCCESS:
      return {
        ...state,
        employeeList: action.contacts,
        loading: false,
      };
    case types.FETCH_EMPLOYEE_FAILER:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
