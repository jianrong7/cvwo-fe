import { Box, Chip, IconButton, Stack, Typography } from "@mui/material";
import React from "react";
import { ThumbUpOffAlt, ThumbDownOffAlt } from "@mui/icons-material";
import { Post } from "../../modules/posts/types";
import BackToTop from "../BackToTop";
import { Rating } from "../../modules/ratings/types";

interface Props {
  post: Post;
  upvotes: Rating[];
  downvotes: Rating[];
}
const StickyTitleHeader: React.FC<Props> = ({ post, upvotes, downvotes }) => {
  const { title, tags } = post;

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
            <IconButton size="small" aria-label="upvote">
              <ThumbUpOffAlt />
            </IconButton>
            <Typography>{upvotes.length - downvotes.length}</Typography>
            <IconButton size="small" aria-label="downvote">
              <ThumbDownOffAlt />
            </IconButton>
          </Stack>
          <Typography component="h1" sx={{ fontWeight: 600 }}>
            {title}
          </Typography>
          {tags && (
            <Stack direction="row" spacing={2}>
              {tags.map((tag, i) => (
                <Chip key={`${tag}_${i}`} label={tag} size="small" />
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
