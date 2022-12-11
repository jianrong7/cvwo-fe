import React from "react";
import { Container, Button } from "@mui/material";
import Posts from "../components/Posts/Posts";
import { useAppSelector } from "../app/hooks";
import { getCurrentUser } from "../modules/users/userSlice";

const Home: React.FC = () => {
  const curUser = useAppSelector(getCurrentUser);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      {curUser && (
        <Button href="/submit" variant="contained">
          Create Post
        </Button>
      )}
      <Posts />
    </Container>
  );
};

export default Home;
