import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../Form/FormInput";
import { LoginMutation } from "../../api/AuthService";

const loginSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .max(
      32,
      "Username is too long. Username should be lesser than 32 characters."
    ),
  password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
});

type LoginInput = z.TypeOf<typeof loginSchema>;

interface Props {
  handleModalClose: () => void;
}

const LoginForm: React.FC<Props> = ({ handleModalClose }) => {
  const { mutate: loginMutate } = LoginMutation("Logged in successfully!");

  const methods = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<LoginInput> = (values) => {
    handleModalClose();
    loginMutate(values);
  };

  return (
    <Box>
      <FormProvider {...methods}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmitHandler)}
          sx={{ display: "flex", flexDirection: "column", gap: 2, marginY: 2 }}
        >
          <FormInput
            name="username"
            required
            label="Username"
            variant="standard"
          />
          <FormInput
            name="password"
            required
            label="Password"
            type="password"
            variant="standard"
          />
          <Button variant="text" type="submit">
            Login
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default LoginForm;
