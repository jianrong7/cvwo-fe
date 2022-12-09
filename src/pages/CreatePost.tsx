import React from "react";
import { Box, Container, Button, Stack } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import { useNavigate } from "react-router-dom";
import { PostMutation } from "../api/PostsService";
import { Post } from "../modules/posts/types";
import { useAppSelector } from "../app/hooks";
import { getUserId } from "../modules/users/userSlice";

type Inputs = {
  title: string;
  body?: string;
};

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const userId = useAppSelector(getUserId);
  const { data, mutate } = PostMutation();
  const { handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { title, body } = data;
    const payload = {
      title,
      body,
      userId,
    };
    navigate("/");
    mutate(payload as Post);
  };
  return (
    <Container maxWidth="xl">
      <Box sx={{ flexGrow: 1, m: 2 }}>
        <FormContainer
          defaultValues={{ title: "", body: "" }}
          onSuccess={onSubmit}
        >
          <Stack spacing={2}>
            <TextFieldElement name="title" label="Title" required />
            <TextFieldElement name="body" label="Body" multiline minRows={2} />
            <Button type="submit">Submit</Button>
          </Stack>
        </FormContainer>
      </Box>
    </Container>
  );
};

export default CreatePost;
