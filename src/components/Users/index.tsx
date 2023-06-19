import { List } from "@mui/material";
import { UserItem } from "./user-item";
import { GroupUser } from "../../types/type";

export const UserList = ({ users }: { users: GroupUser[] }) => {
  return (
    <>
      <List sx={{ p: 0 }}>
        {users.map((user, i) => (
          <UserItem key={i} user={user} />
        ))}
      </List>
    </>
  );
};
