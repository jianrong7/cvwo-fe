import React from "react";
import { Button, Container, Stack, Tooltip } from "@mui/material";
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
        <Tooltip title="See user posts">
          <Button
            variant={viewType === "posts" ? "contained" : "outlined"}
            onClick={() => {
              dispatch(updateViewType("posts"));
            }}
          >
            Posts
          </Button>
        </Tooltip>
        <Tooltip title="See user comments">
          <Button
            variant={viewType === "comments" ? "contained" : "outlined"}
            onClick={() => {
              dispatch(updateViewType("comments"));
            }}
          >
            Comments
          </Button>
        </Tooltip>
        <Tooltip title="See upvoted entries">
          <Button
            variant={viewType === "upvoted" ? "contained" : "outlined"}
            onClick={() => {
              dispatch(updateViewType("upvoted"));
            }}
          >
            Upvoted
          </Button>
        </Tooltip>
        <Tooltip title="See downvoted entries">
          <Button
            variant={viewType === "downvoted" ? "contained" : "outlined"}
            onClick={() => {
              dispatch(updateViewType("downvoted"));
            }}
          >
            Downvoted
          </Button>
        </Tooltip>
      </Stack>
    </Container>
  );
};

export default SecondaryNav;
