import { zodResolver } from "@hookform/resolvers/zod";
import { Box } from "@mui/material";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from "react-query";
import * as z from "zod";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getTags } from "../../modules/home/homeSlice";
import {
  updateQueryParamsSearch,
  updateQueryParamsTags,
} from "../../modules/posts/postsSlice";
import SearchBar from "./SearchBar";

const searchSchema = z.object({
  tags: z.array(z.string()).max(3, "Maximum of 3 tags allowed").optional(),
});

export type SearchInput = z.TypeOf<typeof searchSchema>;

interface Props {
  refetch: (
    options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}

const SearchForm: React.FC<Props> = ({ refetch }) => {
  const tags = useAppSelector(getTags);

  const dispatch = useAppDispatch();

  const methods = useForm<SearchInput>({
    resolver: zodResolver(searchSchema),
  });

  const handleTagsChange: (
    options: React.SyntheticEvent,
    value: string[]
  ) => void = (_, value) => {
    const searchTags: string[] = [];
    const searchText: string[] = [];
    value.forEach((val) =>
      tags.includes(val) ? searchTags.push(val) : searchText.push(val)
    );
    dispatch(updateQueryParamsTags(searchTags.join()));
    dispatch(updateQueryParamsSearch(searchText.join("")));
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
        <SearchBar handleChange={handleTagsChange} />
      </Box>
    </FormProvider>
  );
};

export default SearchForm;
