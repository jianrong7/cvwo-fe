import React from "react";
import { Box, Button, Stack } from "@mui/material";
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from "react-query";
import SearchForm from "./SearchForm";
import { Link as RouterLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { getCurrentUser } from "../../modules/users/userSlice";
import { TagsState } from "../Form/TagsInput";

interface Props {
  totalPosts: number;
  refetch: (
    options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  tagsState: TagsState;
  setTagsState: React.Dispatch<React.SetStateAction<TagsState>>;
}

const HomeStickyBar: React.FC<Props> = ({
  refetch,
  tagsState,
  setTagsState,
}) => {
  const curUser = useAppSelector(getCurrentUser);
  return (
    <Box
      sx={{
        width: "100%",
        position: "sticky",
        marginTop: 2,
        top: 0,
        backgroundColor: "white",
        zIndex: 10,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={4}
        sx={{
          width: "100%",
          maxWidth: "sm",
        }}
      >
        <SearchForm
          refetch={refetch}
          tagsState={tagsState}
          setTagsState={setTagsState}
        />
        {curUser && (
          <Button
            component={RouterLink}
            to="/submit"
            color="success"
            variant="contained"
          >
            Create
          </Button>
        )}
      </Stack>
    </Box>
  );
};

export default HomeStickyBar;
