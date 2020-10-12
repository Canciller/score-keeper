import React from "react";
import Tournaments from "views/Tournaments";
import TournamentEdit from "views/TournamentEdit";
import PlayerEdit from "views/PlayerEdit";
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
  route(Routes.HOME, SignIn),
  route(Routes.SIGNIN, SignIn),
  route(Routes.TOURNAMENTS, Tournaments),
  route(Routes.TOURNAMENT_CREATE, TournamentEdit),
  route(Routes.TOURNAMENT_EDIT + "/:id", TournamentEdit),
  route(Routes.TOURNAMENTS + "/:id", Scores),
  route(Routes.PLAYERS_EDIT + "/:id", PlayerEdit),
  route(Routes.PLAYERS_CREATE, PlayerEdit),
  route("*", NotFound),
];
