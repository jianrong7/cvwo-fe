import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import BasicThreadList from "../components/BasicThreadList";

const Home: React.FC = () => {
  return (
    <Box>
      <Button href="/submit" variant="contained">
        Create Post
      </Button>
      <br />
      <BasicThreadList />
    </Box>
  );
};

export default Home;
