import React, { useEffect, useReducer, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { CircularProgress, makeStyles } from "@material-ui/core";
import SearchBar from "components/SearchBar";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import { Link as RouterLink } from "react-router-dom";
import AddIcon from "@material-ui/icons/Add";
import PlayersPaper from "domain/PlayersPaper";
import StrokesPaper from "domain/StrokesPaper";
import { Routes } from "config";
import isAuth from "utils/isAuth";
import PlayerService from "services/PlayerService";
import TournamentService from "services/TournamentService";
import clsx from "clsx";
import ScoreService from "services/ScoreService";
import { act } from "react-dom/test-utils";

const useStyles = makeStyles((theme) => {
  const spacing = theme.spacing(2);

  return {
    root: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    loading: {
      justifyContent: "center",
      alignItems: "center",
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
    strokesPaper: {
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

  const history = useHistory();
  const params = useParams();
  const id = params && params.id;

  // Tournament and stages
  const [tournamentBusy, setTournamentBusy] = useState(true);
  const [tournament, setTournament] = useState(null);
  const stages = tournament && tournament._stages;
  const [stageSelected, setStageSelected] = useState(0);
  const getTournament = () => {
    setTournamentBusy(true);

    TournamentService.get(id)
      .then((tournament) => setTournament(tournament))
      .catch((err) => {
        // TODO: Handle get error.
      })
      .finally(() => {
        setTournamentBusy(false);
      });
  };

  const onStageChange = (stage, index) => {
    setStageSelected(index);
  };

  // Score and strokes
  const [scoreId, setScoreId] = useState(null);
  const maxHoles = tournament && tournament.holes;

  const reducer = (state, action) => {
    switch (action.type) {
      case "SET":
        return action.strokes;
      case "CHANGE": {
        const holeNumber = action.hole,
          stroke = action.strokes;

        if (holeNumber > maxHoles) return state;

        const newState = state.slice();
        const index = state.findIndex((stroke) => stroke.holeNumber === holeNumber);

        if (index >= 0) {
          newState[index].stroke = stroke;
          return newState;
        } else {
          newState.push({
            holeNumber,
            stroke,
          });

          return newState;
        }
      }

      default:
        return state;
    }
  };

  const [strokes, dispatch] = useReducer(reducer);

  const getPlayerScores = () => {
    if (!player || !stages) return;

    const playerId = player.id;
    const stageId = stages[stageSelected].id;

    ScoreService.get(playerId, stageId)
      .then((scores) => {
        setScoreId(scores.id);

        dispatch({
          type: "SET",
          strokes: scores.strokes,
        });
      })
      .catch((err) => {
        // TODO: Handle get error.
        setScoreId(null);
        dispatch({
          type: "SET",
          strokes: null,
        });
      })
      .finally(() => {});
  };

  const onStrokesSave = () => {
    ScoreService.save(scoreId, {
      player: {
        id: player.id
      },
      stage: {
        id: stages[stageSelected].id,
      },
      strokes,
    })
      .then(() => {})
      .catch((err) => {
        // TODO: Handle create error.
      });
  };

  // All players
  const [playersBusy, setPlayersBusy] = useState(true);
  const [players, setPlayers] = useState(null);
  const [playersFiltered, setPlayersFiltered] = useState(null);
  const getAllPlayers = () => {
    setPlayersBusy(true);

    PlayerService.getAll()
      .then((players) => {
        setPlayers(players);
        setPlayersFiltered(players);
      })
      .catch((err) => {
        // TODO: Handle getAll error.
        setPlayers(null);
      })
      .finally(() => {
        setPlayersBusy(false);
      });
  };

  // Current player
  const [playerBusy, setPlayerBusy] = useState(true);
  const [player, setPlayer] = useState(null);
  const getPlayer = (id) => {
    setPlayerBusy(true);
    PlayerService.get(id)
      .then((player) => setPlayer(player))
      .catch((err) => {
        // TODO: Handle get error.
        setPlayer(null);
      })
      .finally(() => {
        setPlayerBusy(false);
      });
  };

  const onClickPlayer = ({ id }) => {
    getPlayer(id);
  };

  const [query, setQuery] = useState("");
  const onAddPlayerClick = () => {
    history.push(Routes.PLAYERS_CREATE, {
      firstName: query,
    });
  };

  // Get tournament and players at start.
  useEffect(() => {
    getAllPlayers();
    getTournament();
  }, []);

  useEffect(() => {
    if(players) {
      if(query === '') setPlayersFiltered(players);
      else setPlayersFiltered(players.filter(player => player.firstName.toLowerCase().includes(query.toLocaleLowerCase())));
    }
  }, [query, players]);

  // Get scores
  useEffect(() => {
    getPlayerScores();
  }, [player, stageSelected]);

  if (tournamentBusy)
    return (
      <div className={clsx(classes.root, classes.loading)}>
        <CircularProgress />
      </div>
    );

  // Tournament
  const name = tournament.name;
  const season = tournament.season;
  const title = `${name} ${season}`;

  return (
    <div className={classes.root}>
      {/* Navigation */}
      <Breadcrumbs className={classes.breadcrumbs}>
        <Link component={RouterLink} to={Routes.TOURNAMENTS}>
          Torneos
        </Link>
        <Typography>{title}</Typography>
      </Breadcrumbs>

      {/* Content */}
      <div className={classes.content}>
        {/* Left */}
        <div className={classes.searchPlayerPaper}>
          <SearchBar
            className={classes.searchBarPlayers}
            placeholder="Buscar Jugador"
            actionIcon={AddIcon}
            onActionClick={onAddPlayerClick}
            onChange={(e) => setQuery(e.target.value)}
            hideSearchIcon
          />
          <PlayersPaper
            emptyMessage="Presiona + para agregar un jugador."
            busy={playersBusy}
            players={playersFiltered}
            onClickPlayer={onClickPlayer}
            onRefresh={() => {
              getAllPlayers();
            }}
          />
        </div>

        {/* Right */}
        <div className={classes.strokesPaper}>
          <StrokesPaper
            busy={playerBusy}
            player={player}
            strokes={strokes}
            tournament={tournament}
            stageSelected={stageSelected}
            stages={stages}
            onStageChange={onStageChange}
            onStrokesRefresh={() => {
              getPlayerScores();
            }}
            onStrokesDelete={() => {
              console.log("delete");
            }}
            onStrokesSave={onStrokesSave}
            onStrokesChange={(stroke) => {
              dispatch({
                type: "CHANGE",
                ...stroke,
              });
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default isAuth(Scores);
