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
import EditIcon from "@material-ui/icons/Edit";

function ListPlayerItem({
  player,
  locked,
  primaryText,
  secondaryText,
  menuDeleteText,
  menuEditText,
  onClick,
  onDelete,
  onEdit,
}) {
  const ACTION_DELETE = "delete",
    ACTION_EDIT = "edit";

  const [anchorEl, setAnchorEl] = React.useState(null);

  const onSecondaryActionClick = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const onMenuClose = (e) => {
    e.stopPropagation();

    switch (e.currentTarget.id) {
      case ACTION_DELETE:
        if (onDelete) onDelete(player);
        break;
      case ACTION_EDIT:
        if (onEdit) onEdit(player);
        break;
      default:
        break;
    }

    setAnchorEl(null);
  };

  const handleClick = () => {
    if (onClick) onClick(player);
  };

  return (
    <ListItem onClick={handleClick} disabled={locked} button dense>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={onMenuClose}
      >
        <MenuItem id={ACTION_EDIT} onClick={onMenuClose}>
          <ListItemIcon>
            <EditIcon />
          </ListItemIcon>
          <ListItemText primary={menuEditText} />
        </MenuItem>
        <MenuItem id={ACTION_DELETE} onClick={onMenuClose}>
          <ListItemIcon>
            <DeleteIcon />
          </ListItemIcon>
          <ListItemText primary={menuDeleteText} />
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

export default ListPlayerItem;
