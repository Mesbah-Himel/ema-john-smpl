import React from "react";
import { useContext } from "react";
import {  Navigate, useLocation, Routes } from "react-router-dom";
import { UserContext } from "../../App";

const PrivateRoute = (children, ...rest) => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  // return loggedInUser.email ? (children) : (<Navigate to="/login" state={{ from: location }} />);
  return (
    <Routes
      {...rest}
      render={({ location }) =>
        loggedInUser.email ? (
          children
        ) : (
          <Navigate to="/login" state={{ from: location }}
          />
        )
      }
    />
  );
};
export default PrivateRoute;
