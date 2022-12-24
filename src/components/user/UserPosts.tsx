import React from "react";
import { CircularProgress, Stack } from "@mui/material";
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Typography,
  Link,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import DOMPurify from "dompurify";
import { Post as PostType } from "../../modules/posts/types";
import { getBiggestTimeInterval } from "../../utils/utils";

interface Props {
  posts: PostType[];
}

const UserPosts: React.FC<Props> = ({ posts }) => {
  if (!posts) return <CircularProgress />;
  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: "center",
        width: "100%",
      }}
    >
      {posts.map((item: PostType) => {
        const { ID, title, content, CreatedAt, UpdatedAt } = item;
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
                  subheader={
                    <Typography sx={{ fontSize: 12 }}>
                      Posted {getBiggestTimeInterval(CreatedAt)} ago
                      {CreatedAt !== UpdatedAt &&
                        ` · Edited ${getBiggestTimeInterval(UpdatedAt)} ago`}
                    </Typography>
                  }
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
          </Card>
        );
      })}
    </Stack>
  );
};

export default UserPosts;
