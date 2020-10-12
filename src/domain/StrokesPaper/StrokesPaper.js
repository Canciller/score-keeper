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

  const stage = stages && stages[stageSelected];
  const enabled = Boolean(player) && Boolean(stage) && Boolean(tournament);

  const name = enabled && `${player.firstName} ${player.lastName}`;
  const category = enabled && (player.category.description || "Sin categoría");
  const club = enabled && (player.club.name || "Sin club");

  const maxHoles = enabled && tournament.holes;
  //const maxStrokes = enabled && tournament.max_strokes;
  const maxStrokes = 10;

  return (
    <Paper {...props} className={clsx(props.className, classes.root)}>
      <div className={classes.toolbar}>
        <StageSelect
          disabled={!enabled}
          className={classes.stageSelect}
          label="Etapa"
          stageText="Etapa"
          stageProperty="stageNumber"
          stageSelected={stageSelected}
          stages={stages}
          onChange={(stage, index) => {
            if (onStageChange) onStageChange(stage, index);
          }}
        />
      </div>
      {enabled && (
        <OverflowBox busy={busy} className={classes.content} spacing={3}>
          <ListItemText primary={name} secondary={category} />
          <ListItemText className={classes.marginTop} primary={club} />
          <StrokesTable
            onSave={onStrokesSave}
            onRefresh={onStrokesRefresh}
            onDelete={onStrokesDelete}
            onChange={onStrokesChange}
            strokes={strokes}
            maxHoles={maxHoles}
            maxStrokes={maxStrokes}
          />
        </OverflowBox>
      )}
    </Paper>
  );
}

export default StrokesPaper;
