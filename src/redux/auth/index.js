import * as actionTypes from "./types";

const initialState = {
  user: null,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        user: null,
        error: action.error,
      };
    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };
    case actionTypes.AUTH_LOGOUT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

export default reducer;
