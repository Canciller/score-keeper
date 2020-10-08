import React from "react";
import Home from "views/Home";
import Tournaments from "views/Tournaments";
import Scores from "views/Scores";
import SignIn from "views/SignIn";
import NotFound from "views/NotFound";
import { Routes } from "config";

var route = (path, Component) => {
  return {
    path,
    render: (props) => <Component {...props} />,
  };
};

export default [
  route(Routes.HOME, Home),
  route(Routes.SIGNIN, SignIn),
  route(Routes.TOURNAMENTS, Tournaments),
  route(Routes.SCORES, Scores),
  route("*", NotFound),
];
