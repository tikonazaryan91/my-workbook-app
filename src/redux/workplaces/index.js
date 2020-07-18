import * as actionTypes from "./types";

const initialState = {
  workplaces: [],
  loading: false,
  toEdit: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SAVE_WORKPLACE_START:
    case actionTypes.FETCH_WORKPLACE_START:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SAVE_WORKPLACE_SUCCESS: {
      let newWorkplaces = state.workplaces.map((w) => ({ ...w }));
      const current = newWorkplaces.find((w) => w.id === action.payload.id);
      if (current) {
        newWorkplaces[newWorkplaces.indexOf(current)] = action.payload;
      } else {
        newWorkplaces = newWorkplaces.concat(action.payload);
      }
      return {
        ...state,
        loading: false,
        workplaces: newWorkplaces,
      };
    }
    case actionTypes.FETCH_WORKPLACE_SUCCESS:
      return {
        ...state,
        workplaces: action.payload,
        loading: false,
      };
    case actionTypes.DELETE_WORKPLACE_SUCCESS:
      return {
        ...state,
        workplaces: state.workplaces
          .filter((w) => w.id !== action.payload.id)
          .map((w) => ({ ...w })),
        loading: false,
      };
    case actionTypes.SHOW_ADD_EDIT:
      return {
        ...state,
        toEdit: action.payload,
      };
    case actionTypes.CLOSE_ADD_EDIT:
      return {
        ...state,
        toEdit: null,
      };
    case actionTypes.CLEAR_STORE:
      return {
        ...initialState,
      };
    case actionTypes.SAVE_WORKPLACE_FAILER:
    case actionTypes.FETCH_WORKPLACE_FAILER:
    case actionTypes.DELETE_WORKPLACE_FAILER:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
