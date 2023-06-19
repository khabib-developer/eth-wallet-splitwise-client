import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useTransaction } from "../../hooks/transaction.hook";
import { IKey } from "../../types/interface";

export const Adresses = () => {
  const [open, setOpen] = useState(false);

  const [password, setPassword] = useState("");

  const [keys, setKeys] = useState<IKey | null>(null);

  const { getAddress } = useTransaction();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setKeys(null);
    setPassword("");
  };

  const handleSubmit = async () => {
    const res = await getAddress(password);

    setKeys(res);
  };
  return (
    <Box>
      <Button
        color="secondary"
        onClick={handleClickOpen}
        variant="contained"
        type="submit"
      >
        Get public and private keys
      </Button>

      <Dialog open={open} fullWidth maxWidth="md" onClose={handleClose}>
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
          {keys && (
            <div>
              <div>Public key: {keys.publicKey}</div>
              <div>Private key: {keys.privateKey}</div>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="secondary" onClick={handleSubmit}>
            Get
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
