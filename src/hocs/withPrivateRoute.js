import React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { isLoggedInInSelector } from "../redux/auth/selectors";

export default function (ComposedComponent) {
  return (props) => {
    const isLoggedIn = useSelector(isLoggedInInSelector);

    return isLoggedIn ? (
      <ComposedComponent {...props} />
    ) : (
      <Redirect to="/login" />
    );
  };
}
