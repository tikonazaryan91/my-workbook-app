const isLoggedInInSelector = (state) => !!state.authState.user;
const errorSelector = (state) => state.authState.error;
const roleSelector = (state) => state.authState.user?.role;

export { isLoggedInInSelector, errorSelector, roleSelector };
