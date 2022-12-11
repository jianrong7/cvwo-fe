import React from "react";
import { Button, Stack } from "@mui/material";

interface Props {
  tags: string[] | undefined;
}
const Tags: React.FC<Props> = ({ tags }) => {
  if (!tags) return null;

  return (
    <Stack direction="row" spacing={1} sx={{ marginX: 2 }}>
      {tags.map((tag, i) => (
        <Button key={`${tag}_${i}`} sx={{ fontSize: 12 }}>
          {tag}
        </Button>
      ))}
    </Stack>
  );
};

export default Tags;
