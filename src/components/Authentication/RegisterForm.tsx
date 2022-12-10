import React, { useEffect } from "react";
import { Box, Button } from "@mui/material";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../Form/FormInput";
import { LoginMutation, SignupMutation } from "../../api/AuthService";

const registerSchema = z
  .object({
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
    passwordConfirm: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.passwordConfirm, {
    path: ["passwordConfirm"],
    message: "Passwords do not match",
  });

type RegisterInput = z.TypeOf<typeof registerSchema>;

interface Props {
  handleModalClose: () => void;
}

const RegisterForm: React.FC<Props> = ({ handleModalClose }) => {
  const { mutate: signupMutate, isSuccess } = SignupMutation();
  const { mutate: loginMutate } = LoginMutation();

  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  const {
    reset,
    handleSubmit,
    register,
    formState: { isSubmitSuccessful, errors },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);

  const onSubmitHandler: SubmitHandler<RegisterInput> = (values) => {
    const { username, password } = values;
    handleModalClose();
    signupMutate({ username, password });
    if (isSuccess) {
      console.log("successfull");
      loginMutate({ username, password });
    }
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
          <FormInput
            name="passwordConfirm"
            required
            label="Confirm Password"
            type="password"
            variant="standard"
          />

          <Button variant="text" type="submit">
            Register
          </Button>
        </Box>
      </FormProvider>
    </Box>
  );
};

export default RegisterForm;
