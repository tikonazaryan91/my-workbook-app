const workplacesSelector = (state) => state.workplacesState.workplaces;
const loadingSelector = (state) => state.workplacesState.loading;
const toEditSelector = (state) => state.workplacesState.toEdit;

export { workplacesSelector, loadingSelector, toEditSelector };
