import React, { useEffect, useReducer, useState } from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";
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
import TournamentService from "services/TournamentService";

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
      case "SET":
        return action.tournaments;
      case "REMOVE":
        return state.filter((tournament) => tournament.id != action.id);
      case "LOCK":
        return state.map((tournament) => {
          if (tournament.id === action.id)
            tournament.locked = !tournament.locked;
          return tournament;
        });
      default:
        return state;
    }
  }

  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(true);
  const [state, dispatch] = useReducer(reducer, null);

  useEffect(() => {
    TournamentService.getAll()
      .then((data) => {
        dispatch({
          type: "SET",
          tournaments: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "SET",
          tournamets: null,
        });

        // TODO: Handle getAll error.
      })
      .finally(() => {
        setBusy(false);
      });
  }, []);

  const enabled = state && state.length > 0;

  const onLock = (tournament) => {
    TournamentService.setLocked(tournament.id, !tournament.locked)
      .then(() => {
        dispatch({
          type: "LOCK",
          id: tournament.id,
        });
      })
      .catch((err) => {
        // TODO: Handle lock error.
      });
  };

  const onDelete = (tournament) => {
    TournamentService.delete(tournament.id)
      .then(() => {
        dispatch({
          type: "REMOVE",
          id: tournament.id,
        });
      })
      .catch((err) => {
        // TODO: Handle delete error.
      });
  };

  const goToEdit = (tournament) => {
    history.push(Routes.TOURNAMENT_EDIT + "/" + tournament.id);
  };

  const goToCreate = () => {
    history.push(Routes.TOURNAMENT_CREATE, {
      name: query,
    });
  };

  const onEdit = (tournament) => {
    goToEdit(tournament);
  };

  const onClick = (tournament) =>
    history.push(Routes.TOURNAMENTS + "/" + tournament.id, tournament);

  const onSearchBarChange = (e) => {
    const query = e.target.value;
    setQuery(query);
  };

  const onAddClick = () => {
    goToCreate();
  };

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
          onActionClick={onAddClick}
          onChange={onSearchBarChange}
          value={query}
        />
        <Paper
          className={clsx(
            !enabled && classes.listContainerEmpty,
            classes.listContainer
          )}
        >
          {enabled ? (
            <List>
              {state.map((tournament, i) => (
                <ListTournamentItem
                  menuLockText="Bloquear"
                  menuUnlockText="Desbloquear"
                  menuDeleteText="Eliminar"
                  menuEditText="Editar"
                  key={i}
                  locked={tournament.locked}
                  tournament={tournament}
                  primaryText={tournament.name}
                  secondaryText={tournament.season}
                  onLock={onLock}
                  onDelete={onDelete}
                  onClick={onClick}
                  onEdit={onEdit}
                />
              ))}
            </List>
          ) : busy ? (
            <CircularProgress />
          ) : (
            <Typography variant="subtitle1" className={classes.emptyMessage}>
              Presiona + para crear un torneo.
            </Typography>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Tournaments;
