import React from "react";
import { Container, Button, Card, CardHeader } from "@mui/material";
import { useParams } from "react-router-dom";
import { PostQuery } from "../api/PostsService";

const Post: React.FC = () => {
  const params = useParams();
  const { data: res, isError, isFetching } = PostQuery(params.id as string);

  if (isError || isFetching) return null;

  const { Body, Title, Upvotes, Downvotes, UserId } = res?.data?.post;
  console.log(Title);
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        p: 4,
      }}
    >
      <Card>
        <CardHeader title={Title} />
      </Card>
    </Container>
  );
};

export default Post;
