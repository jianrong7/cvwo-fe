import React from "react";
import { Autocomplete, TextField, Chip, Typography } from "@mui/material";
import { useAppSelector } from "../../app/hooks";
import { getTags } from "../../modules/home/homeSlice";

// const tags = ["gossip", "golang", "nus", "react", "typescript", "cvwo"];

export interface TagsState {
  inputError: string;
  activeTags: string[];
  disableAdditionalTags: boolean;
}
interface Props {
  tagsState: TagsState;
  handleChange: (options: any, value: any) => void;
}

const SearchBar: React.FC<Props> = ({ tagsState, handleChange }) => {
  const tags = useAppSelector(getTags);
  const { inputError, activeTags, disableAdditionalTags } = tagsState;

  return (
    <Autocomplete
      multiple
      onChange={handleChange}
      getOptionDisabled={() => disableAdditionalTags}
      id="tags"
      options={tags}
      getOptionLabel={(option) => option}
      filterSelectedOptions
      freeSolo
      value={activeTags}
      renderTags={(value: string[], getTagProps) => {
        console.log(value);
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
          error={!!inputError}
          helperText={inputError ? inputError : ""}
        />
      )}
    />
  );
};

export default SearchBar;
