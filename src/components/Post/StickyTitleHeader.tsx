import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { ThumbUpOffAlt, ThumbDownOffAlt } from "@mui/icons-material";
import { Post } from "../../modules/posts/types";
import BackToTop from "../BackToTop";

interface Props {
  post: Post;
}
const StickyTitleHeader: React.FC<Props> = ({ post }) => {
  const { title, upvotes, downvotes, tags } = post;
  return (
    <Box
      sx={{
        position: "sticky",
        top: 0,
        paddingY: 1.5,
        backgroundColor: "white",
        marginTop: 2,
        width: "100%",
        zIndex: 10,
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" alignItems="center" spacing={4}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconButton size="small" aria-label="upvoate">
              <ThumbUpOffAlt />
            </IconButton>
            <Typography>{upvotes - downvotes}</Typography>
            <IconButton size="small" aria-label="upvoate">
              <ThumbDownOffAlt />
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
        </Stack>
        <BackToTop />
      </Stack>
    </Box>
  );
};

export default StickyTitleHeader;
