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
} from "@mui/material";
import { format } from "date-fns";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Tags from "./Tags";
import { Post } from "../../modules/posts/types";

interface Props {
  posts: Post[];
}

const Posts: React.FC<Props> = ({ posts }) => {
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
            <Card key={ID} sx={{ width: "100%" }}>
              <CardActionArea href={`/post/${ID}`}>
                <CardHeader title={title} subheader={timestamp} />
                <CardContent>{content}</CardContent>
              </CardActionArea>
              <CardActions
                sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Button size="small">
                  <ThumbUpOffAltIcon />
                  <Typography>{upvotes}</Typography>
                </Button>
                <Tags tags={tags} />
              </CardActions>
            </Card>
          );
        })}
    </Stack>
  );
};

export default Posts;
