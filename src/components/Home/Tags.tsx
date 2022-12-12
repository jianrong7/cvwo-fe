import React from "react";
import { Button, Stack } from "@mui/material";
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
import { TagsState } from "../Form/TagsInput";

interface Props {
  tags: string[] | undefined;
  refetch: (
    options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  tagsState: TagsState;
  setTagsState: React.Dispatch<React.SetStateAction<TagsState>>;
}
const Tags: React.FC<Props> = ({ tags, refetch, tagsState, setTagsState }) => {
  const dispatch = useAppDispatch();
  const curTags = useAppSelector(getQueryParamsTags);

  const handleClick = (tag: string) => {
    const newActiveTags = tagsState.activeTags.map((x) => x);
    newActiveTags.push(tag);
    setTagsState({ ...tagsState, activeTags: newActiveTags });
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
        <Button
          key={`${tag}_${i}`}
          onClick={() => handleClick(tag)}
          sx={{ fontSize: 12 }}
        >
          {tag}
        </Button>
      ))}
    </Stack>
  );
};

export default Tags;
