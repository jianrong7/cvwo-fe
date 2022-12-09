import React from "react";
import { Container, Button } from "@mui/material";
import Posts from "../components/Posts/Posts";

const Home: React.FC = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      <Button href="/submit" variant="contained">
        Create Post
      </Button>
      <Posts />
    </Container>
  );
};

export default Home;
