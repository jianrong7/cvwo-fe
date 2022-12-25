import React from "react";
import { useParams } from "react-router-dom";
import { Container, Box, CircularProgress } from "@mui/material";

import { UserQuery } from "../api/UserService";
import SecondaryNav from "../components/user/SecondaryNav";
import MainContent from "../components/user/MainContent";
import SideBar from "../components/user/SideBar";

const User: React.FC = () => {
  const params = useParams();
  const { data, isFetching, isLoading } = UserQuery(params.id ? params.id : "");

  if (isFetching || isLoading) return <CircularProgress />;

  return (
    <>
      <SecondaryNav />
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", gap: 8 }}>
          <MainContent data={data?.user} />
          <SideBar />
        </Box>
      </Container>
    </>
  );
};

export default User;
