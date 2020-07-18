import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavigationItem from "./NavigationItem";
import { isLoggedInInSelector } from "../../../redux/auth/selectors";
import "./Navigation.css";

const Toolbar = ({ onLogout, role }) => {
  const isLoggedIn = useSelector(isLoggedInInSelector);

  return (
    <header className="main-toolbar">
      <div className="main-logo">
        <Link to={`/`}>WORKBOOK LOGO</Link>
      </div>
      <nav className="main-navigation-items">
        <ul className="main-navigation-items">
          {isLoggedIn && (
            <>
              <NavigationItem link="/" exact>
                Home
              </NavigationItem>
              <span className="main-navigation-items-separator">{"/"}</span>
              {role === "admin" && (
                <>
                  <NavigationItem link="/employee-create">
                    Create Employee
                  </NavigationItem>
                  <span className="main-navigation-items-separator">{"/"}</span>
                </>
              )}
            </>
          )}
          {!isLoggedIn ? (
            <NavigationItem link="/login"> Login </NavigationItem>
          ) : (
            <button className="main-nav-logout-btn" onClick={onLogout}> Logout </button>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Toolbar;
