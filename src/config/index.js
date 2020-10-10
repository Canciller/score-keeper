import AssistantPhoto from "@material-ui/icons/AssistantPhoto";
import Edit from "@material-ui/icons/Edit";

const Routes = {
  HOME: "/",
  SIGNIN: "/ingresar",
  TOURNAMENTS: "/torneos",
  TOURNAMENT_CREATE: "/torneos/nuevo",
  TOURNAMENT_EDIT: "/torneos/editar",
};

const AppBar = {
  hideSignInButton: {
    [Routes.SIGNIN]: true,
  },
  hideArrowBackIcon: {
    [Routes.HOME]: true,
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
  url: "http://localhost:3004",
  prefix: "/api",
};

export { Routes, AppBar, Drawer, api };
