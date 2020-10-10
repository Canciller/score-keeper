import React from "react";
import ToolBar from "@material-ui/core/Toolbar";
import SaveIcon from "@material-ui/icons/Save";
import RefreshIcon from "@material-ui/icons/Refresh";
import DeleteIcon from "@material-ui/icons/Delete";
import ToolTip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignItems: "baseline",
  },
  title: {
    flex: 1,
  },
}));

function Toolbar({ onSave, onRefresh, onDelete }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant="h6" component="div" className={classes.title}>
        Registro
      </Typography>
      <ToolTip title="Refrescar">
        <IconButton onClick={onRefresh}>
          <RefreshIcon />
        </IconButton>
      </ToolTip>
      <ToolTip title="Guardar">
        <IconButton onClick={onSave}>
          <SaveIcon />
        </IconButton>
      </ToolTip>
      <ToolTip title="Eliminar">
        <IconButton onClick={onDelete}>
          <DeleteIcon />
        </IconButton>
      </ToolTip>
    </div>
  );
}

export default Toolbar;
