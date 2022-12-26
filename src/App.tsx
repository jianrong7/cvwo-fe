import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import AppRouter from "./components/Routers/AppRouter";

import "./App.css";
import SnackbarRoot from "./components/Snackbar/SnackbarRoot";
import useLoginOnRefresh from "./utils/useLoginOnRefresh";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00796b",
    },
    secondary: {
      main: "#ffff00",
    },
  },
});

const App: React.FC = () => {
  useLoginOnRefresh();

  return (
    <div className="App">
      <SnackbarRoot />
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </div>
  );
};

export default App;
