import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { Post } from "../../modules/posts/types";

interface Props {
  post: Post;
}
const StickyTitleHeader: React.FC<Props> = ({ post }) => {
  const { title, upvotes, downvotes, tags } = post;
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 4,
        position: "sticky",
        top: 0,
        paddingY: 1.5,
        backgroundColor: "white",
        marginTop: 2,
        width: "100%",
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1}>
        <IconButton size="small" aria-label="upvoate">
          <ThumbUpOffAltIcon />
        </IconButton>
        <Typography>{upvotes - downvotes}</Typography>
        <IconButton size="small" aria-label="upvoate">
          <ThumbDownOffAltIcon />
        </IconButton>
      </Stack>
      <Typography component="h1" sx={{ fontWeight: 600 }}>
        {title}
      </Typography>
      {tags && (
        <Stack direction="row" spacing={2}>
          {tags.map((tag, i) => (
            <Chip key={`${tag}_${i}`} label={tag} />
          ))}
        </Stack>
      )}
    </Box>
  );
};

export default StickyTitleHeader;
