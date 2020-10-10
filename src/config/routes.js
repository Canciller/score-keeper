import React from "react";
import Home from "views/Home";
import Tournaments from "views/Tournaments";
import TournamentEdit from "views/TournamentEdit";
import Scores from "views/Scores";
import SignIn from "views/SignIn";
import NotFound from "views/NotFound";
import { Routes } from "config";
import { Route } from "react-router-dom";

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
  route(Routes.TOURNAMENT_CREATE, TournamentEdit),
  route(Routes.TOURNAMENT_EDIT + "/:id", TournamentEdit),
  route(Routes.TOURNAMENTS + "/:id", Scores),
  route("*", NotFound),
];
