import React, { useContext } from "react";
import { AuthContext } from "context/AuthContext";
import { Redirect } from "react-router-dom";
import { Routes } from "config";

export default function (WrappedComponent) {
  return function (props) {
    const auth = useContext(AuthContext);

    if (!auth.isAuth()) return <Redirect to={Routes.SIGNIN} />;
    else return <WrappedComponent auth={auth} {...props} />;
  };
}
