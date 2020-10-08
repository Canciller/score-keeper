import React, { useReducer } from "react";
import { makeStyles } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import clsx from "clsx";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import SearchBar from "components/SearchBar";
import ListTournamentItem from "domain/ListTournamentItem";
import AddIcon from "@material-ui/icons/Add";
import { Routes } from "config";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    padding: theme.spacing(2),
  },
  searchBar: {
    marginBottom: theme.spacing(1),
  },
  listContainer: {
    height: "20rem",
    overflow: "auto",
  },
  listContainerEmpty: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  emptyMessage: {
    color: theme.palette.text.disabled,
    userSelect: "none",
  },
}));

function Tournaments(props) {
  const classes = useStyles();
  const history = useHistory();

  function reducer(state, action) {
    switch (action.type) {
      case "add":
        return [...state, action.tournament];
      case "delete":
        return state.filter((tournament) => tournament.id != action.id);
      case "lock":
        return state.map((tournament) => {
          if (tournament.id === action.id)
            tournament.locked = !tournament.locked;
          return tournament;
        });
      default:
        return state;
    }
  }

  const [state, dispatch] = useReducer(reducer, [
    {
      id: 1,
      description: "Torneo 1",
      season: "2020",
      locked: false,
    },
    {
      id: 2,
      description: "Torneo 2",
      season: "2020",
      locked: false,
    },
    {
      id: 3,
      description: "Torneo 3",
      season: "2020",
      locked: false,
    },
    {
      id: 4,
      description: "Torneo 4",
      season: "2020",
      locked: false,
    },
    {
      id: 5,
      description: "Torneo 5",
      season: "2020",
      locked: false,
    },
  ]);

  const isNotEmpty = state && state.length > 0;

  const onLock = (tournament) => {
    dispatch({
      type: "lock",
      id: tournament.id,
    });
  };

  const onDelete = (tournament) => {
    dispatch({
      type: "delete",
      id: tournament.id,
    });
  };

  const onClick = (tournament) =>
    history.push(Routes.TOURNAMENTS + "/" + tournament.id);

  return (
    <Grid
      container
      className={classes.root}
      justify="center"
      alignItems="center"
    >
      <Grid item xs={12} md={7}>
        <SearchBar
          className={classes.searchBar}
          placeholder="Buscar Torneos"
          actionIcon={AddIcon}
        />
        <Paper
          className={clsx(
            !isNotEmpty && classes.listContainerEmpty,
            classes.listContainer
          )}
        >
          {(isNotEmpty && (
            <List>
              {state.map((tournament, i) => (
                <ListTournamentItem
                  menuLockText="Bloquear"
                  menuUnlockText="Desbloquear"
                  menuDeleteText="Eliminar"
                  key={i}
                  locked={tournament.locked}
                  tournament={tournament}
                  primaryText={tournament.description}
                  secondaryText={tournament.season}
                  onLock={onLock}
                  onDelete={onDelete}
                  onClick={onClick}
                />
              ))}
            </List>
          )) || (
            <Typography variant="subtitle1" className={classes.emptyMessage}>
              Presiona + para crear un torneo.
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

/*
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={onMenuClose}
          >
            <MenuItem id="delete" onClick={onMenuClose}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              <ListItemText primary="Eliminar" />
            </MenuItem>
            <MenuItem id="block" onClick={onMenuClose}>
              <ListItemIcon>
                {(blocked && <LockOpenIcon />) || <LockIcon />}
              </ListItemIcon>
              <ListItemText primary={blocked ? "Desbloquear" : "Bloquear"} />
            </MenuItem>
          </Menu>
          <List>
            <ListItem
              disabled={blocked}
              button
              dense
            >
              <ListItemText
                secondary="Categoria, Temporada"
                primary='Torneo 1'
              >
              </ListItemText>
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  onClick={onSecondaryActionClick}
                >
                  <MoreVertIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          */

export default Tournaments;
