import React from "react";
import { Typography, Stack } from "@mui/material";

interface Props {
  tags: string[] | undefined;
}
const Tags: React.FC<Props> = ({ tags }) => {
  if (!tags) return null;

  return (
    <Stack direction="row" spacing={1} sx={{ marginX: 2 }}>
      {tags.map((tag, i) => (
        <Typography key={`${tag}_${i}`} sx={{ fontSize: 12 }}>
          {tag}
        </Typography>
      ))}
    </Stack>
  );
};

export default Tags;
