import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers";

import Button from "../UI/Button";
import Input from "../UI/Input";
import * as actions from "../../redux/auth/actions";
import * as selectors from "../../redux/auth/selectors";
import schema from "./validation";
import "./Login.css";

const Login = (props) => {
  const dispatch = useDispatch();
  const error = useSelector(selectors.errorSelector);
  const isLoggedIn = useSelector(selectors.isLoggedInInSelector);
  const history = useHistory();
  const { register, handleSubmit, errors, formState } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [history, isLoggedIn]);

  const handleLogin = useCallback(
    (data) => {
      dispatch(actions.auth(data.username, data.password));
    },
    [dispatch]
  );

  return (
    <>
      <div className="main-auth">
        {(Object.values(errors).length > 0 || error) && (
          <div className="form-error">
            {Object.values(errors).map((err) => (
              <span key={err.message}>{err.message}</span>
            ))}
            {error && <span>{error}</span>}
          </div>
        )}
        <form onSubmit={handleSubmit(handleLogin)}>
          <h2>Login Form</h2>
          <Input
            name="username"
            label="User Name"
            ref={register()}
            invalid={errors.username}
          />
          <Input
            name="password"
            label="Password"
            ref={register()}
            type="password"
            invalid={errors.password}
          />
          <Button
            btnType="success"
            type="submit"
            disabled={!formState.isValid}
            onClick={handleSubmit(handleLogin)}
          >
            Login
          </Button>
        </form>
      </div>
      <div className="main-auth">
        <p>Admin : username:admin , password:admin111</p>
        <p>Viewer : username:viewer , password:viewer111</p>
      </div>
    </>
  );
};

export default Login;
