import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import styles from "./Layout.module.scss";

function Layout({ children }) {
  return (
    <>
      <CssBaseline />
      {children}
    </>
  );
}

export default Layout;
