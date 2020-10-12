import AssistantPhoto from "@material-ui/icons/AssistantPhoto";
import Edit from "@material-ui/icons/Edit";

const Routes = {
  HOME: "/",
  SIGNIN: "/ingresar",
  TOURNAMENTS: "/torneos",
  TOURNAMENT_CREATE: "/torneos/nuevo",
  TOURNAMENT_EDIT: "/torneos/editar",
  PLAYERS: "/jugadores",
  PLAYERS_CREATE: "/jugadores/nuevo",
  PLAYERS_EDIT: "/jugadores/editar",
};

const AppBar = {
  hideSignInButton: {
    [Routes.SIGNIN]: true,
    [Routes.HOME]: true,
  },
  hideArrowBackIcon: {
    //[Routes.HOME]: true,
  },
};

const Drawer = {
  list: [
    {
      path: Routes.TOURNAMENTS,
      icon: AssistantPhoto,
      text: "Torneos",
    },
    {
      path: Routes.SCORES,
      icon: Edit,
      text: "Scores",
    },
  ],
};

const api = {
  url: "https://score-keeper-api.herokuapp.com",
  prefix: "/api",
};

export { Routes, AppBar, Drawer, api };
