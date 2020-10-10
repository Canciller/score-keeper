import React, { useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import SearchBar from "components/SearchBar";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import PlayersPaper from "domain/PlayersPaper";
import StrokesPaper from "domain/StrokesPaper";
import { Routes } from "config";

const useStyles = makeStyles((theme) => {
  const spacing = theme.spacing(2);

  const container = {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  };

  return {
    root: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    breadcrumbs: {
      padding: spacing,
    },
    content: {
      flexGrow: 1,
      display: "flex",
      padding: spacing,
      paddingTop: 0,
    },
    strikesPaper: {
      flex: 1,
    },
    searchPlayerPaper: {
      display: "flex",
      flexDirection: "column",
      minWidth: 350,
      marginRight: spacing,
    },
    searchBarPlayers: {
      marginBottom: spacing,
    },
  };
});

function Scores(props) {
  const classes = useStyles();

  const params = useParams();
  const id = params && params.id;

  const [busy, setBusy] = useState(true);

  setTimeout(() => {
    setBusy(false);
  }, 1000);

  const maxStrokes = 9;

  const reducer = (state, action) => {
    switch (action.type) {
      case "change": {
        const hole = action.hole,
          strokes = action.strokes;

        if (hole > maxStrokes) return state;

        const newState = state.slice();
        const index = state.findIndex((stroke) => stroke.hole === hole);

        if (index >= 0) {
          newState[index].strokes = strokes;
          return newState;
        } else {
          newState.push({
            hole,
            strokes,
          });

          return newState;
        }
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, [
    {
      hole: 1,
      strokes: 2,
    },
    {
      hole: 2,
      strokes: 1,
    },
    {
      hole: 3,
      strokes: 1,
    },
  ]);

  return (
    <div className={classes.root}>
      {/* Navigation */}
      <Breadcrumbs className={classes.breadcrumbs}>
        <Link component={RouterLink} to={Routes.TOURNAMENTS}>
          Torneos
        </Link>
        <Typography>{id}</Typography>
      </Breadcrumbs>

      {/* Content */}
      <div className={classes.content}>
        {/* Left */}
        <div className={classes.searchPlayerPaper}>
          <SearchBar
            className={classes.searchBarPlayers}
            placeholder="Buscar Jugador"
            actionIcon={AddIcon}
            hideSearchIcon
          />
          <PlayersPaper
            emptyMessage="Presiona + para agregar un jugador."
            busy={false}
            onRefresh={() => {
              console.log("refresh players");
            }}
          />
        </div>

        {/* Right */}
        <div className={classes.strikesPaper}>
          <StrokesPaper
            busy={busy}
            player={{
              name: "Jugador",
              category: "Categoria",
            }}
            strokes={state}
            tournament={{
              maxStrokes,
            }}
            stageSelected={1}
            stages={[
              {
                stage: 1,
                club: "Club 1",
                locked: false,
              },
              {
                stage: 2,
                club: "Club 2",
                locked: true,
              },
            ]}
            onStageChange={(stage) => {
              console.log(stage);
            }}
            onStrokesRefresh={() => {
              console.log("refresh");
            }}
            onStrokesDelete={() => {
              console.log("delete");
            }}
            onStrokesSave={(total) => {
              console.log("save " + total);
            }}
            onStrokesChange={(stroke) => {
              dispatch({
                type: "change",
                ...stroke,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Scores;
