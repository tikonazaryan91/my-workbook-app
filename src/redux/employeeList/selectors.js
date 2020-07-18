const listSelector = (state) => state.employeeListState.employeeList;
const loadingSelector = (state) => state.employeeListState.loading;

const employeeByIdSelector = (state, id) => {
  return listSelector(state).find((employee) => employee.id === id);
};

export { loadingSelector, listSelector, employeeByIdSelector };
