import React from "react";
import {
  Box,
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
import { PostsQuery } from "../../api/PostsService";

const Posts: React.FC = () => {
  const { data: res, isError } = PostsQuery();

  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: "center",
        maxWidth: { xs: "unset", md: "md" },
        width: "100%",
        marginY: 4,
      }}
    >
      {!isError &&
        res?.data &&
        res?.data?.posts.map((item: any) => {
          const { ID, Title, Body, Upvotes, CreatedAt, UpdatedAt } = item;
          const timestamp =
            UpdatedAt > CreatedAt
              ? format(new Date(UpdatedAt), "LLL dd, yyyy")
              : format(new Date(CreatedAt), "LLL dd, yyyy");
          return (
            <Card key={ID} sx={{ width: "100%" }}>
              <CardActionArea href={`/post/${ID}`}>
                <CardHeader title={Title} subheader={timestamp} />
                <CardContent>{Body}</CardContent>
                <CardActions>
                  <Button size="small">
                    <ThumbUpOffAltIcon />
                    <Typography>{Upvotes}</Typography>
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card>
          );
        })}
    </Stack>
  );
};

export default Posts;
