import React from "react";
import { makeStyles } from "@material-ui/core";
import clsx from "clsx";
import OverflowBox from "components/OverflowBox";
import StageSelect from "domain/StageSelect";
import Paper from "@material-ui/core/Paper";
import ListItemText from "@material-ui/core/ListItemText";
import StrokesTable from "domain/StrokesTable";

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
    marginTop: {
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
          <ListItemText primary={player.name} secondary={player.category} />
          <ListItemText className={classes.marginTop} primary={stage.club} />
          <StrokesTable
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
