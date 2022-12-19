import React from "react";
import { Stack } from "@mui/material";
import { Post as PostType } from "../../modules/posts/types";
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from "react-query";
import { TagsState } from "../Form/TagsInput";
import Post from "./Post";

interface Props {
  posts: PostType[];
  refetch: (
    options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  tagsState: TagsState;
  setTagsState: React.Dispatch<React.SetStateAction<TagsState>>;
}

const Posts: React.FC<Props> = ({
  posts,
  refetch,
  tagsState,
  setTagsState,
}) => {
  console.log("posts:", posts);
  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: "center",
        maxWidth: { xs: "unset", sm: "sm" },
        width: "100%",
        marginY: 4,
      }}
    >
      {posts &&
        posts.map((item: PostType, index: number) => (
          <Post
            key={index}
            post={item}
            refetch={refetch}
            tagsState={tagsState}
            setTagsState={setTagsState}
          />
        ))}
    </Stack>
  );
};

export default Posts;
