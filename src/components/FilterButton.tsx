import React, { useState } from "react";
import { Button } from "@mui/material";
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from "react-query";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import { useAppDispatch } from "../app/hooks";
import {
  updateQueryParamsOrder,
  updateQueryParamsSort,
} from "../modules/posts/postsSlice";

interface Props {
  refetch: (
    options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  query: string;
}

const FilterButton: React.FC<Props> = ({ refetch, query }) => {
  const dispatch = useAppDispatch();

  // const [isAscending, setIsAscending] = useState<boolean>(false);

  return (
    <Button
      onClick={() => {
        // setIsAscending((state) => !state);
        dispatch(updateQueryParamsSort(query));
        // dispatch(updateQueryParamsOrder(isAscending ? "asc" : "desc"));
        refetch();
      }}
      // startIcon={
      //   isAscending ? (
      //     <KeyboardDoubleArrowDownIcon />
      //   ) : (
      //     <KeyboardDoubleArrowUpIcon />
      //   )
      // }
    >
      by {query === "created_at" ? "time" : query}
    </Button>
  );
};

export default FilterButton;
