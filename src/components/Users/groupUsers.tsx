import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { GroupUser } from "../../types/type";
import { SearchInput } from "../../common/SearchInput";
import { useState } from "react";
import { UserList } from ".";

export const GroupUsers = ({ users }: { users: GroupUser[] }) => {
  console.log(users);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <UserList users={users} />
      <Button
        sx={{ mt: 2 }}
        onClick={handleClickOpen}
        color="secondary"
        variant="outlined"
      >
        Add user to group
      </Button>
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>Search User</DialogTitle>
        <DialogContent>
          <SearchInput placeholder="email" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
