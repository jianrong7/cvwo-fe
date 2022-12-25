import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import NavBar from "../shared/NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main className="App">
        <Container maxWidth="xl">
          <Outlet />
        </Container>
      </main>
    </>
  );
};

export default Layout;
