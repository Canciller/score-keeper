import React, { useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core";
import AppBar from "domain/AppBar";
import Drawer from "domain/Drawer";

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

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onToggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <div className={classes.drawer}>
        <Drawer open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      </div>
      <AppBar onToggleDrawer={onToggleDrawer} />
      <div className={classes.toolbar} />
      <div className={classes.content}>{children}</div>
    </div>
  );
}

export default Layout;
