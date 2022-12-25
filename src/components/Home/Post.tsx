import React from "react";
import {
  Card,
  Button,
  CardHeader,
  CardContent,
  CardActions,
  CardActionArea,
  Typography,
  Stack,
  Box,
  Link,
} from "@mui/material";
import { Link as RouterLink, Navigate, useNavigate } from "react-router-dom";
import { ThumbUpOffAlt } from "@mui/icons-material";
import DOMPurify from "dompurify";
import Tags from "./Tags";
import { Post as PostType } from "../../modules/posts/types";
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from "react-query";
import { TagsState } from "../Form/TagsInput";
import { useAppSelector } from "../../app/hooks";
import { getCurrentUser } from "../../modules/users/userSlice";
import { getBiggestTimeInterval } from "../../utils/utils";
import DeleteButton from "../shared/DeleteButton/DeleteButton";
import { RatingMutation } from "../../api/RatingService";

interface Props {
  post: PostType;
  refetch: (
    options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
}

const Post: React.FC<Props> = ({ post, refetch }) => {
  const {
    ID,
    title,
    content,
    upvotes,
    downvotes,
    tags,
    CreatedAt,
    UpdatedAt,
    user,
  } = post;
  const curUser = useAppSelector(getCurrentUser);
  const { mutate } = RatingMutation(ID.toString());

  return (
    <Card key={ID} sx={{ width: "100%", textAlign: "left" }}>
      <CardHeader
        sx={{ cursor: "default" }}
        title={title}
        titleTypographyProps={{ fontWeight: 600 }}
        subheader={
          <Typography component="p" sx={{ fontSize: 12, zIndex: 10 }}>
            Posted by{" "}
            <Link component={RouterLink} to={`/user/${user.ID}`}>
              {user.username}
            </Link>
            {" · "}
            {getBiggestTimeInterval(CreatedAt)} ago
            {CreatedAt !== UpdatedAt &&
              ` · Edited ${getBiggestTimeInterval(UpdatedAt)} ago`}
          </Typography>
        }
        subheaderTypographyProps={{ fontSize: 12 }}
      />
      <CardActionArea>
        <RouterLink
          to={`/post/${ID}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <CardContent
            children={
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(content),
                }}
              />
            }
          ></CardContent>
        </RouterLink>
      </CardActionArea>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Button
            size="small"
            startIcon={<ThumbUpOffAlt />}
            onClick={() => mutate({ value: 1, entryID: ID, entryType: "post" })}
          >
            <Typography>{upvotes.length - downvotes.length}</Typography>
          </Button>
          {curUser?.username === user.username && <DeleteButton id={ID} />}
        </Box>
        <Tags tags={tags} refetch={refetch} />
      </CardActions>
    </Card>
  );
};

export default Post;
