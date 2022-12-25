import React from "react";
import { Container, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { CommentsFromPostQuery, PostQuery } from "../api/PostsService";
import StickyTitleHeader from "../components/Post/StickyTitleHeader";
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
import { CommentMutation } from "../api/CommentService";
import { useAppSelector } from "../app/hooks";
import { getCurrentUser } from "../modules/users/userSlice";
import Comments from "../components/Post/Comments";

const PostPage: React.FC = () => {
  const curUser = useAppSelector(getCurrentUser);
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
  const { isLoading: postLoading, isFetching: postFetching } = PostQuery(
    params.id ? params.id : ""
  );
  const { isLoading: commentsLoading, isFetching: commentsFetching } =
    CommentsFromPostQuery(params.id ? params.id : "");

  const { mutate: addComment } = CommentMutation(params.id ? params.id : "");

  const handleSubmitComment = () => {
    addComment({
      content: editor?.getHTML(),
      postId: parseInt(params?.id as string),
    });
    editor?.commands.clearContent();
  };

  if (postLoading || commentsLoading || postFetching || commentsFetching)
    return <CircularProgress />;

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      <StickyTitleHeader />
      <MainPost />
      {curUser && (
        <RichTextEditor
          editor={editor}
          isComment={true}
          handleSubmitComment={handleSubmitComment}
        />
      )}
      <Comments />
    </Container>
  );
};

export default PostPage;
