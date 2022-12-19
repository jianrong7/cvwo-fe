import React, { useState } from "react";
import {
  Container,
  CircularProgress,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import Posts from "../components/Home/Posts";
import { PostsQuery } from "../api/PostsService";
import HomeStickyBar from "../components/Home/HomeStickyBar";
import FilterButton from "../components/FilterButton";
import { TagsState } from "../components/Form/TagsInput";

const Home: React.FC = () => {
  // possible to refactor this into Redux
  const [tagsState, setTagsState] = useState<TagsState>({
    inputError: "",
    activeTags: [],
    disableAdditionalTags: false,
  });
  const { data, isSuccess, isFetching, isLoading, refetch } = PostsQuery();
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <HomeStickyBar
        totalPosts={data?.length}
        refetch={refetch}
        tagsState={tagsState}
        setTagsState={setTagsState}
      />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          width: "100%",
          maxWidth: "sm",
        }}
      >
        <Typography>{data?.length} POSTS</Typography>
        <Box>
          <FilterButton refetch={refetch} query="upvotes" />
          <FilterButton refetch={refetch} query="downvotes" />
          <FilterButton refetch={refetch} query="created_at" />
        </Box>
      </Stack>

      {(isLoading || isFetching) && <CircularProgress />}
      {isSuccess && (
        <Posts
          posts={data}
          refetch={refetch}
          tagsState={tagsState}
          setTagsState={setTagsState}
        />
      )}
    </Container>
  );
};

export default Home;
