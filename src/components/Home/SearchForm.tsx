import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from "react-query";
import * as z from "zod";
import { useAppDispatch } from "../../app/hooks";
import { updateQueryParamsTags } from "../../modules/posts/postsSlice";
import TagsInput, { TagsState } from "../Form/TagsInput";

const searchSchema = z.object({
  tags: z.array(z.string()).max(3, "Maximum of 3 tags allowed").optional(),
});

export type SearchInput = z.TypeOf<typeof searchSchema>;

interface Props {
  refetch: (
    options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  tagsState: TagsState;
  setTagsState: React.Dispatch<React.SetStateAction<TagsState>>;
}

const SearchForm: React.FC<Props> = ({ refetch, tagsState, setTagsState }) => {
  const dispatch = useAppDispatch();

  const methods = useForm<SearchInput>({
    resolver: zodResolver(searchSchema),
  });

  useEffect(() => {
    if (tagsState.activeTags.length >= 3) {
      setTagsState({ ...tagsState, disableAdditionalTags: true });
    } else {
      setTagsState({ ...tagsState, disableAdditionalTags: false });
    }
  }, [tagsState.activeTags]);

  const handleTagsChange: (
    options: React.SyntheticEvent,
    value: string[]
  ) => void = (_, value) => {
    if (value.length > 3) {
      setTagsState({
        ...tagsState,
        inputError: "Too many tags. Please remove some before adding.",
      });
    } else {
      setTagsState({
        ...tagsState,
        inputError: "",
      });
    }
    setTagsState({ ...tagsState, activeTags: value });
    dispatch(updateQueryParamsTags(value.join()));
    refetch();
  };

  return (
    <FormProvider {...methods}>
      <Box
        component="form"
        noValidate
        autoComplete="off"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          marginY: 2,
          width: "100%",
          maxWidth: "sm",
        }}
      >
        <TagsInput tagsState={tagsState} handleChange={handleTagsChange} />
      </Box>
    </FormProvider>
  );
};

export default SearchForm;
