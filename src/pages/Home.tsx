import React from "react";
import { Container, CircularProgress, Stack, Typography } from "@mui/material";
import Posts from "../components/Home/Posts";
import { PostsQuery } from "../api/PostsService";
import HomeStickyBar from "../components/Home/HomeStickyBar";
import Filters from "../components/Home/Filters";
import useSyncReduxSearchParams from "../utils/useSyncReduxSearchParams";

const Home: React.FC = () => {
  useSyncReduxSearchParams();

  const { data, isSuccess, isFetching, isLoading, refetch } = PostsQuery();
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <HomeStickyBar refetch={refetch} />

      <Stack
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: "100%",
          maxWidth: "sm",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 2, sm: 0 },
        }}
      >
        <Typography>{data?.length} POSTS</Typography>
        <Filters refetch={refetch} />
      </Stack>

      {(isLoading || isFetching) && <CircularProgress />}
      {isSuccess && <Posts posts={data} refetch={refetch} />}
    </Container>
  );
};

export default Home;
