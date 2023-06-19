import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { useAuthStore } from "../../store/auth.store";
import { useGroupHook } from "../../hooks/group.hook";
import { useState } from "react";
import { useNotificationStore } from "../../store/notification.store";
import { useNavigate } from "react-router-dom";
import { pages } from "../../types/enum";
import { Link } from "react-router-dom";

export const Groups = () => {
  const { user } = useAuthStore();
  const { createGroup } = useGroupHook();

  const { setError } = useNotificationStore();

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const handleCreate = () => {
    if (name.trim() === "") return setError("Name should not be empty");
    createGroup(name).then(() => setName(""));
  };

  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        mt: 4,
        mx: 5,
        gap: "40px",
      }}
    >
      <Typography variant="h3" component="h3">
        Groups
      </Typography>
      <Box>
        <List>
          {user?.groups.map((group, i) => (
            <ListItem key={i} disablePadding>
              <ListItemButton
                onClick={() => navigate(`${pages.splitwise}/${group.id}`)}
              >
                <ListItemText sx={{ color: "#000" }} primary={group.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <TextField
          id="standard-basic"
          color="secondary"
          placeholder="Name of group"
          variant="standard"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button onClick={handleCreate} color="secondary" variant="contained">
          Create
        </Button>
      </Box>
    </Box>
  );
};
