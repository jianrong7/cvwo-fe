import React from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";
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
  handleChange: (options: React.SyntheticEvent, value: string[]) => void;
}

const TagsInput: React.FC<Props> = ({ tagsState, handleChange }) => {
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
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
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

export default TagsInput;
