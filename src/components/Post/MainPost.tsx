import React from "react";
import { Stack, Box, IconButton, Typography, Chip, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import DOMPurify from "dompurify";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";

import { getBiggestTimeInterval } from "../../utils/utils";
import { UserData } from "../../modules/users/types";
import { Post } from "../../modules/posts/types";

interface Props {
  post: Post;
  user: UserData;
}

const MainPost: React.FC<Props> = ({ post, user }) => {
  const { title, content, upvotes, downvotes, tags, CreatedAt, UpdatedAt } =
    post;

  const { username, ID } = user;
  return (
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
          <Link component={RouterLink} to={`/user/${ID}`}>
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
        <Box
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content),
          }}
          sx={{ textAlign: "left" }}
        />
      </Stack>
    </Stack>
  );
};

export default MainPost;
