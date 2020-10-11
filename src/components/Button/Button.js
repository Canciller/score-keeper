import React from "react";
import Button from "@material-ui/core/Button";
import clsx from "clsx";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },
  progress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));

export default function ({ busy, className, disabled, ...props }) {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      <Button
        disabled={disabled || busy}
        variant="contained"
        color="primary"
        {...props}
      />
      {busy && <CircularProgress size={24} className={classes.progress} />}
    </div>
  );
}
