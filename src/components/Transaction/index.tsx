import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useSearch } from "../../hooks/search.hook";
import { useEffect, useRef, useState } from "react";
import { currencies } from "../../types/enum";
import { useAuthStore } from "../../store/auth.store";
import { useAppStore } from "../../store/app.store";
import { useNotificationStore } from "../../store/notification.store";
import { useTransaction } from "../../hooks/transaction.hook";

export const SendMoney = () => {
  const { search } = useSearch();

  const { sendTransaction } = useTransaction();

  const { user } = useAuthStore();

  const { rate } = useAppStore();

  const { setError, setInfo } = useNotificationStore();

  const timeout = useRef<any>(null);

  const [currency, setCurrency] = useState(Object.keys(currencies)[0]);

  const [users, setUsers] = useState<string[]>([]);

  const [value, setValue] = useState("");

  const [delay, setDelay] = useState(false);

  const [password, setPassword] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (timeout && timeout.current) clearTimeout(timeout.current);
    setValue(event.target.value);
    setDelay(true);
    timeout.current = setTimeout(() => setDelay(false), 700);
  };

  const handleClick = (email: string) => {
    setValue(email);
    setTimeout(() => setUsers([]), 200);
  };

  const handleChange = (e: SelectChangeEvent) => {
    setCurrency(e.target.value);
  };

  useEffect(() => {
    (async function () {
      if (!delay && value.trim() !== "") {
        setUsers(await search(value));
      }
    })();

    if (value.trim() === "") setUsers([]);
  }, [value, delay, search]);

  const [amount, setAmount] = useState("0");

  const handleAmount = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(event.target.value);
  };

  const handleSubmit = async () => {
    if (value.trim() === "")
      return setError("email or public address is required");

    const ethAmount =
      +amount / rate[currencies[currency as keyof typeof currencies]];

    if (ethAmount >= user?.balance) {
      setError("not anough eth");
      return;
    }

    const res = await sendTransaction({
      to: value,
      amount: `${ethAmount}`,
      password,
    });

    console.log(res);
  };

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box
      sx={{
        // height: "calc(100vh - 64px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "start",
        paddingTop: "20%",
        gap: "20px",
      }}
    >
      <Box sx={{ width: "30%" }}>
        <TextField
          id="standard-basic"
          color="secondary"
          placeholder="Email or Public address"
          variant="standard"
          fullWidth
          value={value}
          onChange={handleSearch}
        />
        <Box>
          <List>
            {users.length ? (
              users.map((user, i) => (
                <ListItem key={i} disablePadding>
                  <ListItemButton onClick={() => handleClick(user)}>
                    <ListItemText primary={user} />
                  </ListItemButton>
                </ListItem>
              ))
            ) : (
              <></>
            )}
          </List>
        </Box>
      </Box>

      <Box sx={{ display: "flex" }}>
        <TextField
          id="standard-basic"
          color="secondary"
          placeholder="amount"
          type="number"
          variant="standard"
          fullWidth
          value={amount}
          onChange={handleAmount}
        />
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={currency}
          variant="standard"
          onChange={handleChange}
        >
          <MenuItem value={Object.keys(currencies)[0]}>
            {currencies.eth}
          </MenuItem>
          <MenuItem value={Object.keys(currencies)[1]}>
            {currencies.usd}
          </MenuItem>
          <MenuItem value={Object.keys(currencies)[2]}>
            {currencies.uzs}
          </MenuItem>
        </Select>
      </Box>

      <Button
        color="secondary"
        onClick={handleClickOpen}
        variant="contained"
        type="submit"
      >
        Send
      </Button>

      <Dialog open={open} fullWidth maxWidth="sm" onClose={handleClose}>
        <DialogTitle>type your password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            type="password"
            fullWidth
            variant="standard"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            color="secondary"
          />
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="secondary" onClick={handleSubmit}>
            Send money
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
