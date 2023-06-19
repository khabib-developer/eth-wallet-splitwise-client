import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { GroupUser } from "../../types/type";

export const UserItem = ({ user }: { user: GroupUser }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar alt={`Avatar n°${user.email + 1}`} />
        </ListItemAvatar>

        <ListItemText sx={{ color: "#000" }} primary={user.name} />
      </ListItemButton>
    </ListItem>
  );
};
