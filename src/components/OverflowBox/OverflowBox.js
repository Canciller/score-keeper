import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
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
    busy: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
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
          <div className={classes.busy}>
            <CircularProgress />
          </div>
        ) : (
          children
        )}
      </div>
    </Root>
  );
}

export default OverflowBox;
