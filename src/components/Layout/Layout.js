import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth, logout } from "../../redux/auth/actions";
import { isLoggedInInSelector, roleSelector } from "../../redux/auth/selectors";
import Navigation from "../UI/Navigation";
import "./Layout.css";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const [isInit, setInit] = useState(false);
  const isLoggedIn = useSelector(isLoggedInInSelector);
  const role = useSelector(roleSelector);

  useEffect(() => {
    const userJson = localStorage.getItem("user");
    if (userJson) {
      const user = JSON.parse(userJson);
      dispatch(auth(user.username, user.password));
    } else {
      setInit(true);
    }
  }, [dispatch]);

  useEffect(() => {
    if (isLoggedIn && !isInit) {
      setInit(true);
    }
  }, [isLoggedIn, isInit]);

  const handleLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <React.Fragment>
      <Navigation onLogout={handleLogout} role={role} />
      <main className="main-content">{isInit && children}</main>
    </React.Fragment>
  );
};

export default React.memo(Layout);
