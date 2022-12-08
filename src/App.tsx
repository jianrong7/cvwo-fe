import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";

import NavBar from "./components/NavBar";
import AppRouter from "./components/Routers/AppRouter";

import "./App.css";
import { useFindUser } from "./utils/useFindUser";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: green[500],
    },
  },
});

const App: React.FC = () => {
  useFindUser();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <NavBar />
        <AppRouter />
      </ThemeProvider>
    </div>
  );
};

export default App;
