import React from "react";
import { CircularProgress, Stack } from "@mui/material";
import {
  Card,
  CardHeader,
  CardContent,
  CardActionArea,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import DOMPurify from "dompurify";
import { getBiggestTimeInterval } from "../../utils/utils";
import { Comment as CommentType } from "../../modules/comments/types";

interface Props {
  comments: CommentType[];
}

const UserComments: React.FC<Props> = ({ comments }) => {
  if (!comments) return <CircularProgress />;
  return (
    <Stack
      spacing={2}
      sx={{
        alignItems: "center",
        width: "100%",
      }}
    >
      {comments.map((item: CommentType) => {
        const { ID, content, CreatedAt, UpdatedAt, postId } = item;
        return (
          <Card key={ID} sx={{ width: "100%", textAlign: "left" }}>
            <RouterLink
              to={`/post/${postId}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <CardActionArea>
                <CardHeader
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

export default UserComments;
