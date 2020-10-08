import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import DeleteIcon from "@material-ui/icons/Delete";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";

function ListTournamentItem({
  tournament,
  locked,
  primaryText,
  secondaryText,
  menuLockText,
  menuUnlockText,
  menuDeleteText,
  onClick,
  onLock,
  onDelete,
}) {
  const ACTION_LOCK = "lock",
    ACTION_DELETE = "delete";

  const [anchorEl, setAnchorEl] = React.useState(null);

  const onSecondaryActionClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const onMenuClose = (e) => {
    e.stopPropagation();

    switch (e.currentTarget.id) {
      case ACTION_LOCK:
        if (onLock) onLock(tournament);
        break;
      case ACTION_DELETE:
        if (onDelete) onDelete(tournament);
        break;
      default:
        break;
    }

    setAnchorEl(null);
  };

  const handleClick = () => {
    if (onClick) onClick(tournament);
  };

  return (
    <ListItem onClick={handleClick} disabled={locked} button dense>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onMenuClose}
      >
        <MenuItem id={ACTION_DELETE} onClick={onMenuClose}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary={menuDeleteText} />
        </MenuItem>
        <MenuItem id={ACTION_LOCK} onClick={onMenuClose}>
          <ListItemIcon>
            {(locked && <LockOpenIcon />) || <LockIcon />}
          </ListItemIcon>
          <ListItemText primary={locked ? menuUnlockText : menuLockText} />
        </MenuItem>
      </Menu>
      <ListItemText secondary={secondaryText} primary={primaryText} />
      <ListItemSecondaryAction>
        <IconButton edge="end" onClick={onSecondaryActionClick}>
          <MoreVertIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default ListTournamentItem;
