import React from "react";
import { Button } from "@mui/material";
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from "react-query";
import { useAppDispatch } from "../app/hooks";
import { updateQueryParamsSort } from "../modules/posts/postsSlice";

interface Props {
  refetch: (
    options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  query: string;
  curActive: boolean;
}

const FilterButton: React.FC<Props> = ({
  refetch,
  query,
  curActive = false,
}) => {
  const dispatch = useAppDispatch();

  return (
    <Button
      onClick={() => {
        dispatch(updateQueryParamsSort(query));
        refetch();
      }}
      variant={curActive ? "outlined" : "text"}
      sx={{ fontWeight: curActive ? 600 : 400 }}
    >
      by {query === "created_at" ? "time" : query}
    </Button>
  );
};

export default FilterButton;
