import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import Toolbar from "./Toolbar";

const useStyles = makeStyles((theme) => {
  return {
    divider: {
      marginTop: theme.spacing(0.8),
    },
    tableCell: {
      padding: 0,
      paddingLeft: "0.2rem",
      paddingRight: "0.2rem",
      minWidth: "4rem",
    },
    tableCellHeader: {
      padding: 0,
    },
    inputBase: {
      padding: 0,
      paddingLeft: "1rem",
    },
  };
});

function StrokesTable({
  maxHoles,
  maxStrokes,
  strokes,
  onSave,
  onRefresh,
  onDelete,
  onChange,
}) {
  const classes = useStyles();

  const enabled = Boolean(strokes) && maxHoles > 0 && maxStrokes > 0;

  const isValidHole = (hole) => {
    if (hole > maxHoles || hole <= 0) return false;
    return true;
  };

  const calculateTotal = () => {
    if (strokes) {
      let total = maxHoles * maxStrokes;
      strokes.forEach((stroke) => {
        if (isValidHole(stroke.hole)) {
          if (stroke.strokes !== 0) {
            total -= maxStrokes;
            total += stroke.strokes;
          }
        }
      });

      return total;
    }

    return 0;
  };

  const handleChange = (strokes) => {
    if (onChange) onChange(strokes);
  };

  const headers = [];
  const addHeader = (title, key) =>
    headers.push(
      <TableCell key={key} align="center" className={classes.tableCellHeader}>
        {title}
      </TableCell>
    );

  const inputs = [];
  const addInput = (hole, value, key) =>
    inputs.push(
      <TableCell key={key} className={classes.tableCell}>
        <InputBase
          placeholder={String(maxStrokes)}
          value={value || maxStrokes}
          className={classes.inputBase}
          inputProps={{
            style: {
              padding: 0,
              textAlign: "center",
            },
          }}
          type="number"
          onChange={(e) =>
            handleChange({
              strokes: Number(e.target.value),
              hole,
            })
          }
        />
      </TableCell>
    );

  if (enabled) {
    const values = new Array(maxHoles);
    if (strokes) {
      strokes.forEach((stroke) => {
        if (isValidHole(stroke.hole)) {
          values[stroke.hole - 1] = stroke.strokes;
        }
      });
    }

    for (var i = 1; i <= maxHoles; ++i) {
      addHeader(i, "header-" + i);
      addInput(i, values[i - 1], "input-" + i);
    }
  }

  const total = calculateTotal();

  const handleSave = () => {
    if (onSave) onSave(calculateTotal());
  };

  return (
    <div>
      <Toolbar onDelete={onDelete} onSave={handleSave} onRefresh={onRefresh} />
      <Divider className={classes.divider} />
      <TableContainer>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Hoyos</TableCell>
              {headers}
              <TableCell align="right">Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Golpes</TableCell>
              {inputs}
              <TableCell align="right">{total}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default StrokesTable;
