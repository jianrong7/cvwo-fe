import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import NavBar from "./components/NavBar";
import AppRouter from "./components/Routers/AppRouter";

import "./App.css";
import { useFindUser } from "./utils/useFindUser";

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
