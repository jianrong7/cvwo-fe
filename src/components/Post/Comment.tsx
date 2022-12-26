import {
  Box,
  Stack,
  Typography,
  Chip,
  IconButton,
  CircularProgress,
  Tooltip,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { ThumbUpOffAlt, ThumbDownOffAlt } from "@mui/icons-material";
import { useAppSelector } from "../../app/hooks";

import type { Comment as CommentType } from "../../modules/comments/types";
import { getCurrentUser } from "../../modules/users/userSlice";
import { RatingMutation } from "../../api/RatingService";
import { getPost } from "../../modules/post/postSlice";
import DeleteButton from "../shared/DeleteButton/DeleteButton";
import EditButton from "../shared/EditButton/EditButton";
import PostSubheader from "../Home/PostSubheader";

interface Props {
  comment: CommentType;
}

const Comment: React.FC<Props> = ({ comment }) => {
  const params = useParams();
  const curUser = useAppSelector(getCurrentUser);
  const post = useAppSelector(getPost);

  if (!post) return <CircularProgress />;

  const { user, CreatedAt, UpdatedAt, ID, upvotes, downvotes } = comment;
  const { user: postUser, ID: postId } = post;
  const { mutate } = RatingMutation(postId.toString());

  return (
    <Box sx={{ paddingX: 2, borderLeft: "1px solid rgba(0,0,0,0.23)" }}>
      <Stack direction="column" spacing={1}>
        <Stack direction="row" alignItems="center">
          <PostSubheader
            user={user}
            postCreatedAt={CreatedAt}
            postUpdatedAt={UpdatedAt}
          />
          {postUser?.username === user.username && (
            <Chip
              sx={{ marginLeft: 2 }}
              label="OP"
              variant="outlined"
              color="primary"
              size="small"
            />
          )}
        </Stack>

        <Box sx={{ textAlign: "left" }}>
          <div dangerouslySetInnerHTML={{ __html: comment.content }} />
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          {curUser && (
            <>
              <Tooltip title="Upvote">
                <IconButton
                  size="small"
                  aria-label="upvote"
                  onClick={() =>
                    mutate({ value: 1, entryID: ID, entryType: "comment" })
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
                    mutate({ value: -1, entryID: ID, entryType: "comment" })
                  }
                >
                  <ThumbDownOffAlt />
                </IconButton>
              </Tooltip>
            </>
          )}
          {curUser?.username === user.username && (
            <>
              <EditButton
                originalContent={comment.content}
                id={ID}
                postId={postId}
                isComment
              />
              <DeleteButton
                id={ID}
                isComment
                postId={parseInt(params.id as string)}
              />
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Comment;
