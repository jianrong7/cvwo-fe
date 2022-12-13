import React, { Fragment } from "react";
import {
  Card,
  Button,
  CardHeader,
  CardContent,
  CardActions,
  CardActionArea,
  Typography,
  Stack,
} from "@mui/material";
import { format } from "date-fns";
import { Link as RouterLink } from "react-router-dom";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import DOMPurify from "dompurify";
import Tags from "./Tags";
import { Post } from "../../modules/posts/types";
import {
  RefetchOptions,
  RefetchQueryFilters,
  QueryObserverResult,
} from "react-query";
import { TagsState } from "../Form/TagsInput";

interface Props {
  posts: Post[];
  refetch: (
    options?: (RefetchOptions & RefetchQueryFilters<unknown>) | undefined
  ) => Promise<QueryObserverResult<any, unknown>>;
  tagsState: TagsState;
  setTagsState: React.Dispatch<React.SetStateAction<TagsState>>;
}

const Posts: React.FC<Props> = ({
  posts,
  refetch,
  tagsState,
  setTagsState,
}) => {
  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: "center",
        maxWidth: { xs: "unset", sm: "sm" },
        width: "100%",
        marginY: 4,
      }}
    >
      {posts &&
        posts.map((item: any) => {
          const { ID, title, content, upvotes, tags, CreatedAt, UpdatedAt } =
            item;
          const timestamp =
            UpdatedAt > CreatedAt
              ? format(new Date(UpdatedAt), "LLL dd, yyyy")
              : format(new Date(CreatedAt), "LLL dd, yyyy");
          return (
            <Card key={ID} sx={{ width: "100%", textAlign: "left" }}>
              <RouterLink
                to={`/post/${ID}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CardActionArea>
                  <CardHeader
                    title={title}
                    titleTypographyProps={{ fontWeight: 600 }}
                    subheader={timestamp}
                    subheaderTypographyProps={{ fontSize: 12 }}
                  />
                  <CardContent
                    children={
                      <div
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(content),
                        }}
                      />
                    }
                  ></CardContent>
                </CardActionArea>
              </RouterLink>
              <CardActions
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button size="small">
                  <ThumbUpOffAltIcon />
                  <Typography>{upvotes}</Typography>
                </Button>
                <Tags
                  tags={tags}
                  refetch={refetch}
                  tagsState={tagsState}
                  setTagsState={setTagsState}
                />
              </CardActions>
            </Card>
          );
        })}
    </Stack>
  );
};

export default Posts;
