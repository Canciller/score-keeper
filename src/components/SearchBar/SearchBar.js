import React from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0.5, 0.5, 0.5, 2),
  },
  input: {
    flex: 1,
  },
  icon: {},
  divider: {
    height: "2rem",
    margin: theme.spacing(0, 1),
  },
}));

function SearchBar({
  placeholder,
  className,
  actionIcon,
  onActionClick,
  onSearchClick,
  ...props
}) {
  const classes = useStyles();
  const ActionIcon = actionIcon;

  return (
    <Paper className={clsx(className, classes.root)}>
      <InputBase
        placeholder={placeholder}
        className={classes.input}
        {...props}
      />
      <IconButton
        type="submit"
        className={classes.icon}
        onClick={onSearchClick}
      >
        <SearchIcon />
      </IconButton>
      {Boolean(actionIcon) && (
        <>
          <Divider className={classes.divider} orientation="vertical" />
          <IconButton onClick={onActionClick} color="primary">
            <ActionIcon />
          </IconButton>
        </>
      )}
    </Paper>
  );
}

export default SearchBar;
