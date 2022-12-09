import React from "react";
import Box from "@mui/material/Box";
import { useForm, SubmitHandler } from "react-hook-form";
import { FormContainer, TextFieldElement } from "react-hook-form-mui";

const CreatePost: React.FC = () => {
  return (
    <Box>
      <FormContainer
        defaultValues={{ name: "" }}
        onSuccess={(data) => console.log(data)}
      >
        <TextFieldElement name="name" label="Name" required />
      </FormContainer>
    </Box>
  );
};

export default CreatePost;
