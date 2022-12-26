import React from "react";
import { Button, Stack, Tooltip } from "@mui/material";
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from "react-query";
import {
  getQueryParamsTags,
  updateQueryParamsTags,
} from "../../modules/posts/postsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

interface Props {
  tags: string[] | undefined;
  refetch: (
    options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}
const Tags: React.FC<Props> = ({ tags, refetch }) => {
  const dispatch = useAppDispatch();
  const curTags = useAppSelector(getQueryParamsTags);

  const handleClick = (tag: string) => {
    if (curTags) {
      dispatch(updateQueryParamsTags(curTags.concat(",", tag)));
    } else {
      dispatch(updateQueryParamsTags(tag));
    }
    refetch();
  };

  if (!tags) return null;

  return (
    <Stack direction="row" spacing={1} sx={{ marginX: 2 }}>
      {tags.map((tag, i) => (
        <Tooltip key={`${tag}_${i}`} title={`See posts with ${tag} tag`}>
          <Button onClick={() => handleClick(tag)} sx={{ fontSize: 12 }}>
            {tag}
          </Button>
        </Tooltip>
      ))}
    </Stack>
  );
};

export default Tags;
