import React from "react";
import { Button, Container, Stack } from "@mui/material";
import { useAppDispatch } from "../../app/hooks";
import { updateViewType } from "../../modules/users/userSlice";

const SecondaryNav: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <Container
      maxWidth="lg"
      sx={{ display: "flex", justifyContent: "center", paddingY: 4 }}
    >
      <Stack direction="row" spacing={2}>
        <Button
          color="info"
          variant="outlined"
          onClick={() => {
            dispatch(updateViewType("posts"));
          }}
        >
          Posts
        </Button>
        <Button
          color="info"
          variant="outlined"
          onClick={() => {
            dispatch(updateViewType("comments"));
          }}
        >
          Comments
        </Button>
        <Button
          color="info"
          variant="outlined"
          onClick={() => {
            dispatch(updateViewType("upvoted"));
          }}
        >
          Upvoted
        </Button>
        <Button
          color="info"
          variant="outlined"
          onClick={() => {
            dispatch(updateViewType("downvoted"));
          }}
        >
          Downvoted
        </Button>
        <Button
          color="info"
          variant="outlined"
          onClick={() => {
            dispatch(updateViewType("saved"));
          }}
        >
          Saved
        </Button>
      </Stack>
    </Container>
  );
};

export default SecondaryNav;
