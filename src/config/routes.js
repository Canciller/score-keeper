import React from "react";
import Home from "views/Home";
import SignIn from "views/SignIn";
import NotFound from "views/NotFound";

var route = (path, Component) => {
  return {
    path,
    render: (props) => <Component {...props} />,
  };
};

export default [
  route("/", Home),
  route("/ingresar", SignIn),
  route("*", NotFound),
];
