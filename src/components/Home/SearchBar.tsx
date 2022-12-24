import React from "react";
import { Autocomplete, TextField, Chip, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { getTags } from "../../modules/home/homeSlice";
import { getQueryParamsTags } from "../../modules/posts/postsSlice";

interface Props {
  handleChange: (options: any, value: any) => void;
}

const SearchBar: React.FC<Props> = ({ handleChange }) => {
  const tags = useAppSelector(getTags);
  const tagsArr = useAppSelector(getQueryParamsTags).split(",");

  return (
    <Autocomplete
      multiple
      onChange={handleChange}
      id="tags"
      options={tags}
      getOptionLabel={(option) => option}
      filterSelectedOptions
      freeSolo
      value={tagsArr}
      renderTags={(value: string[], getTagProps) => {
        const tagsArr = [...value].filter((x) => tags.includes(x));
        const text = [...value].filter((x) => !tags.includes(x));
        const merged = tagsArr.concat(text.join(""));
        return merged.map((option: string, index: number) => {
          if (tags.includes(option)) {
            return (
              <Chip
                variant="outlined"
                label={option}
                color="primary"
                {...getTagProps({ index })}
              />
            );
          }
          return <Typography key={index}>{option}</Typography>;
        });
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Tags"
          // error={!!inputError}
          // helperText={inputError ? inputError : ""}
        />
      )}
    />
  );
};

export default SearchBar;
