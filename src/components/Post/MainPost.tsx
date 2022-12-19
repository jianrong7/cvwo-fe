import React from "react";
import {
  Stack,
  Box,
  IconButton,
  Typography,
  Chip,
  Link,
  Tooltip,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import DOMPurify from "dompurify";
import {
  ThumbUpOffAlt,
  ThumbDownOffAlt,
  Share,
  ModeComment,
} from "@mui/icons-material";

import { getBiggestTimeInterval } from "../../utils/utils";
import { UserData } from "../../modules/users/types";
import { Post } from "../../modules/posts/types";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getCurrentUser } from "../../modules/users/userSlice";
import DeleteButton from "../DeleteButton";
import EditButton from "../EditButton";
import { Rating } from "../../modules/ratings/types";
import { RatingMutation } from "../../api/RatingService";
import {
  updateSnackbarContent,
  updateAlertSeverity,
  openSnackbar,
} from "../../modules/snackbar/snackbarSlice";

interface Props {
  post: Post;
  user: UserData;
  commentsLength: number;
}

const MainPost: React.FC<Props> = ({ post, user, commentsLength }) => {
  const dispatch = useAppDispatch();
  const curUser = useAppSelector(getCurrentUser);
  const { title, content, tags, CreatedAt, UpdatedAt, ID, upvotes, downvotes } =
    post;

  const { username, ID: userId } = user;
  const { mutate } = RatingMutation(ID.toString());
  return (
    <Stack direction="row" spacing={2}>
      <Box>
        <Stack direction="column" alignItems="center" spacing={1}>
          <IconButton
            size="small"
            aria-label="upvote"
            onClick={() => mutate({ value: 1, entryID: ID, entryType: "post" })}
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
      </Box>
      <Stack spacing={1}>
        <Typography sx={{ fontSize: 12, textAlign: "left" }}>
          Posted by{""}
          <Link component={RouterLink} to={`/user/${userId}`}>
            {username}
          </Link>
          {" · "}
          {getBiggestTimeInterval(CreatedAt)
            ? getBiggestTimeInterval(CreatedAt)
            : "0 seconds"}{" "}
          ago
          {CreatedAt !== UpdatedAt &&
            ` · Edited ${getBiggestTimeInterval(UpdatedAt)} ago`}
        </Typography>
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
