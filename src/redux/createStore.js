import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";
import employeeListStore from "./employeeList";
import workplacesStore from "./workplaces";
import authStore from "./auth";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  employeeListState: employeeListStore,
  workplacesState: workplacesStore,
  authState: authStore,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
