import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core";
import AppBar from "domain/AppBar";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
    },
    toolbar: theme.mixins.toolbar,
    drawer: {
      flexGrow: 0,
    },
    content: {
      flexGrow: 1,
    },
  };
});

function Layout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar />
      <div className={classes.toolbar} />
      <div className={classes.content}>{children}</div>
    </div>
  );
}

export default Layout;
