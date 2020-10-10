import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
//import MenuIcon from "@material-ui/icons/Menu";
import { Routes, AppBar as AppBarConfig } from "config";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ({ isAuth, onToggleDrawer }) {
  const classes = useStyles();

  const history = useHistory();

  const location = useLocation();
  const path = location && location.pathname;

  /*
  const showMenuButton = () => {
    if (!path) return false;
    return !AppBarConfig.hideMenuButton[path];
  };
  */

  const showArrowBackIcon = () => {
    if (!path) return false;
    if (history && history.length <= 2) return false;

    return !AppBarConfig.hideArrowBackIcon[path];
  };

  const showSignInButton = () => {
    if (!path) return false;
    return !AppBarConfig.hideSignInButton[path];
  };

  const onMenuClick = (e) => {
    history.goBack();
    /*
    if (showBackArrowIcon()) {
      history.goBack();
    } else {
      onToggleDrawer();
    }
    */
  };

  const onButtonClick = (e) => {
    if (isAuth) {
      // TODO: Handle sign out.
    } else {
      if (showSignInButton()) history.push(Routes.SIGNIN);
    }
  };

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        {showArrowBackIcon() && (
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="back"
            onClick={onMenuClick}
          >
            <ArrowBackIcon />
          </IconButton>
        )}
        <Typography variant="h6" className={classes.title}>
          ACGN
        </Typography>
        {showSignInButton() && (
          <Button color="inherit" variant="outlined" onClick={onButtonClick}>
            {isAuth ? "Salir" : "Ingresar"}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}
