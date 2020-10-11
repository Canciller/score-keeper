import React from "react";
import clsx from "clsx";
import { makeStyles, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      position: "relative",
      height: (props) => props.height,
      width: (props) => props.width,
    },
    content: {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      overflow: "auto",
      padding: (props) => theme.spacing(props.spacing || 0),
    },
    center: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    message: {
      color: theme.palette.text.disabled,
      userSelect: "none",
    },
  };
});

function OverflowBox({
  component,
  children,
  contentProps,
  height,
  width,
  spacing,
  busy,
  message,
  ...props
}) {
  const classes = useStyles({
    height,
    width,
    spacing,
  });

  const Root = component || "div";
  contentProps = contentProps || {};

  return (
    <Root {...props} className={clsx(props.className, classes.root)}>
      <div
        {...contentProps}
        className={clsx(contentProps.className, classes.content)}
      >
        {busy ? (
          <div className={classes.center}>
            <CircularProgress />
          </div>
        ) : message ? (
          <div className={classes.center}>
            {typeof message === "string" ? (
              <Typography className={classes.message}>{message}</Typography>
            ) : (
              message
            )}
          </div>
        ) : (
          children
        )}
      </div>
    </Root>
  );
}

export default OverflowBox;
