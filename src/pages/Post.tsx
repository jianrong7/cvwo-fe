import React from "react";
import {
  Container,
  Stack,
  Box,
  Button,
  Card,
  CardHeader,
  IconButton,
  Chip,
  CircularProgress,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { PostQuery } from "../api/PostsService";
import StickyTitleHeader from "../components/Post/StickyTitleHeader";
import { UserQuery } from "../api/UserService";
import MainPost from "../components/Post/MainPost";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Youtube from "@tiptap/extension-youtube";
import { useEditor } from "@tiptap/react";
import Typography from "@tiptap/extension-typography";
import Link from "@tiptap/extension-link";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import RichTextEditor from "../components/Form/RichTextEditor";

const PostPage: React.FC = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Typography,
      Placeholder.configure({ placeholder: "What are your thoughts?" }),
      Underline,
      Youtube,
      Link,
      Image,
    ],
  });

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

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <StickyTitleHeader post={postData?.post} />
      <MainPost post={postData?.post} user={userData?.user} />
      <RichTextEditor editor={editor} isComment={true} />
    </Container>
  );
};

export default PostPage;
