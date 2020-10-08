import AssistantPhoto from "@material-ui/icons/AssistantPhoto";
import Edit from "@material-ui/icons/Edit";

const Routes = {
  HOME: "/",
  SIGNIN: "/ingresar",
  TOURNAMENTS: "/torneos",
  SCORES: "/scores",
};

const AppBar = {
  showBackArrowIcon: {
    [Routes.SIGNIN]: true,
  },
  hideMenuButton: {
    [Routes.HOME]: true,
  },
  hideSignInButton: {
    [Routes.SIGNIN]: true,
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

export { Routes, AppBar, Drawer };
