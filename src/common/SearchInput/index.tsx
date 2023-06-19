import { Box, List, ListItem, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { UserList } from "../../components/Users";
import { GroupUser } from "../../types/type";
import { useSearch } from "../../hooks/search.hook";

export const SearchInput = ({ placeholder }: { placeholder: string }) => {
  const timeout = useRef<any>(null);

  const [users, setUsers] = useState<GroupUser[]>([]);

  const { search } = useSearch();

  const [value, setValue] = useState("");

  const [delay, setDelay] = useState(false);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (timeout && timeout.current) clearTimeout(timeout.current);
    setValue(event.target.value);
    setDelay(true);
    timeout.current = setTimeout(() => setDelay(false), 700);
  };

  useEffect(() => {
    (async function () {
      if (!delay && value.trim() !== "") {
        setUsers(await search(value));
      }
    })();
    if (value.trim() === "") setUsers([]);
  }, [value, delay, search]);

  return (
    <Box>
      <TextField
        id="standard-basic"
        color="secondary"
        placeholder={placeholder}
        variant="standard"
        fullWidth
        autoFocus
        value={value}
        onChange={handleSearch}
      />
      <Box>
        <List>
          <UserList users={users} />
        </List>
      </Box>
    </Box>
  );
};
