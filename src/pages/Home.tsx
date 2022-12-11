import React from "react";
import { Container, Button, Stack, Box, Typography } from "@mui/material";
import Posts from "../components/Posts/Posts";
import { useAppSelector } from "../app/hooks";
import { getCurrentUser } from "../modules/users/userSlice";
import { PostsQuery } from "../api/PostsService";

const Home: React.FC = () => {
  const { data, isSuccess } = PostsQuery();
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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ width: "100%" }}
      >
        <Typography>{data?.posts?.length} POSTS</Typography>
        <Box>
          <Button>by upvotes</Button>
          <Button>by downvotes</Button>
          <Button>by time</Button>
        </Box>
      </Stack>
      {isSuccess && <Posts posts={data.posts} />}
    </Container>
  );
};

export default Home;
