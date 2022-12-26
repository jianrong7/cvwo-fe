import React from "react";
import {
  Stack,
  Box,
  IconButton,
  Typography,
  Chip,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import DOMPurify from "dompurify";
import {
  ThumbUpOffAlt,
  ThumbDownOffAlt,
  Share,
  ModeComment,
} from "@mui/icons-material";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCurrentUser } from "../../modules/users/userSlice";
import { RatingMutation } from "../../api/RatingService";
import {
  updateSnackbarContent,
  updateAlertSeverity,
  openSnackbar,
} from "../../modules/snackbar/snackbarSlice";
import { getComments, getPost } from "../../modules/post/postSlice";
import DeleteButton from "../shared/DeleteButton/DeleteButton";
import EditButton from "../shared/EditButton/EditButton";
import PostSubheader from "../Home/PostSubheader";

const MainPost: React.FC = () => {
  const dispatch = useAppDispatch();
  const comments = useAppSelector(getComments);
  const commentsLength = comments ? comments.length : 0;
  const curUser = useAppSelector(getCurrentUser);
  const post = useAppSelector(getPost);

  if (!post) return <CircularProgress />;
  const { title, content, tags, CreatedAt, UpdatedAt, ID, upvotes, downvotes } =
    post;

  const { username } = post.user;
  const { mutate } = RatingMutation(ID.toString());
  return (
    <Stack direction="row" spacing={2}>
      <Box>
        <Stack direction="column" alignItems="center" spacing={1}>
          <Tooltip title="Upvote">
            <IconButton
              size="small"
              aria-label="upvote"
              onClick={() =>
                mutate({ value: 1, entryID: ID, entryType: "post" })
              }
            >
              <ThumbUpOffAlt />
            </IconButton>
          </Tooltip>
          <Typography>{upvotes.length - downvotes.length}</Typography>
          <Tooltip title="Downvote">
            <IconButton
              size="small"
              aria-label="downvote"
              onClick={() =>
                mutate({ value: -1, entryID: ID, entryType: "post" })
              }
            >
              <ThumbDownOffAlt />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
      <Stack spacing={1}>
        <PostSubheader
          user={post.user}
          postCreatedAt={CreatedAt}
          postUpdatedAt={UpdatedAt}
        />
        <Typography component="h1" sx={{ fontSize: 22, textAlign: "left" }}>
          {title}
        </Typography>
        {tags && (
          <Stack direction="row" spacing={2}>
            {tags.map((tag, i) => (
              <Chip key={`${tag}_${i}`} label={tag} size="small" />
            ))}
          </Stack>
        )}
        <Box
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content),
          }}
          sx={{ textAlign: "left" }}
        />
        <Stack direction="row" spacing={4} alignItems="center">
          <Stack direction="row" alignItems="center" spacing={1}>
            <ModeComment fontSize="small" />
            <Typography>
              {commentsLength === 1
                ? `${commentsLength} comment`
                : `${commentsLength} comments`}
            </Typography>
          </Stack>
          <Tooltip title="Copy link">
            <IconButton
              size="small"
              sx={{ width: "fit-content" }}
              onClick={() => {
                window.navigator.clipboard.writeText(window.location.href);
                dispatch(updateSnackbarContent("Link copied"));
                dispatch(updateAlertSeverity("success"));
                dispatch(openSnackbar());
              }}
            >
              <Share />
            </IconButton>
          </Tooltip>
          {curUser?.username === username && (
            <>
              <EditButton originalContent={content} id={ID} />
              <DeleteButton id={ID} />
            </>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default MainPost;
