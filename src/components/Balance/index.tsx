import {
  Box,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useAuthStore } from "../../store/auth.store";
import { useState } from "react";
import { currencies } from "../../types/enum";
import { useAppStore } from "../../store/app.store";
import { Adresses } from "../Adresses";

export const ShowBalance = () => {
  const { user } = useAuthStore();

  const { rate } = useAppStore();

  const [balance, setBalance] = useState(user?.balance);

  const [currency, setCurrency] = useState(Object.keys(currencies)[0]);

  const handleChange = (e: SelectChangeEvent) => {
    setCurrency(e.target.value);
    setBalance(
      rate[currencies[e.target.value as keyof typeof currencies]] *
        user?.balance || 0
    );
  };
  return (
    <Box
      sx={{
        height: "calc(100vh - 64px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "40px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "40px",
        }}
      >
        <Typography variant="h1" component="h1">
          Balance: {new Intl.NumberFormat().format(balance)}
        </Typography>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={currency}
          variant="standard"
          sx={{ fontSize: "5rem" }}
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

      <Adresses />
    </Box>
  );
};
