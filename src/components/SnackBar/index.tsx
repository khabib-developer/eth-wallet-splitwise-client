import { Alert, Snackbar } from "@mui/material";
import { useNotificationStore } from "../../store/notification.store";

export const SnackbarInfo = () => {
  const { info, setInfo } = useNotificationStore();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setInfo(null);
  };
  return (
    <>
      <Snackbar open={!!info} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
          {info}
        </Alert>
      </Snackbar>
    </>
  );
};

export const SnackbarError = () => {
  const { error, setError } = useNotificationStore();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setError(null);
  };
  return (
    <>
      <Snackbar open={!!error} autoHideDuration={4000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};
