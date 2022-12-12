import React from "react";
import {
  Container,
  Stack,
  Box,
  Button,
  Card,
  CardHeader,
  IconButton,
  Typography,
  Chip,
  CircularProgress,
  Link,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";

import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import { PostQuery } from "../api/PostsService";
import StickyTitleHeader from "../components/Post/StickyTitleHeader";
import { Post } from "../modules/posts/types";
import { UserQuery } from "../api/UserService";
import { getBiggestTimeInterval } from "../utils/utils";

const PostPage: React.FC = () => {
  const params = useParams();
  // depepndent queries. UserQuery depends on PostQuery finishing for userId.
  const { data: postData, isLoading: postLoading } = PostQuery(
    params.id ? params.id : ""
  );
  const userId = postData?.post?.userId;
  const {
    data: userData,
    isIdle: userIdle,
    isLoading: userLoading,
  } = UserQuery(userId);

  if (postLoading || userIdle || userLoading) return <CircularProgress />;

  const { title, content, upvotes, downvotes, tags, CreatedAt, UpdatedAt } =
    postData?.post as Post;

  const { username } = userData?.user;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <StickyTitleHeader post={postData?.post} />
      <Stack direction="row" spacing={2}>
        <Box>
          <Stack direction="column" alignItems="center" spacing={1}>
            <IconButton size="small" aria-label="upvoate">
              <ThumbUpOffAltIcon />
            </IconButton>
            <Typography>{upvotes - downvotes}</Typography>
            <IconButton size="small" aria-label="upvoate">
              <ThumbDownOffAltIcon />
            </IconButton>
          </Stack>
        </Box>
        <Stack spacing={1}>
          <Typography sx={{ fontSize: 12 }}>
            Posted by{" "}
            <Link component={RouterLink} to={`/user/${userId}`}>
              {username}
            </Link>{" "}
            {getBiggestTimeInterval(CreatedAt)} ago
            {CreatedAt !== UpdatedAt &&
              ` · Edited ${getBiggestTimeInterval(UpdatedAt)} ago`}
          </Typography>
          <Typography component="h1" sx={{ fontSize: 22, textAlign: "left" }}>
            {title}
          </Typography>
          {tags && (
            <Stack direction="row" spacing={2}>
              {tags.map((tag, i) => (
                <Chip key={`${tag}_${i}`} label={tag} />
              ))}
            </Stack>
          )}
          <Typography sx={{ textAlign: "left" }}>{content}</Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default PostPage;
