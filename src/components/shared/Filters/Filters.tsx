import { Stack } from "@mui/material";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import React from "react";
import FilterButton from "./FilterButton";
interface Props {
  sort: string;
  dispatchAction: ActionCreatorWithPayload<string, any>;
}

const Filters: React.FC<Props> = ({ sort, dispatchAction }) => {
  return (
    <Stack flexDirection="row" alignItems="center">
      <FilterButton
        query="upvotes"
        curActive={sort === "upvotes"}
        dispatchAction={dispatchAction}
      />
      <FilterButton
        query="downvotes"
        curActive={sort === "downvotes"}
        dispatchAction={dispatchAction}
      />
      <FilterButton
        query="created_at"
        curActive={sort === "created_at"}
        dispatchAction={dispatchAction}
      />
    </Stack>
  );
};

export default Filters;
