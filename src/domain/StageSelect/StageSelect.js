import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

function StageSelect({
  stageProperty,
  stages,
  stageText,
  stageSelected,
  onChange,
  disabled,
  ...props
}) {
  const isValid = Boolean(stageProperty);
  const isNotEmpty = isValid && stages && stages.length !== 0;

  const handleChange = (e) => {
    if (isNotEmpty && onChange) {
      const found = stages.find(
        (stage) => stage[stageProperty] === e.target.value
      );
      onChange(found);
    }
  };

  return (
    <TextField
      variant="outlined"
      onChange={handleChange}
      disabled={disabled || !isNotEmpty}
      {...props}
      select
      value={stageSelected}
    >
      {isNotEmpty &&
        stages.map((stage, i) => {
          const value = stage[stageProperty];
          return (
            <MenuItem key={value} value={value}>
              {stageText ? `${stageText} ${value}` : value}
            </MenuItem>
          );
        })}
    </TextField>
  );
}

export default StageSelect;
