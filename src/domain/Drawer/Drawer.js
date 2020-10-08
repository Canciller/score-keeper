import React from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Drawer as DrawerConfig } from "config";

const useStyles = makeStyles((theme) => {
  return {
    list: {
      width: 250,
    },
    toolbar: theme.mixins.toolbar,
  };
});

const ListItemWrapper = ({ path, icon, text, onClick, ...props }) => {
  const match = useRouteMatch(path);
  const pathname = match && match.path;
  const history = useHistory();
  const Icon = icon;

  const onItemClick = (e) => {
    onClick();

    if (pathname !== path) history.push(path);
  };

  return (
    <ListItem
      button
      selected={match && match.isExact}
      onClick={onItemClick}
      {...props}
    >
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};

export default function ({ onClose, ...props }) {
  const classes = useStyles();

  return (
    <Drawer onClose={onClose} {...props}>
      <div className={clsx(classes.toolbar)} />
      <Divider />
      <List className={clsx(classes.list)}>
        {DrawerConfig.list.map((el, i) => {
          return (
            <ListItemWrapper
              onClick={onClose}
              path={el.path}
              icon={el.icon}
              text={el.text}
              key={i}
            />
          );
        })}
      </List>
    </Drawer>
  );
}
