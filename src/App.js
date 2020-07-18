import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Spinner from "./components/UI/Spinner";
import Layout from "./components/Layout";
import withPrivateRoute from "./hocs/withPrivateRoute";
import { store } from "./redux/createStore";

const EmployeeList = React.lazy(() => import("./components/EmployeeList"));
const CreateEmployee = React.lazy(() => import("./components/CreateEmployee"));
const Employee = React.lazy(() => import("./components/Employee"));
const Login = React.lazy(() => import("./components/Login"));

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <React.Suspense fallback={<Spinner />}>
            <Switch>
              <Route
                path="/"
                exact
                component={withPrivateRoute(EmployeeList)}
              />
              <Route
                path="/employee-create"
                component={withPrivateRoute(CreateEmployee)}
              />
              <Route
                path="/employee/:id"
                component={withPrivateRoute(Employee)}
              />

              <Route path="/login" component={Login} />
              <Redirect to="/" />
            </Switch>
          </React.Suspense>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
