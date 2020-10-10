import React, { useReducer, useState } from "react";
import { useParams } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import SearchBar from "components/SearchBar";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import RefreshIcon from "@material-ui/icons/Refresh";
import ToolTip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import StrokesPaper from "domain/StrokesPaper";
import { Link as RouterLink } from "react-router-dom";
import { Routes } from "config";
import OverflowBox from "components/OverflowBox";

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
    players: {
      display: "flex",
      flexDirection: "column",
    },
    scores: {
      position: "relative",
    },
    relative: {
      position: "relative",
      flexGrow: 1,
    },
    containerPlayers: {
      display: "flex",
      flexDirection: "column",
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    paperPlayers: {
      overflow: "auto",
      minHeight: 0,
      flexGrow: 1,
    },
    searchBar: {
      marginBottom: spacing,
    },
    containerScores: {
      ...container,
      left: 0,
      padding: spacing,
      overflow: "auto",
    },
    formControl: {
      minWidth: "16rem",
    },
    headerScores: {
      marginBottom: spacing,
    },
    footerScores: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: spacing,
    },
    tableCell: {
      padding: 0,
      paddingLeft: "0.2rem",
      paddingRight: "0.2rem",
    },
    inputBase: {
      padding: 0,
    },
    title: {
      flex: "1 1 100%",
    },
    tableContainer: {
      padding: spacing,
      paddingTop: 0,
    },
    toolbar: {
      display: "flex",
      alignItems: "baseline",
    },
    toolbarDivider: {
      marginTop: theme.spacing(0.8),
    },
    tableCellHeader: {
      paddingLeft: 0,
    },
    view: {
      flexGrow: 1,
    },
    //
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
    playersPaper: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      marginTop: spacing,
    },
    playersPaperList: {
      flexGrow: 1,
    },
    playersPaperToolbar: {
      display: "flex",
      padding: "0.2rem",
      alignItems: "center",
      paddingLeft: theme.spacing(2),
    },
    playersPaperToolbarTitle: {
      flex: 1,
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
      <Breadcrumbs className={classes.breadcrumbs}>
        <Link component={RouterLink} to={Routes.TOURNAMENTS}>
          Torneos
        </Link>
        <Typography>{id}</Typography>
      </Breadcrumbs>
      <div className={classes.content}>
        <div className={classes.searchPlayerPaper}>
          <SearchBar placeholder="Buscar Jugador" />
          <Paper className={classes.playersPaper}>
            <div className={classes.playersPaperToolbar}>
              <Typography className={classes.playersPaperToolbarTitle}>
                Jugadores
              </Typography>
              <ToolTip
                title="Refrescar"
              >
                <IconButton>
                  <RefreshIcon />
                </IconButton>
              </ToolTip>
            </div>
            <Divider />
            <OverflowBox className={classes.playersPaperList}>
              <List>
                <ListItem button dense>
                  <ListItemText primary="Nombre" secondary="Categoria" />
                </ListItem>
                <ListItem button dense>
                  <ListItemText primary="Nombre" secondary="Categoria" />
                </ListItem>
                <ListItem button dense>
                  <ListItemText primary="Nombre" secondary="Categoria" />
                </ListItem>
                <ListItem button dense>
                  <ListItemText primary="Nombre" secondary="Categoria" />
                </ListItem>
                <ListItem button dense>
                  <ListItemText primary="Nombre" secondary="Categoria" />
                </ListItem>
                <ListItem button dense>
                  <ListItemText primary="Nombre" secondary="Categoria" />
                </ListItem>
                <ListItem button dense>
                  <ListItemText primary="Nombre" secondary="Categoria" />
                </ListItem>
                <ListItem button dense>
                  <ListItemText primary="Nombre" secondary="Categoria" />
                </ListItem>
                <ListItem button dense>
                  <ListItemText primary="Nombre" secondary="Categoria" />
                </ListItem>
                <ListItem button dense>
                  <ListItemText primary="Nombre" secondary="Categoria" />
                </ListItem>
                <ListItem button dense>
                  <ListItemText primary="Nombre" secondary="Categoria" />
                </ListItem>
                <ListItem button dense>
                  <ListItemText primary="Nombre" secondary="Categoria" />
                </ListItem>
              </List>
            </OverflowBox>
          </Paper>
        </div>
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
