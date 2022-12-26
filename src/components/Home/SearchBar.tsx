import React from "react";
import { Autocomplete, TextField, Chip, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { getTags } from "../../modules/home/homeSlice";
import { getSearchBarState } from "../../modules/posts/postsSlice";

interface Props {
  handleChange: (options: any, value: any) => void;
}

const SearchBar: React.FC<Props> = ({ handleChange }) => {
  const tags = useAppSelector(getTags);
  const searchBar = useAppSelector(getSearchBarState);

  return (
    <Autocomplete
      multiple
      onChange={handleChange}
      id="tags"
      options={tags}
      getOptionLabel={(option) => option}
      filterSelectedOptions
      freeSolo
      value={searchBar}
      renderTags={(value: string[], getTagProps) =>
        value.map((option: string, index: number) =>
          tags.includes(option) ? (
            <Chip
              variant="outlined"
              label={option}
              color="primary"
              {...getTagProps({ index })}
            />
          ) : (
            <Typography key={index}>{option}</Typography>
          )
        )
      }
      renderInput={(params) => <TextField {...params} label="Tags" />}
    />
  );
};

export default SearchBar;
