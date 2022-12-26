import React from "react";
import { Button, Container, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getViewType, updateViewType } from "../../modules/users/userSlice";

const SecondaryNav: React.FC = () => {
  const viewType = useAppSelector(getViewType);
  const dispatch = useAppDispatch();

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", justifyContent: "center", paddingY: 4 }}
    >
      <Stack direction="row" spacing={2}>
        <Button
          color="info"
          variant={viewType === "posts" ? "contained" : "outlined"}
          onClick={() => {
            dispatch(updateViewType("posts"));
          }}
        >
          Posts
        </Button>
        <Button
          color="info"
          variant={viewType === "comments" ? "contained" : "outlined"}
          onClick={() => {
            dispatch(updateViewType("comments"));
          }}
        >
          Comments
        </Button>
        <Button
          color="info"
          variant={viewType === "upvoted" ? "contained" : "outlined"}
          onClick={() => {
            dispatch(updateViewType("upvoted"));
          }}
        >
          Upvoted
        </Button>
        <Button
          color="info"
          variant={viewType === "downvoted" ? "contained" : "outlined"}
          onClick={() => {
            dispatch(updateViewType("downvoted"));
          }}
        >
          Downvoted
        </Button>
      </Stack>
    </Container>
  );
};

export default SecondaryNav;
