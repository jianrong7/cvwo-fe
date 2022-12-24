import { Box } from "@mui/material";
import React from "react";
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from "react-query";
import { useAppSelector } from "../../app/hooks";
import { getQueryParams } from "../../modules/posts/postsSlice";
import FilterButton from "../FilterButton";

interface Props {
  refetch: (
    options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}

const Filters: React.FC<Props> = ({ refetch }) => {
  const { sort } = useAppSelector(getQueryParams);
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <FilterButton
        refetch={refetch}
        query="upvotes"
        curActive={sort === "upvotes"}
      />
      <FilterButton
        refetch={refetch}
        query="downvotes"
        curActive={sort === "downvotes"}
      />
      <FilterButton
        refetch={refetch}
        query="created_at"
        curActive={sort === "created_at"}
      />
    </Box>
  );
};

export default Filters;
