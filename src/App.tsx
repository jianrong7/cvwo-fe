import React from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import AppRouter from "./components/Routers/AppRouter";
// import { createTheme, ThemeProvider } from "@material-ui/core";
// import { blue, orange } from "@material-ui/core/colors";

// const theme = createTheme({
//   palette: {
//     primary: blue,
//     secondary: orange,
//   },
// });

const App: React.FC = () => {
  return (
    <div className="App">
      <NavBar />
      <AppRouter />
    </div>
  );
};

export default App;
