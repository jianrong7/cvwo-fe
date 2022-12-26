import React from "react";
import { Button, Tooltip } from "@mui/material";
import { useAppDispatch } from "../../../app/hooks";
import { ActionCreatorWithPayload } from "@reduxjs/toolkit";

interface Props {
  query: string;
  dispatchAction: ActionCreatorWithPayload<string, any>;
  curActive: boolean;
}

const FilterButton: React.FC<Props> = ({
  query,
  dispatchAction,
  curActive = false,
}) => {
  const dispatch = useAppDispatch();

  return (
    <Tooltip title={`Sort by ${query === "created_at" ? "time" : query}`}>
      <Button
        onClick={() => {
          dispatch(dispatchAction(query));
          // refetch();
        }}
        variant={curActive ? "outlined" : "text"}
        sx={{ fontWeight: curActive ? 600 : 400 }}
      >
        by {query === "created_at" ? "time" : query}
      </Button>
    </Tooltip>
  );
};

export default FilterButton;
