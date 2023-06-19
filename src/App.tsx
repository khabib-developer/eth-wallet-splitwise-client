import { BrowserRouter as Router } from "react-router-dom";
import { Pages } from "./pages";
import { SnackbarError, SnackbarInfo } from "./components/SnackBar";
import Loader from "./components/Loading";
import "./App.css";
import { createTheme } from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { ThemeProvider } from "@emotion/react";

const theme = createTheme({
  palette: {
    secondary: { main: blueGrey["200"] },
  },
  typography: {
    fontFamily: [
      "Nunito",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <SnackbarInfo />
        <SnackbarError />
        <Pages />
        <Loader />
      </Router>
    </ThemeProvider>
  );
}

export default App;
