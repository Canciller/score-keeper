import React from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import ToolTip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import OverflowBox from "components/OverflowBox";
import ListPlayerItem from "domain/ListPlayerItem";

const useStyles = makeStyles((theme) => {
  return {
    root: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
    },
    list: {
      flexGrow: 1,
      minHeight: 200,
    },
    toolbar: {
      display: "flex",
      padding: "0.2rem",
      alignItems: "center",
      paddingLeft: theme.spacing(2),
    },
    title: {
      flex: 1,
    },
    emptyMessageContainer: {
      display: "flex",
      height: "100%",
    },
    emptyMessage: {
      color: theme.palette.text.disabled,
      userSelect: "none",
      margin: "auto",
    },
  };
});

export default function PlayersPaper({
  className,
  onRefresh,
  onClickPlayer,
  onDeletePlayer,
  emptyMessage,
  busy,
  players,
}) {
  const classes = useStyles();

  const enabled = players && players.length !== 0;

  const handleClickPlayer = (player) => {
    if (onClickPlayer) onClickPlayer(player);
  };

  const handleDeletePlayer = (player) => {
    if (onDeletePlayer) onDeletePlayer(player);
  };

  return (
    <Paper className={clsx(className, classes.root)}>
      <div className={classes.toolbar}>
        <Typography className={classes.title}>Jugadores</Typography>
        <ToolTip title="Refrescar">
          <IconButton onClick={onRefresh}>
            <RefreshIcon />
          </IconButton>
        </ToolTip>
      </div>
      <Divider />
      <OverflowBox busy={busy} className={classes.list}>
        {enabled ? (
          <List>
            {players.map((player, i) => {
              const name = `${player.firstName} ${player.lastName}`;
              const category = player.category.description || "Sin categoría";

              return (
                <ListPlayerItem
                  key={i}
                  player={player}
                  onClick={handleClickPlayer}
                  primaryText={name}
                  secondaryText={category}
                  menuDeleteText="Eliminar"
                  menuEditText="Editar"
                  onDelete={handleDeletePlayer}
                />
              );
            })}
          </List>
        ) : (
          <div className={classes.emptyMessageContainer}>
            <Typography variant="subtitle1" className={classes.emptyMessage}>
              {emptyMessage}
            </Typography>
          </div>
        )}
      </OverflowBox>
    </Paper>
  );
}
