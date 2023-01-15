import React from "react";
import { Button, Container, Box, Tooltip } from "@mui/material";
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
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
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
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
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
        </Box>
      </Box>
    </Container>
  );
};

export default SecondaryNav;
