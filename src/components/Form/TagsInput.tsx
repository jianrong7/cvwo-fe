import React from "react";
import { Autocomplete, TextField, Chip } from "@mui/material";

const tags = ["gossip", "golang", "nus", "react", "typescript", "cvwo"];

export interface TagsState {
  inputError: string;
  activeTags: string[];
  disableAdditionalTags: boolean;
}
interface Props {
  tagsState: TagsState;
  setTagsState: React.Dispatch<React.SetStateAction<TagsState>>;
}

const TagsInput: React.FC<Props> = ({ tagsState, setTagsState }) => {
  const { inputError, disableAdditionalTags } = tagsState;

  return (
    <Autocomplete
      multiple
      onChange={(_, value) => {
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
      }}
      getOptionDisabled={() => disableAdditionalTags}
      id="tags"
      options={tags}
      getOptionLabel={(option) => option}
      filterSelectedOptions
      freeSolo
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
