import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { useNavigate } from "react-router-dom";

type Inputs = {
  title: string;
  body?: string;
};

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const { handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    navigate("/");
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
