import React from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import OverflowBox from "components/OverflowBox";
import Divider from "@material-ui/core/Divider";
import StageSelect from "domain/StageSelect";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import StrikesTable from "domain/StrikesTable";

const useStyles = makeStyles((theme) => {
  const spacing = theme.spacing(2);

  return {
    root: {
      display: "flex",
      flexDirection: "column",
      height: "100%",
    },
    stageSelect: {
      minWidth: "16rem",
    },
    toolbar: {
      padding: spacing,
      paddingBottom: 0,
    },
    content: {
      flexGrow: 1,
    },
    player: {
      marginTop: spacing,
    },
  };
});

function StrokesPaper({
  busy,
  player,
  tournament,
  strokes,
  stages,
  stageSelected,
  onStageChange,
  onStrokesSave,
  onStrokesDelete,
  onStrokesRefresh,
  onStrokesChange,
  ...props
}) {
  const classes = useStyles();

  const stage = stages && stages.find((el) => el.stage === stageSelected);
  const enabled = Boolean(player) && Boolean(stage) && Boolean(tournament);

  return (
    <Paper {...props} className={clsx(props.className, classes.root)}>
      <div className={classes.toolbar}>
        <StageSelect
          disabled={!enabled}
          className={classes.stageSelect}
          label="Etapa"
          stageText="Etapa"
          stageProperty="stage"
          stageSelected={stageSelected}
          stages={stages}
          onChange={(stage) => {
            if (onStageChange) onStageChange(stage);
          }}
        />
      </div>
      {enabled && (
        <OverflowBox busy={busy} className={classes.content} spacing={3}>
          <ListItemText primary={stage.club} />
          <ListItemText
            className={classes.player}
            primary={player.name}
            secondary={player.category}
          />
          <StrikesTable
            onSave={onStrokesSave}
            onRefresh={onStrokesRefresh}
            onDelete={onStrokesDelete}
            onChange={onStrokesChange}
            strokes={strokes}
            maxStrokes={tournament.maxStrokes}
          />
        </OverflowBox>
      )}
    </Paper>
  );
}

export default StrokesPaper;
