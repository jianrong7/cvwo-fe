import {
  Box,
  Chip,
  CircularProgress,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { ThumbUpOffAlt, ThumbDownOffAlt } from "@mui/icons-material";
import BackToTop from "../BackToTop";
import { RatingMutation } from "../../api/RatingService";
import { useAppSelector } from "../../app/hooks";
import { getPost } from "../../modules/post/postSlice";

const StickyTitleHeader: React.FC = () => {
  const post = useAppSelector(getPost);
  if (!post) return <CircularProgress />;
  const { title, tags, ID, upvotes, downvotes } = post;
  const { mutate } = RatingMutation(ID.toString());

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
            <IconButton
              size="small"
              aria-label="upvote"
              onClick={() =>
                mutate({ value: 1, entryID: ID, entryType: "post" })
              }
            >
              <ThumbUpOffAlt />
            </IconButton>
            <Typography>{upvotes.length - downvotes.length}</Typography>
            <IconButton
              size="small"
              aria-label="downvote"
              onClick={() =>
                mutate({ value: -1, entryID: ID, entryType: "post" })
              }
            >
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
