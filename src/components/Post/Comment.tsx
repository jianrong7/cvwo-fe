import { Box, Link, Stack, Typography, Chip, IconButton } from "@mui/material";
import React from "react";
import { Link as RouterLink, useParams } from "react-router-dom";
import { ThumbUpOffAlt, ThumbDownOffAlt } from "@mui/icons-material";
import { useAppSelector } from "../../app/hooks";

import type { Comment as CommentType } from "../../modules/comments/types";
import { UserData } from "../../modules/users/types";
import { getCurrentUser } from "../../modules/users/userSlice";
import { getBiggestTimeInterval } from "../../utils/utils";
import DeleteButton from "../DeleteButton";
import { Post } from "../../modules/posts/types";
import EditButton from "../EditButton";
import { RatingMutation } from "../../api/RatingService";

interface Props {
  comment: CommentType;
  post: Post;
}

const Comment: React.FC<Props> = ({ comment, post }) => {
  const params = useParams();
  const curUser = useAppSelector(getCurrentUser);
  const { user, CreatedAt, UpdatedAt, ID, upvotes, downvotes } = comment;

  const { user: postUser, ID: postId } = post;
  const { mutate } = RatingMutation(postId.toString());

  return (
    <Box sx={{ paddingX: 2, borderLeft: "1px solid rgba(0,0,0,0.23)" }}>
      <Stack direction="column" spacing={1}>
        <Stack direction="row">
          <Typography sx={{ fontSize: 12 }}>
            Posted by{" "}
            <Link component={RouterLink} to={`/user/${user.ID}`}>
              {user.username}
            </Link>
            {" · "}
            {getBiggestTimeInterval(CreatedAt) === ""
              ? "0 seconds"
              : getBiggestTimeInterval(CreatedAt)}{" "}
            ago
            {CreatedAt !== UpdatedAt &&
              ` · Edited ${getBiggestTimeInterval(UpdatedAt)} ago`}
            {postUser?.username === user.username && (
              <Chip
                sx={{ marginLeft: 2 }}
                label="OP"
                variant="outlined"
                color="primary"
                size="small"
              />
            )}
          </Typography>
        </Stack>

        <Box sx={{ textAlign: "left" }}>
          <div dangerouslySetInnerHTML={{ __html: comment.content }} />
        </Box>
        <Stack direction="row" spacing={1} alignItems="center">
          {curUser && (
            <>
              <IconButton
                size="small"
                aria-label="upvote"
                onClick={() =>
                  mutate({ value: 1, entryID: ID, entryType: "comment" })
                }
              >
                <ThumbUpOffAlt />
              </IconButton>
              <Typography>{upvotes.length - downvotes.length}</Typography>
              <IconButton
                size="small"
                aria-label="downvote"
                onClick={() =>
                  mutate({ value: -1, entryID: ID, entryType: "comment" })
                }
              >
                <ThumbDownOffAlt />
              </IconButton>
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
